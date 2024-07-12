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
  empId: number;
  empName: string;
  dept: string;
  position: string;
};
