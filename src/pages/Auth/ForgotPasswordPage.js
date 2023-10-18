import React from "react";
import { FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Alert, Container, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuth from "../../hooks/useAuth";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const defaultValues = {
  email: "",
};

function ForgotPasswordPage() {
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { email } = data;
    try {
      await auth.forgotPassword(email, () => {
        reset();
      });
    } catch (error) {
      reset();
      setError("responseError", error.errors ? error.errors : error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ minWidth: "350px" }}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="warning">Please confirm your registered email</Alert>

          <FTextField name="email" label="Email address" />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Confirm
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default ForgotPasswordPage;
