import React,{useState} from "react";
import PhoneModal from "../Modals/PhoneModal";
import "./CallToAction.css"
const CallToAction = () => {
    const [showModal, setShowModal] = useState(false);
    const handleModal = (status) => {
        if(status){
            setShowModal(status);
        }else{
            setShowModal(false);
        }
    }
    return (
        <>
            {showModal && (
                <PhoneModal modalAction={handleModal}/>
            )}
            <div className="call-to-action-wrap">
                <div className="container-fluid col-cust">
                    <div className="max-container my-0 benefits">
                        <div className="call-to-action">
                            <div className="">
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16">Hitachi CNC Machine</div>
                                <div className="light-txt">Year of Purchase: 2019</div>
                            </div>
                            <div className="">
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16">₹4,50,000</div>
                                <div className="light-txt"><span>or </span>₹15,479/month</div>
                            </div>
                            <div class="btns-wrap">
                                <button onClick={() => handleModal(true)} type="button" class="box-item-btn buy-now">Click to view price</button>
                                <button onClick={() => window.location = "/pay-token"} type="button" class="box-item-btn">Book with Token of ₹5,000</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CallToAction;