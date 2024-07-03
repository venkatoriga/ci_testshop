import React from 'react'
import { Container } from 'react-bootstrap'
import ImagewithTitlep from '../SubComponent/ImagewithTitlep/ImagewithTitlep';
import AllOrigaService from '../OrigaService/AllOrigaService';
import LightBlub from '../SubComponent/AllSvgs/LightBlub';
import Professionals from '../SubComponent/AllSvgs/Professionals';
import Dollar from '../SubComponent/AllSvgs/Dollar';
import Shield from '../SubComponent/AllSvgs/Shield';
const SixSection = () => {
    const services = [
        { title: "Extended Warranty", imageSource: <Shield/>, message: 'Our Machines come with one year of free Services' },
        { title: "Zero Charges", imageSource:<Dollar/>, message: 'Our Machines come with one year of free Services' },
        { title: "Professionals", imageSource: <Professionals/>, message: 'Our Machines come with one year of free Services' },
        { title: "Ensures Originality", imageSource:<LightBlub/>, message: 'Our Machines come with one year of free Services' },
      ];
    return (
        <>
        <section className='max-container mt-5 tablet-d-padding'>
            <Container className="secondsection m-0 p-0 pt-5">
                <h1 className='heading-600-44-20'>Origa Service Unique Values</h1>
                <p className="heading-400-16-14 op-80">Minimum Risks & Maximum Uptime</p>
             
                <div className="row typ-m-auto">
                {
                  services.map(({ title, imageSource, message }, index) =>
                    <div className="col-lg-3 col-md-3 col-6" key={index}>
                      <ImagewithTitlep title={title} imageSource={imageSource} message={message} fillColor={"#9BA24C"}/>
                    </div>
                  )
                }
              </div>
               
            </Container>
       
    </section>
        </>
    )
}

export default SixSection