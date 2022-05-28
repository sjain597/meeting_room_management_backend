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
    const res = await userRepo.insert({
        isAdmin : admin ? true : false,
        emailId : email,
        name,
        imageUrl : url ? url : null,
    })

    return formatJSONResponse({message : 'success',userDetails : res.generatedMaps[0]})
}

export const createUser = middyfy(createUserHandler,{
    bodySchema :CreateUserRequestBody
})
