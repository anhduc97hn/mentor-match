import React from "react";
import DashboardTabs from "../../components/DashboardTabs";
import AccountGeneral from "./AccountGeneral";
import AccountSocial from "./AccountSocial";

function UserProfile() {
  const title = "My Profile";

  const ACCOUNT_TABS = [
    {
      value: "General",
      component: <AccountGeneral />,
    },
    {
      value: "Social Links",
      component: <AccountSocial />,
    },
  ];

  return <DashboardTabs props={ACCOUNT_TABS} title={title} />;
}

export default UserProfile;
