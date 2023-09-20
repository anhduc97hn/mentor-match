import { Stack, Typography } from "@mui/material";
import React from "react";

function MentorBioProfile({ selectedUser }) {

  const aboutMe = selectedUser?.aboutMe || "No bio available"

  return (
    <Stack spacing={3}>
      <embed
        width="100%"
        height="480"
        src="https://www.youtube.com/embed/euCvvEROOXM"
      />
      <Typography variant="h6">Bio</Typography>
      <Typography variant="body2">{aboutMe}</Typography>
    </Stack>
  );
}

export default MentorBioProfile;
