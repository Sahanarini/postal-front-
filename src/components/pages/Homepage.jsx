import React from "react";
import HomeCarousel from "../Carousel/HomeCarousel";
import { homeCarouselData } from "../Carousel/HomeCaroselData";
import Navbar from "../navbar/Navbar";
import Section2 from "./Section2";
import IconSection from "./Section1";
import CarouselSection from "./Section3";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="content-wrapper">
        <HomeCarousel images={homeCarouselData} />

        <div className="container mx-auto  ">
          <div className="space-y-10">
          </div>
          <IconSection />
          <CarouselSection />
        
          <Section2 />
       
          

          <div className="container mx-auto my-10">
           <Footer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
