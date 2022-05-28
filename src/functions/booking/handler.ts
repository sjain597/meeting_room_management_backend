import { Admin } from "@entitites/admin";
import { AllotmentUser } from "@entitites/allotmentUser";
import { MeetingAllotment } from "@entitites/meeting_allotment";
import { User } from "@entitites/user";
import {
  formatHandlerBody,
  formatJSONError,
  formatJSONResponse,
} from "@libs/api-gateway";
import { APIGatewayProxyEventWithConnection, middyfy } from "@libs/lambda";
import "pg";
import "reflect-metadata";
import "source-map-support/register";
import { In, Not } from "typeorm";

interface CreateBookingContext {
  roomId: string;
  guests: ReadonlyArray<string>;
  startTime: Date;
  endTime: Date;
}

const createBookingHandler = async (
  event: APIGatewayProxyEventWithConnection
) => {
  const { entityManager, headers } = event;
  const { endTime, guests, roomId, startTime } = formatHandlerBody(
    event.body
  ) as CreateBookingContext;
  const userId = headers.userId;

  const userRepo = entityManager.getRepository<User>("User");
  const meetingAllotmentRepo =
    entityManager.getRepository<MeetingAllotment>("MeetingAllotment");
  const allotmentUserRepo =
    entityManager.getRepository<AllotmentUser>("AllotmentUser");

  const allUserIds = Array.from(new Set([userId, ...guests]));
  const users = await userRepo.find({ where: { userId: In(allUserIds) } });
  if (!users || (users && users.length !== allUserIds.length)) {
    return formatJSONError({ message: "Invalid date provided" });
  }
  const alreadyAlloted = await meetingAllotmentRepo.createQueryBuilder('meetingAllotment')
  .leftJoinAndSelect('meetingAllotment.allotmentUser','allotmentUser')
  .where(`meetingAllotment.roomId =${roomId}`)
  .andWhere(`meetingAllotment.endTime =${new Date(endTime).toUTCString()}`)
  .andWhere(`meetingAllotment.startTime =${new Date(startTime).toUTCString()}`)
  .andWhere(`allotmentUser.userId =${userId}`)
  .getOne()

  if(alreadyAlloted){
      return formatJSONError({message : 'You already invited to the Booking room for the specified time.'})
  }

  const alreadyAllotedToOthers = await meetingAllotmentRepo.createQueryBuilder('meetingAllotment')
  .leftJoinAndSelect('meetingAllotment.allotmentUser','allotmentUser')
  .where(`meetingAllotment.roomId =${roomId}`)
  .andWhere(`meetingAllotment.endTime =${new Date(endTime).toUTCString()}`)
  .andWhere(`meetingAllotment.startTime =${new Date(startTime).toUTCString()}`)
  .getOne()

  if(alreadyAllotedToOthers){
    return formatJSONError({message : 'Meeting room not available.'})
  }
  await meetingAllotmentRepo.insert({
      assignedToUserId : userId,
      roomId,
      startTime : new Date(startTime).toUTCString(),
      endTime : new Date(endTime).toUTCString(),
  });

  const {allotmentId} = await meetingAllotmentRepo.findOne({where:{
    assignedToUserId : userId,
    roomId,
    startTime : new Date(startTime).toUTCString(),
    endTime : new Date(endTime).toUTCString(),
  }})

  await allotmentUserRepo.insert(guests.map(each => {
      return {
          allotmentId,
          userId : each
      }
  }))
  return formatJSONResponse({message : 'success'})
};


const userBookingHandler = async (event: APIGatewayProxyEventWithConnection) => {
  
}
export const createBooking = middyfy(createBookingHandler)
