import { PrimaryColumn, Entity, Column} from 'typeorm'

@Entity('user')
export class User{
    @PrimaryColumn({type:'string',name:'user_id'})
    userId:string
    @Column({type:'string',name:'name'})
    name:string
    @Column({type:'string',name:'email_id'})
    emailId:string
    @Column({type:'boolean',name:'is_admin'})
    isAdmin:boolean
}