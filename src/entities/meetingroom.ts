import { PrimaryColumn, Entity, Column } from "typeorm";
@Entity("meeting_room")
export class MeetingRoom {
  @PrimaryColumn({ name: "room_id" })
  roomId: string;

  @Column({  name: "seats" })
  seats: number;

  @Column({  name: "whiteboard" })
  whiteboard: boolean;

  @Column({ name: "room_name" })
  roomName: string;

  @Column({  name: "projector" })
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
