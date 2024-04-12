import {
  RequestStatus,
  RequestStatusColors } from "../../interfaces/request.interface";
import { useNavigationContext } from "../../context/navigation.context";
import { CustodianTabs } from "../../interfaces/user.interface";
import CustodianRequestCard from "../../components/CustodianRequestCard";
import { getRequests } from "../../api/api";
import { useRequestContext } from "../../context/request.context";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Text,
  Button,
  Group,
  Stack,
  SegmentedControl,
  Title,
  Divider,
} from "@mantine/core";
import { useAuth } from "@clerk/clerk-react";
import type {
 Request } from "../../interfaces/request.interface";

const CustodianRequestsPage = () => {
  /************** State and Context **************/
  const { currentRequests, setCurrentRequests } = useRequestContext();
  const { getToken } = useAuth();
  const { setCurrentTab } = useNavigationContext();
  const [filterStatus, setFilterStatus] = useState<string | undefined>(
    RequestStatus.ALL,
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  /************** Hooks **************/
  const {
    data: requests,
    isLoading,
    status,
  } = useQuery<Request[]>({
    queryKey: ["requests"],
    queryFn: async () => getRequests(10, 1, await getToken()),
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

  const filteredRequests =
    filterStatus !== RequestStatus.ALL
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
      <Group justify="flex-start" pb={10}>
        <Group gap={10}>
          <Title order={1}>{`Requests`}</Title>
          <Text
            style={{
              fontSize: "1.5rem",
              color: "gray",
              paddingTop: "2px",
            }}
          >{`(${requests.length})`}</Text>
        </Group>
      </Group>{" "}
      <Divider />
      <Stack>
        <Group mt="md" mb="md" justify="space-between">
          <Group>
            <SegmentedControl
              data={[
                { value: "all", label: "All" },
                { value: "requested", label: "Requested" },
                { value: "accepted", label: "Accepted" },
                { value: "completed", label: "Completed" },
                { value: "denied", label: "Denied" },
              ]}
              value={filterStatus}
              onChange={(value) => setFilterStatus(value)}
              style={{
                backgroundColor: "white",
              }}
              color={
                RequestStatusColors[
                  filterStatus?.toUpperCase() as keyof typeof RequestStatusColors
                ]
              }
            />
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
