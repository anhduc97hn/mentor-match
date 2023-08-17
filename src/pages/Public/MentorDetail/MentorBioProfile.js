import { Stack, Typography } from '@mui/material'
import React from 'react'

function MentorBioProfile() {
  return (
    <Stack spacing={3}>
      <iframe
        width="100%"
        src="https://www.youtube.com/embed/euCvvEROOXM"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <Typography variant="h5">Bio</Typography>
      <Typography variant="body1">
        My favorite question is "what can I learn from this?" and I love
        meeting, learning from, and helping people. Over the past couple of
        years I've gone from completely burned out to living a life and working
        with intention on my own terms. I now work with individuals who could
        use a helping hand making sense of their own burnout. I will help you
        understand your unique strengths and be your biggest cheerleader as I
        teach you the growth process and how it can be applied to your own life
        and work. While most of my growth mentees see results within the first
        week, ongoing sessions prove to be extremely valuable for ongoing growth
        and support. Prior to this, I led growth alongside Sean Ellis at
        GrowthHackers — all things community, conference, training and NorthStar
        (software). Before that I led marketing automation, email, direct mail,
        and other cross-functional projects for Payoff, a fintech company
        focused on helping people in USA pay off their high interest rate credit
        cards with personal loans. I started with online fundraising — testing
        new online strategies for international nonprofits like Defenders of
        Wildlife, Greenpeace, WWF, Save the Chimps & The Wilderness Society.
      </Typography>
    </Stack>
  );
}

export default MentorBioProfile