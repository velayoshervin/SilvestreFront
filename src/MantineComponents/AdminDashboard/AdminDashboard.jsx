/* eslint-disable no-unused-vars */
import {
  AppShell,
  Burger,
  Tooltip,
  useMantineTheme,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { NavLink, Routes, Route } from "react-router-dom";
import "./AdminDashboard.css";
import DashboardPage from "./DashboardPage";
import SettingsPage from "./SettingsPage";
import BookingsAdmin from "./BookingsAdmin";
import Calendar from "./Calendar";
import Messages from "./Messages";
import PaymentTransactions from "./PaymentTransactions";
import ReportsPage from "./ReportsPage";
import PackagesAndServices from "./PackagesAndServices";
import CalendarAvailability from "./CalendarAvailability";
import CalendarTUI from "../../pages/CalendarTUI";
import React, { useEffect } from "react";
import { IconLogout } from "@tabler/icons-react";
import { logout } from "../../ItemsAxios";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import GeneralSetting from "../../pages/GeneralSetting";
import UserRoleManager from "../../pages/UserRoleManager";
import Analytics from "../../scene/Analytics";

export default function AdminDashboard({ colorScheme, toggleColorScheme }) {
  const [opened, { toggle }] = useDisclosure();
  const theme = useMantineTheme();
  const [activeNavlink, setActiveNavLink] = useState("dashboard");
  const [user, setUser] = useState();
  const [logoutpressed, isLogoutPressed] = useState(false);
  const navigate = useNavigate();

  // use the mantine palette for light / dark
  const bgColor =
    theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white;
  const textColor = theme.colorScheme === "dark" ? theme.white : theme.black;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(JSON.parse(storedUser));
    } else {
      // navigate("/sign-up");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout()
      .then((res) => {
        console.log(res);

        isLogoutPressed(true);

        localStorage.clear();
        notifications.show({
          title: "logout successfully",
          message: "logout succes",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        notifications.show({
          title: "Logout failed",
          message: "Something went wrong during logout",
          color: "red",
        });
      });
  };

  return (
    <AppShell
      padding="md"
      header={{ height: 100 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      styles={{
        root: {
          minHeight: "100vh",
          backgroundColor: bgColor,
          color: textColor,
        },
        main: {
          border: "none",
          backgroundColor: bgColor,
          color: textColor,
        },
        header: {
          backgroundColor: bgColor,
          borderBottom: "none",
        },
        navbar: {
          backgroundColor: bgColor,
          borderRight: "none",
        },
      }}
    >
      <AppShell.Header className="">
        <div>
          <div className="flex justify-between items-center px-10 border-b-0 pt-5 pb-2">
            <div
              style={{ flex: 1, textAlign: "center" }}
              className="font-semibold"
            >
              Silvestre
            </div>
            <button onClick={toggleColorScheme} className="cursor-pointer">
              {colorScheme === "dark" ? <FaSun /> : <FaMoon />}
            </button>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
          </div>
          <div className="px-12 flex justify-end gap-2">
            <p>Welcome back, {user?.firstname}</p>
            <Tooltip label="logout">
              <Button
                unstyled
                leftSection={<IconLogout size={18}>logout</IconLogout>}
                onClick={handleLogout}
              ></Button>
            </Tooltip>
          </div>
        </div>
      </AppShell.Header>

      <AppShell.Navbar
        className={`text-start pl-6 pr-10 py-12 border-none ${
          colorScheme === "dark" ? "text-white" : "text-black"
        }`}
      >
        <NavLink
          className={`admin-btn ${
            activeNavlink === "dashboard" ? "admin-active-btn" : ""
          }`}
          to="/admin-dashboard/dashboard"
          onClick={() => setActiveNavLink("dashboard")}
        >
          Home
        </NavLink>
        <NavLink
          className={`admin-btn ${
            activeNavlink === "Bookings" ? "admin-active-btn" : ""
          }`}
          to="/admin-dashboard/bookings"
          onClick={() => setActiveNavLink("Bookings")}
        >
          Bookings
        </NavLink>
        <NavLink
          className={`admin-btn ${
            activeNavlink === "Payments" ? "admin-active-btn" : ""
          }`}
          to="/admin-dashboard/payments"
          onClick={() => setActiveNavLink("Payments")}
        >
          Payment Transactions
        </NavLink>
        <NavLink
          className={`admin-btn ${
            activeNavlink === "calendar" ? "admin-active-btn" : ""
          }`}
          to="/admin-dashboard/manage-calendar"
          onClick={() => setActiveNavLink("calendar")}
        >
          Manage Calendar
        </NavLink>
        <NavLink
          className={`admin-btn ${
            activeNavlink === "events" ? "admin-active-btn" : ""
          }`}
          to="/admin-dashboard/events"
          onClick={() => setActiveNavLink("events")}
        >
          Events
        </NavLink>
        <NavLink
          className={`admin-btn ${
            activeNavlink === "messages" ? "admin-active-btn" : ""
          }`}
          to="/admin-dashboard/messages"
          onClick={() => setActiveNavLink("messages")}
        >
          Messages
        </NavLink>
        <NavLink
          className={`admin-btn ${
            activeNavlink === "reports" ? "admin-active-btn" : ""
          }`}
          to="/admin-dashboard/reports"
          onClick={() => setActiveNavLink("reports")}
        >
          Reports
        </NavLink>
        <NavLink
          className={`admin-btn ${
            activeNavlink === "user-role-setting" ? "admin-active-btn" : ""
          }`}
          to="/admin-dashboard/user-role-setting"
          onClick={() => setActiveNavLink("user-role-setting")}
        >
          Role Management
        </NavLink>
        <NavLink
          className={`admin-btn ${
            activeNavlink === "general-setting" ? "admin-active-btn" : ""
          }`}
          to="/admin-dashboard/general-setting"
          onClick={() => setActiveNavLink("general-setting")}
        >
          Account Settings
        </NavLink>
        <NavLink
          className={`admin-btn ${
            activeNavlink === "packages" ? "admin-active-btn" : ""
          }`}
          to="/admin-dashboard/packagesAndServices"
          onClick={() => setActiveNavLink("packages")}
        >
          Packages and Services
        </NavLink>
      </AppShell.Navbar>

      <AppShell.Main>
        <Routes>
          <Route path="dashboard" element={<Analytics />} />
          <Route path="bookings" element={<BookingsAdmin />} />
          <Route path="manage-calendar" element={<CalendarAvailability />} />
          <Route path="events" element={<CalendarTUI />} />
          <Route path="messages" element={<Messages />} />
          <Route path="payments" element={<PaymentTransactions />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="packagesAndServices" element={<PackagesAndServices />} />
          <Route path="/general-setting" element={<GeneralSetting />} />
          <Route path="/user-role-setting" element={<UserRoleManager />} />
          <Route index element={<DashboardPage />} />
        </Routes>
      </AppShell.Main>
    </AppShell>
  );
}
