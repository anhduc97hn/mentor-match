import React, { useEffect, useMemo, useState } from "react";
import FTextField from "../../../components/form/FTextField";
import FormProvider from "../../../components/form/FormProvider";
import FSelect from "../../../components/form/FSelect";
import LoadingScreen from "../../../components/LoadingScreen";
import MentorList from "./MentorList";
import {
  Alert,
  Box,
  Container,
  InputAdornment,
  Pagination,
  Stack,
  Typography,
  Button
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import "./BrowseMentorPage.css";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { getUserProfile } from "../../../slices/userProfileSlice";
import FAutoComplete from "../../../components/form/FAutoComplete";

function BrowseMentorPage() {

  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const dispatch = useDispatch();
  const {
    currentPageUsers,
    userProfilesById,
    isLoading,
    error,
    total,
    totalPages,
  } = useSelector((state) => state.userProfile);
  const mentors = currentPageUsers.map((userId) => userProfilesById[userId]);

  const defaultValues = {
    searchQuery: "",
    sortBy: "reviewDesc",
    company: "",
    position: "",
    city: "",
  };
  const methods = useForm({
    defaultValues,
  });

  const { reset, handleSubmit } = methods;

  const [updates, setUpdates] = useState(defaultValues);

  const onSubmit = (data) => {
    setUpdates(data);
  };

  const handleReset = () => {
    setUpdates(defaultValues);
    reset();
  };

  useEffect(() => {
      dispatch(getUserProfile({ filter: updates, page }));
  }, [dispatch, updates, page]);

  // Calculate filter options inline
  const filterOptions = useMemo(() => {
    const uniqueCompanies = new Set();
    const uniquePositions = new Set();
    const uniqueCities = new Set();

    mentors.forEach((mentor) => {
      uniqueCompanies.add(mentor.currentCompany);
      uniquePositions.add(mentor.currentPosition);
      uniqueCities.add(mentor.city);
    });

    return {
      company: Array.from(uniqueCompanies),
      position: Array.from(uniquePositions),
      city: Array.from(uniqueCities),
    };
  }, [mentors]);

  const renderMenu = [
    {
      label: "Company",
      name: "company",
      options: filterOptions.company,
    },
    {
      label: "Position",
      name: "position",
      options: filterOptions.position,
    },
    {
      label: "City",
      name: "city",
      options: filterOptions.city,
    },
  ];

  return (
    <section className="mentorlist-page">
      <Container
        sx={{
          backgroundColor: "primary.light",
          padding: 2,
          m: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        maxWidth="false"
      >
        {isLoading ? (
          <LoadingScreen sx={{ top: 0, left: 0 }} />
        ) : (
          <>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Box className="search-bar" sx={{ height: "200px", borderRadius: 1.5, width: "100%" }}>
                <FTextField
                  name="searchQuery"
                  size="medium"
                  variant="standard"
                  sx={{ p: 1, mt: 5 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ height: "200px" }}>
                        <SearchIcon sx={{ width: "30px", height: "30px" }} color="primary" />
                      </InputAdornment>
                    ),
                    placeholder: "Search by mentor name",
                  }}
                />

                <Stack
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-around",
                    p: 1,
                    mt: 2,
                    width: "100%",
                  }}
                  direction="row"
                  spacing={2}
                >
                  {renderMenu.map((item) => (
                    <FAutoComplete
                      key={item.name}
                      name={item.name}
                      label={item.label}
                      options={item.options}
                      sx={{
                        width: "25%",
                        border: "1px solid #9DA4AE",
                        borderRadius: 1,
                      }}
                    />
                  ))}
                  <FSelect name="sortBy" label="Sort By" size="medium" sx={{ width: { sm: "auto", md: "15%", xs: "auto" } }}>
                    {[
                      { value: "reviewDesc", label: "Most Rating" },
                      { value: "sessionDesc", label: "Most Sessions" },
                      { value: "newest", label: "Most Recent" },
                    ].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </FSelect>
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
                <Typography variant="subtitle1">{`${total} mentors found`}</Typography>
                <Stack
                  flexDirection="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    sx={{ mr: 1 }}
                    variant="contained"
                    size="small"
                    // loading={isLoading}
                    type="submit"
                  >
                    Search
                  </Button>
                  <Button variant="outlined" size="small" onClick={handleReset}>
                    Reset
                  </Button>
                </Stack>
              </Stack>
            </FormProvider>
            <Box sx={{ position: "relative", height: 1 }}>{error ? <Alert severity="error">{error}</Alert> : <MentorList mentors={mentors} />}</Box>
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Pagination count={totalPages} page={page} onChange={handleChange} />
            </Box>
          </>
        )}
      </Container>
    </section>
  );
}

export default BrowseMentorPage;
