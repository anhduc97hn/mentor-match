import { Chip, Stack } from '@mui/material'
import React from 'react'

function MentorChip({labels}) {
  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap">
    {labels?.map((label, index) => (
      <Chip label={label} variant="outlined" size="small" sx={{m: 0.5}} key={index+1}/>
    ))}
  </Stack>
  )
}

export default MentorChip