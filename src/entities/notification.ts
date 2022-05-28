import { PrimaryColumn, Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user";

@Entity("notification")
export class Notification {
  @PrimaryColumn({ type: "string", name: "notification_id" })
  notificationId: string;

  @Column({ name: "title", type: "string" })
  title: string;

  @Column({ name: "content", type: "string" })
  content: string;

  @Column({ type: "string", name: "user_id" })
  userId: string;

  constructor(
      notificationId : string,
      title : string,
      content : string,
      userId : string,
  ){
    this.notificationId = notificationId
    this.title = title
    this.content = content
    this.userId = userId
  }

//   @OneToOne(() => User)
//   @JoinColumn({
//     name: "user_id",
//     referencedColumnName: "userId",
//   })
//   readonly User?: User;
}
