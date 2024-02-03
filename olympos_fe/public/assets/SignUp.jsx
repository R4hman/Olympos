import * as React from "react";

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
import { useState } from "react";

const defaultTheme = createTheme();

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
 const [lastnameError, setLastnameError] = useState(false)
 const [firstnameError, setFirstnameError] = useState(false)
 const [phoneNumberError, setPhoneNumberError] = useState(false)
 const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);
    setLastnameError(false);
    setFirstnameError(false);
    setPhoneNumberError(false);
    setConfirmPasswordError(false)

    if (email === "") {
      setEmailError(true);
    }
    if (password === "") {
      setPasswordError(true);
    }
  
    if (confirmPassword === "") {
      setConfirmPasswordError(true);
    }
    if (lastname === "") {
      setLastnameError(true);
    }
    if (firstname === "") {
      setFirstnameError(true);
    }
    if (phoneNumber === "") {
      setPhoneNumberError(true);
    }
   
   
    if (email && password && lastname && firstname) {
      fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password,firstname,lastname,confirmPassword,phoneNumber }),
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        flexWrap={"nowrap"}
        container
        gap={"16px"}
        component="main"
        // sx={{ height: "90vh" }}
      >
        <CssBaseline />
        <Grid
          item
          sm={5}
          md={6}
          sx={{
            // borderRadius:'.5rem',
             
            backgroundImage: 'url("/images/loginImg.svg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item  sm={7} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
            }}
          >
            <Box
              sx={{
                alignSelf: "start",
                width: "60px",
                height: "15px",
                marginBottom: "10px",
                backgroundImage: 'url("/images/logo.svg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <Typography component="h1" variant="h5" sx={{ alignSelf: "start" }}>
              Qeydiyyat
            </Typography>
            <Typography sx={{ fontSize: "0.7rem" }}>
              Şəxsi hesaba malik olmaq və yeniliklərdən xəbərdar olmaq üçün qeydiyyat edin.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              {/* <Box sx={{display:'flex'}}> */}
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    value={firstname}
                    error={firstnameError}
                    // margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="firstname"
                    // autoComplete="email"
                    size="small"
                    autoFocus
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                    error={lastnameError}
                    value={lastname}
                    // margin="normal"
                    required
                    fullWidth
                    name="lastname"
                    label="Last Name"
                    id="lastName"
                    size="small"
                    // autoComplete="current-password"
                  />
                </Grid>
                {/* </Box> */}

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                    error={emailError}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    size="small"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="phoneNumber"
                    error={phoneNumberError}
                    value={phoneNumber}
                    required
                    fullWidth
                    name="phoneNumber"
                    label="Phone Number"
                    id="phoneNumber"
                    size="small"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    error={passwordError}
                    value={password}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    size="small"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    type="password"
                    error={confirmPasswordError}
                    value={confirmPassword}
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    id="confirmPassword"
                    size="small"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={
                  <Typography sx={{fontSize:"12px"}}>
                    "I agree to all the <span style={{color:'red'}}>Terms</span> and <span style={{color:'red'}}>Privacy Policies</span>"
                  </Typography>
                }
                
              />
              <Button
                type="submit"
                fullWidth
                
                variant="contained"
                sx={{ mt: 3, mb: 0, backgroundColor: "#8DD3BB", color: "#121", marginBottom:'1rem' }}
              >
                <Typography sx={{ fontSize: "0.7rem" ,fontWeight:'500'}}> Create Account</Typography>
              </Button>
              <Typography
              sx={{fontSize:"12px", textAlign:'center', marginRight:'0.5rem'}}>
              Already have an account? 
              <Box sx={{color:'red',display:'inline-block'}}>
                Login

              </Box>
              </Typography>
              <Grid container>
               

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "10px",
                    color: "#121",
                    opacity: ".4",
                    marginTop: "1rem",
                    width: "100%",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#121",
                      flexGrow: "1",
                      opacity: ".4",
                      height: "1px",
                    }}
                  />
                  <Typography sx={{ fontSize: "0.7rem" }}>
                    Or Sign Up with
                  </Typography>
                  <Box
                    sx={{
                      flexGrow: "1",
                      height: "1px",
                      backgroundColor: "#121",
                      opacity: ".4",
                    }}
                  />
                </Box>
                <Link
                  href="https://myaccount.google.com/"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "3px",
                    border: "1px solid #8DD3BB",
                    cursor: "pointer",

                    width: "100%",
                    height: "2.5rem",

                    marginTop: "0.5rem",
                    marginInline: "auto",
                  }}
                >
                  <img src="./images/google.svg" alt="" />
                </Link>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
