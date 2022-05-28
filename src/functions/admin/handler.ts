import { Admin } from "@entitites/admin";
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
import { ChangeMemberRoleRequestBody } from "./schema";

interface ChangeMemberRole {
    userId : string
    isAdmin : boolean
}

const changeMemberRoleHandler = async (event : APIGatewayProxyEventWithConnection) => {
    const {entityManager,headers} = event
    const {userId : id,isAdmin} = formatHandlerBody(event.body) as ChangeMemberRole
    const userId = headers.userId
    const userRepo = entityManager.getRepository<User>("User")
    const adminRepo = entityManager.getRepository<Admin>("Admin")
    const user = await userRepo.findOne({where:{userId}})
    if(!user){
        return formatJSONError({message : 'Invalid User'})
    }
    if(user && !user.isAdmin){
        return formatJSONError({message : 'Not permitted'})
    }
    const userToUpdate = await userRepo.findOne({where:{userId : id}})
    if(!userToUpdate){
        return formatJSONError({message : 'No user found'})
    }
    if(isAdmin){
        await Promise.all([
            userRepo.update({userId:id},{isAdmin : true}),
            adminRepo.save({emailId : userToUpdate.emailId})
        ])
    }else{
        await Promise.all([
            userRepo.update({userId:id},{isAdmin : false}),
            adminRepo.delete({emailId : userToUpdate.emailId})
        ]) 
    }
    return formatJSONResponse({message : 'success' })
}


export const changeMemberRole = middyfy(changeMemberRoleHandler,{
    bodySchema : ChangeMemberRoleRequestBody
})

