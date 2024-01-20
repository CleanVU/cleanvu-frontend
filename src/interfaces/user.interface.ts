export interface User {
  _id: string;
  email: string;
  role: Role;
}

export interface Admin extends User {
  role: Role.ADMIN;
}

export interface Student extends User {
  building: string;
  floor: number;
  room: string;
  role: Role.STUDENT;
}

export interface Custodian extends User {
  building: string;
  floors: number[];
  role: Role.CUSTODIAN;
}

export enum Role {
  ADMIN = "admin",
  STUDENT = "student",
  CUSTODIAN = "custodian",
}
