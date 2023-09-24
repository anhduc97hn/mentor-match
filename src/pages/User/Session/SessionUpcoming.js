import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSessions, updateSessionStatus } from "../../../slices/sessionSlice";
import SessionList from "./SessionList";

function SessionUpcoming({ userProfile }) {
  
  const [page, setPage] = useState(1);
  const {
    currentPageSessions,
    sessionsById,
    isLoading,
    error,
    total,
    totalPages,
  } = useSelector((state) => state.session);
  const sessions = currentPageSessions.map(
    (sessionId) => sessionsById[sessionId]
  );
  const dispatch = useDispatch();

  // Function to check and update session status
  const checkAndUpdateSessionStatus = (session) => {
    const currentTime = new Date();
    const sessionEndTime = new Date(session.endDateTime);
    
    if (currentTime >= sessionEndTime) {
      // Update the session status to "completed"
      dispatch(
        updateSessionStatus({ sessionId: session._id, status: "completed", prevStatus: "accepted" })
      );
    }
  };

  useEffect(() => {
    dispatch(getSessions({ status: "accepted", page }));
  }, [dispatch, page]);

  // Check and update session status for each session
  useEffect(() => {
    sessions.forEach((session) => {
      checkAndUpdateSessionStatus(session);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SessionList
      isLoading={isLoading}
      error={error}
      sessions={sessions}
      userProfile={userProfile}
      total={total}
      totalPages={totalPages}
      setPage={setPage}
      prevStatus="accepted"
    />
  );
}

export default SessionUpcoming;
