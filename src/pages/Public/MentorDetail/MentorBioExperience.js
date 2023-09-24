import { Box, Card, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import { fDateToMonthYear } from "../../../utils/formatTime";

function MentorBioExperience({ selectedUser }) {
  const experiences = selectedUser?.experiences;

  return (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Experience
      </Typography>
      {experiences.length > 0 ? (
        experiences.map((exp) => {
          // convert date format for friendly UI
          const startDate = exp.position.start_date;
          const endDate = exp.position.end_date;
          const isValidStartDate = !isNaN(Date.parse(startDate));
          const isValidEndDate = !isNaN(Date.parse(endDate));
          const fStartDate = isValidStartDate
            ? fDateToMonthYear(new Date(startDate))
            : startDate || "";
            const fEndDate = isValidEndDate
            ? fDateToMonthYear(new Date(endDate))
            : startDate || "";

          return (
            <Card
              sx={{ borderRadius: 0.5, border: "1px solid #F3F4F6", p: 1.5 }}
              key={exp._id}
            >
              <Box>
                <Stack flexDirection="row" justifyContent="space-between">
                  <Typography variant="subtitle1">{exp.company}</Typography>
                  <Typography variant="subtitle1">{exp.location}</Typography>
                </Stack>

                <Typography variant="subtitle2">
                  {exp.position.title}
                </Typography>
                <Typography variant="subtitle2">
                  {fStartDate} - {fEndDate}
                </Typography>
                <Typography
                  variant="subtitle2"
                  component="a"
                  href="exp.url"
                  sx={{
                    textDecoration: "none",
                    color: "inehrit",
                    cursor: "pointer",
                  }}
                  target="_blank"
                >
                  {exp.url}
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {exp.position.description}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                <Chip label={exp.industry} variant="outlined" size="small" />
              </Stack>
            </Card>
          );
        })
      ) : (
        <Typography variant="subtitle1">No Experience Yet</Typography>
      )}
    </Stack>
  );
}

export default MentorBioExperience;
