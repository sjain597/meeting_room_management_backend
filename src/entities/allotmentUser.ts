import { PrimaryColumn, Entity, Column, ManyToOne, JoinColumn } from "typeorm";
// import { MeetingAllotmnt } from './meeting_allotment'
import { User } from "./user";

@Entity("allotmentUser")
export class AllotmentUser {
  @PrimaryColumn({ type: "string", name: "user_id" })
  userId: string;

  @Column({ type: "string", name: "allotment_id" })
  allotmentId: string;

  constructor(userId: string, allotmentId: string) {
    this.userId = userId;
    this.allotmentId = allotmentId;
  }
  // @ManyToOne("AllotmentUser", "MeetingAllotment")
  // @JoinColumn({
  //     name: "allotment_id",
  //     referencedColumnName: "allotmentId"
  // })
  // readonly MeetingAllotment?: MeetingAllotmnt;

  // @ManyToOne("AllotmentUser","User")
  // @JoinColumn({
  //     name: 'user_id',
  //     referencedColumnName: 'userId'

  // })
  // readonly User?: User
}
