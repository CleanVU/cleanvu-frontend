import { useEffect } from "react";
import { useNavigationContext } from "../../context/navigation.context";
import { useUserContext } from "../../context/user.context";
import { StudentTabs } from "../../interfaces/user.interface";
import StudentDashboardCard from "../../components/StudentDashboardCard";
import { Divider, Title } from "@mantine/core";
import StudentRecentRequests from "../../components/StudentRecentRequests";
import styles from "./StudentDashboardPage.module.css";
import { useUser } from "@clerk/clerk-react";

const StudentDashboardPage = () => {
  /************** State and Context **************/
  const { setCurrentTab } = useNavigationContext();
  const { currentUser } = useUserContext();
  const { user } = useUser();

  useEffect(() => {
    setCurrentTab(StudentTabs.DASHBOARD);
  }, []);

  /************** Render **************/
  return (
    <>
      <Title
        order={1}
        style={{
          color: "#444444",
        }}
      >{`Welcome back, ${user?.firstName}`}</Title>
      <Divider mt={20} mb={20} />
      <div className={styles.dashboardContainer}>
        <StudentDashboardCard userId={currentUser?._id || ""} />
        <StudentRecentRequests userId={currentUser?._id || ""} />
      </div>
    </>
  );
};

export default StudentDashboardPage;
