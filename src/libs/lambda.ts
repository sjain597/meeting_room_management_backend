import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import httpErrorHandler from "@middy/http-error-handler";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpMultipartBodyParse from "@middy/http-multipart-body-parser";
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import * as Joi from "joi";
import { formatHandlerBody, formatJSONError } from "./api-gateway";
import { validateRequest } from "./validator";



interface ValidationSchema {
  readonly bodySchema?: Joi.Schema;
  readonly queryParamsSchema?: Joi.Schema;
  readonly paramsSchema?: Joi.Schema;
}

export const middyfy = (
  handler: (
    event: APIGatewayProxyEvent
  ) => Promise<Record<string, any>>,
  validationSchema?: ValidationSchema,
) => {
  return middy(handler)
    // .use(decodeIdToken())
    .use(addContentType())
    .use(httpMultipartBodyParse())
    .use(middyJsonBodyParser())
    .use(httpErrorHandler())
    .use(
      doNotWaitForEmptyEventLoop({
        runOnAfter: true,
        runOnBefore: true,
        runOnError: true,
      })
    )
    .use(requestValidator(validationSchema));

}

// const decodeIdToken = (): middy.MiddlewareObject<
//   APIGatewayEvent,
//   APIGatewayProxyResult
// > => {
//   const before = (
//     handler: middy.HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>,
//     next
//   ) => {
//     if (
//       handler &&
//       handler.event &&
//       handler.event.headers &&
//       handler.event.headers.Authorization
//     ) {
//       const token = handler.event.headers.Authorization.replace("Bearer ", "");
//       const decodedToken: any = jwtDecode(token);
//       const userDetails = {
//         email: decodedToken.email,
//         userId: decodedToken.sub,
//         name: decodedToken.name,
//         phoneNumber: decodedToken.phone_number,
//       };
//       handler.event.headers = {
//         ...handler.event.headers,
//         ...userDetails,
//       };
//     }
//     next();
//   };

//   return {
//     before,
//   };
// };

const addContentType = (): middy.MiddlewareObject<
  APIGatewayEvent,
  APIGatewayProxyResult
> => {
  const before = (
    handler: middy.HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>,
    next
  ) => {
    if (handler && handler.event && handler.event.headers) {
      const contentTypeHeader =
        handler.event.headers["content-type"] ||
        handler.event.headers["Content-Type"];
      if (
        contentTypeHeader &&
        contentTypeHeader.includes("multipart/form-data")
      ) {
        handler.event.headers = {
          ...handler.event.headers,
          "content-type": contentTypeHeader,
          "Content-type": contentTypeHeader,
        };
      }
      next();
    }
  };
  return {
    before,
  };
};



const requestValidator = (
  validationSchema: ValidationSchema
): middy.MiddlewareObject<APIGatewayEvent, APIGatewayProxyResult> => {
  const beforeHandler = async (
    handler: middy.HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>
  ): Promise<void> => {
    if (validationSchema) {
      const { bodySchema, paramsSchema, queryParamsSchema } = validationSchema;
      if (bodySchema) {
        const validationResult = validateRequest(
          bodySchema,
          formatHandlerBody(handler.event.body)
        );
        if (validationResult && validationResult.message) {
          return Promise.reject(validationResult.message);
        }
      }
      if (paramsSchema) {
        const validationResult = validateRequest(
          paramsSchema,
          handler.event.pathParameters
        );
        if (validationResult && validationResult.message) {
          return Promise.reject(validationResult.message);
        }
      }
      if (queryParamsSchema) {
        const validationResult = validateRequest(
          queryParamsSchema,
          handler.event.queryStringParameters
        );
        if (validationResult && validationResult.message) {
          return Promise.reject(validationResult.message);
        }
      }
      return;
    }
    return;
  };

  const onError = (
    handler: middy.HandlerLambda<APIGatewayEvent, APIGatewayProxyResult>
  ) => {
    return handler.callback(null, formatJSONError({ message: handler.error }));
  };

  return {
    before: beforeHandler,
    onError,
  };
};