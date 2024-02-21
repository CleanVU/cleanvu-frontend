import { Location } from "./location.interface";

/**
 * Building Interface
 * @interface Building
 * @param {string} _id - The building's unique id
 * @param {string} name - The building's name
 * @param {string[]} floors - The building's floors
 * @param {Location[]} locations - The building's locations
 */
export interface Building {
  _id: string;
  name: string;
  floors: string[];
  locations: Location[];
  createdAt: Date;
  updatedAt: Date;
}
