import { Avatar, Button, Card, Link, Stack, Typography } from "@mui/material";
import React from "react";
import RequestContent from "./RequestContent";
import { Link as RouterLink } from "react-router-dom";
import ActionButton from "./ActionButton";
import SessionStatus from "./SessionStatus";
import { fDateTime } from "../../../utils/formatTime";
import ReviewForm from "./ReviewForm";
import ReviewsIcon from "@mui/icons-material/Reviews";

function SessionCard({ currentUserProfileId, session, prevStatus }) {
  const { status, from, to } = session;
  const actionButton = (
    <ActionButton
      currentUserProfileId={currentUserProfileId}
      session={session}
      sx={{ fontSize: "0.7rem" }}
      prevStatus={prevStatus}
    />
  );
  const sessionStatus = (
    <SessionStatus
      currentUserProfileId={currentUserProfileId}
      status={status}
      from={from}
      to={to}
      sx={{ fontSize: "0.7rem" }}
    />
  );
  // Function to calculate the days until the session
  const getDaysUntilSession = (startDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const days = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
    return days;
  };
  const daysUntilSession = getDaysUntilSession(session.startDateTime);

  // Formate session date & time
  const fStartTime = fDateTime(session.startDateTime);
  const fEndTime = fDateTime(session.endDateTime);

  return (
    <Card sx={{ display: "flex", flexDirection: "column", p: 2 }}>
      {session.status === "completed" && (
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
          <ReviewForm sessionId={session._id}>Submit review</ReviewForm>
        </Card>
      )}
      <Stack direction="row" spacing={4} alignItems="center" sx={{ mb: 3 }}>
        <Avatar
          sx={{ width: "50px", height: "50px" }}
          src={
            currentUserProfileId === from._id ? to.avatarUrl : from.avatarUrl
          }
        />
        <Stack>
          <Typography variant="subtitle1">{`Topic: ${session.topic}`}</Typography>
          <Typography variant="subtitle2">
            {currentUserProfileId === from._id ? (
              <Link
                component={RouterLink}
                to={`/mentors/${to._id}`}
                color="text.secondary"
                underline="none"
              >
                {`Mentor: ${to.name}`}
              </Link>
            ) : (
              `Mentee: ${from.name}`
            )}
          </Typography>
          {session.status === "accepted" && (
            <Typography variant="body2" color="success.main">
              Happening in {daysUntilSession} days
            </Typography>
          )}
        </Stack>
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={4}
      >
        <Stack spacing={1} justifyContent="center">
          <Typography variant="subtitle1" color="primary">
            Session Time
          </Typography>
          <Typography variant="body1">
            {fStartTime} - {fEndTime}
          </Typography>
        </Stack>
        <Stack spacing={1} justifyContent="center" alignItems="center">
          <Typography variant="subtitle1" color="primary">
            Status
          </Typography>
          {sessionStatus}
        </Stack>
        {session.status !== "cancelled" &&
          session.status !== "reviewed" &&
          session.status !== "declined" &&
          session.status !== "completed" && (
            <Stack spacing={1} justifyContent="center" alignItems="center">
              <Typography variant="subtitle1" color="primary">
                Action
              </Typography>
              {actionButton}
            </Stack>
          )}
        {session.status === "accepted" && (
          <Button
            size="large"
            component={RouterLink}
            to={session.gEventLink}
            target="_blank"
          >
            Google Meet Link
          </Button>
        )}
        <RequestContent session={session}>Session Message</RequestContent>
      </Stack>
    </Card>
  );
}

export default SessionCard;
