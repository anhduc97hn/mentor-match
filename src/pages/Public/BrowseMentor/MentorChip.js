import { Chip, Stack } from '@mui/material'
import React from 'react'

function MentorChip({labels}) {
  return (
    <Stack direction="row" spacing={1} sx={{alignItems: "center"}}>
    {labels?.map((tool) => (
      <Chip label={tool} variant="outlined" />
    ))}
  </Stack>
  )
}

export default MentorChip