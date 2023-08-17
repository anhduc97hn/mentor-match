import React from "react";
import SessionCard from "./SessionCard";
import { Button, Card, Stack, Typography } from "@mui/material";
import ReviewsIcon from "@mui/icons-material/Reviews";
import "./SessionArchived.css";

function SessionArchived() {
  const status = "Completed";

  return (
    <Stack>
      <Card className="review-bg" sx={{mb: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pt: 3, pb: 3, gap: 1}}>
        <ReviewsIcon sx={{width: "80px", height: "80px", color: "primary.light"}} />
        <Typography variant="h6" color="primary.main">Write a Review.</Typography>
        <Typography variant="subtitle1">
          Please give us your honest opinion, it helps the community.
        </Typography>
        <Button variant="outlined">Submit review</Button>
      </Card>
      <SessionCard status={status} />
    </Stack>
  );
}

export default SessionArchived;
