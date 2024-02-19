import React from "react";
import { Link } from "react-router-dom";
import "./ListenNow.css";
const ListenNow = () => {
  return (
    <div className="containerStyle">
      <h1 style={{ textAlign: "center" }}>Discover New Music Every Day</h1>
      <p style={{ textAlign: "center" }}>
        Get playlists and albums inspired by the artists and
        <p style={{ textAlign: "center" }}>
          genres you're listening to. 1 month free, then
        </p>
        $10.99/month.
      </p>
      <Link to="/tryItFree">
        <button className="buttonStyle">Try It Free</button>
      </Link>
      <p className="linkStyle">
        <a href="#">Learn More</a>
      </p>
    </div>
  );
};

export default ListenNow;
