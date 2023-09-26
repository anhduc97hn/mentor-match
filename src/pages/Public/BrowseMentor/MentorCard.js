import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Link as RouterLink } from "react-router-dom";
import MentorChip from "./MentorChip";
import { fData } from "../../../utils/numberFormat";
import useAuth from "../../../hooks/useAuth";

function MentorCard({ mentor }) {
  const { userProfile } = useAuth();
  const currentUserProfileId = userProfile?._id;

  const [currentTab, setCurrentTab] = useState("Certifications");
  const mentorId = mentor._id;

  const certifications = mentor.certifications || null;
  const certificationNames = certifications?.map((certi) => certi.name);

  const experiences = mentor.experiences || null;
  const industryNames = experiences?.map((exp) => exp.industry);

  const education = mentor.education || null;
  const educationFields = education?.map((edu) => edu.field);

  const INFO_TABS = [
    {
      value: "Certifications",
      component: <MentorChip labels={certificationNames} />,
    },
    {
      value: "Industry",
      component: <MentorChip labels={industryNames} />,
    },
    {
      value: "Education",
      component: <MentorChip labels={educationFields} />,
    },
  ];

  const fRating = mentor.reviewAverageRating
    ? fData(mentor.reviewAverageRating)
    : "";

  return (
    <Card sx={{ mt: 2, padding: 2 }}>
      <Stack direction="row" spacing={2}>
        <Avatar
          src={mentor?.avatarUrl}
          alt={mentor?.name}
          sx={{ width: 50, height: 50 }}
        />
        <Box flexGrow={1}>
          <Typography
            variant="subtitle2"
            color="primary"
            component={RouterLink}
            sx={{ fontWeight: 600, textDecoration: "none" }}
            to={`/mentors/${mentorId}`}
          >
            {mentor.name}
          </Typography>

          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {mentor.currentPosition} at {mentor.currentCompany}
          </Typography>
        </Box>
        <Stack>
          <Stack direction="row" justifyContent="flex-end">
            <StarIcon sx={{ color: "primary.main", mr: 0.5 }} />
            <Typography variant="h5">{fRating}</Typography>
          </Stack>
          <Typography variant="subtitle2">
            {mentor.reviewCount} reviews / {mentor.sessionCount} sessions
          </Typography>
        </Stack>
      </Stack>

      <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
        {mentor.aboutMe}
      </Typography>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={(e, value) => setCurrentTab(value)}
          >
            {INFO_TABS.map((tab) => (
              <Tab
                disableRipple
                key={tab.value}
                label={tab.value}
                icon={tab.icon}
                value={tab.value}
              />
            ))}
          </Tabs>

          {INFO_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return (
              isMatched && (
                <Box key={tab.value} sx={{ mt: 1.5 }}>
                  {tab.component}
                </Box>
              )
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            flexShrink: "0",
          }}
        >
          <Button
            variant="contained"
            component={RouterLink}
            to={`/mentors/${mentorId}/session`}
            disabled={Boolean(currentUserProfileId === mentorId)}
          >
            Request a Call
          </Button>
          <Button
            variant="outlined"
            component={RouterLink}
            to={`/mentors/${mentorId}`}
          >
            View Profile
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}

export default MentorCard;
