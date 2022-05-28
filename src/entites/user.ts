import { PrimaryColumn, Entity, Column,OneToMany} from 'typeorm'
import { AllotmentUser } from './allotmentUser'

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
    
    @OneToMany("AllotmentUser","User")
    readonly AllotmentUser:AllotmentUser[]
}