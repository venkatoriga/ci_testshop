import React from "react";
import ForSlider from "../../SubComponent/ForSlider";

const Banner = () => {
  return (
    <div className="container-fluid liner-background-about">
    <div className="max-container">
    <ForSlider
  headingLeft={"Worried about unexpected breakdowns?"}
  paraLeft={
    <>
      <p>Minimize downtime with our expert on-call maintenance service.</p>
      <div>
        <a href="https://play.google.com/store/apps/details?id=com.origa.FieldXL" target="_blank" rel="noopener noreferrer">
          <img className="h-100" src='/asset/google-play-badge.png' alt="Get it on Google Play" width="135" height="45" />
        </a>
        <a href="https://apps.apple.com/in/app/origa-market/id6476490074" target="_blank" rel="noopener noreferrer">
          <img className="h-100" src='/asset/applestore.svg' alt="Download on the App Store" width="135" height="40" />
        </a>
      </div>
    </>
  }
  bannerImage={"asset/Heading-Slider4.webp"}
  viewall={true}
/>
   </div>
      </div>
  );
};

export default Banner;