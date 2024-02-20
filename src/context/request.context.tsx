import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Request } from "../interfaces/request.interface";

// Request context types
interface RequestContextType {
  currentRequests: Request[] | null;
  setCurrentRequests: (requests: Request[]) => void;
  addRequestContext: (request: Request) => void;
  deleteRequestContext: (requestId: string) => void;
  updateRequestContext: (requestId: string, request: Request) => void;
}

// Create the context for the Request
const RequestContext = createContext<RequestContextType>({
  currentRequests: null,
  setCurrentRequests: (_: Request[]) => {},
  addRequestContext: (_: Request) => {},
  deleteRequestContext: (_: string) => {},
  updateRequestContext: (_: string, __: Request) => {},
});

// Create the provider for the Request context
export const RequestProvider = ({ children }: PropsWithChildren) => {
  const [currentRequests, setCurrentRequests] = useState<Request[]>(
    [] as Request[],
  );

  const addRequestContext = (request: Request) => {
    setCurrentRequests((requests) => [...requests, request]);
  };

  const deleteRequestContext = (requestId: string) => {
    setCurrentRequests((requests) =>
      requests.filter((request) => request._id !== requestId),
    );
  };

  const updateRequestContext = (requestId: string, updatedRequest: Request) => {
    console.log("updateRequestContext", requestId, updatedRequest);
    const newRequests = currentRequests?.map((req: Request) => {
      if (req._id === requestId) {
        return updatedRequest;
      } else {
        return req;
      }
    });
    setCurrentRequests(newRequests as Request[]);
    console.log("newRequests", currentRequests);
  };

  const value = {
    currentRequests,
    setCurrentRequests,
    addRequestContext,
    deleteRequestContext,
    updateRequestContext,
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
