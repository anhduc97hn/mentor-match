import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../slices/experienceSlice";
import ExpCard from "./ExpCard";

function ExpList({ setCurrentExp, expFormRef }) {
  const [page, setPage] = useState(1);
  const { currentPageData, dataById, isLoading, total } = useSelector(
    (state) => state.experience
  );
  const experiences = currentPageData.map((expId) => dataById[expId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll(page));
  }, [dispatch, page]);

  return (
    <>
      {experiences.map((exp) => (
        <ExpCard
          key={exp._id}
          exp={exp}
          setCurrentExp={setCurrentExp}
          expFormRef={expFormRef}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {total ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(total) && experiences.length >= total}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Experience Yet</Typography>
        )}
      </Box>
    </>
  );
}

export default ExpList;
