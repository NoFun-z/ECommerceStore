import { Box, Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/ConfigureStore";
import { fetchBasketAsync } from "../../features/basket/basketSlice";
import { fetchCurrentUser } from "../../features/account/accountSlice";
import HomePage from "../../features/home/HomePage";
import Footer from "./Footer";

export default function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  const initApp = useCallback(async () => {
    try {
      await dispatch(fetchCurrentUser());
      await dispatch(fetchBasketAsync());
    }
    catch (er) {
      console.log(er)
    }
  }, [dispatch])

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp])

  const [darkmode, setDarkMode] = useState(false);
  const paletteType = darkmode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      primary: {
        main: paletteType === 'light' ? '#4f4e4a' : '#cccbc8',
      },
      background: {
        default: paletteType === 'light' ? '#e6e6e6' : '#333333',
      },
    },
  });

  function ThemeSwitchHandler() {
    setDarkMode(prev => !prev)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header darkMode={darkmode} ThemeChangeHandler={ThemeSwitchHandler} />
        <div style={{ flex: 1 }}>
          {loading ? <LoadingComponent message="Initializing app..." />
            : location.pathname === '/' ? <HomePage />
              : <Container sx={{ mt: 4 }}>
                <Outlet />
              </Container>
          }
        </div>
        <Footer darkmode={darkmode} />
      </div>
    </ThemeProvider>
  );
}
