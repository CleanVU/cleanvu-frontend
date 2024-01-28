import { Modal, Select, Text, Textarea } from "@mantine/core";
import { createTestBuilding } from "../data/test-data";
import { useState } from "react";

interface EditRequestModalProps {
  opened: boolean;
  close: () => void;
}

const buildings = [
  createTestBuilding(),
  createTestBuilding(),
  createTestBuilding(),
];

const EditRequestModal = ({ opened, close }: EditRequestModalProps) => {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleBuildingChange = (value: string) => {
    setSelectedBuilding(value);
    setSelectedFloor(null);
    setSelectedLocation(null);
  };

  const handleFloorChange = (value: string) => {
    setSelectedFloor(value);
    setSelectedLocation(null);
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
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
      <Text>Building</Text>
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
              value: location.room,
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
        />
      )}
    </Modal>
  );
};

export default EditRequestModal;
