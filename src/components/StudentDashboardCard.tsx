import { Card, RingProgress, SimpleGrid, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getRequestsByUserId } from "../api/api";
import { useRequestContext } from "../context/request.context";
import {
  Request,
  RequestStatus,
  RequestStatusColors,
} from "../interfaces/request.interface";
import { useAuth } from "@clerk/clerk-react";
import styles from "./StudentDashboardCard.module.css";

interface StudentDashboardCardProps {
  userId: string;
}

const StudentDashboardCard = ({ userId }: StudentDashboardCardProps) => {
  /************** State and Context **************/
  const { currentRequests, setCurrentRequests } = useRequestContext();
  const { getToken } = useAuth();

  /************** Hooks **************/
  const {
    data: userRequests,
    isLoading,
    status,
  } = useQuery<Request[]>({
    queryKey: ["requests"],
    queryFn: async () => getRequestsByUserId(userId, 1, 1000, await getToken()),
    enabled: !!userId,
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
          : 100,
      color: RequestStatusColors.COMPLETED,
      tooltip: `Completed: ${completedRequests?.length}`,
      name: "Completed",
    },
    {
      value:
        requestedRequests && nonDeniedRequests
          ? (requestedRequests.length / nonDeniedRequests.length) * 100
          : 100,
      color: RequestStatusColors.REQUESTED,
      tooltip: `Requested: ${requestedRequests?.length}`,
      name: "Requested",
    },
    {
      value:
        acceptedRequests && nonDeniedRequests
          ? (acceptedRequests.length / nonDeniedRequests.length) * 100
          : 100,
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
          : 100,
      color: RequestStatusColors.DENIED,
      tooltip: `Denied: ${deniedRequests?.length}`,
      name: "Denied",
    },
  ];

  if (isLoading || !userRequests) return <div>Loading...</div>;

  return (
    <Card shadow="sm" w={"100%"}>
      <Title order={4}>{`Request Status`}</Title>
      <SimpleGrid cols={4} spacing="md">
        {currentRequests &&
          sections.map((section, index) => (
            <div className={styles.ringAndText}>
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                }}
                label={
                  <Text
                    size="sm"
                    ta="center"
                    style={{
                      color: section.color,
                      fontWeight: "bold",
                    }}
                  >{`${Math.round(section.value)}%`}</Text>
                }
              />
              <Text
                size="sm"
                ta="center"
                style={{
                  color: "#444444",
                  fontWeight: "bold",
                }}
              >{`${section.name}`}</Text>
            </div>
          ))}
      </SimpleGrid>
    </Card>
  );
};

export default StudentDashboardCard;
