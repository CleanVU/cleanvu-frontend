import EditRequestModal from "./EditRequestModal";
import DeleteRequestModal from "./DeleteRequestModal";
import styles from "./StudentRequestCard.module.css";
import { RequestStatusColors } from "../interfaces/request.interface";
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
  Image,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDisclosure } from "@mantine/hooks";
import type { Request } from "../interfaces/request.interface";
import type { Building } from "../interfaces/building.interface";
import type { Location } from "../interfaces/location.interface";

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
      <Card
        padding="xl"
        radius="md"
        withBorder
        style={{
          borderColor: "#9c9c9c",
        }}
      >
        <Card.Section>
          <Image
            src={
              "https://cdn.vanderbilt.edu/vu-web/clients/mediadisplays/4674-20221118154506-20220803JR009.jpg"
            }
            alt="Request Image"
            height={200}
          />
        </Card.Section>
        <Card.Section>
          <Group justify="space-between" mt="md" mb="xs" ml="xs" mr="xs">
            <div className={styles.requestHeader}>
              <div className={styles.headerTopLine}>
                <div className={styles.headerLeftTop}>
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
                </div>
                <Badge
                  color={
                    RequestStatusColors[
                      request.status.toUpperCase() as keyof typeof RequestStatusColors
                    ]
                  }
                >
                  {request.status}
                </Badge>
              </div>
              <Text className={styles.description}>{request.description}</Text>
            </div>
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
