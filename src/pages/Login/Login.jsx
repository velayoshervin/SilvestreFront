import React, { useState } from "react";
import FloatingGridGallery from "./FloatingGridGallery";
import axios from "axios";
import TokenPage from "./TokenPage";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

useAuth;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState();
  const { login } = useAuth();
  const navigate = useNavigate();

  function fetchUser(email, password) {
    return axios.post(
      "http://localhost:8080/public/user/login",
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetchUser(email, password);
      setUserId(response.data.userId);
      const userData = response.data;
      console.log("User data:", userData);
      setErrorMessage("");
      login(userData);
      navigate("/home");
    } catch (error) {
      if (error.status === 409) {
        console.log(error.response.data);
        setUserId(error.response.data.userId);
        setShowModal(true);
      } else {
        setErrorMessage(error.errorMessage);
      }
    }
  }

  return (
    <div className="flex items-center w-[880px] rounded-[6px] border border-gray-300 justify-center m-auto h-[80vh] mt-[60px]">
      <div className="login-side w-[50%] text-center">
        <h2 className="font-bold text-4xl text-[#110447] my-[32px]">
          Sign in to Silvestre
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col px-12 gap-2 my-[16px]"
        >
          <label className="text-start px-2">Email</label>
          <input
            name="email"
            type="email"
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
              setErrorMessage("");
            }}
            className="py-1 px-2 border border-gray-300 rounded-[6px]"
          />

          <div className="flex justify-between px-2">
            <label>Password</label>
            <button
              type="button"
              className="cursor-pointer hover:underline text-gray-600"
            >
              Forgot?
            </button>
          </div>
          <input
            type="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
            className="py-1 px-2 border border-gray-300 rounded-[6px]"
          />
          <p>
            {errorMessage && (
              <span className="text-red-500 text-sm mt-2">{errorMessage}</span>
            )}
          </p>
          <button
            type="submit"
            className="text-white border rounded-[8px] py-2 bg-[#090128] border-transparent opacity-80 cursor-pointer hover:bg-blue-700"
          >
            Sign in
          </button>

          <div className="flex gap-2 items-center justify-center">
            <div className="border-t-2 border-gray-400 w-[80px] "></div>
            <p className="text-gray-500">Or login with</p>
            <div className="border-t-2 border-gray-400 w-[80px] "></div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <button className="google py-2 px-4 border border-gray-400 rounded cursor-pointer">
              Google
            </button>
            <button className="google py-2 px-4 border border-gray-400 rounded">
              Facebook
            </button>
          </div>
        </form>

        <p>
          Don't have an account yet?
          <strong
            className="text-orange-600 pl-1 cursor-pointer hover:underline"
            onClick={() => {
              navigate("/sign-up");
            }}
          >
            Sign up now
          </strong>
        </p>
      </div>

      <div className="picture-side w-[50%]">
        <FloatingGridGallery className="w-full" />
      </div>
      {showModal && (
        <TokenPage
          userId={userId}
          token=""
          onClickHandler={() => setShowModal(!setShowModal)}
        ></TokenPage>
      )}
    </div>
  );
};

export default Login;
