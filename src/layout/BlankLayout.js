import { Stack } from '@mui/material';
import React from 'react';
import { Outlet } from "react-router-dom";
import Logo from '../components/Logo';
import AlertMsg from "../components/AlertMsg";


function BlankLayout() {
  return (
    <Stack minHeight="100vh" justifyContent="center" alignItems="center">
      <AlertMsg />
      <Logo sx={{ width: 90, height: 90, mb: 5 }} />
      <Outlet />
    </Stack>
  );
}

export default BlankLayout