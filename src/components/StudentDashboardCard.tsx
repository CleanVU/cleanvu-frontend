import {
  Card,
  Group,
  RingProgress,
  SimpleGrid,
  Text,
  Title,
} from "@mantine/core";
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

  const deniedRequests = currentRequests?.filter(
    (request) => request.status === RequestStatus.DENIED,
  );

  const nonDeniedRequests = currentRequests?.filter(
    (request) => request.status !== RequestStatus.DENIED,
  );

  const sections = [
    {
      value:
        completedRequests && nonDeniedRequests
          ? (completedRequests.length / nonDeniedRequests.length) * 100
          : 0,
      color: RequestStatusColors.COMPLETED,
      tooltip: `Completed: ${completedRequests?.length}`,
      name: "Completed",
    },
    {
      value:
        requestedRequests && nonDeniedRequests
          ? (requestedRequests.length / nonDeniedRequests.length) * 100
          : 0,
      color: RequestStatusColors.REQUESTED,
      tooltip: `Requested: ${requestedRequests?.length}`,
      name: "Requested",
    },
    {
      value:
        acceptedRequests && nonDeniedRequests
          ? (acceptedRequests.length / nonDeniedRequests.length) * 100
          : 0,
      color: RequestStatusColors.ACCEPTED,
      tooltip: `Accepted: ${acceptedRequests?.length}`,
      name: "Accepted",
    },
    {
      value:
        deniedRequests && nonDeniedRequests
          ? deniedRequests.length > 0
            ? 100
            : 0
          : 0,
      color: RequestStatusColors.DENIED,
      tooltip: `Denied: ${deniedRequests?.length}`,
      name: "Denied",
    },
  ];

  if (isLoading || !userRequests) return <div>Loading...</div>;

  return (
    <Group>
      <Card shadow="sm" padding="xl">
        <Title order={3}>{`Requests`}</Title>
        <SimpleGrid cols={2} spacing="md">
          {currentRequests &&
            sections.map((section, index) => (
              <RingProgress
                key={index}
                sections={[section]}
                size={160}
                thickness={20}
                roundCaps
                styles={{
                  root: {
                    width: "100%",
                    height: "100%",
                  },
                }}
                label={<Text size="sm" ta="center">{`${section.name}`}</Text>}
              />
            ))}
        </SimpleGrid>
      </Card>
    </Group>
  );
};

export default StudentDashboardCard;
