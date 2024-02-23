import {
  Card,
  Text,
  Badge,
  Group,
  Accordion,
  Stack,
  ActionIcon,
  Title,
  Divider,
} from "@mantine/core";
import { Location } from "../interfaces/location.interface";
import { Building } from "../interfaces/building.interface";
import { Request, RequestStatusColors } from "../interfaces/request.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditRequestModal from "./EditRequestModal";
import DeleteRequestModal from "./DeleteRequestModal";
import { useDisclosure } from "@mantine/hooks";

/**
 * A card that displays a request
 * @param request The request to display
 * @returns A card that displays a request
 */
const StudentRequestCard = ({ request }: { request: Request }) => {
  const [
    editRequestModalOpened,
    { open: openEditRequestModal, close: closeEditRequestModal },
  ] = useDisclosure(false);
  const [
    deleteRequestModalOpened,
    { open: openDeleteRequestModal, close: closeDeleteRequestModal },
  ] = useDisclosure(false);

  return (
    <div>
      <Card padding="xl" radius="md" withBorder>
        <Card.Section>
          <Group justify="space-between" mt="md" mb="xs" ml="xs" mr="xs">
            <Group gap={5}>
              <Title
                order={4}
              >{`Request for ${(request.location as Location).description}`}</Title>
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
        </Card.Section>
        <Card.Section>
          <Accordion>
            <Accordion.Item key={request._id} value={request.description}>
              <Divider />
              <Accordion.Control>
                <Text fw={300}>{"More Info"}</Text>
              </Accordion.Control>
              <Accordion.Panel>
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
          </Accordion>
        </Card.Section>
        <Card.Section>
          <Group justify="flex-end" mt="xs" mb="xs" mr="sm" gap={0}>
            <ActionIcon
              variant="transparent"
              color="grey"
              size="lg"
              onClick={openEditRequestModal}
            >
              <FontAwesomeIcon icon={faEdit} />
            </ActionIcon>
            <ActionIcon
              variant="transparent"
              color="red"
              size="lg"
              onClick={openDeleteRequestModal}
            >
              <FontAwesomeIcon icon={faTrash} />
            </ActionIcon>
          </Group>
        </Card.Section>
      </Card>
      {editRequestModalOpened && (
        <EditRequestModal
          opened={editRequestModalOpened}
          close={closeEditRequestModal}
          request={request}
        />
      )}
      {deleteRequestModalOpened && (
        <DeleteRequestModal
          opened={deleteRequestModalOpened}
          close={closeDeleteRequestModal}
          requestId={request._id}
        />
      )}
    </div>
  );
};

export default StudentRequestCard;
