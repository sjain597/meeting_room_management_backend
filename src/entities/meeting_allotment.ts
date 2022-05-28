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
  @PrimaryColumn({ name: "allotment_id" })
  allotmentId: string;

  @Column({ name: "start_time" })
  startTime?: Date;

  @Column({ name: "end_time" })
  endTime?: Date;

  @Column({ name: "approved" })
  approved: boolean;

  @Column({ name: "room_id" })
  roomId?: string;

  @Column({ name: "status" })
  status?: string;

  @Column({ name: "assigned_to_user_id" })
  assignedToUserId?: string;

//   @OneToMany("MeetingAllotmnt", "AllotmentUser")
//   readonly AllotmentUser?: AllotmentUser[];

//   @OneToOne(() => MeetingRoom)
//   @JoinColumn({
//     name: "room_id",
//     referencedColumnName: "roomId",
//   })
//   readonly MeetingRoom?: MeetingRoom;

  constructor(
    allotmentId: string,
    approved: boolean,
    startTime?: Date,
    endTime?: Date,
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
