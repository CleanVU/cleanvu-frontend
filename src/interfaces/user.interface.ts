export interface User {
  _id: string;
  email: string;
  role: Role;
  building?: string;
  floor?: number;
}

export enum Role {
  ADMIN = "admin",
  STUDENT = "student",
  CUSTODIAN = "custodian",
}
