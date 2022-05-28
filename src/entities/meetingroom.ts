import { PrimaryColumn, Entity, Column } from "typeorm";
@Entity("meeting_room")
export class MeetingRoom {
  @PrimaryColumn({ name: "room_id" ,type:'uuid'})
  roomId: string;

  @Column({  name: "seats",type:'bigint' })
  seats: number;

  @Column({  name: "whiteboard", type:'boolean'})
  whiteboard: boolean;

  @Column({ name: "room_name", type :'character varying' })
  roomName: string;

  @Column({  name: "projector", type : 'boolean' })
  projector: boolean;

  constructor(
    roomId : string,
    seats : number,
    whiteboard : boolean,
    roomName : string,
    projector : boolean
  ){
      this.roomId = roomId
      this.seats = seats
      this.whiteboard = whiteboard
      this.roomName = roomName
      this.projector = projector
  }
}
