export interface Request {
  _id: string;
  studentId: string;
  details: string;
  initiatedAt: string;
  status: RequestStatus;
  estimatedCompletion?: string;
  location: Location | string;
}

export enum RequestStatus {
  REQUESTED = "requested",
  ACCEPTED = "accepted",
  COMPLETED = "completed",
  DENIED = "denied",
}
