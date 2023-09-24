import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { experienceGetAll } from "../../../slices/resourceSlice";
import ExpCard from "./ExpCard";
import LoadingScreen from "../../../components/LoadingScreen";

function ExpList({ setCurrentExp, expFormRef }) {
  const [page, setPage] = useState(1);
  const { currentPageData, dataById, isLoading, total, totalPages } =
    useSelector((state) => state.experience);
  const experiences = currentPageData.map((expId) => dataById[expId]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(experienceGetAll({ page }));
  }, [dispatch, page]);

  return (
    <>
      {isLoading ? (
        <LoadingScreen sx={{top: 0, left: 0}}/>
      ) : (
        experiences.map((exp) => (
          <ExpCard
            key={exp._id}
            exp={exp}
            setCurrentExp={setCurrentExp}
            expFormRef={expFormRef}
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
          <Typography variant="subtitle1">No Experience Yet</Typography>
        )}
      </Box>
    </>
  );
}

export default ExpList;
