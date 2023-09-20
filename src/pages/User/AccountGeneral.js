import React, { useCallback } from "react";
import FormProvider from "../../components/form/FormProvider";
import {
  Box,
  Card,
  Grid,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import FTextField from "../../components/form/FTextField";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { fData } from "../../utils/numberFormat";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FUploadAvatar from "../../components/form/FUploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import { updateUserProfile } from "../../slices/userProfileSlice";
import useAuth from "../../hooks/useAuth";

const UserGeneralSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

const SOCIAL_LINKS = [
  {
    value: "facebookLink",
    icon: <FacebookIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "instagramLink",
    icon: <InstagramIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "linkedinLink",
    icon: <LinkedInIcon sx={{ fontSize: 30 }} />,
  },
  {
    value: "twitterLink",
    icon: <TwitterIcon sx={{ fontSize: 30 }} />,
  },
];

function AccountGeneral() {
  
  const {userProfile} = useAuth();
  const isLoading = useSelector((state) => state.userProfile.isLoading);
  const dispatch = useDispatch();

  const defaultValues = {
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    currentCompany: userProfile?.currentCompany || "",
    currentPosition: userProfile?.currentPosition || "",
    avatarUrl: userProfile?.avatarUrl || "",
    city: userProfile?.city || "",
    aboutMe: userProfile?.aboutMe || "",
    facebookLink: userProfile?.facebookLink || "",
    instagramLink: userProfile?.instagramLink || "",
    linkedinLink: userProfile?.linkedinLink || "",
    twitterLink: userProfile?.twitterLink || "",
  };

  const methods = useForm({
    resolver: yupResolver(UserGeneralSchema),
    defaultValues,
  });
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          "avatarUrl",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  const onSubmit = (data) => {
    console.log("user general info", data)
    dispatch(updateUserProfile(data));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: "center" }}>
            <FUploadAvatar
              name="avatarUrl"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: "auto",
                    display: "block",
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  Allowed *.jpeg, *.jpg, *.png, *.gif
                  <br /> max size of {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: "grid",
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
              }}
            >
              <FTextField name="name" label="Name" />
              <FTextField name="email" label="Email" disabled />
              <FTextField name="currentPosition" label="Current Position" />
              <FTextField name="currentCompany" label="Current Company" />
              <FTextField name="city" label="City" />
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <FTextField name="aboutMe" multiline rows={4} label="About Me" />
              {SOCIAL_LINKS.map((link) => (
                <FTextField
                  key={link.value}
                  name={link.value}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {link.icon}
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
              >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

export default AccountGeneral;
