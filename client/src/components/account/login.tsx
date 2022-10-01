import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form"; 
import { LoadingButton } from "@mui/lab";

import { signInUser } from "../../app/store/account.slice";
import { useAppDispatch } from '../../app/store/store.config';
import { history } from "../../main";

const Login = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<{ username: ""; password: "" }>({ mode: "all" });

  //FieldValues คือ ค่าทั้งหมดภายใน Form
  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      history.push("/catalog")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Username"
              autoComplete="username" 
              {...register("username", { required: "Username is required" })}
              error={!!errors.username}
              helperText={errors?.username?.message}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />
            <LoadingButton
              disabled={!isValid}
              loading={isSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
            >
              Login
            </LoadingButton>
            <Button
              component={Link}
              to="/register"
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
