import { Box, CircularProgress } from "@mui/material";
import React from "react";

function LoadingScreen({sx}) {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...sx
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingScreen;