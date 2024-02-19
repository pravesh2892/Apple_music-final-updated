import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import './SignIn.css'

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(true);
  const navigate = useNavigate();


  const getToken = () => {
    const accessToken = localStorage.getItem("token");
    const userData = localStorage.getItem("userData");
    return {
      token: accessToken,
      userData: userData ? JSON.parse(userData) : null,
    };
  };

  useEffect(() => {
    const { token, userData } = getToken();

    if (token && userData) {
      // You can use token and userData as needed, for example, display user info
      console.log("Token:", token);
      console.log("User Data:", userData);
    }
  }, []);

  const handleClose = () => {
    navigate("/");
  };

 

  const handleSecondContinueClick = async () => {
    const apiUrl = "https://academics.newtonschool.co/api/v1/user/login";

    const requestBody = {
      email: email,
      password: password,
      appType: "music",
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          projectID: "f104bi07c490",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        if (token) {
          localStorage.setItem("token", token);
          setShowEmailForm(false);
          alert("Login Successfully");
          navigate("/browse");
        } else {
          setError("No token received from the API");
        }
      } else {
        setError("Incorrect username or password");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error occurred while logging in");
    }
  };
 
  return (
    <div
    className="login-container"
     
    >
      <button
        onClick={handleClose}
        style={{
          position: "absolute",
          top: "20px",
          left: "30px",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          padding: "5px",
          color: "black",
          transition: "background .1s linear",
          backgroundColor: "lightgray",
          borderRadius: "50%",
          zIndex: 1,
        }}
      >
        X
      </button>
     
        <>
          <div className="apple-logo">
            <svg
              viewBox="0 0 18 18"
              x="0px"
              y="0px"
              width="50px"
              height="50px"
              data-test="apple-logo"
              fill="black"
            >
              <path
                d="M8.8,5.2c-0.7,0-1.8-0.8-3-0.8c-1.5,0-2.9,0.9-3.7,2.3c-1.6,2.8-0.4,6.8,1.1,9.1C4,16.8,4.9,18,6.1,18c1.1,0,1.6-0.7,3-0.7
            c1.4,0,1.8,0.7,3,0.7c1.2,0,2-1.1,2.8-2.2c0.9-1.3,1.2-2.5,1.2-2.6c0,0-2.4-0.9-2.4-3.6c0-2.3,1.9-3.4,1.9-3.4
            c-1.1-1.6-2.7-1.7-3.3-1.8C10.7,4.2,9.5,5.2,8.8,5.2z M11.3,2.9c0.6-0.8,1.1-1.8,0.9-2.9c-0.9,0-2,0.6-2.6,1.4C9,2,8.5,3.1,8.6,4.1
            C9.6,4.2,10.7,3.6,11.3,2.9"
              ></path>
            </svg>
          </div>
          <h1 style={{ marginBottom: "20px" }}>
            Sign In or <Link to="/signUp">Sign Up</Link>
          </h1>
          <h2 style={{ marginBottom: "20px" }}>
            Enter your email to get started.
          </h2>
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          <label style={{ marginBottom: "20px" }} >
            <input
            className="input-filed"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Apple ID"
             
            />
          </label>
          <label>
            <input
            className="input-filed"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
             
            />
          </label>
          <Link to="/change-password" style={{ marginBottom: "20px" }}>
            Forgot Apple ID or Password?
          </Link>
          <button
            onClick={handleSecondContinueClick}
            style={{
              backgroundColor: "#E75480",
              width: "300px",
              height: "45px",
              borderRadius: "9px",
              fontSize: "18px",
            }}
          >
            Continue
          </button>
        </>
     
    </div>
  );
};

export default SignIn;
