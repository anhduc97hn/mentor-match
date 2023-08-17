import {
  Alert,
  Avatar,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FTextField from "../../components/form/FTextField";
import FormProvider from "../../components/form/FormProvider";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import FPickDateTime from "../../components/form/FPickDateTime"

const RequestSchema = Yup.object().shape({
  topic: Yup.string().required("Topic is required"),
  problem: Yup.string().required("Challenge is required"),
  schedule: Yup.date().required("Please select a timeslot")
});

const defaultValues = {
  topic: "",
  problem: "",
  schedule: null
};

function SessionPage() {

  const navigate = useNavigate()

  const methods = useForm({
    resolver: yupResolver(RequestSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log("data", data)
    alert(data)
    navigate("/account/session")
  };

  return (
    <Container maxWidth="false" sx={{ bgcolor: "primary.light", p: 5 }}>
      <Card sx={{ p: 5, mr: "25%", ml: "25%" }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Typography variant="h5" gutterBottom>
            Session details
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Avatar sx={{ width: "50px", height: "50px" }} />
            <Stack>
              <Typography variant="body1">Mentor</Typography>
              <Typography variant="subtitle1">Nguyen Anh Thong</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 3, mb: 3 }} />
          <Typography variant="subtitle1" gutterBottom>
            Schedule Session
          </Typography>
          <Typography variant="body2" gutterBottom>
            Sessions should be scheduled at least 24 hours in advance.
          </Typography>
          <FPickDateTime
            sx={{ mt: 2, mb: 1 }}
            label="Select Date/Time"
            name="schedule"
          />
          <Divider sx={{ mt: 3, mb: 3 }} />
          <Stack spacing={3}>
            <FTextField name="topic" label="Topic" />
            <FTextField name="problem" label="Problem/challenge" multiline rows={4} />
            </Stack>
            <LoadingButton
            sx={{mt: 3}}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Confirm session request
          </LoadingButton>
     
        </FormProvider>
      </Card>
    </Container>
  );
}

export default SessionPage;
