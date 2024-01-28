import { Text, Button, Group, Stack } from "@mantine/core";
import { createTestRequest } from "../../data/test-data";
import {
  RequestStatus,
  RequestStatusColors,
} from "../../interfaces/request.interface";
import { useEffect, useState } from "react";
import { useNavigationContext } from "../../context/navigation.context";
import { StudentTabs } from "../../interfaces/user.interface";
import CustodianRequestCard from "../../components/CustodianRequestCard";

const requests = [
  createTestRequest(),
  createTestRequest(),
  createTestRequest(),
  createTestRequest(),
  createTestRequest(),
];

const CustodianRequestsPage = () => {
  const { setCurrentTab } = useNavigationContext();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    setCurrentTab(StudentTabs.REQUESTS);
  }, []);

  const filteredRequests = filterStatus
    ? requests.filter((request) => request.status === filterStatus)
    : requests;

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.initiatedAt > b.initiatedAt ? 1 : -1;
    } else {
      return a.initiatedAt < b.initiatedAt ? 1 : -1;
    }
  });

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
