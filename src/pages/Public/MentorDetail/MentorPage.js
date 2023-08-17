import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link as RouterLink } from "react-router-dom";
import MentorBioProfile from "./MentorBioProfile";
import MentorBioExpertise from "./MentorBioExpertise";
import MentorBioExperience from "./MentorBioExperience";
import MentorBioToolkit from "./MentorBioToolkit";
import MentorBioReviews from "./MentorBioReviews";
import StarIcon from "@mui/icons-material/Star";
import "./MentorPage.css";

function MentorPage({ mentor }) {
  const [currentTab, setCurrentTab] = useState("Profile");

  const MENTOR_TABS = [
    {
      value: "Profile",
      component: <MentorBioProfile mentor={{ mentor }} />,
    },
    {
      value: "Expertise",
      component: <MentorBioExpertise mentor={{ mentor }} />,
    },
    {
      value: "Experience",
      component: <MentorBioExperience mentor={{ mentor }} />,
    },
    {
      value: "Toolkit",
      component: <MentorBioToolkit mentor={{ mentor }} />,
    },
    {
      value: "Reviews (232)",
      component: <MentorBioReviews mentor={{ mentor }} />,
    },
  ];

  return (
    <Container
      className="mentor-page"
      maxWidth="false"
      disableGutters
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "50vw",
          gap: 3,
          mt: 5,
          mb: 2,
        }}
      >
        <Avatar sx={{ width: "100px", height: "100px" }} />
        <Typography variant="h5">Mentor Name</Typography>
        <Typography variant="body1">Current title at a company</Typography>
        <Stack direction="row" alignItems="center" spacing={10}>
          <Stack direction="row" spacing={1}>
            <LocationOnIcon color="primary" />
            <Typography variant="subtitle2">Vietnam</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <LanguageIcon color="primary" />
            <Typography variant="subtitle2">Vietnamese, English</Typography>
          </Stack>
          <Typography variant="subtitle2">Joined August, 2023</Typography>
        </Stack>
        <Card
          sx={{
            width: "100%",
            bgcolor: "transparent",
            borderRadius: 1,
            border: "1px solid #F3F4F6",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2 }}
          >
            <Box>
              <Typography variant="h6" color="success.main">
                Free
              </Typography>
              <Typography variant="body2">Price per hour</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" color="success.main">
                1 hour
              </Typography>
              <Typography variant="body2">Cancel anytime</Typography>
            </Box>
            <Stack>
              <Stack direction="row" justifyContent="flex-end">
                <StarIcon sx={{ color: "primary.main", mr: 0.5 }} />
                <Typography variant="h5">4.99</Typography>
              </Stack>
              <Typography variant="body2">
                299 reviews / 537 sessions
              </Typography>
            </Stack>
          </Stack>
        </Card>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Button
            variant="contained"
            component={RouterLink}
            to="/mentors/:mentorId/session"
          >
            Request a Call
          </Button>
          <Stack direction="row" spacing={1}>
            <LinkedInIcon color="primary" />
            <TwitterIcon color="primary" />
            <InstagramIcon color="primary" />
            <FacebookIcon color="primary" />
          </Stack>
        </Stack>
      </Box>
      <Divider sx={{ color: "primary.main", border: 1, width: "100%" }} />
      <Tabs
        value={currentTab}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={(e, value) => setCurrentTab(value)}
      >
        {MENTOR_TABS.map((tab) => (
          <Tab
            disableRipple
            key={tab.value}
            label={tab.value}
            icon={tab.icon}
            value={tab.value}
          />
        ))}
      </Tabs>
      <Box sx={{ bgcolor: "primary.light", width: "100%", flexGrow: 1 }}>
        {MENTOR_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return (
            isMatched && (
              <Card
                key={tab.value}
                sx={{ ml: "25%", mr: "25%", p: 2, mt: 5, mb: 5 }}
              >
                {tab.component}
              </Card>
            )
          );
        })}
      </Box>
    </Container>
  );
}

export default MentorPage;
