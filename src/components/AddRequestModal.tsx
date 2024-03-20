import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createRequest, getBuildings, getLocations } from "../api/api";
import { useRequestContext } from "../context/request.context";
import { Building } from "../interfaces/building.interface";
import { Location } from "../interfaces/location.interface";
import { Request, RequestStatus } from "../interfaces/request.interface";
import { Button, Modal, Select, Stack, Textarea, Text } from "@mantine/core";
import { useAuth } from "@clerk/clerk-react";

interface AddRequestModalProps {
  opened: boolean;
  close: () => void;
  studentId: string;
}
const AddRequestModal = ({
  opened,
  close,
  studentId,
}: AddRequestModalProps) => {
  /************** State and Context **************/
  const { addRequestContext } = useRequestContext();
  const { getToken } = useAuth();
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null,
  );
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [description, setDescription] = useState<string>("");

  /************** Hooks **************/
  const { data: buildings, isLoading: isLoadingBuildings } = useQuery<
    Building[]
  >({
    queryKey: ["buildings"],
    queryFn: async () => getBuildings(10, 1, await getToken()),
  });

  const { data: locations, isLoading: isLoadingLocations } = useQuery<
    Location[]
  >({
    queryKey: ["locations"],
    queryFn: async () => getLocations(10, 1, await getToken()),
  });

  const createRequestMutation = useMutation<Request>({
    mutationKey: ["requests"],
    mutationFn: async () =>
      createRequest({
        studentId: studentId,
        description: description,
        status: RequestStatus.REQUESTED,
        locationId: selectedLocation?._id || "",
        buildingId: selectedBuilding?._id || "",
        token: await getToken(),
      }),
    onSuccess: (data: Request) => {
      addRequestContext({
        ...data,
        studentId: studentId,
        location: selectedLocation,
        building: selectedBuilding,
      } as Request);
      close();
    },
  });

  /************** Event Handlers **************/
  const handleBuildingChange = (value: string) => {
    const building = buildings?.find((building) => building._id === value);
    setSelectedBuilding(building || null);
    setSelectedLocation(null);
    setSelectedFloor(null);
  };

  const handleFloorChange = (value: string) => {
    setSelectedFloor(value);
    setSelectedLocation(null);
  };

  const handleLocationChange = (value: string) => {
    const location = locations?.find((location) => location._id === value);
    setSelectedLocation(location || null);
    setSelectedFloor(location?.floor || null);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
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
      <Button
        color="blue"
        variant="filled"
        onClick={() => createRequestMutation.mutate()}
      >
        <Text>Submit</Text>
      </Button>
    </Modal>
  );
};

export default AddRequestModal;
