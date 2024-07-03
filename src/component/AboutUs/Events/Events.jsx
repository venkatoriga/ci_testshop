import React from "react";
import './Events.css'
import Slider5 from "../../SubComponent/AllSlider/Slider5";
import EventBlock from "../../Block/EventBlock";


const Events = () => {
   const productCategory=<EventBlock/>
  const bottomSectionData=[{
    imageurl:"/asset/used-expo-sep-2023.webp",
    title:"Used Machinery Engineering Expo",
    message:"Sep 2023"
  },{
    imageurl:"/asset/Mahatech-2024.webp",
    title:"MAHATech 2024",
    message:"Feb 2024"
  },{
    imageurl:"/asset/Defence_expo_2024.webp",
    title:"Maha MSME Defence Expo 2024",
    message:"Feb 2024"
  }/* ,{
    imageurl:"/asset/event_b.png",
    title:"Evolve Program",
    message:"24x7 assistance from our trained technician in case of any problem related to your machines"
  },
{
  imageurl:"/asset/event_b.png",
  title:"Evolve Program",
  message:"24x7 assistance from our trained technician in case of any problem related to your machines"
},{
  imageurl:"/asset/event_b.png",
  title:"Evolve Program",
  message:"24x7 assistance from our trained technician in case of any problem related to your machines"
} */]
  return (
    <div className="event my-5 py-3">
      <div className="max-container">
        <div className="tablet-d-padding d-flex align-item--center f-wrap ">
          <div className="col-sm-12 col-md-8 col-lg-7  p-0 ">
            
            
            <h2 className="heading-600-44-20  pt-5">Events & Expos</h2>
            <p className="heading-400-16-14  pt-3 op-80">
              {/* "At Origa, we view events as more than mere occasions; they present remarkable opportunities to craft memories and establish profound, meaningful connections." */}
              "ORIGA actively participates in events and expos to showcase its innovative solutions and engage with industry leaders for collaboration and networking opportunities."
            </p>
          </div>
        </div>
  <div className="tablet-d-padding">
  <Slider5 listofdata={bottomSectionData} hide={"show-992"} productCategory={productCategory} prevview={3}/>
  </div> 

      </div>
    </div>
  );
};

export default Events;
