import { MeetingRoom } from "@entitites/meetingroom";
import {
  formatHandlerBody,
  formatJSONResponse,
} from "@libs/api-gateway";
import { APIGatewayProxyEventWithConnection, middyfy } from "@libs/lambda";
import { exist } from "joi";
import {DeleteRoomBody,EditRoomBody,AddRoomBody} from './schema'
import "pg";
import "reflect-metadata";
import "source-map-support/register";
const roomHandler = async (event : APIGatewayProxyEventWithConnection) => {
    const {entityManager} = event
    const roomRepo = entityManager.getRepository<MeetingRoom>("MeetingRoom");
    const roomData = await roomRepo.find()
    return formatJSONResponse({message : 'success',roomData})
}
export const getRoom=middyfy(roomHandler)

interface DeleteRoom{
    roomId : string
}

const deleteRoomHandler = async (event : APIGatewayProxyEventWithConnection) => {
    const {entityManager} = event

    const {roomId} = formatHandlerBody(event.body) as DeleteRoom;
    const roomRepo = entityManager.getRepository<MeetingRoom>("MeetingRoom");
    console.log(roomId,"room id is checked")
    const room = await roomRepo.findOne({where:{roomId : roomId}})
    if(room){
        await roomRepo.createQueryBuilder()
        .delete()
        .where("roomId=:Id",{Id:roomId})
        .execute()
        return formatJSONResponse({message : 'The roomId has been deleted successfully'})
    }
    else{

    return formatJSONResponse({message : 'The room Id dosent exist'})
    }
}

export const deleteRoom = middyfy(deleteRoomHandler,{
    bodySchema :DeleteRoomBody
})


interface EditRoom{
    roomId : string
    whiteboard: boolean
    projector: boolean
    roomName: string
    seats: number
}

const editRoomHandler = async (event : APIGatewayProxyEventWithConnection) => {
    const {entityManager} = event

    const {roomId,whiteboard,projector,roomName,seats} = formatHandlerBody(event.body) as EditRoom;
    const roomRepo = entityManager.getRepository<MeetingRoom>("MeetingRoom");
    const room = await roomRepo.findOne({where:{roomId : roomId}})
    if(!room){
        return formatJSONResponse({message : 'The room Id dosent exist'})
    }
    else{
        await roomRepo.createQueryBuilder()
        .update()
        .set({
            seats:seats,
            whiteboard:whiteboard,
            roomName : roomName,
            projector : projector
        })
        .where("roomId=:Id",{Id:roomId})
        .execute()
        return formatJSONResponse({message : 'The data has beenupdated successfully'})
    }
}

export const editRoom = middyfy(editRoomHandler,{
    bodySchema :EditRoomBody
})


interface AddRoom{
    whiteboard: boolean
    projector: boolean
    roomName: string
    seats: number
}

const addRoomHandler = async (event : APIGatewayProxyEventWithConnection) => {
    const {entityManager} = event

    const {whiteboard,projector,roomName,seats} = formatHandlerBody(event.body) as AddRoom;
    const roomRepo = entityManager.getRepository<MeetingRoom>("MeetingRoom");
        await roomRepo.createQueryBuilder()
        .insert()
        .values({
            seats:seats,
            whiteboard:whiteboard,
            roomName : roomName,
            projector : projector
        })
        .execute()
        return formatJSONResponse({message : 'The data has been inserted successfully'})
    }


export const addRoom = middyfy(addRoomHandler,{
    bodySchema :AddRoomBody
})