import { handlerPath } from '@libs/handler-resolver';

export const changeMemberRole = {
  handler: `${handlerPath(__dirname)}/handler.changeMemberRole`,
  events: [
    {
      http: {
        method: 'put',
        path: 'user/change-access',
        cors: true,
      },
    },
  ],
};