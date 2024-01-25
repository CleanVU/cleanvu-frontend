import { Request } from "./request.interface";

/**
 * Location Interface
 * @interface Location
 * @param {string} room - The location's room
 * @param {string} roomDescription - The location's room description
 * @param {number} floor - The location's floor
 * @param {Date} lastCleaned - The location's last cleaned date
 * @param {Request[] | string[]} requests - The location's requests
 */
export interface Location {
  room: string;
  roomDescription?: string;
  floor: number;
  lastCleaned: Date;
  requests: Request[] | string[];
}
