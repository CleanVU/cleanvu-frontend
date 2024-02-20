import { faker } from "@faker-js/faker";
import { Role, type User } from "../interfaces/user.interface";
import { RequestStatus, Request } from "../interfaces/request.interface";
import { Location } from "../interfaces/location.interface";
import { Building } from "../interfaces/building.interface";

export const createTestUser = (): User => {
  return {
    _id: faker.string.uuid(),
    email: faker.internet.email(),
    role: randomRole(),
    building: faker.word.words(2) + " hall",
    floor: faker.string.numeric(4),
    requests: [faker.string.uuid(), faker.string.uuid(), faker.string.uuid()],
  } as User;
};

export const createTestRequest = (): Request => {
  return {
    _id: faker.string.uuid(),
    studentId: faker.string.uuid(),
    description: faker.lorem.sentence(),
    status: randomRequestStatus(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    estimatedCompletion: faker.date.future().toISOString(),
    location: createTestLocation(),
    building: createTestBuilding(),
  } as Request;
};

export const createTestBuilding = (): Building => {
  return {
    _id: faker.string.uuid(),
    name: faker.word.words(2) + " hall",
    floors: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      faker.string.numeric(4),
    ),
    locations: Array.from(
      { length: faker.number.int({ min: 1, max: 5 }) },
      () => createTestLocation(),
    ),
  } as Building;
};

export const createTestLocation = (): Location | string => {
  return {
    _id: faker.string.uuid(),
    name: faker.word.words(2),
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

export const randomRole = () => {
  const roles = [Role.ADMIN, Role.STUDENT, Role.CUSTODIAN];
  return faker.helpers.arrayElement(roles) as Role;
};
