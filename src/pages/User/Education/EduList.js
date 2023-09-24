import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { educationGetAll } from "../../../slices/resourceSlice";
import EduCard from "./EduCard";
import LoadingScreen from "../../../components/LoadingScreen";

function EduList({ setCurrentEdu, eduFormRef }) {
  const [page, setPage] = useState(1);
  const { currentPageData, dataById, isLoading, total, totalPages } =
    useSelector((state) => state.education);
  const education = currentPageData.map((eduId) => dataById[eduId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(educationGetAll({ page }));
  }, [dispatch, page]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen sx={{top: 0, left: 0}}/>
      ) : (
        education.map((edu) => (
          <EduCard
            key={edu._id}
            edu={edu}
            setCurrentEdu={setCurrentEdu}
            eduFormRef={eduFormRef}
          />
        ))
      )}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {total ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPages === 1)}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="subtitle1">No Education Yet</Typography>
        )}
      </Box>
    </>
  );
}

export default EduList;
