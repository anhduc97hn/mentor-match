import { Grid } from '@mui/material'
import React from 'react'
import { mentors } from '../data/mentors'
import FeaturedMentorCard from "./FeaturedMentorCard"

function FeaturedMentor() {
  return (
    <>
      <Grid container spacing={2}>
        {mentors.map((mentor) => (
          <Grid key={mentor.index + 1} item lg={4} md={4} xs={12}>
            <FeaturedMentorCard
              mentor={mentor}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FeaturedMentor