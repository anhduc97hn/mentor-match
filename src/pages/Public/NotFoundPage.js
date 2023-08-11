import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material'
import React from 'react'
import MainHeader from '../../layout/MainHeader'
import MainFooter from '../../layout/MainFooter'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link as RouterLink } from "react-router-dom"

function NotFoundPage() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
    <MainHeader />
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            <img
              alt="Under development"
              src="/assets/images/error-404.png"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="h3"
          >
            404: The page you are looking for isn't here
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            variant="body1"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            startIcon={(
              <SvgIcon fontSize="small">
                <ArrowBackIcon />
              </SvgIcon>
            )}
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back to homepage
          </Button>
        </Box>
      </Container>
    </Box>
    <MainFooter />
  </Stack>
  )
}

export default NotFoundPage