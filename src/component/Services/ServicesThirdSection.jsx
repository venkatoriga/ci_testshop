import React from "react";
import { Container, Image } from "react-bootstrap";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
const ServicesThirdSection = () => {
    const navigate = useNavigate();
    const title = "One Time Repair";
    const message =
        "After you get in touch with us we will handle the rest from there. Our Experiences Engineers will inspect your machine for free at your convenience for free at your convenience.";
    const title1 = "Logistics";
    const message1 =
        "Addressing any mechanical or electrical faults by repairing or replacing faulty components or parts.";
    const title2 = "Commissioning, Decommissioning";
    const message2 =
        "We ensure that newly installed machinery or equipment is fully operational and ready for use.";
    return (
        <Container fluid className="tenthSectionMaindiv">
            <Container className="tenthSection">
                <Container className="tenthSectionRight">
                    <h1>{title}</h1>
                    <p>{message}</p>
                    <Button message={"Request A Callback"} callFunction={() => navigate('/onetimerepair')} />
                </Container>
                <Container className="tenthSectionLeft">
                    <Image src="asset/visions.png" alt="visions.png" />
                </Container>
            </Container>
            <Container className="tenthSection">
                <Container className="tenthSectionLeft">
                    <Image src="asset/mission.png" alt="mission.png" />
                </Container>
                <Container className="tenthSectionRight">
                    <h1>{title1}</h1>
                    <p>{message1}</p>
                    <Button message={"Request A Callback"} callFunction={() => navigate('/logistics')} />
                </Container>
            </Container>
            <Container className="tenthSection">
                <Container className="tenthSectionRight">
                    <h1>{title2}</h1>
                    <p>{message2}</p>
                    <Button message={"Request A Callback"} callFunction={() => navigate('/CandD')} />
                </Container>
                <Container className="tenthSectionLeft">
                    <Image src="asset/image 565.png" alt="image 565.png" />
                </Container>
            </Container>
        </Container>
    );
};

export default ServicesThirdSection;
