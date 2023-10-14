import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  IconButton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link as RouterLink, useParams } from "react-router-dom";
import MentorBioProfile from "./MentorBioProfile";
import MentorBioEducation from "./MentorBioEducation";
import MentorBioExperience from "./MentorBioExperience";
import MentorBioCertificate from "./MentorBioCertificate";
import MentorBioReviews from "./MentorBioReviews";
import StarIcon from "@mui/icons-material/Star";
import "./MentorPage.css";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUserProfile } from "../../../slices/userProfileSlice";
import LoadingScreen from "../../../components/LoadingScreen";
import NotFoundPage from "../NotFoundPage";
import { fData } from "../../../utils/numberFormat";
import { fDateToMonthYear } from "../../../utils/formatTime";
import useAuth from "../../../hooks/useAuth";

function MentorPage() {

  const { userProfile } = useAuth();
  const currentUserProfileId = userProfile?._id; 
  const params = useParams();
  const userProfileId = params.mentorId;
  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector((state) => state.userProfile);

  const [currentTab, setCurrentTab] = useState("Profile");
  const MENTOR_TABS = [
    {
      value: "Profile",
      component: <MentorBioProfile selectedUser={selectedUser} />,
    },
    {
      value: "Education",
      component: <MentorBioEducation selectedUser={selectedUser} />,
    },
    {
      value: "Experience",
      component: <MentorBioExperience selectedUser={selectedUser} />,
    },
    {
      value: "Certificate",
      component: <MentorBioCertificate selectedUser={selectedUser} />,
    },
    {
      value: `Reviews (${selectedUser?.reviewCount})`,
      component: <MentorBioReviews selectedUser={selectedUser} />,
    },
  ];

  // Format createdAt to month/year format
  const formattedCreatedAt = selectedUser?.createdAt
    ? fDateToMonthYear(selectedUser.createdAt)
    : "";

  // Format reviewAverageRating to a fixed number of decimal places
  const formattedReviewAverageRating = selectedUser?.reviewAverageRating
    ? fData(selectedUser.reviewAverageRating)
    : "";

  useEffect(() => {
      dispatch(getSingleUserProfile(userProfileId));
  }, [dispatch, userProfileId]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : selectedUser ? (
        <Container
          className="mentor-page"
          maxWidth="false"
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
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
            <Avatar
              sx={{ width: "100px", height: "100px" }}
              src={selectedUser.avatarUrl}
            />
            <Typography variant="h5">{selectedUser.name}</Typography>
            <Typography variant="body1">
              {selectedUser.currentPosition} at {selectedUser.currentCompany}{" "}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={10}>
              <Stack direction="row" spacing={1}>
                <LocationOnIcon color="primary" />
                <Typography variant="subtitle2">{selectedUser.city}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <LanguageIcon color="primary" />
                <Typography variant="subtitle2">Vietnamese, English</Typography>
              </Stack>
              <Typography variant="subtitle2">
                Joined {formattedCreatedAt}
              </Typography>
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
                    <Typography variant="h5">
                      {formattedReviewAverageRating}
                    </Typography>
                  </Stack>
                  <Typography variant="body2">
                    {selectedUser.reviewCount} reviews /{" "}
                    {selectedUser.sessionCount} sessions
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
                to={`/mentors/${userProfileId}/session`}
                disabled={Boolean(currentUserProfileId === userProfileId)}
              >
                Request a Call
              </Button>
              <Stack direction="row" spacing={1}>
                <IconButton
                  component="a"
                  href={selectedUser.linkedinLink}
                  target="_blank"
                  color="primary"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  component="a"
                  href={selectedUser.twitterLink}
                  target="_blank"
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  component="a"
                  href={selectedUser.instagramLink}
                  target="_blank"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  component="a"
                  href={selectedUser.facebookLink}
                  target="_blank"
                >
                  <FacebookIcon />
                </IconButton>
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
      ) : (
        <NotFoundPage />
      )}
    </>
  );
}

export default MentorPage;
