import axios from "axios";
import { Building } from "../interfaces/building.interface";
import { Request } from "../interfaces/request.interface";

/**
 * Get Buildings
 *
 * @param count the number of buildings to get
 * @param page the page number
 * @returns a promise that resolves to an array of buildings
 */
export const getBuildings = (
  count: number,
  page: number,
): Promise<Building[]> =>
  axios
    .get(`${process.env.VITE_HOST}/api/buildings?count=${count}&page=${page}`)
    .then((res) => res.data);

/**
 * Get Requests
 *
 * @param count the number of requests to get
 * @param page the page number
 * @returns a promise that resolves to an array of requests
 */
export const getRequests = (count: number, page: number): Promise<Request[]> =>
  axios
    .get(`${process.env.VITE_HOST}/api/requests?count=${count}&page=${page}`)
    .then((res) => res.data);
