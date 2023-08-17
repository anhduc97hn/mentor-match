import React from "react";
import DashboardTabs from "../../components/DashboardTabs";
import SessionArchived from "./SessionArchived";
import SessionCanceled from "./SessionCanceled";
import SessionRequests from "./SessionRequests";
import SessionReviewed from "./SessionReviewed";
import SessionUpcoming from "./SessionUpcoming";

function UserSession() {
  const title = "My Session";

  const ACCOUNT_TABS = [
    {
      value: "requests",
      component: <SessionRequests />,
    },
    {
      value: "upcoming",
      component: <SessionUpcoming />,
    },
    {
      value: "attention",
      component: <SessionArchived />,
    },
    {
      value: "reviewed",
      component: <SessionReviewed />,
    },
    {
      value: "canceled",
      component: <SessionCanceled />,
    },
  ];

  return <DashboardTabs props={ACCOUNT_TABS} title={title} />;
}

export default UserSession;
