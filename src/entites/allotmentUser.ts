import { PrimaryColumn, Entity, Column, ManyToOne, JoinColumn } from 'typeorm'
import { MeetingAllotmnt } from './meeting_allotment'
import { User } from './user'

@Entity('allotmentUser')
export class AllotmentUser {
    @Column({ type: 'string', name: 'allotment_id' })
    allotmentId: string
    @PrimaryColumn({ type: 'string', name: 'user_id' })
    userId: string
    @ManyToOne("AllotmentUser", "MeetingAllotment")
    @JoinColumn({
        name: "allotment_id",
        referencedColumnName: "allotmentId"
    })
    readonly MeetingAllotment?: MeetingAllotmnt;

    @ManyToOne("AllotmentUser","User")
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'userId'

    })
    readonly User?: User
}