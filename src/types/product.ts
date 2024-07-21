import { Timestamp, GeoPoint } from "firebase/firestore";

export type AttendanceDocument = {
  empId: number;
  empName: string;
  dept: string;
  login: Timestamp;
  logout?: Timestamp;
  loc: GeoPoint;
};

export type UserDocument = {
  uid: string,
  empId: number,
  empName: string,
  email: string | null,
  dept: string,
  position: string,
};

export type WeeklyAttendance = {
  [date: string]: { present: number; absent: number };
}

export type AnalyticData = {
  totalUsers: number;
  totalPresent: number;
  totalAbsent: number;
  lateLogIn: number;
  earlyLogOut: number;
  weeklyAttendance: WeeklyAttendance;
}

export type monthlyAnalyticData = {
  totalPresent: number;
  lateLogIn: number;
  earlyLogOut: number;
  totalAbsent: number;
}
