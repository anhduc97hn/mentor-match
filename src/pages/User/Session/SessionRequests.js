import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSessions } from "../../../slices/sessionSlice";
import SessionList from "./SessionList";

function SessionRequests({ userProfile }) {
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

  useEffect(() => {
   dispatch(getSessions({ status: "pending", page }));
  }, [dispatch, page]);

  return (
    <SessionList
      isLoading={isLoading}
      error={error}
      sessions={sessions}
      userProfile={userProfile}
      total={total}
      totalPages={totalPages}
      setPage={setPage}
      prevStatus="pending"
    />
  );
}

export default SessionRequests;
