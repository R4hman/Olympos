// import * as React from 'react'

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { loginHandler } from "../../services/apiAuth";
import { setCokieHandler } from "../../helper/setCookie";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/userSlice";
import { useRef, useState } from "react";
// import logo from "../../../public/Logo.jpeg"
import Logo from "../home/Logo"


const defaultTheme = createTheme();

export default function Auth({ isRememberMe, setIsRememberMe }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (isRememberMe) {
      loginData = {
        email: data.get("email"),
        password: data.get("password"),
        isRememberMe: isRememberMe,
      };
    }
    loginHandler(loginData).then((data) => {
      // if (data.role === "user") {
      //   dispatch(login())
      // }

      if (data?.token) {
        setCokieHandler("token", data.token);
        setCokieHandler("role", data.role);

        // navigate(
        //   data?.role === "admin"
        //     ? "/admin-panel"
        //     : data?.role === "user"
        //     ? "/account"
        //     : "/login"
        // );
        if (data.token && data.token.length && data.role === "admin") {
          navigate("/admin-panel");
        } else if (data && data.role === "user") {
          navigate("/account");
        }
        // : data?.role === "user"
        // ? "/account"
        // : null

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    });
  };

  const handleCheckboxChange = (event) => {
    setIsRememberMe(event.target.checked);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        flexWrap={"nowrap"}
        container
        gap={"16px"}
        component="main"
        sx={{ height: "80vh" }}
      >
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <RouterLink to="/">
              {/* <Box
                sx={{
                  alignSelf: "start",
                  width: "60px",
                  height: "15px",
                  marginBottom: "30px",
                  backgroundImage: 'url("../../../public/Logo.jpeg")',
                  backgroundRepeat: "no-repeat",

                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              /> */}
              <Logo />
            </RouterLink>

            <Typography component="h1" variant="h5" sx={{ alignSelf: "start" }}>
              Giriş
            </Typography>
            <Typography>Olympos travel hesabınıza daxil olun!</Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    checked={isRememberMe}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Daxil ol
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link></Link>
                  {/* <Link href="#" variant="body2">

                  </Link> */}
                  <RouterLink to="/forgotpassword">Şifrəni unutmusan?</RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to="/signup">
                    {"Hesabınız yoxdur? Qeydiyyat edin"}
                  </RouterLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>

        <Grid
          item
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("public/assets/loginImg.svg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
