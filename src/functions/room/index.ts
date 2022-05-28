import { handlerPath } from '@libs/handler-resolver';

export const getRoom = {
  handler: `${handlerPath(__dirname)}/handler.getRoom`,
  events: [
    {
      http: {
        method: 'get',
        path: 'room/get',
        cors: true,
      },
    },
  ],
};

export const deleteRoom = {
    handler: `${handlerPath(__dirname)}/handler.deleteRoom`,
    events: [
      {
        http: {
          method: 'post',
          path: 'room/delete',
          cors: true,
        },
      },
    ],
  };

  export const updateRoom = {
    handler: `${handlerPath(__dirname)}/handler.editRoom`,
    events: [
      {
        http: {
          method: 'post',
          path: 'room/update',
          cors: true,
        },
      },
    ],
  };

  export const createRoom = {
    handler: `${handlerPath(__dirname)}/handler.addRoom`,
    events: [
      {
        http: {
          method: 'put',
          path: 'room/create',
          cors: true,
        },
      },
    ],
  };