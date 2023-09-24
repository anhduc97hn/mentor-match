import { Button, Stack } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { updateSessionStatus } from "../../../slices/sessionSlice";
import { useNavigate } from "react-router-dom";

function ActionButton({ currentUserProfileId, session, sx, prevStatus }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, to } = session;
  const sessionId = session._id;

  const btnCancelRequest = (
    <Button
      sx={{ fontSize: "0.6rem", ...sx }}
      size="small"
      variant="contained"
      color="error"
      onClick={async () => {
        await dispatch(
          updateSessionStatus({ sessionId, status: "cancelled", prevStatus })
        );
        navigate("/account/session");
      }}
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
        onClick={async () => {
          await dispatch(
            updateSessionStatus({ sessionId, status: "accepted", prevStatus })
          );
          navigate("/account/session");
        }}
      >
        Accept
      </Button>
      <Button
        sx={{ fontSize: "0.6rem", ...sx }}
        size="small"
        variant="outlined"
        color="error"
        onClick={async () => {
          await dispatch(
            updateSessionStatus({ sessionId, status: "declined", prevStatus })
          );
          navigate("/account/session");
        }}
      >
        Decline
      </Button>
    </Stack>
  );

  if (status === "pending" && to._id === currentUserProfileId)
    return btnGroupReact;
  else if (
    status !== "completed" &&
    status !== "reviewed" &&
    status !== "cancelled" 
  )
    return btnCancelRequest;
}

export default ActionButton;
