import { Container } from '@mui/material'
import React from 'react'
import DashboardTabs from '../../components/DashboardTabs'
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';

function MentorDashboard() {

  const ACCOUNT_TABS = [
    {
      value: "profile",
      icon: <AccountBoxIcon sx={{ fontSize: 30 }} />,
      path: "/account/mentor-profile"
      // component: <AccountGeneral />,
    },
    {
      value: "slot",
      icon: <EditCalendarIcon sx={{ fontSize: 30 }} />,
      path: "/account/mentor-slot"
      // component: <AccountSocialLinks profile={{}} />,
    },
    {
      value: "booking",
      icon: <BookmarkAddedIcon sx={{ fontSize: 30 }} />,
      path: "/account/mentor-booking"
      // component: <AccountSocialLinks profile={{}} />,
    },
    {
      value: "session",
      icon: <ScheduleIcon sx={{ fontSize: 30 }} />,
      path: "/account/mentor-session"
      // component: <AccountSocialLinks profile={{}} />,
    },
  ]; 

  return (
    <Container>
      <DashboardTabs props={ACCOUNT_TABS} />
      <h2>Mentor Dashboard</h2>
    </Container>
  );
}

export default MentorDashboard