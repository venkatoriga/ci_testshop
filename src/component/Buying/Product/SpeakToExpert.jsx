import React,{useState} from "react";
import PhoneModal from "../Modals/PhoneModal";
import "./SpeakToExpert.css";
const SpeakToExpert = () => {
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
            <div className="container-fluid col-cust">
                <div className="max-container my-4 benefits">
                    <div className="speak-expert-wrap">
                        <div className="image-wrap">
                            <img src="/asset/speak-expert.png"/>
                        </div>
                        <div className="speak-content-wrap">
                            <img src="/asset/OrigaService.png"/>
                            <div class="heading-600-32 heading-600-32-20 text-left">Speak to our Expert</div>
                            <div className="">Still have a few doubts regarding the machine? Have a word with our expert. Get a one time repair Get a one time repairservice if your machin has broken down Still have a few doubts regarding the machine? Have a word with our expert.</div>
                            <button onClick={() => handleModal(true)} type="button" className="box-item-btn">Get a Callback</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default SpeakToExpert;