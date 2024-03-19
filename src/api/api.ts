import axios from "axios";
import { Building } from "../interfaces/building.interface";
import { Request } from "../interfaces/request.interface";
import { User } from "../interfaces/user.interface";
const url = "http://localhost:8081";

/************** Building API Calls **************/

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
    .get(`${url}/api/buildings?count=${count}&page=${page}`)
    .then((res) => res.data);

/************** Request API Calls **************/

/**
 * Get Requests
 *
 * @param count the number of requests to get
 * @param page the page number
 * @returns a promise that resolves to an array of requests
 */
export const getRequests = (count: number, page: number): Promise<Request[]> =>
  axios
    .get(`${url}/api/requests?count=${count}&page=${page}`)
    .then((res) => res.data);

/**
 * Delete Request
 *
 * @param id the request's unique id
 * @returns a promise that resolves to the deleted request
 */
export const deleteRequest = (id: string): Promise<Request> =>
  axios.delete(`${url}/api/request/${id}`).then((res) => res.data);

/**
 * Update Request
 *
 * @param id the request's unique id
 * @param request the updated request
 * @returns a promise that resolves to the updated request
 */
export const updateRequest = (
  id: string,
  request: {
    studentId: string;
    description: string;
    status: string;
    locationId: string;
    buildingId: string;
    estimatedCompletion: string;
  },
): Promise<Request> =>
  axios.put(`${url}/api/request/${id}`, request).then((res) => res.data);

/**
 * Create Request
 *
 * @param request the request to create
 * @returns a promise that resolves to the created request
 */
export const createRequest = (request: {
  studentId: string;
  description: string;
  status: string;
  locationId: string;
  buildingId: string;
}): Promise<Request> =>
  axios.post(`${url}/api/request`, request).then((res) => res.data);

/**
 * Get Request by User ID
 *
 * @param id the user's unique id
 * @returns a promise that resolves to an array of requests
 */
export const getRequestsByUserId = (
  userId: string,
  page: number,
  count: number,
): Promise<Request[]> =>
  axios
    .get(`${url}/api/requests/${userId}?count=${count}&page=${page}`)
    .then((res) => res.data);

/************** Location API Calls **************/
/**
 * Get Locations
 *
 * @param count the number of locations to get
 * @param page the page number
 * @returns a promise that resolves to an array of locations
 */
export const getLocations = (count: number, page: number) =>
  axios
    .get(`${url}/api/locations?count=${count}&page=${page}`)
    .then((res) => res.data);

/************** User API Calls **************/
/**
 * Get User
 *
 * @param id the user's unique id
 * @returns a promise that resolves to the user
 */
export const getUser = (id: string) =>
  axios.get(`${url}/api/user/${id}`).then((res) => res.data);

/**
 * Create User
 *
 * @param user the user to create
 * @returns a promise that resolves to the created user
 */
export const createUser = (user: User & { userId: string }) =>
  axios
    .post(`${url}/api/user`, {
      email: user.email,
      role: user.role,
      userId: user.userId,
    })
    .then((res) => res.data);
