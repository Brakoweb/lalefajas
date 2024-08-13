import React from "react";
import Slideshow from "../components/Slideshow";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <Slideshow />
      {/* Aquí irán las otras secciones del HomePage */}
    </div>
  );
};

export default HomePage;
