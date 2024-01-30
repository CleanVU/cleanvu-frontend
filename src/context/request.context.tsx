import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Request, RequestStatus } from "../interfaces/request.interface";

// Request context types
interface RequestContextType {
  currentRequests: Request[] | null;
  setCurrentRequests: (requests: Request[]) => void;
  updateRequestStatus: (
    requestId: string,
    requestStatus: RequestStatus,
  ) => void;
  addRequest: (request: Request) => void;
  deleteRequest: (requestId: string) => void;
  updateRequest: (requestId: string, request: Request) => void;
}

// Create the context for the Request
const RequestContext = createContext<RequestContextType>({
  currentRequests: null,
  setCurrentRequests: (_: Request[]) => {},
  updateRequestStatus: (_: string, __: RequestStatus) => {},
  addRequest: (_: Request) => {},
  deleteRequest: (_: string) => {},
  updateRequest: (_: string, __: Request) => {},
});

// Create the provider for the Request context
export const RequestProvider = ({ children }: PropsWithChildren) => {
  const [currentRequests, setCurrentRequests] = useState<Request[]>(
    [] as Request[],
  );

  const updateRequestStatus = (
    requestId: string,
    requestStatus: RequestStatus,
  ) => {
    setCurrentRequests((requests) => {
      const requestIndex = requests.findIndex(
        (request) => request._id === requestId,
      );
      const updatedRequests = [...requests];
      updatedRequests[requestIndex].status = requestStatus;
      return updatedRequests;
    });
  };

  const addRequest = (request: Request) => {
    setCurrentRequests((requests) => [...requests, request]);
  };

  const deleteRequest = (requestId: string) => {
    setCurrentRequests((requests) =>
      requests.filter((request) => request._id !== requestId),
    );
  };

  const updateRequest = (requestId: string, request: Request) => {
    setCurrentRequests((requests) => {
      const requestIndex = requests.findIndex(
        (request) => request._id === requestId,
      );
      const updatedRequests = [...requests];
      updatedRequests[requestIndex] = request;
      return updatedRequests;
    });
  };

  const value = {
    currentRequests,
    setCurrentRequests,
    updateRequestStatus,
    addRequest,
    deleteRequest,
    updateRequest,
  };

  return (
    <RequestContext.Provider value={value}>{children}</RequestContext.Provider>
  );
};

/**
 * A hook to use the request context
 * @returns {RequestContextType} The request context
 * @throws An error if the hook is not used within a RequestProvider
 * @example
 * const { currentRequests, setCurrentRequests } = useRequestContext();
 */
export const useRequestContext = () => {
  const context = useContext(RequestContext);

  if (context === undefined) {
    throw new Error("useRequestProvider must be used within a RequestProvider");
  }

  return context;
};
