import { formatHandlerBody, formatJSONError, formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { sendRawMail } from "@libs/mailService";
import { APIGatewayProxyEvent } from "aws-lambda";
import { sendMailRequestBody } from "./schema";

interface SendMailContext {
  email: string,
  subject: string,
  body: string,
}

export const sendMailHandler = async (
  event: APIGatewayProxyEvent
) => {
  const { body, email, subject } = formatHandlerBody(event.body) as SendMailContext
  const { status :Status, error } = await sendRawMail({ email, subject, body });
  if (Status === 'error') {
    return formatJSONError([{ Status, error, message: 'Mail not sent.' }])
  }
  return formatJSONResponse([{ Status, message: 'Mail sent' }]);
};

export const sendMail = middyfy(sendMailHandler, {
  bodySchema: sendMailRequestBody
});