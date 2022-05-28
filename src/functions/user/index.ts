import { handlerPath } from '@libs/handler-resolver';

export const createUser = {
  handler: `${handlerPath(__dirname)}/handler.createUser`,
  events: [
    {
      http: {
        method: 'put',
        path: 'user/create',
        cors: true,
      },
    },
  ],
};

export const user = {
  handler: `${handlerPath(__dirname)}/handler.user`,
  events: [
    {
      http: {
        method: 'get',
        path: 'user',
        cors: true,
      },
    },
  ],
};