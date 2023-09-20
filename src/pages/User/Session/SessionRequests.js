import React, { useEffect } from "react";
import SessionCard from "./SessionCard";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../../../components/LoadingScreen";
import { getSessions } from "../../../slices/sessionSlice";
import { Alert } from "@mui/material";

// update UI to stack the cards.

function SessionRequests({ userProfile }) {
  const { currentPageSessions, sessionsById, isLoading, error } = useSelector(
    (state) => state.session
  );
  const sessions = currentPageSessions.map(
    (sessionId) => sessionsById[sessionId]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSessions({ status: "pending" }));
  }, [dispatch]);

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

export default SessionRequests;