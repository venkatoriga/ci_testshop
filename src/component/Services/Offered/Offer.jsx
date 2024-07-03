import React from "react";
import { useNavigate } from "react-router-dom";
import "../Offered/offer.css";


const Offers = () => {
    const navigate = useNavigate();
    const serviceRequest_1 = () => {
        const productId = "serviceRequest";
        const serviceName = "On Call Service"
        navigate('/service/Addonservice', { state: { productId, serviceName } });
    }
    const serviceRequest_2 = () => {
        const productId = "serviceRequest";
        const serviceName = "Preventive Maintenance"
        navigate('/service/Addonservice', { state: { productId, serviceName } });
    }
    const serviceRequest_3 = () => {
        const productId = "serviceRequest";
        const serviceName = "Retrofitting"
        //navigate('/service/Addonservice', { state: { productId,serviceName } });
        navigate('#');
    }
    return (
        <>

            <div className="max-container tablet-d-padding mb-5 pb-5">
                <div className="row pt-5 pb-5">
                    <div className="col col-lg-12 text-center pt-5">

                        <h1 className="heading-600-44-20">Mechanical and electrical maintenance services </h1>
                        <p className="heading-400-16-14 op-60">
                            For CNC & VMC machines
                        </p>


                    </div>
                </div>

                <div className=" row pb-5 col-reverse">
                    <div className="col-lg-5 col-md-12 d-flex align-items-center">

                        <div >
                            <h1 className="heading-600-32-20 pt-3">On Call breakdown Service</h1>
                            <p className="heading-400-16-14 op-80">
                                Origa's on-call breakdown service ensures immediate assistance after a call, minimizing production downtime and conducting necessary repairs promptly
                            </p>
                            <div className='btn-left-to-right'>
                                <button className="long-btn" onClick={() => serviceRequest_1()}>Book service </button>
                            </div>
                        </div>

                    </div>
                    <div className="col-lg-7 col-md-12">

                        <div className="f">
                            <img src="asset/OnCallServiceEnv.webp" alt="visions.png" className="img-fluid" />
                        </div>
                    </div>
                </div>
                <div className="row pt-5 pb-5">
                    <div className="col-lg-7 col-md-12">
                        <div className="f">
                            <img src="asset/PreventiveMaintenanceEnv.webp" alt="mission.png" className="img-fluid" />
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 d-flex align-items-center">
                        <div>

                            <h1 className="heading-600-32-20 pt-3">Preventive Maintenance</h1>
                            <p className="heading-400-16-14 op-80">
                            Opt for preventive maintenance to sidestep major shutdowns, cut costs, and ensure sustained machine eﬃciency and reliability.
                            </p>
                            <div className='btn-left-to-right'>
                                <button className="long-btn" onClick={() => serviceRequest_2()}>Book service </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row col-reverse">
                    <div className="col-lg-5 col-md-12 d-flex align-items-center">
                        <div>
                            <h1 className="heading-600-32-20 pt-3">Retrofitting + com/ dec</h1>
                            <p className="heading-400-16-14 op-80">
                            Machine retroﬁtting delivers safety, eﬃciency, longevity, cost savings, and improved precision in manufacturing
                            </p>
                            <div className='btn-left-to-right heading-600-16-14'>
                                <button className="long-btn" onClick={() => serviceRequest_3()}>Coming Soon</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7 col-md-12">
                        <div className="">
                            <img src="asset/RetrofittingEnv.webp" alt="image565.png" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Offers;
