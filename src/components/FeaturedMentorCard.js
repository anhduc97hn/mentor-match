import { Avatar, Card, CardHeader, IconButton, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

function FeaturedMentorCard({mentor}) {
  return (
    <CardHeader
      sx={{ display: "flex", flexDirection: "column", padding: 0 }}
      disableTypography
      avatar={
        <Avatar
          src={mentor.avatarUrl}
          alt={mentor.name}
          sx={{ width: "50px", height: "50px" }}
        />
      }
      title={
        <Link
          variant="subtitle1"
          color="text.primary"
          component={RouterLink}
          sx={{ fontWeight: 600 }}
          to="/mentors"
        >
          {mentor.name}
        </Link>
      }
      subheader={
        <Typography
          variant="subtitle2"
          sx={{ display: "block", color: "text.secondary" }}
        >
          {mentor.currentTitle} at {mentor.company}
        </Typography>
      }
    />
  );
}

export default FeaturedMentorCard