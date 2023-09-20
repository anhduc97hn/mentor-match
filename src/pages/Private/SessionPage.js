import {
  Alert,
  Avatar,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FTextField from "../../components/form/FTextField";
import FormProvider from "../../components/form/FormProvider";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendSessionRequest } from "../../slices/sessionSlice";
import { getSingleUserProfile } from "../../slices/userProfileSlice";
import LoadingScreen from "../../components/LoadingScreen"
import FDateTimePicker from "../../components/form/FPickDateTime";

const RequestSchema = Yup.object().shape({
  topic: Yup.string().required("Please enter a topic for this session"),
  problem: Yup.string().required("Please write a brief for your topic"),
  startDateTime: Yup.date().required("Please select your preferred timeslot")});

const defaultValues = {
  topic: "",
  problem: "",
  startDateTime: null,
  endDateTime: null
};

function SessionPage() {

  const [endDateTime, setEndDateTime] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { userProfileId } = params; 
  const { selectedUser, isLoading, error } = useSelector(
    (state) => state.userProfile
  );

  const methods = useForm({
    resolver: yupResolver(RequestSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = methods;

  // Function to handle startDateTime change
  const handleStartDateTimeChange = (value) => {
    const startDate = new Date(value);
    startDate.setHours(startDate.getHours() + 1);
    setEndDateTime(startDate.toISOString());
    setValue("endDateTime", startDate.toISOString());
  };

  useEffect(() => {
    dispatch(getSingleUserProfile(userProfileId))
  }, [dispatch, userProfileId])
  
  const onSubmit = async (data) => {
    console.log("session info", data)
    dispatch(sendSessionRequest({userProfileId, data}))
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
          {isLoading ? (
              <LoadingScreen />
            ) : (
              <>
                {error ? (
                  <Alert severity="error">{error}</Alert>
                ) : (
                  <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                  <Avatar sx={{ width: "50px", height: "50px" }} src={selectedUser.avatarUrl} />
                  <Stack>
                    <Typography variant="body1">Mentor</Typography>
                    <Typography variant="subtitle1">{selectedUser.name}</Typography>
                  </Stack>
                </Stack>
                )}
              </>
            )}
          <Divider sx={{ mt: 3, mb: 3 }} />
          <Typography variant="subtitle1" gutterBottom>
            Schedule Session
          </Typography>
          <Typography variant="body2" gutterBottom>
            Sessions should be scheduled at least 24 hours in advance.
          </Typography>
          <FDateTimePicker
            sx={{ mt: 2, mb: 1 }}
            label="Select Start Date/Time "
            name="startDateTime"
            disablePast
            onChange={handleStartDateTimeChange} 
          />
           <FDateTimePicker
            sx={{ mt: 2, mb: 1 }}
            label="Select End Date/Time"
            name="endDateTime"
            value={endDateTime} 
            disabled={true} 
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
