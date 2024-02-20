import { Location } from "./location.interface";
import { Building } from "./building.interface";

/**
 * Request Interface
 * @interface Request
 * @param {string} _id - The request's unique id
 * @param {string} studentId - The student's unique id
 * @param {string} description - The request's description
 * @param {string} initiatedAt - The request's initiated date
 * @param {RequestStatus} status - The request's status
 * @param {string} estimatedCompletion - The request's estimated completion date
 * @param {Building | string} building - The request's building
 * @param {Location | string} location - The request's location
 */
export interface Request {
  _id: string;
  studentId: string;
  description: string;
  status: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
  estimatedCompletion?: string;
  location: Location | string;
  building: Building | string;
}

/**
 * Request Status Enum
 * @enum RequestStatus
 * @param {string} REQUESTED - The requested status
 * @param {string} ACCEPTED - The accepted status
 * @param {string} COMPLETED - The completed status
 * @param {string} DENIED - The denied status
 */
export enum RequestStatus {
  ALL = "all",
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  COMPLETED = "completed",
  DENIED = "denied",
}

/**
 * Request Status Colors Enum
 * @enum RequestStatusColors
 * @param {string} REQUESTED - The requested status color
 * @param {string} ACCEPTED - The accepted status color
 * @param {string} COMPLETED - The completed status color
 * @param {string} DENIED - The denied status color
 */
export enum RequestStatusColors {
  ALL = "grey",
  REQUESTED = "blue",
  // sort light yell
  ACCEPTED = "#F6E327",
  COMPLETED = "green",
  DENIED = "red",
}
