/**
 * User Interface
 * @interface User
 * @param {string} _id - The user's unique id
 * @param {string} email - The user's email
 * @param {Role} role - The user's role
 */
export interface User {
  _id: string;
  email: string;
  role: Role;
  building?: string;
  floor?: number;
}

/**
 * Admin Interface
 * @interface Admin
 * @param {string} _id - The admin's unique id
 * @param {string} email - The admin's email
 * @param {Role} role - The admin's role
 */
export interface Admin extends User {
  role: Role.ADMIN;
}

/**
 * Student Interface
 * @interface Student
 * @param {string} _id - The student's unique id
 * @param {string} email - The student's email
 * @param {string} building - The student's building
 * @param {number} floor - The student's floor
 * @param {string} room - The student's room
 * @param {Role} role - The student's role
 */
export interface Student extends User {
  building: string;
  floor: number;
  room: string;
  role: Role.STUDENT;
}

/**
 * Custodian Interface
 * @interface Custodian
 * @param {string} _id - The custodian's unique id
 * @param {string} email - The custodian's email
 * @param {string} building - The custodian's building
 * @param {number[]} floors - The custodian's floors
 * @param {Role} role - The custodian's role
 */
export interface Custodian extends User {
  building: string;
  floors: number[];
  role: Role.CUSTODIAN;
}

/**
 * Role Enum
 * @enum Role
 * @param {string} ADMIN - The admin role
 * @param {string} STUDENT - The student role
 * @param {string} CUSTODIAN - The custodian role
 */
export enum Role {
  ADMIN = "admin",
  STUDENT = "student",
  CUSTODIAN = "custodian",
}

/**
 * Student Tabs Enum
 * @enum StudentTabs
 * @param {string} DASHBOARD - The dashboard tab
 * @param {string} REQUESTS - The requests tab
 */
export enum StudentTabs {
  DASHBOARD = "dashboard",
  REQUESTS = "requests",
}

/**
 * Custodian Tabs Enum
 * @enum CustodianTabs
 * @param {string} DASHBOARD - The dashboard tab
 * @param {string} REQUESTS - The requests tab
 */
export enum CustodianTabs {
  DASHBOARD = "dashboard",
  REQUESTS = "requests",
}

export type TabOptions = StudentTabs | CustodianTabs;
