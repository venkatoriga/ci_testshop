import React, { useState, useEffect } from "react";
import './Summary.css';
import { addIcon, botIcon, editIcon, ellipsePurpleIcon, emailIcon, leftArrowIcon, phoneIcon, successNumberIcon, vectorLineIcon } from "../../../../helpers/Icons";
import MachinePurchaseModal from "./MachinPurchaseModal";
import FooterBottom from "../../../Footer/FooterBottom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { secondClient, GET_MACHINE_DETAILS, CreatePayments, update_machine_FULL_amount } from '../../../OrigaExtentionAPI/mutations'
import Confirmation from "../../Product/Confirmation";

const clientToken = secondClient

const SpareSummary = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loggedin = localStorage.getItem('userToken');
  const [productDETAILS, setProductDETAILS] = useState({});
  const [SuccessPopUp, setSuccessPopUp] = useState(false);
  const [PaymentLink, setPaymentLink] = useState([]);
  const productId = queryParams.get('id');
  var buyMachineId = queryParams.get('buyMachineId')
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const message = queryParams.get('message')
  const [isSmallScreen] = useState(window.innerWidth <= 767)
  // let showModal = false
  const handleModal = (status) => {
    // showModal = status
    if (status) {
      // showModal = status
      setShowModal(status);
      // document.body.classList.add('no-overflow');
    }
    else {
      setShowModal(false);
      // document.body.classList.remove('no-overflow');
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');

        const { data } = await clientToken.mutate({
          mutation: GET_MACHINE_DETAILS,
          variables: { productId: productId, "customerId": id, "buyMachineId": buyMachineId },
        });
        setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)
        console.log("API Response==>", data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);


  const addresses = [
    { name: 'Rajesh Kapoor', address: 'Indira Mills, Bandra East, Das Disha Marg, Andheri Gufa, Mumbai, Maharashtra 401 208', phone: '+91-94305 45234', email: 'rajeshkapoor@indiramills.com' },
  ];


  const paytoken = async () => {
    try {
      const lastName = localStorage.getItem('lastName');
      const firstName = localStorage.getItem('firstName');
      const number = localStorage.getItem('number');
      let name = firstName + ' ' + lastName
      let url = `https://devextension.origa.market/toolspaymentredirect?id=1235465465454&buyMachineId=2133`
      const inputpaytoken = {
        "amount": productDETAILS?.price_details?.full_amount_total || '150',
        "createdby": name,
        "mobileno": number,
        "paymentmethod": "PAGE",
        "paymentstatus": "PEN",
        "redirecturl": url
      }
      console.log(inputpaytoken)
      clientToken
        .mutate({
          mutation: CreatePayments,
          variables: {
            inputpayment: inputpaytoken  // Fix the variable name here
          },
        })
        .then(({ data }) => {
          updateTokenAmount(data.createPayment)
          // window.location.href =  data.createPayment.responseurl;
        })
        .catch((error) => {
          // Handle error
          console.error('Mutation error:', error);
        });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const updateTokenAmount = (paymentRes) => {
    try {

      const id = localStorage.getItem('id');


      const inputbuymachine = {
        "id": productDETAILS?.buymachine_id,
        "customerid": id,
        "variantid": productDETAILS?.machine_details?.data?.product?.variants[0].id,
        "slugname": productDETAILS?.machine_details?.data?.product?.slug,
        "fullpaymentamount": (Number(productDETAILS?.price_details?.token_amount) + Number(productDETAILS?.price_details?.token_gst_amount)),
        "fullpaymentstatus": "Completed",
        "fullpaymentid": paymentRes?.payment?.PaymentID,
        "fullpaymenttransactionid": paymentRes?.payment?.merchantTransactionId,
        "fullpaymentinvoiceid": 34
      }

      clientToken
        .mutate({
          mutation: update_machine_FULL_amount,
          variables: {
            inputbuymachine: inputbuymachine
          },
        })
        .then(({ data }) => {
          // Handle success, access data.createBuymachine for the response
          console.log('Mindow.location.href:', paymentRes.responseurl);
          if (paymentRes.responseurl) {
            setSuccessPopUp(true)
            setPaymentLink(paymentRes.responseurl)
            //window.location.href = paymentRes.responseurl;
          }
          // updateTokenAmount(data.createBuymachine)
          // paytoken(data.createBuymachine)
        })
        .catch((error) => {
          // Handle error
          console.error('Mutation error:', error);
        });
      // setBuyMachine(data)s
    } catch (error) {
      console.error('Error  Buy Machine:', error);
    }
  }
  const onBackNavigateHandler = () => {
    navigate(`/buy/add-address?id=${productDETAILS?.machine_details?.data?.product?.id}&buyMachineId=${buyMachineId}`);
  }
  useEffect(() => {
    if (message === 'Paid' || message === 'NOTPAID') {
      handleModal(true)
    }
  }, [message])
  return (
    <>
     {SuccessPopUp && (
        <Confirmation setSuccessPopUp={setSuccessPopUp} PaymentLink={PaymentLink} />
      )}
      {showModal && (
        <MachinePurchaseModal message={message} modalAction={handleModal} />
      )}
      <div className="container-fluid">
        <div className="max-container my-5">
          {
            isSmallScreen && <div className="summary-wrap pb-4"><div className="btn-wrap"><button className="back-btn" onClick={onBackNavigateHandler}>{leftArrowIcon({ width: 24, height: 24 })}</button></div></div>
          }
          <div className="summary-wrap">
            {!isSmallScreen && <div className="btn-wrap"><button className="back-btn" onClick={onBackNavigateHandler}>{leftArrowIcon({ width: 24, height: 24 })}</button></div>}
            <div className="content-wrap pt-5">
              <div className="address-top-wrap">
                <div className="dilevery-address heading-600-16"><span className='dilevery-address-1'>{successNumberIcon({ width: 32, height: 32 })}</span>Delivery Address</div>
                <div className='line'>{vectorLineIcon({ width: 88, height: 1 })}</div>
                <div className="order-sumary heading-600-16"><span className='order-sumary-2'>{ellipsePurpleIcon({ width: 32, height: 32 })}</span>Order Summary</div>
              </div>
              <div className="bottom-wrap">
                <div className="top-heading">
                  <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14 select-heading">Select a Delivery Address</div>
                  <div className="add-address heading-600-14 heading-600-14-12" onClick={() => window.location = "/buy/new-address"}><span className='addicon'>{addIcon({ width: 14, height: 14 })}</span>Add New Address</div>
                </div>
                <div className="bottom-wrap-detail">
                  {addresses.map((detail, index) => (<>
                    <div className='detail-lists' key={index}>
                      <div className="check"><input className='radio' checked={true} type="radio" id="select" /></div>
                      <div className="check-details">
                        <div className="select heading-600-20 heading-600-20-16">{productDETAILS?.delivery_address?.firstname}</div>
                        <div className="text heading-400-14-12">{productDETAILS?.delivery_address?.address}</div>
                        <div className="contact-details">
                          {productDETAILS?.delivery_address?.phone && (<div className="heading-400-14-12 phone"><span>{phoneIcon({ width: 24, height: 24 })}</span> {productDETAILS?.delivery_address?.phone}</div>)}
                          {productDETAILS?.delivery_address?.email && (<div className="heading-400-14-12 emailby"><span>{emailIcon({ width: 24, height: 24 })}</span> {productDETAILS?.delivery_address?.email}</div>)}
                        </div>
                      </div>
                      <div className="edit-address heading-600-14 heading-600-14-12"><span className='editicon'>{editIcon({ width: 24, height: 24 })}</span> Edit Address</div>
                    </div>

                  </>
                  ))}
                </div>
              </div>
              <div className="product-wrap">
                <div className="left-wrap">
                  <img className="product-img" src={productDETAILS?.machine_details?.data?.product?.thumbnail?.url} alt="hitachi-img" />
                  <div className="detail-wrap">
                    <div className="heading-600-16 title">{productDETAILS?.machine_details?.data?.product?.name}</div>
                    <div className="price-wrap">
                      <div className="price-item">
                        <div className="heading-400-14-12 price-heading light-txt">Machine Price</div>
                        <div className="heading-400-14-12 price-heading light-txt">Balance Price</div>
                      </div>
                      <div className="price-item">
                        <div className="heading-600-14 price">₹{productDETAILS?.price_details?.machine_price}</div>
                        {productDETAILS?.price_details?.token_payment_status !== "PAYMENT_SUCCESS" ? (
                          <div className="heading-600-14 price">₹{productDETAILS?.price_details?.full_amount}</div>
                        ) : (
                          <div className="heading-600-14 price">₹{productDETAILS?.price_details?.balance_amount}</div>
                        )}

                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-wrap">
                  <div className="heading-600-20 amount-heading">  Amount Spare-Summary</div>
                  <div className="price-item">
                    <div className="heading-400-16-12 title">Balance Price</div>
                    {productDETAILS?.price_details?.token_payment_status !== "PAYMENT_SUCCESS" ? (

                      <div className="heading-400-16-12 price">₹{productDETAILS?.price_details?.full_amount}</div>
                    ) : (
                      <div className="heading-400-16-12 price">₹{productDETAILS?.price_details?.balance_amount}</div>
                    )}

                  </div>
                  <div className="price-item">
                    <div className="heading-400-16-12 title">GST (18%)</div>
                    {productDETAILS?.price_details?.token_payment_status !== "PAYMENT_SUCCESS" ? (

                      <div className="heading-400-16-12 price">₹{productDETAILS?.price_details?.full_gst_amount}</div>
                    ) : (
                      <div className="heading-400-16-12 price">₹{productDETAILS?.price_details?.balance_gst_amount}</div>
                    )}

                  </div>
                  <div className="price-item">
                    <span className="heading-400-16-12 title">Delivery Charges</span>
                    {productDETAILS?.price_details?.delivery_charges_excluded ? (<strike className="heading-400-16-12 price">₹ {productDETAILS?.price_details?.delivery_charges ? productDETAILS?.price_details?.delivery_charges : '1,00,000'}</strike>
                    ) : (<span className="heading-400-16-12 price">₹ {productDETAILS?.price_details?.delivery_charges ? productDETAILS?.price_details?.delivery_charges : '1,00,000'}</span>
                    )}
                  </div>
                  <div className="price-item">
                    <span className="heading-400-16-12 title">Repairing cost</span>
                    {productDETAILS?.price_details?.repairing_cost_excluded ? (<strike className="heading-400-16-12 price">₹ {productDETAILS?.price_details?.repairing_cost ? productDETAILS?.price_details?.repairing_cost : '1,00,000'}</strike>
                    ) : (<span className="heading-400-16-12 price">₹ {productDETAILS?.price_details?.repairing_cost ? productDETAILS?.price_details?.repairing_cost : '1,00,000'}</span>
                    )}
                  </div>
                  <div className="price-item">
                    <span className="heading-400-16-12 title">1 Year AMC</span>
                    {productDETAILS?.price_details?.amc_cost_excluded ? (<strike className="heading-400-16-12 price">₹ {productDETAILS?.price_details?.amc_cost ? productDETAILS?.price_details?.amc_cost : '1,00,000'}</strike>
                    ) : (<span className="heading-400-16-12 price">₹ {productDETAILS?.price_details?.amc_cost ? productDETAILS?.price_details?.amc_cost : '1,00,000'}</span>
                    )}
                  </div>
                  <div className="total-wrap">
                    <div className="heading-600-16 title">Total</div>
                    <div className="heading-600-16 total-price">₹{productDETAILS?.price_details?.full_amount_total}</div>
                  </div>
                </div>
              </div>
              <div className="delivery-btn-wrap"><button className="button" onClick={() => paytoken()}>Proceed to Payment</button></div>
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

export default SpareSummary;