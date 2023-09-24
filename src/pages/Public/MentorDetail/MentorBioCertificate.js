import { Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";

function MentorBioCertificate({ selectedUser }) {
  const certificates = selectedUser?.certifications;

  return (
    <Stack spacing={2}>
      <Typography variant="h6" gutterBottom>
        Certificates
      </Typography>
      <Divider sx={{ mb: 1.5 }} />
      {certificates.length > 0 ? (
        certificates.map((certi) => (
          <Box>
            <Typography variant="subtitle1">{certi.name}</Typography>
            <Typography
              variant="caption"
              component="a"
              href={certi.url}
              sx={{
                textDecoration: "none",
                color: "inehrit",
                cursor: "pointer",
              }}
              target="_blank"
            >
              {certi.url}
            </Typography>
            <Typography variant="body2" gutterBottom sx={{ mt: 1 }}>
              {certi.description}
            </Typography>
            <Divider sx={{ mb: 1.5 }} />
          </Box>
        ))
      ) : (
        <Typography variant="subtitle1">No Certificates Yet</Typography>
      )}
    </Stack>
  );
}

export default MentorBioCertificate;
