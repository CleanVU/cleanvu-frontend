import { Text, Button, Group, Stack } from "@mantine/core";
import {
  RequestStatus,
  RequestStatusColors,
} from "../../interfaces/request.interface";
import { useEffect, useState } from "react";
import { useNavigationContext } from "../../context/navigation.context";
import { CustodianTabs } from "../../interfaces/user.interface";
import CustodianRequestCard from "../../components/CustodianRequestCard";
import { getRequests } from "../../api/api";
import { useRequestContext } from "../../context/request.context";
import { useQuery } from "@tanstack/react-query";
import { Request } from "../../interfaces/request.interface";

const CustodianRequestsPage = () => {
  /************** State and Context **************/
  const { currentRequests, setCurrentRequests } = useRequestContext();
  const { setCurrentTab } = useNavigationContext();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  /************** Hooks **************/
  const {
    data: requests,
    isLoading,
    status,
  } = useQuery<Request[]>({
    queryKey: ["requests"],
    queryFn: () => getRequests(10, 1),
  });

  useEffect(() => {
    setCurrentTab(CustodianTabs.REQUESTS);
  }, []);

  useEffect(() => {
    if (status === "success" && requests) {
      setCurrentRequests(requests);
    }
  }, [status]);

  /************** Render **************/
  if (isLoading || !requests) return <div>Loading...</div>;

  const filteredRequests = filterStatus
    ? currentRequests?.filter(
        (request: Request) => request.status === filterStatus,
      )
    : currentRequests;

  const sortedRequests = filteredRequests
    ? [...filteredRequests].sort((a, b) => {
        return sortOrder === "asc"
          ? a.createdAt > b.createdAt
            ? 1
            : -1
          : a.createdAt < b.createdAt
            ? 1
            : -1;
      })
    : [];

  return (
    <div>
      <Text size="lg" fw={500} mt="md" mb="sm">
        Requests
      </Text>
      <Stack>
        <Group mt="md" mb="md" justify="space-between">
          <Group>
            <Text>Filter by Status:</Text>
            <Button
              variant="filled"
              color="purple"
              size="xs"
              onClick={() => setFilterStatus(null)}
            >
              ALL
            </Button>
            <Button
              variant="filled"
              color={RequestStatusColors.REQUESTED}
              size="xs"
              onClick={() => setFilterStatus(RequestStatus.REQUESTED)}
            >
              {RequestStatus.REQUESTED.toLocaleUpperCase()}
            </Button>
            <Button
              variant="filled"
              color={RequestStatusColors.ACCEPTED}
              size="xs"
              onClick={() => setFilterStatus(RequestStatus.ACCEPTED)}
            >
              {RequestStatus.ACCEPTED.toLocaleUpperCase()}
            </Button>
            <Button
              variant="filled"
              color={RequestStatusColors.COMPLETED}
              size="xs"
              onClick={() => setFilterStatus(RequestStatus.COMPLETED)}
            >
              {RequestStatus.COMPLETED.toLocaleUpperCase()}
            </Button>
            <Button
              variant="filled"
              color={RequestStatusColors.DENIED}
              size="xs"
              onClick={() => setFilterStatus(RequestStatus.DENIED)}
            >
              {RequestStatus.DENIED.toLocaleUpperCase()}
            </Button>
          </Group>
          <Group>
            <Text>Sort by Date:</Text>
            <Button
              variant="filled"
              color="teal"
              size="xs"
              onClick={() => setSortOrder("asc")}
            >
              ASCENDING
            </Button>
            <Button
              variant="filled"
              color="teal"
              size="xs"
              onClick={() => setSortOrder("desc")}
            >
              DESCENDING
            </Button>
          </Group>
        </Group>
        {sortedRequests.map((request) => (
          <CustodianRequestCard key={request._id} request={request} />
        ))}
      </Stack>
    </div>
  );
};

export default CustodianRequestsPage;
