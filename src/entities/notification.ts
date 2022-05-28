import { PrimaryColumn, Entity, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user";

@Entity("notification")
export class Notification {
  @PrimaryColumn({ type: "uuid", name: "notification_id" })
  notificationId: string;

  @Column({ name: "title", type: "character varying" })
  title: string;

  @Column({ name: "content", type: "character varying" })
  content: string;

  @Column({ type: "uuid", name: "user_id" })
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
