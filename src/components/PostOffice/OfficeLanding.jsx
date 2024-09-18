import React from "react";
import HomeCarousel from "../Carousel/HomeCarousel";
import { homeCarouselData } from "../Carousel/HomeCaroselData";
// import Navbar from "../navbar/Navbar";
// import Section2 from "./Section2";
// import IconSection from "./Section1";
// import CarouselSection from "./Section3";
import Navbar from "../navbar/Navbar";
import IconSection from "../pages/Section1";
import CarouselSection from "../pages/Section3";
import Section2 from "../pages/Section2";
import PostNavbar from "./PostNavbar";


const OfficeLanding = () => {
  return (
    <div>
      <PostNavbar />
      <div className="content-wrapper">
        <HomeCarousel images={homeCarouselData} />

        <div className="container mx-auto  ">
          <div className="space-y-10">
          </div>
          <IconSection />
          <CarouselSection />
        
          <Section2 />
       
          

          <div className="container mx-auto my-10">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeLanding;
