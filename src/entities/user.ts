import { PrimaryColumn, Entity, Column } from "typeorm";

@Entity("user")
export class User {
  @PrimaryColumn({ name: "user_id", type:'uuid' })
  userId: string;

  @Column({ name: "name",type:'character varying' })
  name: string;

  @Column({ name: "email_id", type:'character varying' })
  emailId: string;

  @Column({  name: "is_admin", type :'boolean' })
  isAdmin: boolean;

  @Column({  name: "image_url" , type :'character varying'})
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
