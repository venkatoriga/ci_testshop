import React, { useState } from "react";
import { useNavigate,useLocation } from 'react-router-dom';
import { leftArrowIcon, botIcon } from "../../../helpers/Icons";
import FooterBottom from "../../Footer/FooterBottom";
import "./ApplyLoan.css";
import ApplyLoanModal from "../Modals/ApplyLoanModal";
import { gql } from 'graphql-tag';
import { secondClient } from '../../OrigaExtentionAPI/mutations'

const createFinancerequest = gql`
mutation createFinancerequest ($requestinput:FinanceRequestInput!) {
    createFinancerequest(requestinput: $requestinput) {
      financerequest {
        id
        name
        status
      }
      message
      success
    }
  }
`;

const ApplyLoan = () => {
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { productDETAILS, buymachineId} = location.state;
    console.log('buymachineId=====}}}}}}}}}',buymachineId);
    const productId = productDETAILS?.machine_details?.data?.product?.id
    const pricing = productDETAILS?.machine_details?.data?.product?.pricing?.priceRange?.start?.gross?.amount
   
    const handleModal = (status) => {
        if (status) {
            setShowModal(status);
            document.body.classList.add('no-overflow');
        } else {
            setShowModal(false);
            document.body.classList.remove('no-overflow');
        }
    }

    const handleSubmit  = async () => {
        // console.log('name',name);
        // console.log('email',email);
        // console.log('contact',contact);
        if (!name.trim() || !email.trim() || !contact.trim()) {
            alert("Please fill out all required fields.");
            return;
        }
    
        let customerid = localStorage.getItem('id');
        try {
            const { data } = await secondClient.mutate({
                mutation: createFinancerequest,
                variables: {
                  requestinput: {
                    customerid: customerid || null,
                    buymachineid: buymachineId === 0 ? null:buymachineId,
                    productid: productId,
                    price: JSON.stringify(pricing),
                    name: name,
                    emailid: email,
                    phonenumber: contact,
                  },
                },
              });
            console.log("API Response paymentgetway==>>>", data);
          } catch (error) {
            console.error('API Error==>', error.message);
      
          }
        handleModal(true);
    }

    return (
        <>
            {showModal && (
                <ApplyLoanModal productId={productId} buyMachineId={buymachineId} modalAction={handleModal} />
            )}
            <div className="container-fluid">
                <div className="max-container my-5">
                    <div className="apply-loan">
                        <div className="btn-wrap">
                            <button onClick={() => navigate(-1)} className="back-btn">{leftArrowIcon({ width: 24, height: 24 })}</button>
                        </div>
                        <div className="content-wrap">
                            <div className="body-wrap">
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14 heading">Apply for lease or Loan</div>
                                <p className="heading-para heading-400-14-12 light-txt">Grow your Business by giving it the right fuel it needs. Don't worry about financing, Team Origa has you covered for that.</p>
                                <div className="product-wrap">
                                    <div className="left-wrap">
                                        <div className="heading-600-16 title">Tell us your Contact Details</div>
                                        <p className="title-para heading-400-14-12 light-txt">Set your requirements for this project, the estimated price will be based on the project requirements</p>
                                    </div>
                                    <div className="right-wrap">
                                        <form>
                                            <div className="bi-form-group">
                                                <input type="text" name="name" id="name" className="bi-form-field bg-white" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                                                <label htmlFor="name" className="heading-400-14-12 bi-form-label">Name</label>
                                            </div>
                                            <div className="bi-form-group">
                                                <input type="email" name="email" id="email" className="bi-form-field bg-white" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label htmlFor="email" className="heading-400-14-12 bi-form-label">Email Id</label>
                                            </div>
                                            <div className="bi-form-group">
                                                <input type="text" name="phone" id="phone" className="bi-form-field bg-white" placeholder="Number" value={contact} onChange={(e) => setContact(e.target.value)} />
                                                <label htmlFor="phone" className="heading-400-14-12 bi-form-label">Contact No.</label>
                                            </div>
                                            <button type="button" className="submit-btns" onClick={handleSubmit}>Submit</button>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* <div className="bot-icon-wrap mt-5">
                        <div className="bot-icon">{botIcon({ width: 37, height: 37 })}</div>
                    </div> */}
                </div>
            </div>
            <FooterBottom />
        </>
    );
}
export default ApplyLoan;
