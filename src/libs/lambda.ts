import middy from "@middy/core";
import doNotWaitForEmptyEventLoop from "@middy/do-not-wait-for-empty-event-loop";
import httpErrorHandler from "@middy/http-error-handler";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpMultipartBodyParse from "@middy/http-multipart-body-parser";
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { EntityManager } from "typeorm";
import * as Joi from "joi";
import jwtDecode from "jwt-decode";
import { initiateDbConnection } from "./dbConnection";
import { formatHandlerBody, formatJSONError } from "./api-gateway";
import { validateRequest } from "./validator";


export interface APIGatewayProxyEventWithConnection
  extends APIGatewayProxyEvent {
  entityManager: EntityManager;
}

interface ValidationSchema {
  readonly bodySchema?: Joi.Schema;
  readonly queryParamsSchema?: Joi.Schema;
  readonly paramsSchema?: Joi.Schema;
}

export const transactionWrapper = (
  handler: (
    request: APIGatewayProxyEventWithConnection
  ) => Promise<Record<string, any>>
) => {
  const transactedHandler = async (event: APIGatewayProxyEvent) => {
    const dataSource = await initiateDbConnection();
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    const entityManager = queryRunner.manager;
    await queryRunner.startTransaction();
    let res: any;
    try {
      res = await handler({ ...event, entityManager });
      if (res && res.statusCode !== 500) {
        await queryRunner.commitTransaction();
      } else {
        await queryRunner.rollbackTransaction();
      }
    } catch (error) {
      res = formatJSONError({ ...error });
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return res;
  };
  return transactedHandler;
};

export const middyfy = (
  handler: (
    event: APIGatewayProxyEventWithConnection | APIGatewayProxyEvent
  ) => Promise<Record<string, any>>,
  validationSchema?: ValidationSchema,
  startTransaction: boolean = true
) => {
  return middy(startTransaction ? transactionWrapper(handler) : handler)
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