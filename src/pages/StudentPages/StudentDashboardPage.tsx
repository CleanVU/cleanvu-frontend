import { useEffect } from "react";
import { useNavigationContext } from "../../context/navigation.context";
import { useUserContext } from "../../context/user.context";
import { StudentTabs } from "../../interfaces/user.interface";
import StudentDashboardCard from "../../components/StudentDashboardCard";
import { Group, Title } from "@mantine/core";
import StudentRecentRequests from "../../components/StudentRecentRequests";

const StudentDashboardPage = () => {
  /************** State and Context **************/
  const { setCurrentTab } = useNavigationContext();
  const { currentUser } = useUserContext();

  useEffect(() => {
    setCurrentTab(StudentTabs.DASHBOARD);
  }, []);

  /************** Render **************/
  return (
    <>
      <Title order={1}>{`Dashboard`}</Title>
      <Group align="flex-start">
        <StudentDashboardCard userId={currentUser?._id || ""} />
        <StudentRecentRequests userId={currentUser?._id || ""} />
      </Group>
    </>
  );
};

export default StudentDashboardPage;
