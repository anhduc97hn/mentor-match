import { Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import {
  acceptRequest,
  cancelRequest,
  declineRequest,
  updateSessionStatus,
} from "../../../slices/sessionSlice";

function ActionButton({ currentUserProfileId, session, sx }) {
  const dispatch = useDispatch();
  const { status, to, sessionId } = session;

  const btnCancelRequest = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      color="error"
      onClick={() => dispatch(updateSessionStatus({sessionId, status: "cancelled"}))}
    >
      Cancel Request
    </Button>
  );

  const btnGroupReact = (
    <Stack direction="row" spacing={1}>
      <Button
        sx={{ fontSize: "0.6rem", ...sx }}
        size="small"
        variant="contained"
        color="success"
        onClick={() => dispatch(updateSessionStatus({sessionId, status: "accepted"}))}
      >
        Accept
      </Button>
      <Button
        size="small"
        variant="outlined"
        color="error"
        onClick={() => dispatch(updateSessionStatus({sessionId, status: "declined"}))}
      >
        Decline
      </Button>
    </Stack>
  );

  if (status === "pending" && to === currentUserProfileId) return btnGroupReact;
  else if (
    status !== "completed" &&
    status !== "reviewed" &&
    status !== "cancelled"
  )
    return btnCancelRequest;
}

export default ActionButton;
