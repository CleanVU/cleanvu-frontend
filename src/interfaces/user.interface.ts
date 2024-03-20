/**
 * User Interface
 * @interface User
 * @param {string} _id - The user's unique id
 * @param {string} email - The user's email
 * @param {Role} role - The user's role
 */

export interface User {
  _id?: string;
  email: string;
  role: Role;
  building?: string;
  floor?: string;
  requests?: string[] | Request[];
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
