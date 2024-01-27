import {
  Card,
  Text,
  Badge,
  Group,
  Accordion,
  Stack,
  ActionIcon,
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
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Card.Section>
          <Group justify="space-between" mt="md" mb="xs" ml="xs" mr="xs">
            <Text
              fw={500}
            >{`${(request.building as Building).name}: Room ${(request.location as Location).room}`}</Text>
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
              <Accordion.Control>
                <Text>{"See Request Info"}</Text>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack>
                  <Text>{`Details: ${request.description}`}</Text>
                  <Text>{`Initiated: ${request.initiatedAt}`}</Text>
                  <Text>{`Estimated Completion: ${request.estimatedCompletion}`}</Text>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Card.Section>
        <Card.Section>
          <Group justify="flex-end" mt="xs" mb="xs" mr="sm">
            <ActionIcon
              variant="filled"
              color="blue"
              size="lg"
              onClick={openEditRequestModal}
            >
              <FontAwesomeIcon icon={faEdit} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
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
        />
      )}
      {deleteRequestModalOpened && (
        <DeleteRequestModal
          opened={deleteRequestModalOpened}
          close={closeDeleteRequestModal}
        />
      )}
    </div>
  );
};

export default StudentRequestCard;
