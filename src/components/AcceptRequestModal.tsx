import { Group, Modal, Stack, Text, Button } from "@mantine/core";
import { useRequestContext } from "../context/request.context";
import {
  Request,
  RequestStatus,
  RequestStatusColors,
} from "../interfaces/request.interface";
import { Location } from "../interfaces/location.interface";
import { Building } from "../interfaces/building.interface";
import { DateTimePicker } from "@mantine/dates";
import { useState } from "react";
import { updateRequest } from "../api/api";
import { useMutation } from "@tanstack/react-query";

interface AcceptRequestModalProps {
  opened: boolean;
  close: () => void;
  request: Request;
}

const AcceptRequestModal = ({
  opened,
  close,
  request,
}: AcceptRequestModalProps) => {
  /************** State and Context **************/
  const { updateRequestContext } = useRequestContext();
  const [estimate, setEstimate] = useState<Date | null>(null);

  /************** Hooks **************/
  const acceptRequestMutation = useMutation<Request>({
    mutationKey: ["requests"],
    mutationFn: () =>
      updateRequest(request._id, {
        studentId: request.studentId,
        description: request.description,
        status: RequestStatus.ACCEPTED,
        locationId: (request.location as Location)._id,
        buildingId: (request.building as Building)._id,
        estimatedCompletion: estimate?.toISOString() || "",
      }),
  });

  /************** Event Handlers **************/
  const onModalSubmit = () => {
    if (estimate) {
      acceptRequestMutation.mutate();
      updateRequestContext(request._id, {
        ...request,
        status: RequestStatus.ACCEPTED,
        estimatedCompletion: estimate.toISOString(),
      });
    }
    close();
  };

  /************** Render **************/

  if (acceptRequestMutation.isPending) return <div>Accepting...</div>;

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
