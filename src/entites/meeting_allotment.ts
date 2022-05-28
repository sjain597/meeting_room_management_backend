import { PrimaryColumn, Entity, Column,OneToMany,OneToOne,JoinColumn} from 'typeorm'
import { AllotmentUser } from './allotmentUser'
import { MeetingRoom } from './meetingroom'

@Entity('meeting_allotment')
export class MeetingAllotmnt{
    @Column({type:"string"})
    start_time:Date
    @Column({type:'string',name:'end_time'})
    endTime:Date
    @PrimaryColumn({type:'string',name:'allotment_id'})
    allotmentId:string
    @Column({type:'boolean',name:'approved'})
    approved:boolean
    @Column({type:'string',name:'room_id'})
    roomId:string
    @Column({type:"string",name:'status'})
    status:string
    @Column({type:"string",name:'assigned_to_user_id'})
    assignedToUserId:string
    @OneToMany("MeetingAllotmnt","AllotmentUser")
    readonly AllotmentUser?:AllotmentUser[]
    @OneToOne(()=>MeetingRoom)
    @JoinColumn({
        name:'room_id',
        referencedColumnName:'roomId'

    })
    readonly MeetingRoom?:MeetingRoom
}