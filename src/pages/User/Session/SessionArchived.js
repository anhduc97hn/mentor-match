import React, { useEffect } from "react";
import SessionCard from "./SessionCard";
import { Card, Stack, Typography } from "@mui/material";
import ReviewsIcon from "@mui/icons-material/Reviews";
import "./SessionArchived.css";
import ReviewForm from "./ReviewForm";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../../components/LoadingScreen";
import { getSessions } from "../../../slices/sessionSlice";
import { Alert } from "@mui/material";

// update status once submitting a review.

function SessionArchived({ userProfile }) {
  const { currentPageSessions, sessionsById, isLoading, error } = useSelector(
    (state) => state.session
  );
  const sessions = currentPageSessions.map(
    (sessionId) => sessionsById[sessionId]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSessions({ status: "completed" }));
  }, [dispatch]);

  return (
    <Stack>
      <Card
        className="review-bg"
        sx={{
          mb: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: 3,
          pb: 3,
          gap: 1,
        }}
      >
        <ReviewsIcon
          sx={{ width: "80px", height: "80px", color: "primary.light" }}
        />
        <Typography variant="h6" color="primary.main">
          Write a Review.
        </Typography>
        <Typography variant="subtitle1">
          Please give us your honest opinion, it helps the community.
        </Typography>
        <ReviewForm>Submit review</ReviewForm>
      </Card>
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        sessions.map((session) => (
          <SessionCard
            session={session}
            key={session._id}
            currentUserProfileId={userProfile._id}
          />
        ))
      )}
    </Stack>
  );
}

export default SessionArchived;
