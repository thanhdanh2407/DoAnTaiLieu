import React from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";

import image1 from "../../assets/logo1.png";
import image2 from "../../assets/logo1.png";
import image3 from "../../assets/logo1.png";

const Banner = () => {
  return (
    <div className="banner-container">
      <Carousel autoplay>
        <div>
          <img src={image1} alt="Slide 1" className="contentStyle" />
        </div>
        <div>
          <img src={image2} alt="Slide 2" className="contentStyle" />
        </div>
        <div>
          <img src={image3} alt="Slide 3" className="contentStyle" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
