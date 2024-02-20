import { Text, Button, Group, Stack, Title, Divider } from "@mantine/core";
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
      <Group justify="space-between" pb={10}>
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
      </Group>
      <Divider />
      <Stack>
        <Group mt="md" mb="md" justify="space-between">
          <Group>
            <Text>Filter by Status:</Text>
            <Button
              variant="filled"
              color={filterStatus === null ? "black" : "grey"}
              size="xs"
              onClick={() => setFilterStatus(null)}
            >
              ALL
            </Button>
            <Button
              variant="filled"
              color={
                filterStatus === RequestStatus.REQUESTED
                  ? RequestStatusColors.REQUESTED
                  : "grey"
              }
              size="xs"
              onClick={() => setFilterStatus(RequestStatus.REQUESTED)}
            >
              {RequestStatus.REQUESTED.toLocaleUpperCase()}
            </Button>
            <Button
              variant="filled"
              color={
                filterStatus === RequestStatus.ACCEPTED
                  ? RequestStatusColors.ACCEPTED
                  : "grey"
              }
              size="xs"
              onClick={() => setFilterStatus(RequestStatus.ACCEPTED)}
            >
              {RequestStatus.ACCEPTED.toLocaleUpperCase()}
            </Button>
            <Button
              variant="filled"
              color={
                filterStatus === RequestStatus.COMPLETED
                  ? RequestStatusColors.COMPLETED
                  : "grey"
              }
              size="xs"
              onClick={() => setFilterStatus(RequestStatus.COMPLETED)}
            >
              {RequestStatus.COMPLETED.toLocaleUpperCase()}
            </Button>
            <Button
              variant="filled"
              color={
                filterStatus === RequestStatus.DENIED
                  ? RequestStatusColors.DENIED
                  : "grey"
              }
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
        <AddRequestModal
          opened={addRequestOpen}
          close={() => setAddRequestOpen(false)}
          studentId="65bd4b12088bf10ee6612e4b"
        />
      )}
    </div>
  );
};

export default StudentRequestsPage;
