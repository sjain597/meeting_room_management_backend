
import { PrimaryColumn, Entity} from 'typeorm'

@Entity('admin')
export class Admin{
    @PrimaryColumn({type:'string',name:'email_id'})
    emialId:string
}
