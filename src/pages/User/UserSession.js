import React from "react";
import DashboardTabs from "../../components/DashboardTabs";
import SessionArchived from "./Session/SessionArchived";
import SessionCanceled from "./Session/SessionCanceled";
import SessionRequests from "./Session/SessionRequests";
import SessionReviewed from "./Session/SessionReviewed";
import SessionUpcoming from "./Session/SessionUpcoming";

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
];

function UserSession({ userProfile }) {
  return (
    <DashboardTabs
      tabs={ACCOUNT_TABS}
      title={title}
      userProfile={userProfile}
      defaultTab="requests"
    />
  );
}

export default UserSession;
