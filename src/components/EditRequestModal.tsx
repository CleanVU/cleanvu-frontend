import { Modal, Text } from "@mantine/core";

interface EditRequestModalProps {
  opened: boolean;
  close: () => void;
}

const EditRequestModal = ({ opened, close }: EditRequestModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Edit Request"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Text>Edit Request Modal</Text>
    </Modal>
  );
};

export default EditRequestModal;
