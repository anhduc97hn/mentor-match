import React, { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import "./SessionArchived.css";
import { useDispatch, useSelector } from "react-redux";
import { getSessions } from "../../../slices/sessionSlice";
import SessionList from "./SessionList";


function SessionArchived({ userProfile }) {

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
    dispatch(getSessions({ status: "completed", page }));
  }, [dispatch, page]);

  return (
    <Stack>
      <SessionList
      isLoading={isLoading}
      error={error}
      sessions={sessions}
      userProfile={userProfile}
      total={total}
      totalPages={totalPages}
      setPage={setPage}
    />
    </Stack>
  );
}

export default SessionArchived;
