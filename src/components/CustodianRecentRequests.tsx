import {
  Accordion,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getRequests } from "../api/api";
import { Request, RequestStatusColors } from "../interfaces/request.interface";
import AddRequestModal from "./AddRequestModal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Location } from "../interfaces/location.interface";
import { Building } from "../interfaces/building.interface";
import { useAuth } from "@clerk/clerk-react";

interface StudentRecentRequestsProps {
  userId: string;
}

const CustodianRecentRequests = ({ userId }: StudentRecentRequestsProps) => {
  /************** State and Context **************/
  const [addRequestOpen, setAddRequestOpen] = useState(false);
  const { getToken } = useAuth();

  /************** Hooks **************/
  const { data: userRequests, isLoading } = useQuery<Request[]>({
    queryKey: ["requests"],
    queryFn: async () => getRequests(1000, 1, await getToken()),
  });

  /************** Render **************/
  const recentRequests = userRequests?.slice(0, 4);

  if (isLoading || !userRequests) return <div>Loading...</div>;

  return (
    <>
      <Card shadow="sm" padding="xl" w={"100%"}>
        <Group justify="space-between" mb={10}>
          <Title order={3}>Recent Requests</Title>
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
        {recentRequests && (
          <Accordion>
            {recentRequests.map((request) => (
              <Accordion.Item key={request._id} value={request.description}>
                <Accordion.Control>
                  <Group
                    justify="space-between"
                    mt="md"
                    mb="xs"
                    ml="xs"
                    mr="xs"
                  >
                    <Group gap={5}>
                      <Title order={4} fw={400}>
                        Request for
                      </Title>
                      <Title
                        order={4}
                      >{` ${(request.location as Location).description}`}</Title>
                      <Title
                        order={6}
                        fw={200}
                        style={{
                          paddingTop: "2px",
                        }}
                      >{`(${new Date(request.createdAt).toLocaleString()})`}</Title>
                    </Group>
                    <Badge
                      color={
                        RequestStatusColors[
                          request.status.toUpperCase() as keyof typeof RequestStatusColors
                        ]
                      }
                    >
                      {request.status}
                    </Badge>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Divider />
                  <Stack gap={1}>
                    <Group>
                      <Text fw={600}>{`Building: `}</Text>
                      <Text>{`${(request.building as Building).name}`}</Text>
                    </Group>
                    <Group>
                      <Text fw={600}>{`Location: `}</Text>
                      <Text>{`${(request.location as Location).name} (Floor ${(request.location as Location).floor})`}</Text>
                    </Group>
                    <Group>
                      <Text fw={600}>{`Details:`}</Text>
                      <Text>{`${request.description}`}</Text>
                    </Group>
                    <Group>
                      <Text fw={600}>{`Initiated: `}</Text>
                      <Text>{`${new Date(request.createdAt).toLocaleString()}`}</Text>
                    </Group>
                    {request.updatedAt && (
                      <Group>
                        <Text fw={600}>{`Last Updated: `}</Text>
                        <Text>{`${new Date(request.updatedAt).toLocaleString()}`}</Text>
                      </Group>
                    )}
                    {request.estimatedCompletion && (
                      <Group>
                        <Text fw={600}>{`Estimated Completion: `}</Text>
                        <Text>{`${new Date(request.estimatedCompletion).toLocaleString()}`}</Text>
                      </Group>
                    )}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        )}
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

export default CustodianRecentRequests;
