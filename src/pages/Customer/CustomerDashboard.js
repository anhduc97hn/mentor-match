import React from 'react';
import DashboardTabs from '../../components/DashboardTabs';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Container } from '@mui/material';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AddCardIcon from '@mui/icons-material/AddCard';
import CustomerCard from './CustomerCard';
import CustomerBooking from './CustomerBooking';
import CustomerSession from './CustomerSession';
import CustomerProfile from './CustomerProfile';

function CustomerDashboard() {

  const ACCOUNT_TABS = [
    {
      value: "profile",
      icon: <AccountBoxIcon sx={{ fontSize: 30 }} />,
      path: "/account/customer-profile",
      component: <CustomerProfile />,
    },
    {
      value: "card",
      icon: <AddCardIcon sx={{ fontSize: 30 }} />,
      path: "/account/customer-card",
      component: <CustomerCard />,
    },
    {
      value: "booking",
      icon: <BookmarkAddedIcon sx={{ fontSize: 30 }} />,
      path: "/account/customer-booking",
      component: <CustomerBooking />,
    },
    {
      value: "session",
      icon: <ScheduleIcon sx={{ fontSize: 30 }} />,
      path: "/account/customer-session",
      component: <CustomerSession/>,
    },
  ]; 

  return (
    <Container>
      <DashboardTabs props={ACCOUNT_TABS} />
      <h2>Customer Dashboard</h2>
    </Container>
  );
}

export default CustomerDashboard