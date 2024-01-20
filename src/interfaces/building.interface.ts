import { Location } from "./location.interface";

export interface Building {
  _id: string;
  name: string;
  locations: Location[];
}
