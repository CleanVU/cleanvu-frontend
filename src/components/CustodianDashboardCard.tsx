import { Card, RingProgress, SimpleGrid, Text, Title } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../api/api";
import {
  Request,
  RequestStatus,
  RequestStatusColors,
} from "../interfaces/request.interface";
import { useAuth } from "@clerk/clerk-react";
import styles from "./CustodianDashboardCard.module.css";

interface StudentDashboardCardProps {
  userId: string;
}

const CustodianDashboardCard = ({ userId }: StudentDashboardCardProps) => {
  /************** State and Context **************/
  const { getToken } = useAuth();

  /************** Hooks **************/
  const { data: userRequests, isLoading } = useQuery<Request[]>({
    queryKey: ["requests"],
    queryFn: async () => getRequests(1000, 1, await getToken()),
    enabled: !!userId,
  });

  /************** Render **************/
  const completedRequests = userRequests?.filter(
    (request) => request.status === RequestStatus.COMPLETED,
  );

  const requestedRequests = userRequests?.filter(
    (request) => request.status === RequestStatus.REQUESTED,
  );

  const acceptedRequests = userRequests?.filter(
    (request) => request.status === RequestStatus.ACCEPTED,
  );

  const deniedRequests = userRequests?.filter(
    (request) => request.status === RequestStatus.DENIED,
  );

  const nonDeniedRequests = userRequests?.filter(
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

  console.log(userRequests);

  if (isLoading || !userRequests) return <div>Loading...</div>;

  return (
    <Card shadow="sm" w={"100%"}>
      <Title order={4}>{`Request Status`}</Title>
      <SimpleGrid cols={4} spacing="md">
        {userRequests &&
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
                    height: "fit-content",
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

export default CustodianDashboardCard;
