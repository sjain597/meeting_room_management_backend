import { handlerPath } from '@libs/handler-resolver';

export const createBooking = {
  handler: `${handlerPath(__dirname)}/handler.createBooking`,
  events: [
    {
      http: {
        method: 'post',
        path: 'booking/create',
        cors: true,
      },
    },
  ],
};