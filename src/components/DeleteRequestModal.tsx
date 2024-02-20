import { Group, Modal, Stack, Text, Button } from "@mantine/core";
import { useRequestContext } from "../context/request.context";
import { useMutation } from "@tanstack/react-query";
import { deleteRequest } from "../api/api";
import { Request } from "../interfaces/request.interface";

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
  /************** Context **************/
  const { deleteRequestContext } = useRequestContext();

  /************** Hooks **************/
  const { isPending: isDeleting } = useMutation<Request>({
    mutationKey: ["requests"],
    mutationFn: () => deleteRequest(requestId),
  });

  /************** Event Handlers **************/
  const onModalSubmit = () => {
    deleteRequestContext(requestId);
    close();
  };

  /************** Render **************/
  if (isDeleting) return <div>Deleting...</div>;

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
