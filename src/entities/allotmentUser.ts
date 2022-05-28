import { PrimaryColumn, Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { MeetingAllotment } from "./meeting_allotment";
// import { MeetingAllotmnt } from './meeting_allotment'
import { User } from "./user";

@Entity("allotmentUser")
export class AllotmentUser {
  @PrimaryColumn({ type: "uuid", name: "user_id" })
  userId: string;

  @Column({ type: "uuid", name: "allotment_id" })
  allotmentId: string;

  constructor(userId: string, allotmentId: string) {
    this.userId = userId;
    this.allotmentId = allotmentId;
  }
  @ManyToOne("MeetingAllotment", "allotmentUser")
  @JoinColumn({
      name: "allotment_id",
      referencedColumnName: "allotmentId"
  })
  readonly meetingAllotment?: MeetingAllotment;

  // @ManyToOne("AllotmentUser","User")
  // @JoinColumn({
  //     name: 'user_id',
  //     referencedColumnName: 'userId'

  // })
  // readonly User?: User
}
