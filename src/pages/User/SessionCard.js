import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import RequestContentModal from "../../components/RequestContentModal";
import { Link as RouterLink } from "react-router-dom";

function SessionCard({ status }) {
  return (
    <Stack>
      <Stack direction="row" spacing={4} alignItems="center" sx={{ mb: 3 }}>
        <Avatar sx={{ width: "50px", height: "50px" }} />
        <Stack>
          <Typography variant="h6">Topic name</Typography>
          <Typography variant="subtitle2">Mentor/Mentee name</Typography>
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
          <Typography variant="body1">06:00 PM - 06:30 PM</Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle1">Cost</Typography>
          <Typography variant="body1">Free</Typography>
        </Stack>

        <Stack spacing={1}>
          <Typography variant="subtitle1">Status</Typography>
          <Typography variant="body1">{status}</Typography>
        </Stack>

        {status === "Reviewed" ? (
          <Button size="large" variant="outlined" component={RouterLink} to="/">
            Your Review
          </Button>
        ) : (
          <Button size="large" component={RouterLink} to="/">
            Google Meet Link
          </Button>
        )}

        <RequestContentModal>Problem/Challenge</RequestContentModal>
      </Stack>
    </Stack>
  );
}

export default SessionCard;
