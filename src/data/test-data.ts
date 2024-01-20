import { faker } from "@faker-js/faker";
import {
  type Admin,
  type Student,
  type Custodian,
  Role,
} from "../interfaces/user.interface";
import { RequestStatus, Request } from "../interfaces/request.interface";
import { Location } from "../interfaces/location.interface";

export const createTestAdmin = () => {
  return {
    email: faker.internet.email(),
  } as Admin;
};

export const createTestStudent = () => {
  return {
    _id: faker.string.uuid(),
    role: Role.STUDENT,
    email: faker.internet.email(),
    building: faker.word.words(2) + " building",
    room: faker.string.numeric(4),
    floor: faker.number.int({ min: 1, max: 6 }),
  } as Student;
};

export const createTestCustodian = () => {
  return {
    _id: faker.string.uuid(),
    email: faker.internet.email(),
    building: faker.word.words(2) + " building",
    floors: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.number.int({ min: 1, max: 6 }),
    ),
    role: Role.CUSTODIAN,
  } as Custodian;
};

export const createTestRequest = (): Request => {
  return {
    _id: faker.string.uuid(),
    studentId: faker.string.uuid(),
    details: faker.word.adjective + " " + faker.word.noun,
    initiatedAt: faker.date.past().toDateString(),
    status: randomRequestStatus() as RequestStatus,
    estimatedCompletion: faker.date.future().toDateString(),
    location: createTestLocation(),
  } as Request;
};

export const createTestLocation = (): Location | string => {
  return {
    building: faker.word.words(2) + " building",
    room: faker.string.numeric(4),
    roomDescription: faker.location.ordinalDirection(),
    floor: faker.number.int({ min: 1, max: 6 }),
    lastCleaned: faker.date.past(),
    requests: [createTestRequest(), createTestRequest(), createTestRequest()],
  } as Location;
};

export const randomRequestStatus = () => {
  const requestStatuses = [
    RequestStatus.ACCEPTED,
    RequestStatus.COMPLETED,
    RequestStatus.REQUESTED,
    RequestStatus.DENIED,
  ];
  return faker.helpers.arrayElement(requestStatuses) as RequestStatus;
};
