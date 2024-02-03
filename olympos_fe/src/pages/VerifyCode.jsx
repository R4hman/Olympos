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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { setCokieHandler } from "../helper/setCookie";
import Logo from "../components/home/Logo"


const defaultTheme = createTheme();

//*random verification code
function generateVerificationCode() {
  const code = Math.floor(1000 + Math.random() * 9000);
  return code.toString();
}

const baseUrl = import.meta.env.VITE_BASE_URL;

export default function VerifyCode() {
  const [userInput, setUserInput] = useState("");
  const [verificationCode, setVerificationCode] = useState(
    generateVerificationCode()
  );
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // const isVerified = userInput === verificationCode;

  // const [verificationCodeError, setVerificationCodeError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (verificationCode === "") {
      // setVerificationCodeError(true);
    }

    fetch(`${baseUrl}/auth/verify_code`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ verify_code: userInput }),
    })
      .then((res) => {
        return res.json(); // Parse the response data as JSON
      })
      .then((data) => {
        if (data?.token?.length) {
          toast.success(data?.message);
          setCokieHandler("token", data?.token);
          navigate("/recoveryPass");
        } else if (data?.statusCode === 401) {
          toast.error(data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
        // Handle errors here
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        flexWrap={"nowrap"}
        container
        gap={"16px"}
        component="main"
        sx={{ height: "95vh" }}
      >
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
            }}
          >
            <RouterLink to="/">
              {/* <Box
                sx={{
                  alignSelf: "start",
                  width: "60px",
                  height: "15px",
                  marginBottom: "10px",
                  backgroundImage: 'url("/assets/logo.svg")',
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              /> */}
              <Logo />
            </RouterLink>

            <Typography component="h1" variant="h5" sx={{ alignSelf: "start" }}>
              Verify Code
            </Typography>
            <Typography sx={{ fontSize: "0.8rem" }}>
              An authentication code has been sent to your email.
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={(e) => setUserInput(e.target.value)}
                type="text"
                value={userInput}
                // error={verificationCodeError}
                margin="normal"
                required
                fullWidth
                id="verifyCode"
                label="Enter Code"
                name="verifyCode"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "#8DD3BB", color: "#121" }}
              >
                <Typography sx={{ fontSize: "0.7rem", fontWeight: "500" }}>
                  Verify
                </Typography>
              </Button>
              <Grid container>
                <Grid item xs>
                  <RouterLink to="/forgotPassword" variant="body2">
                    Forgot password?
                  </RouterLink>
                </Grid>
                <Grid item>
                  <RouterLink to="/signup">
                    {"Hesabınız yoxdur? Qeydiyyat edin"}
                  </RouterLink>
                </Grid>

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
                </Box>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url("/assets/loginImg.svg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}
