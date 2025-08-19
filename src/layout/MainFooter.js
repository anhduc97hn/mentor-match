import React from 'react';
import { Link, Typography } from "@mui/material"

function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
    {"Copyright © "}
    <Link color="inherit" href="/">
      Duc Nguyen
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
  )
}

export default MainFooter