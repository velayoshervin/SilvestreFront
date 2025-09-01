import "./App.css";
import { Routes, Route } from "react-router-dom";
import FloatingGridGallery from "./pages/Login/FloatingGridGallery";
import Login from "./pages/Login/login";
import TokenPage from "./pages/Login/TokenPage";
import SignUp from "./pages/SignUp/SignUp";
import VerificationLink from "./pages/Login/VerificationLink";
import Home from "./pages/Login/Home";
import QuotationPage from "./pages/QuotationPage/QuotationPage";
import AdminDashboard from "./MantineComponents/AdminDashboard/AdminDashboard";
import HeaderMegaMenu from "./components/HeaderMegaMenu";
import Analytics from "./scene/Analytics";
import CalendarAvailability from "./MantineComponents/AdminDashboard/CalendarAvailability";
import GeneralSetting from "./pages/GeneralSetting";
import UserRoleManager from "./pages/UserRoleManager";
import CalendarTUI from "./pages/CalendarTUI";
import InviteUsers from "./components/InviteUsers";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App({ colorScheme, toggleColorScheme }) {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <>
      {/* <HeaderMegaMenu></HeaderMegaMenu> */}
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/verify" element={<VerificationLink />}></Route>
        <Route path="/" element={<QuotationPage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/manage-calendar" element={<CalendarAvailability />} />
        <Route
          path="/admin-dashboard/*"
          element={
            <AdminDashboard
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
            />
          }
        />
        <Route path="general-setting" element={<GeneralSetting />}></Route>
        <Route path="analytics" element={<Analytics />}></Route>
        <Route
          path="user-role-settings"
          element={<UserRoleManager></UserRoleManager>}
        ></Route>
        <Route path="calendar" element={<CalendarTUI></CalendarTUI>}></Route>
        <Route
          path="/invite-user"
          element={
            <InviteUsers
              organizer={{
                firstname: "organizer",
                lastname: "lastname-o",
                email: "email@gmail.com",
              }}
            />
          }
        ></Route>
      </Routes>
    </>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
