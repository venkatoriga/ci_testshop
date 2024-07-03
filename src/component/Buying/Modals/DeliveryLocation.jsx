import React, { useState, useEffect } from "react";
import "./DeliveryLocation.css";
import { closeIcon, sorryIcon, locationIcon } from "../../../helpers/Icons";

const DeliveryLocation = ({ modalAction, pinvalue }) => {
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const CurrentLocation = localStorage.getItem("CurrentLocation")
  console.log('CurrentLocation',CurrentLocation);
  // Load deliveryLocation from local storage on component mount
  useEffect(() => {
    const storedLocation = localStorage.getItem("deliveryLocation");
    if (storedLocation) {
      setDeliveryLocation(storedLocation);
    }
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const formattedValue = numericValue.substring(0, 6); // Limit to 6 characters
    setDeliveryLocation(formattedValue);

    // Save deliveryLocation to local storage
    localStorage.setItem("deliveryLocation", formattedValue);
  };

  const handlepinChange = (event) => {
    const value = event.target.value;

    // If the input length is less than 6, set the value to empty
    const formattedValue = value.length < 6 ? "" : value;

    // Limit to 6 characters
    const truncatedValue = formattedValue.substring(0, 6);

    setDeliveryLocation(truncatedValue);

    // Save deliveryLocation to local storage
    localStorage.setItem("deliveryLocation", truncatedValue);
  };


  const getLocation = async () => {
    try {
      if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;
        // const latitude = '12.937449'
        // const longitude = '80.235013'
        const response = await fetch(`https://devextension.origa.market/api/getlatlngpincode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body: JSON.stringify({ latitude, longitude }), 
        });
  
        const responseData = await response.json();
        setDeliveryLocation(responseData?.postal_code)
        localStorage.setItem("deliveryLocation", responseData?.postal_code);
        console.log("API response:", responseData?.postal_code)
  
        // Handle response data here
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    } catch (error) {
      console.error('Error getting location:', error.message);
    }
  };
  


  const handleSetLocation = () => {
    console.log("Selected Delivery Location:", deliveryLocation);
    pinvalue(deliveryLocation);
    modalAction(false);
  };

  return (
    <div className="bi-popup-wrap">
      <div className="back" onClick={() => modalAction(false)}></div>
      <div className="inner">
        <button onClick={() => modalAction(false)} className="close">
          {closeIcon({ width: 16, height: 16 })}
        </button>
        <div className="heading-600-20 heading-600-20-16 t-a-c">
          Please enter your pincode!
        </div>
        <div className="popup-svg">{sorryIcon({ width: 190, height: 190 })}</div>
        <div className="heading-400-16-14 t-a-c">
          Set the location where you would want the machine to be delivered. This
          will help us give you a more accurate price and search for machines
          closer to you
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Delivery Location Pincode"
            value={deliveryLocation}
            onChange={handleInputChange}
            onBlur={handlepinChange}
          />
          
          {locationIcon({ width: 24, height: 24 })}
        </div>
        <div onClick={getLocation} className="text heading-600-14 heading-600-14-12 curser-pointer">
          Use my current location
        </div>
        <button type="button" className="location-btn" onClick={handleSetLocation}>
          Set Location
        </button>
      </div>
    </div>
  );
};

export default DeliveryLocation;
