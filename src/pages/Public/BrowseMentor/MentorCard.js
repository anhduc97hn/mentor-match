import {
  Avatar,
  Box,
  Button,
  Card,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import StarIcon from '@mui/icons-material/Star';
import { Link as RouterLink } from "react-router-dom"
import MentorChip from "./MentorChip";

function MentorCard({ mentor }) {
  const [currentTab, setCurrentTab] = useState("Expertise");

  const expertise = ["expertise a", "expertise b", "expertise c"]
  const industry = ["industry a", "industry b", "industry c"]
  const tools = ["tool a", "tool b", "tool c"]

  const INFO_TABS = [
    {
      value: "Expertise",
      component: <MentorChip labels={expertise} />,
    },
    {
      value: "Industry",
      component: <MentorChip labels={industry} />,
    },
    {
      value: "Tools",
      component: <MentorChip labels={tools} />,
    },
  ];

  return (
    <Card sx={{ mt: 2, padding: 2 }}>
      <Stack direction="row" spacing={2}>
        <Avatar
          src={mentor?.avatarUrl}
          alt={mentor?.name}
          sx={{ width: 50, height: 50 }}
        />
        <Box flexGrow={1}>
          <Link
            variant="subtitle2"
            color="text.primary"
            sx={{ fontWeight: 600 }}
            to={`/mentors`}
          >
            Mentor name
          </Link>

          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            Current title at current company
          </Typography>
        </Box>
        <Stack>
          <Stack direction="row" justifyContent="flex-end">
            <StarIcon sx={{ color: "primary.main", mr: 0.5 }} />
            <Typography variant="h5">4.99</Typography>
          </Stack>
          <Typography variant="subtitle2">
            299 reviews / 537 sessions
          </Typography>
        </Stack>
      </Stack>

      <Typography variant="subtitle2" sx={{ mt: 1, mb: 1 }}>
        As VP of Growth at EuroVPS, I had to make a LOT of decisions, daily.
        This got exhausting, especially if I had multiple good ideas on how to
        do something, but wasn't sure which to choose. Moments like these
        inspired me to build GrowthMentor. Does this resonate? If so, I'd love
        to try and help you.
      </Typography>

      <Stack direction="row">
        <Box sx={{ flexGrow: 1 }}>
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
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button variant="contained" component={RouterLink} to="/mentors/:mentordId/session">Request a Call</Button>
          <Button variant="outlined" component={RouterLink} to="/mentors/:mentorId">View Profile</Button>
        </Box>
      </Stack>
    </Card>
  );
}

export default MentorCard;
