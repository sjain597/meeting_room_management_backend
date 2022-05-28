import { Admin } from "@entitites/admin";
import { User } from "@entitites/user";
import {
  formatHandlerBody,
  formatJSONResponse,
} from "@libs/api-gateway";
import { APIGatewayProxyEventWithConnection, middyfy } from "@libs/lambda";
import "pg";
import "reflect-metadata";
import "source-map-support/register";
import { Not } from "typeorm";
import { CreateUserRequestBody } from "./schema";

interface CreateUserContext {
    email : string
    name : string
    url ?: string
}

const createUserHandler = async (event : APIGatewayProxyEventWithConnection) => {
    const {entityManager} = event
    const {email, name,url} = formatHandlerBody(event.body) as CreateUserContext;
    const userRepo = entityManager.getRepository<User>("User");
    const adminRepo = entityManager.getRepository<Admin>("Admin");
    const user = await userRepo.findOne({where:{emailId : email}})
    if(user){
        return formatJSONResponse({message : 'success'})
    }
    const admin = await adminRepo.findOne({where:{emailId : email}})
    await userRepo.save({
        isAdmin : admin ? true : false,
        emailId : email,
        name,
        imageUrl : url ? url : null,
    })
    const userDetails = await userRepo.findOne({where:{emailId: email}})
    return formatJSONResponse({message : 'success',userDetails})
}

const userHandler = async (event : APIGatewayProxyEventWithConnection) => {
    const {entityManager,headers} = event
    const userId = headers.userId
    const userRepo = entityManager.getRepository<User>("User")
    const data = await userRepo.find({where:{userId : Not(userId)}})
    return formatJSONResponse({message : 'success', data })
}

export const createUser = middyfy(createUserHandler,{
    bodySchema :CreateUserRequestBody
})
export const user = middyfy(userHandler)
