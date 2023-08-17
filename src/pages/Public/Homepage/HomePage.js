import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import "./HomePage.css";
import { Link as RouterLink } from "react-router-dom";
import FeaturedMentorList from "./FeaturedMentorList";

function HomePage() {
  return (
    <>
      <section className="hero__section">
        <Container width="100%" sx={{ display: "flex" }}>
          <Box
            sx={{
              mt: 12,
              width: "570px",
              display: "flex",
              flexDirection: "column",
            }}
            gap={5}
          >
            <Typography variant="h1">
              Grow your startup faster with 1:1 mentorship
            </Typography>
            <Typography variant="subtitle1">
              Pick the brains of mentors who have driven growth at some of the
              world's leading startups. See the blind spots in your
              decision-making
            </Typography>
            <Stack flexDirection="row" gap={2}>
              <Button variant="outlined" component={RouterLink} to="/login">
                Get Started & Get Growing {">"}
              </Button>
              <Button
                variant="outlined"
                component="a"
                href="https://www.youtube.com/watch?v=x9kQ8m2ex4k&t=35s"
              >
                What people are saying
              </Button>
            </Stack>
            <Stack>
              <Typography variant="h6" sx={{ mb: 3 }}>
                WITH HUNDREDS OF MENTORS JUST A CLICK AWAY, YOU CAN:
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                ✓ Validate ideas before executing
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                ✓ Get personalized advice for your situation
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                ✓ Get clarity on things you're struggling with
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                ✓ Skip the trial-and-error of doing it yourself
              </Typography>
            </Stack>
          </Box>
          <Box sx={{ width: 500, height: 500, mt: 25, ml: 10 }}>
            <img
              src="/assets/images/hero-img.jpg"
              alt="hero__img"
              width="100%"
            />
          </Box>
        </Container>
      </section>

      <section className="mentor__section">
        <Container
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 5,
            mb: 2,
          }}
        >
          <Typography variant="h5">
            Get instant access to startup mentors from amazing companies like:
          </Typography>
          <Stack
            flexDirection="row"
            gap={3}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              sx={{
                width: "150px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="assets/images/appsumo-logo.jpg"
                alt="company logo"
                width="100%"
              />
            </Box>
            <Box
              sx={{
                width: "150px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="assets/images/semrush-logo.jpg"
                alt="company logo"
                width="100%"
              />
            </Box>
            <Box
              sx={{
                width: "150px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="assets/images/coderschool-logo.png"
                alt="company logo"
                width="100%"
              />
            </Box>
            <Box
              sx={{
                width: "150px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="assets/images/spotify-logo.png"
                alt="company logo"
                width="100%"
              />
            </Box>
            <Box
              sx={{
                width: "150px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="assets/images/netflix-logo.png"
                alt="company logo"
                width="100%"
              />
            </Box>
            <Box
              sx={{
                width: "150px",
                height: "120px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="assets/images/grab-logo.png"
                alt="company logo"
                width="100%"
              />
            </Box>
          </Stack>
        </Container>

        <div className="mentor__list">
          <Container
            width="100%"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: 5,
              mb: 5,
              flexGrow: 1,
            }}
          >
            <Typography variant="h5" sx={{ mb: 3 }}>
              Talk to the operators actively doing the work
            </Typography>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Get the kind of personalised advice you'd never find by passively
              binging content.
            </Typography>
            <FeaturedMentorList />
          </Container>
        </div>
        <Container
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mt: 5,
            mb: 5,
          }}
        >
          <Typography variant="h5">
            Want to browse the rest of the mentors?
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 3 }}
            component={RouterLink}
            to="/mentors"
          >
            BROWSE +100 MENTORS BEFORE JOINING
          </Button>
        </Container>
      </section>

      <section className="numbers__section">
        <Container>
          <Stack
            flexDirection="row"
            gap={3}
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <Box>
              <Typography variant="h2">33,000+</Typography>
              <Typography variant="subtitle1">
                Sessions booked since 2018
              </Typography>
            </Box>
            <Box>
              <Typography variant="h2">27</Typography>
              <Typography variant="subtitle1">
                Events organised around the world by our community
              </Typography>
            </Box>
            <Box>
              <Typography variant="h2">4.7</Typography>
              <Typography variant="subtitle1">
                Average sessions / month per mentee
              </Typography>
            </Box>
          </Stack>
        </Container>
      </section>
    </>
  );
}

export default HomePage;
