import React from "react";
import DashboardTabs from "../../components/DashboardTabs";
import AccountGeneral from "./AccountGeneral";
import AccountEducation from "./Education/AccountEducation";
import AccountExperiences from "./Experience/AccountExperiences";
import AccountCertifications from "./Certification/AccountCertifications";

const title = "My Profile";
const ACCOUNT_TABS = [
  {
    value: "General",
    component: <AccountGeneral />,
  },
  {
    value: "Education",
    component: <AccountEducation />,
  },
  {
    value: "Experiences",
    component: <AccountExperiences />,
  },
  {
    value: "Certifications",
    component: <AccountCertifications />,
  },
];

function UserProfile({ isMentor }) {
  return isMentor ? (
    <DashboardTabs
      tabs={ACCOUNT_TABS}
      title={title}
      defaultTab="general"
    />
  ) : (
    <DashboardTabs
      tabs={[ACCOUNT_TABS[0]]}
      title={title}
      defaultTab="general"
    />
  );
}

export default UserProfile;
