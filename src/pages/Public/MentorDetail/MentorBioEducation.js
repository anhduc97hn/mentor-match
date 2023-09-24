import React from "react";
import { Divider, Stack, Typography } from "@mui/material";
import { fDateToMonthYear } from "../../../utils/formatTime";

function MentorBioEducation({ selectedUser }) {
  const education = selectedUser?.education;

  return (
    <Stack>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {education.length > 0 ? (
        education.map((edu) => {
          const endYear = edu.end_year;
          const isValidDate = !isNaN(Date.parse(endYear));

          const formattedEndYear = isValidDate
            ? fDateToMonthYear(new Date(endYear))
            : endYear || "";

          return (
            <>
              <Typography variant="subtitle1">Field: {edu.field}</Typography>
              <Stack flexDirection="row" justifyContent="space-between">
                <Typography variant="subtitle2">
                  Degree: {edu.degree}
                </Typography>
                <Typography variant="subtitle2">
                  Graduation: {formattedEndYear}
                </Typography>
              </Stack>
              <Typography variant="body2" gutterBottom sx={{ mt: 1 }}>
                Description: {edu.description}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{
                  mt: 1,
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
                component="a"
                href={edu.url}
                target="_blank"
              >
                Organization: {edu.url}
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </>
          );
        })
      ) : (
        <Typography variant="subtitle1">No Education Yet</Typography>
      )}
    </Stack>
  );
}

export default MentorBioEducation;
