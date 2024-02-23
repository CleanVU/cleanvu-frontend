import { Group, Modal, Stack, Text, Button } from "@mantine/core";
import { useRequestContext } from "../context/request.context";
import {
  Request,
  RequestStatus,
  RequestStatusColors,
} from "../interfaces/request.interface";
import { Location } from "../interfaces/location.interface";
import { Building } from "../interfaces/building.interface";
import { updateRequest } from "../api/api";
import { useMutation } from "@tanstack/react-query";

interface DenyRequestModalProps {
  opened: boolean;
  close: () => void;
  request: Request;
}

const DenyRequestModal = ({
  opened,
  close,
  request,
}: DenyRequestModalProps) => {
  /************** State and Context **************/
  const { updateRequestContext } = useRequestContext();

  /************** Hooks **************/
  const denyRequestMutation = useMutation<Request>({
    mutationKey: ["requests"],
    mutationFn: () =>
      updateRequest(request._id, {
        studentId: request.studentId,
        description: request.description,
        status: RequestStatus.DENIED,
        locationId: (request.location as Location)._id,
        buildingId: (request.building as Building)._id,
        estimatedCompletion: "",
      }),
    onSuccess: (data: Request) => {
      updateRequestContext(request._id, {
        ...data,
        status: RequestStatus.DENIED,
      });
      close();
    },
  });

  /************** Render **************/

  if (denyRequestMutation.isPending) return <div>Denying...</div>;

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Deny Request"
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Stack mt={20} mb={20}>
        <Text>Are you sure you want to deny this request?</Text>
        <Group>
          <Button
            color={RequestStatusColors.DENIED}
            variant="filled"
            onClick={() => denyRequestMutation.mutate()}
          >
            {`Deny`}
          </Button>
          <Button color="gray" variant="outline" onClick={close}>
            {`Cancel`}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default DenyRequestModal;
