import React from "react";
import { Divider, Stack, Typography } from "@mui/material";

function MentorBioExpertise() {
  return (
    <Stack>
      <Typography variant="h5" gutterBottom>
        Expertise
      </Typography>
      <Divider sx={{mb: 2}} />
      <Typography variant="subtitle1">Building a team</Typography>
      <Typography variant="paragraph" gutterBottom sx={{ mt: 1 }}>
        Building a resilient team that makes real impact takes dedication and
        intentionality. After leading multiple cross-functional roles and
        working within a wide-variety of remote setups, I'm happy to share how
        personality and core values can be a true asset to your team-building
        approach. Schedule a call and we'll start building your skills to build
        a team right away.
      </Typography>
      <Divider sx={{mb: 2}} />
      <Typography variant="subtitle1">Email marketing</Typography>

      <Typography variant="paragraph" gutterBottom sx={{ mt: 1 }}>
        I started my career on the technical side of email and now use email as
        a primary channel for online nonprofit fundraising. If you're looking
        for someone to brainstorm and set a strategic vision for the role email
        plays in your growth strategy, I'm your gal. Let's chat.
      </Typography>
      <Divider sx={{mb: 2}} />
      <Typography variant="subtitle1">Mindset coaching</Typography>

      <Typography variant="paragraph" gutterBottom sx={{ mt: 1 }}>
        Whether you're a startup founder that needs help finding their
        blindspots or you're simply looking for a more sustainable approach to
        your work, I can help. So much of what we believe about ourselves
        manifests in our work. If you're having doubts, I'll help you break bad
        mental habits to help you become more resilient and achieve what really
        matters to you.
      </Typography>
      <Divider sx={{mb: 2}} />
      <Typography variant="subtitle1">Product market fit</Typography>

      <Typography variant="paragraph" gutterBottom sx={{ mt: 1 }}>
        Product Market Fit is the degree to which a product satisfies a strong
        market demand and is foundational for growth. Many people have the
        misconception that they can “growth hack” their way to product/market
        fit (PMF). Trying to do this is generally very frustrating, expensive
        and unsustainable. Are you unsure if you have PMF? Do you need help
        getting to PMF? I have a proven framework to help you assess your PMF
        and use customer insights to unlock growth.
      </Typography>
      <Divider sx={{mb: 2}} />
      <Typography variant="subtitle1">Remote work</Typography>

      <Typography variant="paragraph" gutterBottom sx={{ mt: 1 }}>
        I've worked remotely both with a full-time role and as a consultant.
        It's not easy for everyone, but I've learned strategies that work for
        staying productive & fulfilled. If you're feeling burned out or lost,
        book a time with me and we'll help you build a strategy that works for
        YOU.{" "}
      </Typography>
      <Divider sx={{mb: 2}} />
    </Stack>
  );
}

export default MentorBioExpertise;
