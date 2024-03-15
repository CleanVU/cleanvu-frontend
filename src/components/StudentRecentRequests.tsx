import { Card, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRequestByUserId } from "../api/api";
import { useRequestContext } from "../context/request.context";
import { Request } from "../interfaces/request.interface";
import StudentRequestCard from "./StudentRequestCard";
import AddRequestModal from "./AddRequestModal";

interface StudentRecentRequestsProps {
  userId: string;
}

const StudentRecentRequests = ({ userId }: StudentRecentRequestsProps) => {
  /************** State and Context **************/
  const { currentRequests, setCurrentRequests } = useRequestContext();
  const [addRequestOpen, setAddRequestOpen] = useState(false);

  /************** Hooks **************/
  const {
    data: userRequests,
    isLoading,
    status,
  } = useQuery<Request[]>({
    queryKey: ["requests"],
    queryFn: () => getRequestByUserId(userId),
  });

  useEffect(() => {
    if (status === "success" && userRequests) {
      setCurrentRequests(userRequests);
    }
  }, [status]);

  /************** Render **************/
  const recentRequests = currentRequests?.slice(0, 5);

  if (isLoading || !userRequests) return <div>Loading...</div>;

  return (
    <>
      <Card shadow="sm" padding="md" radius="md">
        <Text>{`Recent Requests`}</Text>
        {recentRequests &&
          recentRequests.map((request) => (
            <StudentRequestCard key={request._id} request={request} />
          ))}
      </Card>
      {addRequestOpen && (
        <AddRequestModal
          opened={addRequestOpen}
          close={() => setAddRequestOpen(false)}
          studentId={userId}
        />
      )}
    </>
  );
};

export default StudentRecentRequests;
