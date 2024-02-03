import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { signupHandler } from "../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Logo from "../components/home/Logo"

const defaultTheme = createTheme();

export default function SignUp() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    repeat_password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [lastnameError, setLastnameError] = useState(false);
  const [firstnameError, setFirstnameError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const navigate = useNavigate();

  const setFormDataHandler = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError(false);
    setPasswordError(false);
    setLastnameError(false);
    setFirstnameError(false);
    setPhoneNumberError(false);
    setConfirmPasswordError(false);

    if (form.email === "") {
      setEmailError(true);
    }
    if (form.password === "") {
      setPasswordError(true);
    }
    if (form.repeat_password === "") {
      setConfirmPasswordError(true);
    }
    if (form.last_name === "") {
      setLastnameError(true);
    }
    if (form.first_name === "") {
      setFirstnameError(true);
    }
    if (form.phone_number === "") {
      setPhoneNumberError(true);
    }

    if (form.email && form.password && form.last_name && form.first_name) {
      signupHandler(form).then((data) => {
        if (data.message === "New user created") {
          navigate("/login");

          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
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

            backgroundImage: 'url("/assets/loginImg.svg")',
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        <Grid item sm={7} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 4,
              mx: 4,
            }}
          >
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
                    onChange={setFormDataHandler}
                    type="text"
                    value={form.first_name}
                    error={firstnameError}
                    // margin="normal"
                    required
                    fullWidth
                    id="firstname"
                    label="First Name"
                    name="first_name"
                    // autoComplete="email"
                    size="small"
                    autoFocus
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    onChange={setFormDataHandler}
                    type="text"
                    error={lastnameError}
                    value={form.last_name}
                    // margin="normal"
                    required
                    fullWidth
                    name="last_name"
                    label="Last Name"
                    id="lastName"
                    size="small"
                    // autoComplete="current-password"
                  />
                </Grid>
                {/* </Box> */}

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <TextField
                    onChange={setFormDataHandler}
                    type="email"
                    value={form.email}
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
                    onChange={setFormDataHandler}
                    type="phoneNumber"
                    error={phoneNumberError}
                    value={form.phone_number}
                    required
                    fullWidth
                    name="phone_number"
                    label="Phone Number"
                    id="phoneNumber"
                    size="small"
                    autoComplete="current-password"
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    onChange={setFormDataHandler}
                    type="password"
                    error={passwordError}
                    value={form.password}
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
                    onChange={setFormDataHandler}
                    type="password"
                    error={confirmPasswordError}
                    value={form.repeat_password}
                    required
                    fullWidth
                    name="repeat_password"
                    label="Confirm Password"
                    id="confirmPassword"
                    size="small"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>

              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label={
                  <Typography sx={{ fontSize: "12px" }}>
                    "I agree to all the{" "}
                    <span style={{ color: "red" }}>Terms</span> and{" "}
                    <span style={{ color: "red" }}>Privacy Policies</span>"
                  </Typography>
                }
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 0,
                  backgroundColor: "#8DD3BB",
                  color: "#121",
                  marginBottom: "1rem",
                }}
              >
                <Typography sx={{ fontSize: "0.7rem", fontWeight: "500" }}>
                  Hesab yarat
                </Typography>
              </Button>
              <Typography
                sx={{
                  fontSize: "12px",
                  textAlign: "center",
                  marginRight: "0.5rem",
                }}
              >
                Artıq olympos travel da hesabınız var?
                <Box
                  sx={{
                    // color: "red",
                    display: "inline-block",
                    ml: "0.5rem",
                    color: "transparent",
                    fontSize: "14px",
                  }}
                >
                  <Link style={{ color: "red" }} to="/login">
                    Giriş
                  </Link>
                </Box>
              </Typography>
              {/* <Grid container>
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
                  <img src="./assets/google.svg" alt="" />
                </Link>
              </Grid> */}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
