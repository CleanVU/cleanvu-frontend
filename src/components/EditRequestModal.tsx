import { Button, Modal, Select, Stack, Text, Textarea } from "@mantine/core";
import { createTestBuilding } from "../data/test-data";
import { useState } from "react";
import { useRequestContext } from "../context/request.context";
import { Request, RequestStatus } from "../interfaces/request.interface";

interface EditRequestModalProps {
  opened: boolean;
  close: () => void;
  request: Request;
}

const buildings = [
  createTestBuilding(),
  createTestBuilding(),
  createTestBuilding(),
];

const EditRequestModal = ({
  opened,
  close,
  request,
}: EditRequestModalProps) => {
  const { updateRequest } = useRequestContext();
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  const handleBuildingChange = (value: string) => {
    setSelectedBuilding(value);
    setSelectedFloor(null);
    setSelectedLocation(null);
    setDescription("");
  };

  const handleFloorChange = (value: string) => {
    setSelectedFloor(value);
    setSelectedLocation(null);
    setDescription("");
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setDescription("");
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const onModalSubmit = () => {
    if (selectedBuilding && selectedFloor && selectedLocation && description) {
      updateRequest(request._id, {
        ...request,
        initiatedAt: new Date().toISOString(),
        status: RequestStatus.REQUESTED,
        building: selectedBuilding,
        location: selectedLocation,
        description,
      });
      close();
    }
  };

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
      <Stack mt={20} mb={20}>
        <Select
          data={buildings.map((building) => ({
            value: building._id,
            label: building.name,
          }))}
          label="Select a building"
          value={selectedBuilding}
          onChange={(value) => handleBuildingChange(value as string)}
        />
        {selectedBuilding && (
          <Select
            data={buildings
              .find((building) => building._id === selectedBuilding)
              ?.floors?.map((floor) => ({
                value: floor,
                label: floor,
              }))}
            label="Select a floor"
            value={selectedFloor}
            onChange={(value) => handleFloorChange(value as string)}
          />
        )}
        {selectedFloor && (
          <Select
            data={buildings
              .find((building) => building._id === selectedBuilding)
              ?.locations.map((location) => ({
                value: location._id,
                label: location.room,
              }))}
            label="Select a location"
            value={selectedLocation}
            onChange={(value) => handleLocationChange(value as string)}
          />
        )}
        {selectedLocation && (
          <Textarea
            label="Description"
            placeholder="Enter a description"
            required
            value={description}
            onChange={(event) =>
              handleDescriptionChange(event.currentTarget.value)
            }
          />
        )}
      </Stack>
      <Button color="blue" variant="filled" onClick={() => onModalSubmit()}>
        <Text>Submit</Text>
      </Button>
    </Modal>
  );
};

export default EditRequestModal;
