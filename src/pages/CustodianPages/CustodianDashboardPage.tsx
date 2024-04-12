import { useEffect } from "react";
import { useNavigationContext } from "../../context/navigation.context";
import { useUserContext } from "../../context/user.context";
import { StudentTabs } from "../../interfaces/user.interface";
import { Divider, Title } from "@mantine/core";
import styles from "./CustodianDashboardPage.module.css";
import { useUser } from "@clerk/clerk-react";
import CustodianDashboardCard from "../../components/CustodianDashboardCard";
import CustodianRecentRequests from "../../components/CustodianRecentRequests";

const CustodianDashboard = () => {
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
        <CustodianDashboardCard userId={currentUser?._id || ""} />
        <CustodianRecentRequests userId={currentUser?._id || ""} />
      </div>
    </>
  );
};

export default CustodianDashboard;
