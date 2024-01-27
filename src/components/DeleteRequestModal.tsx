import { Modal, Text } from "@mantine/core";

interface DeleteRequestModalProps {
  opened: boolean;
  close: () => void;
}

const DeleteRequestModal = ({ opened, close }: DeleteRequestModalProps) => {
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
      <Text>Delete Request Modal</Text>
    </Modal>
  );
};

export default DeleteRequestModal;
