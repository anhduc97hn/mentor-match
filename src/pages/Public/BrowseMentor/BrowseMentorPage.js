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
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import "./BrowseMentorPage.css";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { getUserProfile } from "../../../slices/userProfileSlice";
import { applyFilter } from "../../../utils/mentorFilters";
import FAutoComplete from "../../../components/form/FAutoComplete";

function BrowseMentorPage() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { currentPageUsers, userProfilesById, isLoading, error } = useSelector(
    (state) => state.userProfile
  );
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

  const { watch } = methods;
  const filters = watch();
  console.log("filters", filters)

  const filteredMentors = applyFilter(mentors, filters);
  // const [filterOptions, setFilterOptions] = useState({
  //   company: [],
  //   position: [],
  //   city: [],
  // });

  // Fetch all mentors
  useEffect(() => {
    dispatch(getUserProfile({ page }));
  }, [dispatch, page]);

  // Extract filter options from the existing mentor data
  // useEffect(() => {
  //   if (mentors.length > 0) {
  //     const extractFilterOptions = () => {
  //       const uniqueCompanies = new Set();
  //       const uniquePositions = new Set();
  //       const uniqueCities = new Set();
    
  //       mentors.forEach((mentor) => {
  //         uniqueCompanies.add(mentor.currentCompany);
  //         uniquePositions.add(mentor.currentPosition);
  //         uniqueCities.add(mentor.city);
  //       });
    
  //       setFilterOptions({
  //         company: Array.from(uniqueCompanies),
  //         position: Array.from(uniquePositions),
  //         city: Array.from(uniqueCities),
  //       });
  //     };
  //     extractFilterOptions();
  //   }
  // }, [mentors]);

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
        <FormProvider methods={methods}>
          <Box
            className="search-bar"
            sx={{ height: "200px", borderRadius: 1.5 }}
          >
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
                placeholder: "Search by mentor name",
              }}
            />

            <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                mt: 2,
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
                    width: 300,
                    border: "1px solid #9DA4AE",
                    borderRadius: 1,
                  }}
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
              sx={{ width: "auto" }}
            >
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
          <Box sx={{ position: "relative", height: 1 }}>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <MentorList mentors={filteredMentors} />
                )}
              </>
            )}
          </Box>
        </FormProvider>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <LoadingButton
            sx={{ width: "200px" }}
            variant="outlined"
            size="small"
            loading={isLoading}
            onClick={() => setPage((page) => page + 1)}
          >
            Load more
          </LoadingButton>
        </Box>
      </Container>
    </section>
  );
}

export default BrowseMentorPage;
