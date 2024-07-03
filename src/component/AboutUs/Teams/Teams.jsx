import React from "react";
import "react-multi-carousel/lib/styles.css";
import Slider from "react-slick";
import teamImg_a from "../../assets/team_a.png";
import teamImg_b from "../../assets/team_b.png";
import Carousel from "react-multi-carousel";
const Teams = () => {
  var teamImg = [
    {
        "key":1,
      "img": teamImg_a,
    },
    {
        "key":2,
      "img": teamImg_b,
    }
  ];
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  return (
    <div className="teams">
      <div className="team-content">
        
      </div>
      <div className="cauresol">
        {/* <Slider {...settings}> */}
  <Carousel 
    swipeable={true}
    draggable={true}
    responsive={responsive}
    centerMode={true}
    infinite={true}
    keyBoardControl={true}
    containerClass="carousel-container"
    removeArrowOnDeviceType={["tablet", "mobile"]}
  >
            {teamImg.map((val)=>{
                return <div key={val.key}><img src={val.img} width={'150px'} height={'300px'} /></div>
            })}
        {/* </Slider> */}
      </Carousel>
      </div>
    </div>
  );
};

export default Teams;
