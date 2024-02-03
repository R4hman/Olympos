import "./App.css";
import { Box, CssBaseline, Paper, createTheme } from "@mui/material";
import { theme } from "./theme";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TourDetails from "./pages/TourDetails";
import NoMatch from "./components/reusable/NoMatch";
import Tours from "./pages/Tours";
import FavoriteTours from "./pages/FavoriteTours";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import RecoveryPass from "./pages/RecoveryPass";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import AppLayout from "./components/adminPanel/AppLayout";
import AdminTours from "./pages/AdminTours";
import AdminHotels from "./pages/AdminHotels";
import AdminUsers from "./pages/AdminUsers";
import AdminReviews from "./pages/AdminReviews";
import ProtectedRoute from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, useTheme } from "@mui/material/styles";

import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import AdminOrders from "./pages/AdminOrders";
import { fetchClientTourCategory } from "./services/apiTours";
import Main from "./pages/Main";
import AdminCategory from "./pages/AdminCategory";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const months = [
  "yanvar",
  "fevral",
  "mart",
  "aprel",
  "may",
  "iyun",
  "iyul",
  "avqust",
  "sentyabr",
  "oktyabr",
  "noyabr",
  "dekabr",
];

// BUNU SADƏCƏ TEST ÜÇÜN YAZIRAM XIRDA BİR DƏYİŞİKLİK BELƏ OLSA GİTHUB EXTENTİON BUNU FAYLDA DƏYİŞİKLİK OLMUŞ KİMİ
// QƏBUL EDİR. SAVE EDİRƏM VƏ..
// İNDİ COMMİT EDİB PUSH EDƏCƏM
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [typeOfTours, settypeOfTours] = useState([]);
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  // const darkTheme = createTheme({
  //   palette: {
  //     mode: theme ? "dark" : "light",
  //   },
  // });

  useEffect(() => {
    fetchClientTourCategory()
      .then((res) => {
        return res;
      })
      .then((data) => {
        if (data.length) {
          settypeOfTours(data);
        }
      });
  }, []);

  if (!typeOfTours?.length) {
    return;
  }

  const queryClient = new QueryClient();

  //   {
  //   defaultOptions: {
  //     queries: {
  //       staleTime: 10 * 0,
  //     },
  //   },

  //   queryCache: new QueryCache({
  //     onError: (error) => {
  //       toast(`Something went wrong: ${error.message[0]}`);
  //     },
  //   }),
  // }

  return (
    <QueryClientProvider client={queryClient}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* <Paper square elevation={0}> */}
          <Box>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Main />}>
                <Route
                  path="/"
                  element={<Home months={months} typeOfTours={typeOfTours} />}
                />
                <Route
                  path="/turlar"
                  element={<Tours months={months} typeOfTours={typeOfTours} />}
                />
                <Route path="/turlar/:tourId" element={<TourDetails />} />
                <Route path="/otellər" element={<Hotels />} />
                <Route path="/otellər/:hotelId" element={<HotelDetails />} />
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="/seçdiklərim" element={<FavoriteTours />} />
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/verifyCode" element={<VerifyCode />} />
              <Route path="/recoveryPass" element={<RecoveryPass />} />

              <Route
                path="/admin-panel"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route element={<AdminOrders />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="admin-tours" element={<AdminTours />} />
                <Route path="admin-hotels" element={<AdminHotels />} />
                <Route path="admin-users" element={<AdminUsers />} />
                <Route path="admin-reviews" element={<AdminReviews />} />
                <Route path="admin-tur-category" element={<AdminCategory />} />
              </Route>

              <Route path="*" element={<NoMatch />} />
            </Routes>

            <Toaster
              position="top-center"
              gutter={12}
              containerStyle={{ margin: "8px" }}
              toastOptions={{
                success: {
                  duration: 1500,
                },
                error: {
                  duration: 3000,
                },
                style: {
                  fontSize: "16px",
                  maxWidth: "500px",
                  padding: "16px 24px",
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            />
          </Box>
          {/* </Paper> */}
        </ThemeProvider>

        <ReactQueryDevtools initialIsOpen={false} />
      </ColorModeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
