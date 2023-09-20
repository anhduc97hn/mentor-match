import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../slices/educationSlice";
import EduCard from "./EduCard";

function EduList({ setCurrentEdu, eduFormRef }) {
  const [page, setPage] = useState(1);
  const { currentPageData, dataById, isLoading, total } = useSelector(
    (state) => state.education
  );
  const education = currentPageData.map((eduId) => dataById[eduId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll(page));
  }, [dispatch, page]);

  return (
    <>
      {education.map((edu) => (
        <EduCard
          key={edu._id}
          edu={edu}
          setCurrentEdu={setCurrentEdu}
          eduFormRef={eduFormRef}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {total ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(total) && education.length >= total}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Education Yet</Typography>
        )}
      </Box>
    </>
  );
}

export default EduList;
