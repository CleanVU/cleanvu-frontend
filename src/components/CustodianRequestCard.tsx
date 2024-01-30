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
import {
  Request,
  RequestStatus,
  RequestStatusColors,
} from "../interfaces/request.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import AcceptRequestModal from "./AcceptRequestModal";
import { useDisclosure } from "@mantine/hooks";

/**
 * A card that displays a request
 * @param request The request to display
 * @returns A card that displays a request
 */
const CustodianRequestCard = ({ request }: { request: Request }) => {
  const [
    acceptRequestModalOpened,
    { open: openAcceptRequestModal, close: closeAcceptRequestModal },
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
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Card.Section>
        <Card.Section>
          <Group justify="flex-end" mt="xs" mb="xs" mr="sm">
            {request.status === RequestStatus.REQUESTED && (
              <Group justify="flex-end" mt="xs" mb="xs" mr="sm">
                <ActionIcon
                  variant="filled"
                  color={RequestStatusColors.ACCEPTED}
                  size="lg"
                  onClick={openAcceptRequestModal}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </ActionIcon>
                <ActionIcon
                  variant="filled"
                  color={RequestStatusColors.DENIED}
                  size="lg"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </ActionIcon>
              </Group>
            )}
            {request.status === RequestStatus.ACCEPTED && (
              <ActionIcon
                variant="filled"
                color={RequestStatusColors.COMPLETED}
                size="lg"
              >
                <FontAwesomeIcon icon={faCheck} />
              </ActionIcon>
            )}
          </Group>
        </Card.Section>
      </Card>
      {acceptRequestModalOpened && (
        <AcceptRequestModal
          opened={acceptRequestModalOpened}
          close={closeAcceptRequestModal}
          requestId={request._id}
        />
      )}
    </div>
  );
};

export default CustodianRequestCard;
