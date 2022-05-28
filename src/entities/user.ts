import { PrimaryColumn, Entity, Column } from "typeorm";

@Entity("user")
export class User {
  @PrimaryColumn({ name: "user_id" })
  userId: string;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "email_id" })
  emailId: string;

  @Column({  name: "is_admin" })
  isAdmin: boolean;

  @Column({  name: "image_url" })
  imageUrl?: string;

  constructor(
    userId :string,
    name:string,
    emailId: string,
    isAdmin: boolean,
    imageUrl?: string  ){
    this.userId = userId
    this.name = name
    this.emailId = emailId
    this.isAdmin = isAdmin
    this.imageUrl = imageUrl
  }
}
