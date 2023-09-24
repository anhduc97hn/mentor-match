import React from "react";
import { Alert, Box, Typography, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoadingScreen from "../../../components/LoadingScreen";
import SessionCard from "./SessionCard";

function SessionList({
  isLoading,
  error,
  sessions,
  userProfile,
  total,
  totalPages,
  setPage,
  prevStatus,
}) {
  return (
    <>
      {isLoading ? (
        <LoadingScreen sx={{ top: 0, left: 0 }} />
      ) : (
        <>
          {error ? (
            <Alert severity="error">{error}</Alert>
          ) : (
            <>
              {sessions.length > 0 ? (
                <Stack spacing={2}>
                  {sessions.map((session) => (
                    <SessionCard
                      session={session}
                      key={session._id}
                      currentUserProfileId={userProfile._id}
                      prevStatus={prevStatus}
                    />
                  ))}
                </Stack>
              ) : (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography variant="subtitle1">No Session Yet</Typography>
                </Box>
              )}
            </>
          )}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            {total ? (
              <LoadingButton
                sx={{ mt: 2 }}
                variant="outlined"
                size="small"
                loading={isLoading}
                onClick={() => setPage((page) => page + 1)}
                disabled={Boolean(totalPages === 1)}
              >
                Load more
              </LoadingButton>
            ) : null}
          </Box>
        </>
      )}
    </>
  );
}

export default SessionList;
