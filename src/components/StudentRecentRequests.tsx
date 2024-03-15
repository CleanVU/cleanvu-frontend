import { Button, Card, Group, Text } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getRequestByUserId } from "../api/api";
import { useRequestContext } from "../context/request.context";
import { Request } from "../interfaces/request.interface";
import StudentRequestCard from "./StudentRequestCard";
import AddRequestModal from "./AddRequestModal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      <Card shadow="sm" padding="xl">
        <Text>{`Recent Requests`}</Text>
        <Button
          variant="filled"
          color="blue"
          onClick={() => setAddRequestOpen(true)}
        >
          <Group gap={10}>
            <Text fw={600}>Add Request</Text>
            <FontAwesomeIcon icon={faPlus} />
          </Group>
        </Button>
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
