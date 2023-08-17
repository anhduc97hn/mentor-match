import { Avatar, Card, Stack, Typography } from "@mui/material";
import React from "react";

function MentorBioReviews() {
  return (
    <Stack>
      <Typography variant="h5" gutterBottom>
        Reviews (232)
      </Typography>
      <Stack direction="row" alignItems="center" justifyContent="center">
        <Stack alignItems="flex-start" sx={{width: "150px"}} flexShrink="0">
          <Avatar sx={{ width: "50px", height: "50px", mb: 1 }} />
          <Typography variant="subtitle1">Customer name</Typography>
          <Typography variant="caption">14 Aug 2023</Typography>
        </Stack>
     <Card sx={{p: 1, bgcolor: "neutral.100", borderRadius: 1}}>
     <Typography variant="body1">
            Dani was great. Our discussion lead to an important insight. In
            searching for a business idea, I had been reaching out to
            businesses, asking to talk to them about their problems. But people
            weren't responsive. And when they were, they'd only give me 20 mins
            or so. But everyone wants their problems solved. So if I volunteer
            or something to help out, that'd teach me a lot and they'd be
            receptive to it.
          </Typography>
     </Card>
      </Stack>
    </Stack>
  );
}

export default MentorBioReviews;
