import { handlerPath } from "@libs/handler-resolver";

export const sendMail = {
  handler: `${handlerPath(__dirname)}/handler.sendMail`,
  events: [
    {
      http: {
        method: "post",
        path: "utils/send-mail",
        cors : true
      },
    },
  ],
};
