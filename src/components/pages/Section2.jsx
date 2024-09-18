import React from 'react';
import './section2.css';

function Section2() {
  return (
    <div className="section2-container">
      <div className="section2-content">
        <div className="section2-text">
          <h2><b>APPASWAMY</b></h2>
          <h6>FOUNDER</h6>
          <p>
            Founded in 1959 by a visionary entrepreneur, Mr S Appaswamy, Appaswamy Real Estates 
            is an eminent real estate conglomerate and one of the leading builders in Chennai.
          </p>
          
          <button className="button">Philately</button>
        </div>
        <div className="section2-image">
          <img
            src="1.PNG"
            alt="Appaswamy"
          />
        </div>
      </div>
    </div>
  );
}

export default Section2;
