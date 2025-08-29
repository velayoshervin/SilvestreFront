import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const VerificationLink = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // ?token=abc123
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    axios
      .post(`http://localhost:8080/public/email-token/verify?token=${token}`)
      .then((res) => {
        const user = res.data;
        console.log(res.data);
        login(user);
        navigate("/login"); // Redirect after success
      })
      .catch((err) => {
        console.error(err);
        if (err.status === 403) setErrorMessage("invalid token");
        console.log(err);
        // Optionally redirect to an error page or show a message
      });
  }, [token, navigate, login]);

  return (
    <>
      <h1>Verification</h1>
      <div>{errorMessage ? <p>{errorMessage}</p> : <p>validating</p>}</div>
    </>
  );
};

export default VerificationLink;
