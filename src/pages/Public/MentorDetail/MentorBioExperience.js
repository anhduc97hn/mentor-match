import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import React from "react";

function MentorBioExperience() {
  return (
    <Stack>
      <Typography variant="h5" gutterBottom>
        Experience
      </Typography>
      <Card sx={{ borderRadius: 0.5, border: "1px solid #F3F4F6", p: 1.5 }}>
       <Box>
       <Typography variant="h6">Growth Gal</Typography>
        <Typography variant="subtitle1">
          Yoga Teacher & Sustainable Growth Consultant
        </Typography>
        <Typography variant="subtitle2">
          August 2018 - present • growthgal.com
        </Typography>
       </Box>
        <Typography sx={{mt: 2}}>
          Teaching yoga and meditation in local communities. Volunteering on
          farms, connecting people & growing more food locally. Previously held
          contracts storytelling & science-based writing for Eterneva, psyML &
          Sherbinskis Science while traveling abroad & creating experiences in
          The Netherlands, Croatia, Greece, and Germany.
        </Typography>
        <Stack direction="row" spacing={1} sx={{mt: 2}}>
          <Chip label="Digital Agencies" variant="outlined" />
          <Chip label="B2C" variant="outlined" />
          <Chip label="Other" variant="outlined" />
        </Stack>
      </Card>
    </Stack>
  );
}

export default MentorBioExperience;
