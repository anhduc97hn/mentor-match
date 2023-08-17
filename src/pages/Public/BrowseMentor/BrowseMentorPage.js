import React, { useState } from "react";
import FTextField from "../../../components/form/FTextField";
import FormProvider from "../../../components/form/FormProvider";
import FSelect from "../../../components/form/FSelect";
import LoadingScreen from "../../../components/LoadingScreen";
import MentorList from "./MentorList";
import {
  Alert,
  Autocomplete,
  Box,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import "./BrowseMentorPage.css";

const renderMenu = [
  {
    label: "Skill",
    options: [{ label: "front end" }, { label: "back end" }],
  },
  {
    label: "Software",
    options: [{ label: "front end" }, { label: "back end" }],
  },
  {
    label: "Industry",
    options: [{ label: "front end" }, { label: "back end" }],
  },
  {
    label: "Language",
    options: [{ label: "Vietnamese" }, { label: "English" }],
  },
  {
    label: "Country",
    options: [{ label: "Vietnam" }, { label: "United States" }],
  },
];

function BrowseMentorPage() {
  const defaultValues = {
    searchQuery: "",
  };
  const methods = useForm({
    defaultValues,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mentors, setMentors] = useState([]);

  const filterMentors = [
    "Duc",
    "Thong",
    "Duc",
    "Thong",
    "Duc",
    "Thong",
    "Duc",
    "Thong",
    "Duc",
    "Thong",
    "Duc",
    "Thong",
  ];

  return (
    <section className="mentorlist-page">
      <Container
        sx={{ backgroundColor: "primary.light", padding: 2, m: 0 }}
        maxWidth="false"
      >
        <FormProvider methods={methods}>
          <Box className="search-bar" sx={{ height: "200px" }}>
            <FTextField
              name="searchQuery"
              size="medium"
              variant="standard"
              sx={{ p: 1, mt: 5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ height: "200px" }}>
                    <SearchIcon
                      sx={{ width: "30px", height: "30px" }}
                      color="primary"
                    />
                  </InputAdornment>
                ),
                placeholder: "Search by name or keywords",
              }}
            />

            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                gap: 0.5,
                p: 1,
                mt: 2,
              }}
              flexDirection="row"
            >
              {renderMenu.map((item) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={item.options}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label={item.label} />
                  )}
                />
              ))}
            </Stack>
          </Box>
          <Stack
            flexDirection="row"
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
              mb: 2,
            }}
          >
            <Typography variant="subtitle1">100 mentors found</Typography>
            <FSelect
              name="sortBy"
              label="Sort By"
              size="medium"
              sx={{ width: 150 }}
            >
              {[
                { value: "Reviews", label: "Reviews" },
                { value: "Newest", label: "Newest" },
                { value: "Oldest", label: "Oldest" },
              ].map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </FSelect>
          </Stack>
          <Box sx={{ position: "relative", height: 1 }}>
            {loading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <MentorList mentors={filterMentors} />
                )}
              </>
            )}
          </Box>
        </FormProvider>
      </Container>
    </section>
  );
}

export default BrowseMentorPage;
