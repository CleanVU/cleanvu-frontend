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
  Button,
} from "@mantine/core";
import { Location } from "../interfaces/location.interface";
import {
  Request,
  RequestStatus,
  RequestStatusColors,
} from "../interfaces/request.interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import AcceptRequestModal from "./AcceptRequestModal";
import { useDisclosure } from "@mantine/hooks";
import { Building } from "../interfaces/building.interface";
import DenyRequestModal from "./DenyRequestModal";

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
  const [
    denyRequestModalOpened,
    { open: openDenyRequestModal, close: closeDenyRequestModal },
  ] = useDisclosure(false);

  return (
    <div>
      <Card shadow="sm" padding="xl" radius="md" withBorder>
        <Card.Section>
          <Group justify="space-between" mt="md" mb="xs" ml="xs" mr="xs">
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
          <Group justify="flex-end" mt="xs" mb="xs" mr="sm">
            {request.status === RequestStatus.REQUESTED && (
              <Group justify="flex-end" mt="xs" mb="xs" mr="sm">
                <Button
                  variant="filled"
                  color={RequestStatusColors.ACCEPTED}
                  size="sm"
                  p={10}
                  onClick={openAcceptRequestModal}
                >
                  <Title order={5} mr={5}>{`Accept`}</Title>
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{
                      marginBottom: "2px",
                    }}
                  />
                </Button>
                <Button
                  variant="filled"
                  color={RequestStatusColors.DENIED}
                  size="sm"
                  p={10}
                  onClick={openDenyRequestModal}
                >
                  <Title order={5} mr={5}>{`Deny`}</Title>
                  <FontAwesomeIcon icon={faXmark} />
                </Button>
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
          request={request}
        />
      )}
      {denyRequestModalOpened && (
        <DenyRequestModal
          opened={denyRequestModalOpened}
          close={closeDenyRequestModal}
          request={request}
        />
      )}
    </div>
  );
};

export default CustodianRequestCard;
