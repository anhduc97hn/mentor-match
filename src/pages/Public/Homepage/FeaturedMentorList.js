import { Grid } from '@mui/material'
import React from 'react'
import { mentors } from '../../../data/mentors'
import FeaturedMentorCard from "./FeaturedMentorCard"

function FeaturedMentorList() {
  return (
    <>
      <Grid container spacing={3.5}>
        {mentors.map((mentor, index) => (
          <Grid key={index + 1} item lg={4} md={4} xs={6}>
            <FeaturedMentorCard
              mentor={mentor}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FeaturedMentorList