import { useEffect } from "react";
import { useNavigationContext } from "../../context/navigation.context";
import { useUserContext } from "../../context/user.context";
import { StudentTabs } from "../../interfaces/user.interface";
import StudentDashboardCard from "../../components/StudentDashboardCard";

const StudentDashboardPage = () => {
  /************** State and Context **************/
  const { setCurrentTab } = useNavigationContext();
  const { currentUser } = useUserContext();

  console.log("currentUser", currentUser);

  useEffect(() => {
    setCurrentTab(StudentTabs.DASHBOARD);
  }, []);

  /************** Render **************/
  return (
    <>
      <StudentDashboardCard userId={"65bd4b12088bf10ee6612e4b"} />
    </>
  );
};

export default StudentDashboardPage;
