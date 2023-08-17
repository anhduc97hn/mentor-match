import { LoadingButton } from "@mui/lab";
import { InputAdornment, Stack } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import React, { useState } from "react";
import FormProvider from "../../components/form/FormProvider";
import { FTextField } from "../../components/form";
import { useForm } from "react-hook-form";

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

function AccountSocial() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = {
    facebookLink: user?.facebookLink || "",
    instagramLink: user?.instagramLink || "",
    linkedinLink: user?.linkedinLink || "",
    twitterLink: user?.twitterLink || "",
  };

  const methods = useForm({
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    alert(data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} alignItems="flex-end">
        {SOCIAL_LINKS.map((link) => (
          <FTextField
            key={link.value}
            name={link.value}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">{link.icon}</InputAdornment>
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
    </FormProvider>
  );
}

export default AccountSocial;
