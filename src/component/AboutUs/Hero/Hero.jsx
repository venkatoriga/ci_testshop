import React from "react";
import ForSlider from "../../SubComponent/ForSlider";
const Hero = () => {
  const headingLeft = "Empowering Businesses, Igniting Growth";
  const paraLeft = "ORIGA offers seamless support to business of all sizes through an integrated platform, streamlining finance and equipment lifecycle management for sustained growth";
const bannerImage="asset/image555a.png"
  return (
    <section className="container-fluid liner-background-about">
      <div className="max-container">
      <ForSlider bannerImage={bannerImage}  headingLeft={headingLeft} paraLeft={paraLeft} />
      </div>
    </section>
  );
};

export default Hero;
