import React, { useEffect } from "react";
import SessionCard from "./SessionCard";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../../components/LoadingScreen";
import { getSessions, updateSessionStatus } from "../../../slices/sessionSlice";
import { Alert } from "@mui/material";

function SessionUpcoming({ userProfile }) {
  const { currentPageSessions, sessionsById, isLoading, error } = useSelector(
    (state) => state.session
  );
  const sessions = currentPageSessions.map(
    (sessionId) => sessionsById[sessionId]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSessions({ status: "accepted" }));
  }, [dispatch]);

  // Function to check and update session status
  const checkAndUpdateSessionStatus = (session) => {
    const currentTime = new Date();
    const sessionEndTime = new Date(session.startEndTime);

    if (currentTime >= sessionEndTime) {
      // Update the session status to "completed"
      dispatch(
        updateSessionStatus({ sessionId: session.id, status: "completed" })
      );
    }
  };

  // Check and update session status for each session
  useEffect(() => {
    sessions.forEach((session) => {
      checkAndUpdateSessionStatus(session);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessions, dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        sessions.map((session) => (
          <SessionCard
            session={session}
            key={session._id}
            currentUserProfileId={userProfile._id}
          />
        ))
      )}
    </>
  );
}

export default SessionUpcoming;
