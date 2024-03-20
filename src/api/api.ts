import axios from "axios";
import { Building } from "../interfaces/building.interface";
import { Request } from "../interfaces/request.interface";
import { User } from "../interfaces/user.interface";

/************** Building API Calls **************/
/**
 * Get Building
 *
 * @param count the number of buildings to get
 * @param page the page number
 * @returns a promise that resolves to an array of buildings
 */
export const getBuildings = (
  count: number,
  page: number,
  token?: string | null,
): Promise<Building[]> =>
  axios
    .get(
      `${import.meta.env.VITE_HOST}/api/buildings?count=${count}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      },
    )
    .then((res) => res.data);

/************** Request API Calls **************/

/**
 * Get Requests
 *
 * @param count the number of requests to get
 * @param page the page number
 * @returns a promise that resolves to an array of requests
 */
export const getRequests = (
  count: number,
  page: number,
  token?: string | null,
): Promise<Request[]> =>
  axios
    .get(
      `${import.meta.env.VITE_HOST}/api/requests?count=${count}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      },
    )
    .then((res) => res.data);

/**
 * Delete Request
 *
 * @param id the request's unique id
 * @returns a promise that resolves to the deleted request
 */
export const deleteRequest = (
  id: string,
  token?: string | null,
): Promise<Request> =>
  axios
    .delete(`${import.meta.env.VITE_HOST}/api/request/${id}`, {
      headers: {
        Authorization: `Bearer ${token || ""}`,
      },
    })
    .then((res) => res.data);

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
  token?: string | null,
): Promise<Request> =>
  axios
    .put(`${import.meta.env.VITE_HOST}/api/request/${id}`, request, {
      headers: {
        Authorization: `Bearer ${token || ""}`,
      },
    })
    .then((res) => res.data);

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
  token?: string | null;
}): Promise<Request> =>
  axios
    .post(`${import.meta.env.VITE_HOST}/api/request`, request, {
      headers: {
        Authorization: `Bearer ${request.token || ""}`,
      },
    })
    .then((res) => res.data);

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
  token?: string | null,
): Promise<Request[]> =>
  axios
    .get(
      `${import.meta.env.VITE_HOST}/api/requests/${userId}?count=${count}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      },
    )
    .then((res) => res.data);

/************** Location API Calls **************/
/**
 * Get Locations
 *
 * @param count the number of locations to get
 * @param page the page number
 * @returns a promise that resolves to an array of locations
 */
export const getLocations = (
  count: number,
  page: number,
  token?: string | null,
) =>
  axios
    .get(
      `${import.meta.env.VITE_HOST}/api/locations?count=${count}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      },
    )
    .then((res) => res.data);

/************** User API Calls **************/
/**
 * Get User
 *
 * @param id the user's unique id
 * @returns a promise that resolves to the user
 */
export const getUser = (id: string, token?: string | null) =>
  axios
    .get(`${import.meta.env.VITE_HOST}/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token || ""}`,
      },
    })
    .then((res) => res.data);

export const getUserByEmail = (email: string, token?: string | null) =>
  axios
    .get(`${import.meta.env.VITE_HOST}/api/user?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token || ""}`,
      },
    })
    .then((res) => res.data);

/**
 * Create User
 *
 * @param user the user to create
 * @returns a promise that resolves to the created user
 */
export const createUser = (
  user: User & { userId: string },
  token?: string | null,
) =>
  axios
    .post(
      `${import.meta.env.VITE_HOST}/api/user`,
      {
        email: user.email,
        role: user.role,
        userId: user.userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
      },
    )
    .then((res) => res.data);
