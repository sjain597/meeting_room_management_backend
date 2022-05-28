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
    const {email, name,url} = formatHandlerBody(event.body) as CreateUserContext;
    const {entityManager} = event
    const userRepo = entityManager.getRepository<user>("user");
    const adminRepo = entityManager.getRepository<admin>("admin");
    const user = await userRepo.findOne({where:{emailId : email}})
    if(user){
        return formatJSONResponse({message : 'success'})
    }
    const admin = await adminRepo.findOne({where:{emailId : email}})
    await userRepo.insert({
        isAdmin : admin ? true : false,
        emailId : email,
        name,
        imagUrl : url ? url : null,
    })

    return formatJSONResponse({message : 'success',})
}

export const createUser = middyfy(createUserHandler,{
    bodySchema :CreateUserRequestBody
})
