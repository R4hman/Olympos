import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const defaultTheme = createTheme();
const baseUrl = import.meta.env.VITE_BASE_URL;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);

    if (email === "") {
      setEmailError(true);
    }

    if (email) {
      fetch(`${baseUrl}/auth/forgetPass`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then((res) => {
          return res.json(); // Parse the response data as JSON
        })
        .then((data) => {
          if (data?.statusCode === 200) {
            toast.success(data?.message);
            navigate("/verifyCode");
          } else if (data?.statusCode === 404) {
            toast.error(data?.message);
          }
          // Handle the parsed JSON data here
        })
        .catch((err) => {
          console.log(err);
          // Handle errors here
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

        {/* vbnm, */}

        <Grid item sm={6} md={6} component={Paper} elevation={6} square>
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

            <Link
              href="/login"
              sx={{
                fontSize: "0.7rem",
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
                paddingTop: "20px",
                paddingBottom: "20px",
              }}
            >
              <ArrowBackIos sx={{ fontSize: "10px" }} />
              Back to Login
            </Link>

            <Typography sx={{ fontSize: "1.2rem", fontWeight: "500" }}>
              Forgot your password?
            </Typography>
            <Typography
              sx={{
                fontSize: "10px",
              }}
            >
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                value={email}
                error={emailError}
                margin="normal"
                size="small"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#8DD3BB", color: "#121" }}
              >
                <Typography sx={{ fontSize: "0.7rem" }}> Login</Typography>
              </Button>
              {/* <Grid> */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "10px",
                  color: "#121",
                  opacity: ".4",
                  marginTop: "2.5rem",
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
                {/* <Typography sx={{ fontSize: "0.7rem" }}>
                  Or Login with
                </Typography> */}
                {/* <Box
                  sx={{
                    flexGrow: "1",
                    height: "1px",
                    backgroundColor: "#121",
                    opacity: ".4",
                  }}
                /> */}
              </Box>
              {/* <Link
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
              </Link> */}
              {/* </Grid> */}
            </Box>
          </Box>
        </Grid>

        {/* //bfvdsaf */}

        <Grid
          item
          sm={6}
          md={6}
          lg={6}
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
