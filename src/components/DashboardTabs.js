import { Box, Container, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { capitalCase } from "change-case";
import { Link as RouterLink } from "react-router-dom"

function DashboardTabs ({props}) {
    const [currentTab, setCurrentTab] = useState("profile");
  
    return (
    <>
        <Typography variant="h5" gutterBottom>
          Overview
        </Typography>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {props.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              icon={tab.icon}
              value={tab.value}
              component={RouterLink}
              to={tab.path}
            />
          ))}
        </Tabs>
  
        <Box sx={{ mb: 5 }} />
  
        {props.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
    </>
    );
}

export default DashboardTabs