import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { certificationGetAll } from "../../../slices/resourceSlice";
import CertiCard from "./CertiCard";
import LoadingScreen from "../../../components/LoadingScreen";

function CertiList({ setCurrentCerti, certiFormRef }) {
  const [page, setPage] = useState(1);
  const { currentPageData, dataById, isLoading, total, totalPages } = useSelector(
    (state) => state.certification
  );
  const certifications = currentPageData.map((eduId) => dataById[eduId]);
  const dispatch = useDispatch();

  useEffect(() => {
 dispatch(certificationGetAll({page}));
  }, [dispatch, page]);

  return (
    <>
    {isLoading ? (
        <LoadingScreen sx={{top: 0, left: 0}}/>
      ) : (certifications.map((certi) => (
        <CertiCard
          key={certi._id}
          certi={certi}
          setCurrentCerti={setCurrentCerti}
          certiFormRef={certiFormRef}
        />
      )))}
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
          <Typography variant="subtitle1">No Certification Yet</Typography>
        )}
      </Box>
    </>
  );
}

export default CertiList;
