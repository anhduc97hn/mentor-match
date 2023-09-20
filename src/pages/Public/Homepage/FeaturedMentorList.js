import { Grid } from '@mui/material'
import React from 'react'
import FeaturedMentorCard from "./FeaturedMentorCard"

function FeaturedMentorList({userProfiles}) {
  return (
    <>
      <Grid container spacing={3.5}>
        {userProfiles.map((userProfile) => (
          <Grid key={userProfile._id} item lg={4} md={4} xs={6}>
            <FeaturedMentorCard
              userProfile={userProfile}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default FeaturedMentorList