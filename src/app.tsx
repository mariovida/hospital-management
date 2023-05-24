import React, { FC } from "react";
import { useRoutes } from "react-router-dom";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet-async";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import "@src/global.css";

import store from "./store/store";
import { RTL } from "@src/components/rtl";
import { Toaster } from "@src/components/toaster";
import { AuthProvider } from "@src/contexts/auth/AuthProvider";
import { useNprogress } from "@src/hooks/use-nprogress";
import { routes } from "@src/routes";
import { createTheme } from "@src/theme";

export const App: FC = () => {
  useNprogress();

  const element = useRoutes(routes);

  // Customize the default theme or provide your own logic
  const theme = createTheme({
    // ... theme configuration ...
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Helmet>{/* ... helmet configuration ... */}</Helmet>
            <RTL direction="ltr">
              {" "}
              {/* or "rtl" depending on your default direction */}
              <CssBaseline />
              {element}
              <Toaster />
            </RTL>
          </Provider>
        </ThemeProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
};
