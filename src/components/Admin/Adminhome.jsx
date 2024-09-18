import React from "react";
import HomeCarousel from "../Carousel/HomeCarousel";
import { homeCarouselData } from "../Carousel/HomeCaroselData";
import Navbar from "./Adminnav";
import Section2 from "../pages/Section2";

const Adminhome = () => {
  return (
    <div>
     
      <Navbar/>
      <div className="content-wrapper">
        <HomeCarousel images={homeCarouselData} />

        <div className="container mx-auto px-4 py-20">
          <div className="space-y-10">
            {/* <HomeProductSection data={healthdrinks} section={"Health Food and Drinks"} />
            <HomeProductSection data={supplements} section={"Vitamins and Protein supplements"} /> */}
          </div>
          <div className="contSainer mx-auto my-10">
            <hr />
          </div>
          <br />

          {/* <Section /> */}

          <div className="container mx-auto my-10">
            <hr />
          </div>
          <br />
          <br />
          <br />
          <Section2 />

          <div className="container mx-auto my-10">
            <hr />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminhome;
