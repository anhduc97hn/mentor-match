import { Divider, Stack, Typography } from "@mui/material";
import React from "react";

function MentorBioToolkit() {
  return (
    <Stack>
      <Typography variant="h5" gutterBottom>Toolkit</Typography>
      <Divider sx={{mb: 1.5}} />
      <Typography variant="subtitle1">ConstantContact</Typography>
      <Typography variant="caption">14 years of experience</Typography>
      <Typography variant="paragraph" gutterBottom sx={{mt: 1}}>
        Not my favorite email platform, but I certainly know how to use it! I've
        been using Constant Contact for nonprofit clients for years. If email
        production is what you're looking for help with, let me know.
      </Typography>
      <Divider sx={{mb: 1.5}} />
      <Typography variant="subtitle1">Hubspot</Typography>
      <Typography variant="caption">9 years of experience</Typography>
      <Typography variant="paragraph" gutterBottom sx={{mt: 1}}>
        I build CRM strategies for small companies and use Hubspot to facilitate
        lead generation and nurturing process for the marketing and sales team.
        Most of my setups involve some integration with other platforms like
        Unbounce, MailChimp, Zapier, etc.
      </Typography>
      <Divider sx={{mb: 1.5}} />
      <Typography variant="subtitle1">Mailchimp</Typography>
      <Typography variant="caption">12 years of experience</Typography>
      <Typography variant="paragraph" gutterBottom sx={{mt: 1}}>
        I've used Mailchimp for small and large accounts. Everything from
        setting up onboarding emails for personal blogs to large email
        newsletters like the GrowthHackers Top Posts weekly email.
      </Typography>
      <Divider sx={{mb: 1.5}} />
      <Typography variant="subtitle1">Marketo</Typography>
      <Typography variant="caption">12 years of experience</Typography>
      <Typography variant="paragraph" gutterBottom sx={{mt: 1}}>
        I used Marketo while at Payoff where I managed the entire loan funnel.
        Need help getting your marketing automation off the ground or just need
        a second set of eyes on your own work? I can help.
      </Typography>
      <Divider sx={{mb: 1.5}} />
    </Stack>
  );
}

export default MentorBioToolkit;
