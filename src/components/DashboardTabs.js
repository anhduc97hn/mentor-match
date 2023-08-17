import { Box, Container, Tab, Tabs, Typography, Card } from "@mui/material";
import React, { useState } from "react";
import { capitalCase } from "change-case";
import { Link as RouterLink } from "react-router-dom";
import "./DashboardTabs.css";

function DashboardTabs({ props, title }) {
  const [currentTab, setCurrentTab] = useState("requests");

  return (
    <Container className="dashboard-tabs" maxWidth="false" disableGutters>
      <Box sx={{ pl: "15%", pr: "15%", mb: 2 }}>
        <Typography variant="h5" gutterBottom sx={{ mt: 5 }}>
          {title}
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
      </Box>

      <Box
        sx={{
          bgcolor: "primary.light",
          width: "100%",
          flexGrow: 1,
          pt: 5,
          pb: 5,
        }}
      >
        {props.map((tab) => {
          const isMatched = tab.value === currentTab;
          return (
            isMatched && (
              <Card key={tab.value} sx={{ ml: "15%", mr: "15%", p: 2 }}>
                {tab.component}
              </Card>
            )
          );
        })}
      </Box>
    </Container>
  );
}

export default DashboardTabs;
