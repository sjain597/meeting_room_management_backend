import { PrimaryColumn, Entity, Column} from 'typeorm'
@Entity('meeting_room')
export class MeetingRoom{
    @PrimaryColumn({type:'text',name:'room_id'})
    roomId:string
    @Column({type:'int',name:'seats'})
    seats:number
    @Column({type:'boolean',name:'whiteboard'})
    whiteBoard:boolean
    @Column({type:'string',name:'room_name'})
    roomName:string
    @Column({type:'boolean',name:'projector'})
    projector:boolean
}