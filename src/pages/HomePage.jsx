import React from "react";
import Slideshow from "../components/Slideshow";
import FeaturedProducts from "../components/FeaturedProducts";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      <Slideshow />
      <FeaturedProducts />
      {/* Aquí irán las otras secciones del HomePage */}
    </div>
  );
};

export default HomePage;
