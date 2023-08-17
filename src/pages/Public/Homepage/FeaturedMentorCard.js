import { Avatar, Box, Link, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

function FeaturedMentorCard({ mentor }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
      <Avatar
        src={mentor.avatarUrl}
        alt={mentor.name}
        sx={{ width: "80px", height: "80px" }}
      />
      <Link
        variant="subtitle1"
        color="text.primary"
        component={RouterLink}
        sx={{ fontWeight: 600 }}
        to="/mentors"
      >
        {mentor.name}
      </Link>
      <Typography
        variant="subtitle2"
        sx={{ display: "block", color: "text.secondary" }}
      >
        {mentor.currentTitle} at {mentor.company}
      </Typography>
    </Box>
  );
}

export default FeaturedMentorCard