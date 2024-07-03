import React,{useState} from "react";
import "./Withdraw.css";
import WithdrawModal from "../../../Modals/WithdrawModal";
const Withdraw = () => {
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
            {showModal === "withdraw-modal" && (
                <WithdrawModal modalAction={handleModal}/>
            )}
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="withdraw">
                        <div className="heading-600-16">Wish to withdraw your order?</div>
                        <button onClick={() => handleModal("withdraw-modal")} className="withdraw-btn">Withdraw Order</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Withdraw;