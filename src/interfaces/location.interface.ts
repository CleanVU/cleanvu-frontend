import { Request } from "./request.interface";

export interface Location {
  room: string;
  roomDescription?: string;
  floor: number;
  lastCleaned: Date;
  requests: Request[];
}
