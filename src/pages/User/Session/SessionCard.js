import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import RequestContent from "./RequestContent";
import { Link as RouterLink } from "react-router-dom";
import ActionButton from "./ActionButton";
import SessionStatus from "./SessionStatus";

function SessionCard({ currentUserProfileId, session }) {
  const { status, from, to } = session;
  const actionButton = (
    <ActionButton
      currentUserProfileId={currentUserProfileId}
      session={session}
    />
  );
  const sessionStatus = (
    <SessionStatus
      currentUserProfileId={currentUserProfileId}
      status={status}
      from={from}
      to={to}
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

  return (
    <Stack>
      <Stack direction="row" spacing={4} alignItems="center" sx={{ mb: 3 }}>
        <Avatar sx={{ width: "50px", height: "50px" }} />
        <Stack>
          <Typography variant="h6">Topic name</Typography>
          <Typography variant="subtitle2">Mentor/Mentee name</Typography>
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
        spacing={8}
      >
        <Stack spacing={1}>
          <Typography variant="subtitle1">Session Time</Typography>
          <Typography variant="body1">
            {session.startDateTime} - {session.endDateTime}
          </Typography>
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle1">Status</Typography>
          {sessionStatus}
        </Stack>
        <Stack spacing={1}>
          <Typography variant="subtitle1">Action</Typography>
          {actionButton}
        </Stack>
        {session.status === "reviewed" ? (
          <Button size="large" variant="outlined" component={RouterLink} to="/">
            Your Review
          </Button>
        ) : session.status === "accepted" ? (
          <Button size="large" component={RouterLink} to={session.gEventLink}>
            Google Meet Link
          </Button>
        ) : (
          <></>
        )}
        <RequestContent session={session}>Session Message</RequestContent>
      </Stack>
    </Stack>
  );
}

export default SessionCard;
