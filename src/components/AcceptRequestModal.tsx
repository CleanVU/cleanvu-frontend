import { Group, Modal, Stack, Text, Button } from "@mantine/core";
import { useRequestContext } from "../context/request.context";
import {
  RequestStatus,
  RequestStatusColors,
} from "../interfaces/request.interface";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";

interface AcceptRequestModalProps {
  opened: boolean;
  close: () => void;
  requestId: string;
}

const AcceptRequestModal = ({
  opened,
  close,
  requestId,
}: AcceptRequestModalProps) => {
  const { updateRequestStatus, setEstimatedCompletion } = useRequestContext();
  const [estimate, setEstimate] = useState<Date | null>(null);

  const onModalSubmit = () => {
    updateRequestStatus(requestId, RequestStatus.ACCEPTED);
    if (estimate) {
      setEstimatedCompletion(requestId, estimate?.toISOString());
    }
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Accept Request"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack mt={20} mb={20}>
        <Text>Are you sure you want to accept this request?</Text>
        <DateTimePicker
          clearable
          dropdownType="modal"
          valueFormat="DD MMM YYYY hh:mm a"
          label="Estimated Completion Date"
          placeholder="Select date and time"
          value={estimate}
          onChange={(value) => setEstimate(value)}
        />
        <Group>
          <Button
            color={RequestStatusColors.ACCEPTED}
            variant="filled"
            onClick={onModalSubmit}
          >
            {`Accept`}
          </Button>
          <Button color="gray" variant="outline" onClick={close}>
            {`Cancel`}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AcceptRequestModal;
