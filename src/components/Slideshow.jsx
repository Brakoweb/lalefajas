import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slideshow.css";

const Slideshow = () => {
  return (
    <Carousel
      showArrows={true}
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      interval={5000}
      className="slideshow"
    >
      <div>
        <img src="/Slideshow/offer1.jpg" alt="Offer 1" />
        <p className="legend">50% Off on All Items!</p>
      </div>
      <div>
        <img src="/Slideshow/offer2.jpg" alt="Offer 2" />
        <p className="legend">Buy One Get One Free!</p>
      </div>
      <div>
        <img src="/Slideshow/offer3.jpg" alt="Offer 3" />
        <p className="legend">Free Shipping on Orders Over $100!</p>
      </div>
    </Carousel>
  );
};

export default Slideshow;
