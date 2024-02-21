import { Button, Modal, Select, Stack, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import { useRequestContext } from "../context/request.context";
import { Request, RequestStatus } from "../interfaces/request.interface";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBuildings, getLocations, updateRequest } from "../api/api";
import { Building } from "../interfaces/building.interface";
import { Location } from "../interfaces/location.interface";

interface EditRequestModalProps {
  opened: boolean;
  close: () => void;
  request: Request;
}
const EditRequestModal = ({
  opened,
  close,
  request,
}: EditRequestModalProps) => {
  /************** State and Context **************/
  const { updateRequestContext } = useRequestContext();
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    request.building as Building,
  );
  const [selectedFloor, setSelectedFloor] = useState<string | null>(
    (request.location as Location).floor,
  );
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    request.location as Location,
  );
  const [description, setDescription] = useState<string>(request.description);

  /************** Hooks **************/
  const { data: buildings, isLoading: isLoadingBuildings } = useQuery<
    Building[]
  >({
    queryKey: ["buildings"],
    queryFn: () => getBuildings(10, 1),
  });

  const { data: locations, isLoading: isLoadingLocations } = useQuery<
    Location[]
  >({
    queryKey: ["locations"],
    queryFn: () => getLocations(10, 1),
  });

  const updateRequestMutation = useMutation<Request>({
    mutationKey: ["requests"],
    mutationFn: () =>
      updateRequest(request._id, {
        studentId: request.studentId,
        description: description,
        status: RequestStatus.REQUESTED,
        locationId: selectedLocation?._id || "",
        buildingId: selectedBuilding?._id || "",
        estimatedCompletion: "",
      }),
  });

  /************** Event Handlers **************/
  const handleBuildingChange = (value: string) => {
    const building = buildings?.find((building) => building._id === value);
    setSelectedBuilding(building || null);
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
    const location = locations?.find((location) => location._id === value);
    setSelectedLocation(location || null);
    setDescription("");
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const onModalSubmit = () => {
    if (selectedBuilding && selectedFloor && selectedLocation && description) {
      updateRequestMutation.mutate();
      updateRequestContext(request._id, {
        ...request,
        building: selectedBuilding,
        location: selectedLocation,
        description: description,
        status: RequestStatus.REQUESTED,
        updatedAt: new Date(),
        estimatedCompletion: "",
      } as Request);
      close();
    }
  };

  /************** Data Processing for Select **************/
  const buildingOptions = buildings?.map((building) => ({
    value: building._id,
    label: building.name,
  }));

  const floorOptions =
    buildings
      ?.find((building) => building._id === selectedBuilding?._id)
      ?.floors.map((floor) => ({
        value: floor,
        label: floor,
      })) || [];

  const locationOptions =
    locations
      ?.filter((location) => location.floor === selectedFloor)
      ?.map((location) => ({
        value: location._id,
        label: location.name,
      })) || [];

  /************** Render **************/

  if (isLoadingBuildings || !buildings) return <div>Loading...</div>;

  if (isLoadingLocations || !locations) return <div>Loading...</div>;

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
          key={selectedBuilding?._id}
          data={buildingOptions}
          label="Select a building"
          value={selectedBuilding?._id}
          onChange={(value) => handleBuildingChange(value as string)}
          searchable
        />
        {selectedBuilding && (
          <Select
            key={selectedFloor}
            data={floorOptions}
            label="Select a floor"
            value={selectedFloor}
            onChange={(value) => handleFloorChange(value as string)}
          />
        )}
        {selectedBuilding && selectedFloor && (
          <Select
            key={selectedLocation?._id}
            data={locationOptions}
            label="Select a location"
            value={selectedLocation?._id}
            onChange={(value) => handleLocationChange(value as string)}
          />
        )}
        {selectedBuilding && selectedFloor && selectedLocation && (
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
