
import { PrimaryColumn, Entity} from 'typeorm'

@Entity('admin')
export class Admin{
    @PrimaryColumn({name:'email_id',type:'character varying'})
    emailId:string

    constructor(emailId: string){
        this.emailId = emailId
    }
}
