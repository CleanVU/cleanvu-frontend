import { Group, Modal, Stack, Text, Button } from "@mantine/core";
import { useRequestContext } from "../context/request.context";

interface DeleteRequestModalProps {
  opened: boolean;
  close: () => void;
  requestId: string;
}

const DeleteRequestModal = ({
  opened,
  close,
  requestId,
}: DeleteRequestModalProps) => {
  const { deleteRequest } = useRequestContext();

  const onModalSubmit = () => {
    deleteRequest(requestId);
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Delete Request"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack mt={20} mb={20}>
        <Text>Are you sure you want to delete this request?</Text>
        <Group>
          <Button color="red" variant="filled" onClick={onModalSubmit}>
            <Text>Delete</Text>
          </Button>
          <Button color="gray" variant="outline" onClick={close}>
            <Text>Cancel</Text>
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DeleteRequestModal;
