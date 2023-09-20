import { Avatar, Box, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function FeaturedMentorCard({ userProfile }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        src={userProfile.avatarUrl}
        alt={userProfile.name}
        sx={{ width: "80px", height: "80px" }}
      />
      <Link
        variant="subtitle1"
        color="text.primary"
        component={RouterLink}
        sx={{ fontWeight: 600 }}
        to={`/mentors/${userProfile._id}`}
      >
        {userProfile.name}
      </Link>
      <Typography
        variant="subtitle2"
        sx={{color: "text.secondary", textAlign: "center" }}
      >
        {userProfile.currentPosition} at {userProfile.currentCompany}
      </Typography>
    </Box>
  );
}

export default FeaturedMentorCard;
