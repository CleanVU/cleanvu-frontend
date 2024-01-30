import { Request } from "./request.interface";

/**
 * Location Interface
 * @interface Location
 * @param {string} _id - The location's unique id
 * @param {string} room - The location's room
 * @param {string} roomDescription - The location's room description
 * @param {string} floor - The location's floor
 * @param {Date} lastCleaned - The location's last cleaned date
 * @param {Request[] | string[]} requests - The location's requests
 */
export interface Location {
  _id: string;
  room: string;
  roomDescription?: string;
  floor: string;
  lastCleaned: Date;
  requests: Request[] | string[];
}
