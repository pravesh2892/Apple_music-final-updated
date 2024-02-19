import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Country/Region");
  const [emailError, setEmailError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const navigate = useNavigate();
  const countries = ["UK", "USA", "India"];

  const handleClose = () => {
    navigate("/");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailBlur = (event) => {
    const enteredEmail = event.target.value;
    const emailFormat = /^\S+@\S+\.\S+$/;
    setEmailError(!emailFormat.test(enteredEmail));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleSignupClick = async () => {
    if (!name || !email || !password || selectedCountry === "Country/Region") {
      setFieldError(true);
      return;
    } else {
      setFieldError(false);
    }
    const apiUrl = "https://academics.newtonschool.co/api/v1/user/signup";

    const emailFormat = /^\S+@\S+\.\S+$/;
    if (!emailFormat.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const requestBody = {
      name: name,
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

      const data = await response.json();

      console.log("Full API Response:", data);

      if (response.ok) {
        const token = data.token;
        if (token) {
          alert("signup successfully");
          navigate("/signin");
        } else {
          console.error("No token received from the API");
        }
      } else {
        if (
          data.message &&
          data.message.toLowerCase().includes("already exists")
        ) {
          alert("Account with this email already exists. Please sign in.");
        } else {
          console.error("API Error:", data.message || "Unknown error");
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="signup-container">
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
      <h1 style={{ marginBottom: "20px" }}>Create an Account</h1>
      {fieldError && (
        <p style={{ color: "red", marginTop: "10px", paddingBottom: "13px" }}>
          All fields are required.
        </p>
      )}
      {emailError && (
        <p style={{ color: "red", marginTop: "5px", paddingBottom: "13px" }}>
          Please enter a valid email address.
        </p>
      )}

      <label style={{ marginBottom: "20px" }}>
        <input
        className="signup-input-field"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Full Name"
         
        />
      </label>
      <label style={{ marginBottom: "20px" }}>
        <input
        className="signup-input-field"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
          placeholder="Email"
         
        />
      </label>
      <label style={{ marginBottom: "20px" }}>
        <input
        className="signup-input-field"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
         
        />
      </label>
      <label style={{ marginBottom: "20px" }}>
        <select
        className="signup-input-field"
          value={selectedCountry}
          onChange={handleCountryChange}
          
        >
          <option value="Country/Region" disabled>
            Select a Country/Region
          </option>
          {countries.map((country, index) => (
            <option key={index} value={country}>
              {country}
            </option>
          ))}
        </select>
      </label>
      <Link to="/signin" style={{ marginBottom: "20px" }}>
        Already have an account? Sign In
      </Link>
      <button
        onClick={handleSignupClick}
        style={{
          backgroundColor: "#E75480",
          width: "300px",
          height: "45px",
          borderRadius: "9px",
          fontSize: "18px",
        }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signup;
