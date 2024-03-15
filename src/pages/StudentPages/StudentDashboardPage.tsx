import { useEffect, useState } from "react";
import { useNavigationContext } from "../../context/navigation.context";
import { useUserContext } from "../../context/user.context";
import { StudentTabs } from "../../interfaces/user.interface";
import StudentDashboardCard from "../../components/StudentDashboardCard";
import { Button, Card, Group, Text, Title } from "@mantine/core";
import AddRequestModal from "../../components/AddRequestModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const StudentDashboardPage = () => {
  /************** State and Context **************/
  const { setCurrentTab } = useNavigationContext();
  const { currentUser } = useUserContext();
  const [addRequestOpen, setAddRequestOpen] = useState(false);

  console.log("currentUser", currentUser);

  useEffect(() => {
    setCurrentTab(StudentTabs.DASHBOARD);
  }, []);

  /************** Render **************/
  return (
    <>
      <Title order={1}>{`Dashboard`}</Title>
      <StudentDashboardCard userId={"65bd4b12088bf10ee6612e4b"} />
      <Card>
      <Button
          variant="filled"
          color="blue"
          onClick={() => setAddRequestOpen(true)}
        >
          <Group gap={10}>
            <Text fw={600}>Add Request</Text>
            <FontAwesomeIcon icon={faPlus} />
          </Group>
        </Button>
      </Card>
      {addRequestOpen && <AddRequestModal opened={addRequestOpen} close={() => setAddRequestOpen(false)} studentId={currentUser?._id || ""} />}
    </>
  );
};

export default StudentDashboardPage;
