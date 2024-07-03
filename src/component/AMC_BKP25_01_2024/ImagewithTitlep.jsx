import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./ImagewithTitle.css";
// import SellMachine from "../../HomePage/SecondPage/SVGs/sell_machine.js";
import SellMachine from "../HomePage/SecondPage/SVGs/sell_machine.js";
import BuyMachine from "../HomePage/SecondPage/SVGs/buy_machine";
import EquipmentLoan from "../HomePage/SecondPage/SVGs/equipment_loan";
import LeaseEquipment from "../HomePage/SecondPage/SVGs/lease_equipment";
import Servicing from "../HomePage/SecondPage/SVGs/Servicing";
import Shop from "../HomePage/SecondPage/SVGs/shop";
const ImagewithTitlep = ({ title, imageSource, message, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnterhandler = () => {
        setIsHovered(true);
    };

    const onMouseLeavehandler = () => {
        setIsHovered(false);
    };
    return (
        <Container
            fluid
            onMouseEnter={onMouseEnterhandler}
            onMouseLeave={onMouseLeavehandler}
            className={`listofservices ${isHovered ? "hovered" : null} `}
            key={index}
        >
            {/* <Image src={imageSource} alt={imageSource} /> */}
            <Container>
                {imageSource == "buy_machine" && (
                    <BuyMachine className="icons_width" fill={isHovered ? "#9BA24C" : ""} />
                )}
                {imageSource == "sell_machine" && (
                    <div>
                        <SellMachine className="icons_width" fill={isHovered ? "#9BA24C" : ""} />
                    </div>
                )}
                {imageSource == "Servicing" && (
                    <Servicing className="icons_width" fill={isHovered ? "#9BA24C" : ""} />
                )}
                {imageSource == "lease_equipment" && (
                    <LeaseEquipment className="icons_width" fill={isHovered ? "#9BA24C" : ""} />
                )}
                {imageSource == "equipment_loan" && (
                    <EquipmentLoan className="icons_width" fill={isHovered ? "#9BA24C" : ""} />
                )}
                {imageSource == "shop" && <Shop fill={isHovered ? "#9BA24C" : ""} />}
            </Container>

            <p className={`listofservice-title ${isHovered ? "hovered" : ""}`}>
                {title}
            </p>
            <p className={`listofservice-message ${isHovered ? "hovered" : ""}`}>
                {message}
            </p>
        </Container>
    );
};

export default ImagewithTitlep;
