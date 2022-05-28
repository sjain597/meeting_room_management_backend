export * from "./admin";
export * from "./allotmentUser";
export * from "./meeting_allotment";
export * from "./meetingroom";
export * from "./notification";
export * from "./user";

import { Admin } from "./admin";
import { AllotmentUser } from "./allotmentUser";
import { MeetingAllotment } from "./meeting_allotment";
import { MeetingRoom } from "./meetingroom";
import { Notification } from "./notification";
import { User } from "./user";

export const entities = [
  Admin,
  AllotmentUser,
  MeetingAllotment,
  MeetingRoom,
  Notification,
  User,
];
