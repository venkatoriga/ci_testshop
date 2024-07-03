import React from "react";
import "../Steps/index.css";
const Steps = () => {
    return (
        <>
            <section className="Stepper_layout pt-5 mt-5">
                <div className="max-container pt-5 mt-5">
                    <div className="container-fluid p-0 m-0 row">
                        <div className="col-lg-12 text-center">
                                <h1 className="heading-600-44-20">4 simple steps to get started</h1>
                                <p className="heading-400-20-14 op-80">Our maintenance strategies are designed to be both efficient and cost-effective.</p>

                        </div>
                        <div className="col-lg-12 p-0">
                            <div className=" greyBG">
                                <div className="mod-stepper">
                                    <h1>01</h1>
                                    <div className="icon-bg-light">
                                        <img src="/Servicing.svg" alt="" />
                                    </div>
                                    <p>Raise a Service Request Online</p>
                                </div>
                                <div className="mod-stepper">
                                    <h1>02</h1>
                                    <div className="icon-bg-light">
                                        <img src="/Contact-agent.svg" alt="" />
                                    </div>
                                    <p>Get contacted by our agent</p>
                                </div>
                                <div className="mod-stepper">
                                    <h1>03</h1>
                                    <div className="icon-bg-light">
                                        <img src="/Track.svg" alt="" />
                                    </div>
                                    <p>Track Request on Dashboard</p>
                                </div>
                                <div className="mod-stepper">
                                    <h1>04</h1>
                                    <div className="icon-bg-light br-none">
                                        <img src="/Schedule.svg" alt="" />
                                    </div>
                                    <p>Schedule service visits online</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Steps;