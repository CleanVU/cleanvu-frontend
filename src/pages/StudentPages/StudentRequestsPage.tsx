import { Text, Button, Group, Stack, ActionIcon } from "@mantine/core";
import {
  Request,
  RequestStatus,
  RequestStatusColors,
} from "../../interfaces/request.interface";
import { useEffect, useState } from "react";
import StudentRequestCard from "../../components/StudentRequestCard";
import { useNavigationContext } from "../../context/navigation.context";
import { StudentTabs } from "../../interfaces/user.interface";
import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../../api/api";
import { useRequestContext } from "../../context/request.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddRequestModal from "../../components/AddRequestModal";

const StudentRequestsPage = () => {
  /************** State and Context **************/
  const { currentRequests, setCurrentRequests } = useRequestContext();
  const { setCurrentTab } = useNavigationContext();
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [addRequestOpen, setAddRequestOpen] = useState(false);

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
    setCurrentTab(StudentTabs.REQUESTS);
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
      <Group justify="space-between">
        <Text size="lg" fw={500} mt="md" mb="sm">
          Requests
        </Text>
        <ActionIcon
          variant="filled"
          color="blue"
          size="lg"
          onClick={() => setAddRequestOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </ActionIcon>
      </Group>
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
          <StudentRequestCard key={request._id} request={request} />
        ))}
      </Stack>
      {addRequestOpen && (
        <AddRequestModal opened={addRequestOpen} close={() => setAddRequestOpen(false)} studentId="65bd4b12088bf10ee6612e4b" />
      )}
    </div>
  );
};

export default StudentRequestsPage;
