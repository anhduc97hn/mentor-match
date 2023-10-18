import React, { useState } from 'react';
import { FCheckbox, FormProvider, FTextField } from "../../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup"; 
import { Alert, Box, Container, Divider, IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import {Link as RouterLink, useLocation, useNavigate } from "react-router-dom"
import useAuth from '../../hooks/useAuth';
import { GoogleLogin } from '@react-oauth/google';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required")
}); 

const defaultValues = {
  email: "",
  password: "",
  remember: true, 
};

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", error.errors ? error.errors : error);
    }
  };

  const handleGoogleResponse = async (res) => {
    const from = location.state?.from?.pathname || "/";
    const { credential } = res;
    try {
      await auth.loginWithGoogle({ idToken: credential }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      console.log("handleGoogleResponse", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ minWidth: "350px" }}>
          {!!errors.responseError && (
            <Alert severity="error">{errors.responseError.message}</Alert>
          )}
          <Alert severity="info">
            Don't have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Get started
            </Link>
          </Alert>

          <FTextField name="email" label="Email address" />
          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 2 }}
          >
            <FCheckbox name="remember" label="Remember me" />
            <Link
              component={RouterLink}
              variant="subtitle2"
              to="/forgetpassword"
            >
              Forgot password?
            </Link>
          </Stack>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Stack>
      </FormProvider>
      <Divider sx={{ borderStyle: "dashed", borderColor: "primary.main", m: 2}} variant="fullWidth" />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        gap={2}
      >
        <Typography variant='subtitle2'>Or sign in with Google </Typography>
        <GoogleLogin
          onSuccess={handleGoogleResponse}
          onError={() => {
            console.log("Login Failed");
          }}
          shape="pill"
        />
      </Box>
    </Container>
  );
}

export default LoginPage