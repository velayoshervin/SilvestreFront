import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../ItemsAxios";
import { notifications } from "@mantine/notifications";
import { testAdminApi } from "../../ItemsAxios";

const Home = () => {
  const [user, setUser] = useState();
  const [logoutpressed, isLogoutPressed] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(JSON.parse(storedUser));
      alert(JSON.stringify(storedUser));
      if (parsedUser.role === "ADMIN") navigate("/admin-dashboard");
    }
  }, [navigate]);

  console.log("home-user:", user);

  const handleTestAdminApi = () => {
    testAdminApi()
      .then((res) => {
        const data = res.data;

        notifications.show({
          title: "admin endpoint reach successfully",
          message: JSON.stringify(data),
          // autoClose: 2000,
        });
      })
      .catch((err) => {
        notifications.show({
          title: "error in testing admin api",
          message: JSON.stringify(err.data),
          // autoClose: 2000,
        });
      });
  };

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
    <div className="mx-auto space-y-2  space-x-2">
      <div>Hello {user?.firstname}</div>
      <button
        onClick={handleLogout}
        disabled={logoutpressed}
        className="py-1 px-2 border bg-blue-500 border-gray-400 rounded-2xl"
      >
        Logout
      </button>
      <button
        onClick={handleTestAdminApi}
        className="py-1 px-2 border bg-blue-500 border-gray-400 rounded-2xl"
      >
        Test Admin Api
      </button>
    </div>
  );
};

export default Home;
