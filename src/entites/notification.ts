import { PrimaryColumn, Entity, Column,OneToOne,JoinColumn} from 'typeorm'
import { User } from './user'

@Entity('notification')
export class Notification{
    @PrimaryColumn({type:'string',name:'notification_id'})
    notificationId:string
    @Column({name:'title',type:'string'})
    title:string
    @Column({name:'content',type:'string'})
    content:string
    @Column({type:'string',name:'user_id'})
    userId:string
    @OneToOne(()=>User)
    @JoinColumn({
        name:'user_id',
        referencedColumnName:'userId'

    })
    readonly User?:User
}