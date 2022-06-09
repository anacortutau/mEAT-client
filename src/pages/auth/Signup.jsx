import React from "react";
import { useState } from "react";
import { signupService } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [portal, setPortal] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleSurnameChange = (e) => setSurname(e.target.value);
  const handleStreetChange = (e) => setStreet(e.target.value);
  const handleNumber = (e) => setNumber(e.target.value);
  const handlePortal = (e) => setPortal(e.target.value);
  const handleCity = (e) => setCity(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    //create user
    const user = {
      username,
      surname,
      street,
      number,
      portal,
      city,
      phone,
      email,
      password,
    };

    try {
      await signupService(user);
      console.log("todo bien");
      navigate("/login");
      console.log(user);
    } catch (error) {
      console.log(error.response.data.errorMessage);
      console.log(error.response.status);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <section class="form">
        <form onSubmit={handleSignup}>
          <label>Name</label>
          <br />
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <br />
          <label>Surname</label>
          <br />
          <input
            type="text"
            name="surname"
            value={surname}
            onChange={handleSurnameChange}
          />
          <br />
          <label>Street</label>
          <br />
          <input
            type="text"
            name="street"
            value={street}
            onChange={handleStreetChange}
          />
          <br />
          <label>Number</label>
          <br />
          <input
            type="number"
            name="number"
            value={number}
            onChange={handleNumber}
          />
          <br />
          <label>Portal</label>
          <br />
          <input
            type="text"
            name="portal"
            value={portal}
            onChange={handlePortal}
          />
          <br />
          <label>City</label>
          <br />
          <input type="text" name="city" value={city} onChange={handleCity} />
          <br />
          <label>Phone</label>
          <br />
          <input
            type="number"
            name="phone"
            value={phone}
            onChange={handlePhone}
          />
          <br />
          <label>Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {errorMessage !== null && <p>{errorMessage}</p>}
          <br />
          <button class="home-main-button-signup" type="submit">
            Signup
          </button>
        </form>
      </section>
    </div>
  );
}

export default Signup;
