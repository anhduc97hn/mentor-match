import React from 'react';
import MainHeader from './MainHeader';
import MainFooter from './MainFooter';
import { Outlet } from "react-router-dom";
import { Box, Stack } from "@mui/material"

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout