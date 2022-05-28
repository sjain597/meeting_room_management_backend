
import { PrimaryColumn, Entity} from 'typeorm'

@Entity('admin')
export class Admin{
    @PrimaryColumn({name:'email_id'})
    emailId:string

    constructor(emailId: string){
        this.emailId = emailId
    }
}
