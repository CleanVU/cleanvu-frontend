import { Card, Group, RingProgress, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getRequestByUserId } from "../api/api";
import { useRequestContext } from "../context/request.context";
import {
  Request,
  RequestStatus,
  RequestStatusColors,
} from "../interfaces/request.interface";

interface StudentDashboardCardProps {
  userId: string;
}

const StudentDashboardCard = ({ userId }: StudentDashboardCardProps) => {
  /************** State and Context **************/
  const { currentRequests, setCurrentRequests } = useRequestContext();

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
  const completedRequests = currentRequests?.filter(
    (request) => request.status === RequestStatus.COMPLETED,
  );

  const requestedRequests = currentRequests?.filter(
    (request) => request.status === RequestStatus.REQUESTED,
  );

  const acceptedRequests = currentRequests?.filter(
    (request) => request.status === RequestStatus.ACCEPTED,
  );

  console.log("completedRequests", completedRequests);

  console.log("requestedRequests", requestedRequests);

  console.log("acceptedRequests", acceptedRequests);

  const sections = [
    {
      value:
        completedRequests && currentRequests
          ? (completedRequests.length / currentRequests.length) * 100
          : 0,
      color: RequestStatusColors.COMPLETED,
      tooltip: `Completed: ${completedRequests?.length}`,
    },
    {
      value:
        requestedRequests && currentRequests
          ? (requestedRequests.length / currentRequests.length) * 100
          : 0,
      color: RequestStatusColors.REQUESTED,
      tooltip: `Requested: ${requestedRequests?.length}`,
    },
    {
      value:
        acceptedRequests && currentRequests
          ? (acceptedRequests.length / currentRequests.length) * 100
          : 0,
      color: RequestStatusColors.ACCEPTED,
      tooltip: `Accepted: ${acceptedRequests?.length}`,
    },
  ];

  if (isLoading || !userRequests) return <div>Loading...</div>;

  return (
    <Group>
      <Card shadow="sm" padding="xl">
        <Title order={3}>{`Requests`}</Title>
        <RingProgress
          sections={sections}
          size={200}
          thickness={20}
          styles={{
            root: {
              width: "100%",
              height: "100%",
            },
          }}
        />
      </Card>
    </Group>
  );
};

export default StudentDashboardCard;
