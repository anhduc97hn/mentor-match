import React from "react";
import DashboardTabs from "../../components/DashboardTabs";
import SessionArchived from "./Session/SessionArchived";
import SessionCanceled from "./Session/SessionCanceled";
import SessionRequests from "./Session/SessionRequests";
import SessionReviewed from "./Session/SessionReviewed";
import SessionUpcoming from "./Session/SessionUpcoming";
import SessionDeclined from "./Session/SessionDeclined";

const title = "My Session";
const ACCOUNT_TABS = [
  {
    value: "requests",
    component: (props) => <SessionRequests {...props} />,
  },
  {
    value: "upcoming",
    component: (props) => <SessionUpcoming {...props} />,
  },
  {
    value: "attention",
    component: (props) => <SessionArchived {...props} />,
  },
  {
    value: "reviewed",
    component: (props) => <SessionReviewed {...props} />,
  },
  {
    value: "cancelled",
    component: (props) => <SessionCanceled {...props} />,
  },
  {
    value: "declined",
    component: (props) => <SessionDeclined {...props} />,
  },
];

function UserSession({ userProfile, isMentor }) {

  const filteredTabs = isMentor
    ? ACCOUNT_TABS.filter((tab) => tab.value !== "attention")
    : ACCOUNT_TABS;

  const tabsWithProps = filteredTabs.map((tab) => ({
    ...tab,
    component: <tab.component userProfile={userProfile}/>,
  }));

  return (
    <DashboardTabs
      tabs={tabsWithProps}
      title={title}
      defaultTab="requests"
    />
  );
}

export default UserSession;
