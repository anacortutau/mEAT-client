import React from "react";
import { useNavigate } from "react-router-dom";

function Family() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("/signup");
  };

  const handleSubmitHome = async (e) => {
    e.preventDefault();

    navigate("/");
  };
  return (
    <div>
      <h2>Join Family mEAT</h2>

      <div class="container">
        <p>
          At mEAT we know that and take advantage of the benefits Eat and
          receive mEATkoins to redeem for more ÑAM!
        </p>
        <form onSubmit={handleSubmit}>
          <button class="home-main-button-family" type="submit">
            Sign Up
          </button>
        </form>
        <br />
        <br />
        <form onSubmit={handleSubmitHome}>
          <button class="home-main-button-family-home" type="submit">
            Home
          </button>
        </form>
        <div class="logoFamily">
          <img
            src={
              "https://media.istockphoto.com/photos/lockdown-family-fast-food-dinner-with-pizza-and-burgers-picture-id1303995627?k=20&m=1303995627&s=612x612&w=0&h=3sx1c8fdKcdym0sEIaykY5HDgsMba_aB_Dd8PP6R2fo="
            }
            alt="foto"
            style={{ width: "700px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Family;
