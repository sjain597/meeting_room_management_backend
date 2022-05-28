import {
  PrimaryColumn,
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { AllotmentUser } from "./allotmentUser";
import { MeetingRoom } from "./meetingroom";

@Entity("meeting_allotment")
export class MeetingAllotment {
  @PrimaryColumn({ type:'uuid', name: "allotment_id" })
  allotmentId: string;

  @Column({ type:'timestamp with time zone', name: "start_time" })
  startTime?: string;

  @Column({type:'timestamp with time zone',  name: "end_time" })
  endTime?: string;

  @Column({ name: "approved", type : 'boolean' })
  approved: boolean;

  @Column({ name: "room_id" , type : "uuid"})
  roomId?: string;

  @Column({ name: "status", type :'character varying' })
  status?: string;

  @Column({ name: "assigned_to_user_id", type : 'uuid' })
  assignedToUserId?: string;

  @OneToMany("AllotmentUser", "meetingAllotment")
  readonly allotmentUser?: AllotmentUser[];

//   @OneToOne(() => MeetingRoom)
//   @JoinColumn({
//     name: "room_id",
//     referencedColumnName: "roomId",
//   })
//   readonly MeetingRoom?: MeetingRoom;

  constructor(
    allotmentId: string,
    approved: boolean,
    startTime?: string,
    endTime?: string,
    roomId?: string,
    status?: string,
    assignedToUserId?: string
  ) {
    this.allotmentId = allotmentId;
    this.approved = approved;
    this.startTime = startTime;
    this.endTime = endTime;
    this.roomId = roomId;
    this.status = status;
    this.assignedToUserId = assignedToUserId;
  }
}
