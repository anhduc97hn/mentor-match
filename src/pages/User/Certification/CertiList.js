import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAll } from "../../../slices/certificationSlice";
import CertiCard from "./CertiCard";

function CertiList({ setCurrentCerti, certiFormRef }) {
  const [page, setPage] = useState(1);
  const { currentPageData, dataById, isLoading, total } = useSelector(
    (state) => state.certification
  );
  const certifications = currentPageData.map((eduId) => dataById[eduId]);
  const dispatch = useDispatch();

  useEffect(() => {
 dispatch(getAll(page));
  }, [dispatch, page]);

  return (
    <>
      {certifications.map((certi) => (
        <CertiCard
          key={certi._id}
          certi={certi}
          setCurrentCerti={setCurrentCerti}
          certiFormRef={certiFormRef}
        />
      ))}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        {total ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(total) && certifications.length >= total}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography variant="h6">No Certification Yet</Typography>
        )}
      </Box>
    </>
  );
}

export default CertiList;
