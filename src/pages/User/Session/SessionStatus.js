import React from "react";
import { Chip } from "@mui/material";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import PauseCircleOutlineRoundedIcon from "@mui/icons-material/PauseCircleOutlineRounded";
import MarkEmailReadRoundedIcon from "@mui/icons-material/MarkEmailReadRounded";
import DoNotDisturbAltRoundedIcon from "@mui/icons-material/DoNotDisturbAltRounded";

function SessionStatus({ currentUserProfileId, status, from, to, sx }) {
  
  if (!status) return null;

  if (status === "accepted") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<CheckCircleOutlineRoundedIcon />}
        label="Accepted"
        color="success"
      />
    );
  }

  if (status === "completed") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<CheckCircleOutlineRoundedIcon />}
        label="Completed"
        color="success"
      />
    );
  }

  if (status === "declined") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<DoNotDisturbAltRoundedIcon />}
        label="Declined"
        color="error"
      />
    );
  }

  if (status === "cancelled") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<DoNotDisturbAltRoundedIcon />}
        label="Cancelled"
        color="error"
      />
    );
  }

  if (status === "pending") {
    if (from === currentUserProfileId) {
      return (
        <Chip
          sx={{ ...sx }}
          icon={<MarkEmailReadRoundedIcon />}
          label="Request sent"
          color="warning"
        />
      );
    } else if (to === currentUserProfileId) {
      return (
        <Chip
          sx={{ ...sx }}
          icon={<PauseCircleOutlineRoundedIcon />}
          label="Waiting for repsonse"
          color="warning"
        />
      );
    }
  }

  if (status === "reviewed") {
    return (
      <Chip
        sx={{ ...sx }}
        icon={<CheckCircleOutlineRoundedIcon />}
        label="Reviewed"
        color="success"
      />
    );
  }

  return null;
}

export default SessionStatus;