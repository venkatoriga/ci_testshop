import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './AdvancePayment.css';
import { leftArrowIcon, botIcon } from "../../../helpers/Icons";
import FooterBottom from "../../Footer/FooterBottom";
import PaymentModal from '../Modals/PaymentModal';
import gql from 'graphql-tag';
import { useLocation } from 'react-router-dom';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { secondClient, GET_MACHINE_DETAILS, update_machine_Advance_amount, CreatePayments } from '../../OrigaExtentionAPI/mutations'
import FooterBottom2 from "../../Footer/FooterBottom2";
import Confirmation from "./Confirmation";

const clientToken = secondClient

const clientMachine = secondClient

const priceConvert = (price) => {
  price = typeof price === 'string' ? price : String(price);
  let count=1;
  let comma=3;
   let formatedPrice=""
   for(let i=price.length-1;i>=0;i--){
       formatedPrice=price[i]+formatedPrice
       if(count===comma){
            formatedPrice=","+formatedPrice
           comma=2;
           count=0;
       }count++;
    
   }
   console.log("==>>",formatedPrice)
      if(formatedPrice[0]===","){
          formatedPrice =formatedPrice.slice(1, formatedPrice.length)
       }
       return formatedPrice;

};

const AdvancePayment = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loggedin = localStorage.getItem('userToken');
  const [SuccessPopUp, setSuccessPopUp] = useState(false);
  const [PaymentLink, setPaymentLink] = useState([]);
  const [productDETAILS, setProductDETAILS] = useState({});
  const [financeRequired, setfinanceRequired] = useState(false);
  const productId = queryParams.get('id');
  const buyMachineId = queryParams.get('buyMachineId');
  const [isSmallScreen] = useState(window.innerWidth <= 767)
  // const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const message = queryParams.get('message')
  let showModal = false
  const handleModal = (status) => {
    if (status) {
      showModal = true
      // setShowModal(status);
      document.body.classList.add('no-overflow');
    } else {
      showModal = false
      // setShowModal(false);
      document.body.classList.remove('no-overflow');
    }
  }

  if (message === 'Paid' || message === 'NOTPAID') {
    handleModal(true)
  }

  // const handleModal = (status) => {
  //     if(status){
  //         setShowModal(status);
  //         document.body.classList.add('no-overflow');
  //     }else{
  //         setShowModal(false);
  //         document.body.classList.remove('no-overflow');
  //     }
  // }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');

        const { data } = await clientMachine.mutate({
          mutation: GET_MACHINE_DETAILS,
          variables: { productId: productId, "customerId": id, "buyMachineId": buyMachineId },
        });
        setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)
        updateFormattedPrice()
        console.log("API Response==>", data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const advanceAmount = productDETAILS?.price_details?.advance_amount || 0;
  const gstAmount = productDETAILS?.price_details?.advance_gst_amount || 0;
  const totalAmount = advanceAmount + gstAmount;

  const paytoken = async () => {
    try {
      const lastName = localStorage.getItem('lastName');
      const firstName = localStorage.getItem('firstName');
      const number = localStorage.getItem('number');
      let name = firstName + ' ' + lastName
      //  window.location.href = url;
      let url = `https://devextension.origa.market/advancepaymentredirect?id=${productDETAILS?.machine_details?.data?.product?.id}&buyMachineId=${buyMachineId}`
      const inputpaytoken = {
        "amount": totalAmount,
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
        "advancepaymentamount": (Number(productDETAILS?.price_details?.token_amount) + Number(productDETAILS?.price_details?.token_gst_amount)),
        "advancepaymentstatus": "Completed",
        "advancepaymentid": paymentRes?.payment?.PaymentID,
        "advancepaymenttransactionid": paymentRes?.payment?.merchantTransactionId,
        "advancepaymentinvoiceid": 34,
        "financerequired": financeRequired
      }

      clientToken
        .mutate({
          mutation: update_machine_Advance_amount,
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

  const updateFormattedPrice = () => {
    setProductDETAILS((prevDetails) => ({
      ...prevDetails,
      price_details: {
        ...prevDetails.price_details,
        famc_cost: formatCurrency(prevDetails.price_details.amc_cost),
        fdelivery_charges: formatCurrency(prevDetails.price_details.delivery_charges),
        fmachine_price: formatCurrency(prevDetails.price_details.machine_price),
        fmachine_total_price: formatCurrency(prevDetails.price_details.machine_total_price),
        frepairing_cost: formatCurrency(prevDetails.price_details.repairing_cost),
        ftoken_amount: formatCurrency(prevDetails.price_details.token_amount),
        ftoken_amount_total: formatCurrency(prevDetails.price_details.token_amount_total),
        ftoken_gst_amount: formatCurrency(prevDetails.price_details.token_gst_amount),
        fadvance_amount: formatCurrency(prevDetails.price_details.advance_amount),

        fadvance_gst_amount: formatCurrency(prevDetails.price_details.advance_gst_amount),
      },
    }));
  };


  const formatCurrency = (value) => {
    const fractionDigits = value % 1 !== 0 ? 2 : 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value || 0);
  };


  return (
    <>
      {showModal && (
        <PaymentModal message={message} productID={productId} buyMachineId={buyMachineId} modalAction={handleModal} />
      )}
      {SuccessPopUp && (
        <Confirmation setSuccessPopUp={setSuccessPopUp} PaymentLink={PaymentLink} />
      )}
      <div className="container-fluid">
        <div className="max-container my-5">
          {isSmallScreen && <div className="payment-wrap pb-4">
            <div className="btn-wrap">
              <button onClick={() => navigate(-1)} className="back-btn">{leftArrowIcon({ width: 24, height: 24 })}</button>
            </div>
          </div>}
          <div className="payment-wrap">
            {!isSmallScreen && <div className="btn-wrap">
              <button onClick={() => navigate(-1)} className="back-btn">{leftArrowIcon({ width: 24, height: 24 })}</button>
            </div>}
            <div className="content-wrap">
              <div className="body-wrap">
                <div className="heading-600-20 heading">Advance Payment </div>
                <div className="heading-400-14-12 text">Make an Advance Payment for this machine in order to block it. You can complete the remaining payment towards the machine within the next 2 weeks in order to secure the machine or the advance would be refunded to your bank account.</div>
                <div className="product-wrap">
                  <div className="left-wrap payment-img">
                    <img className="product-img" src={productDETAILS?.machine_details?.data?.product?.thumbnail?.url || "/asset/placeholder.png"} alt="hitachi-img" />
                    <div className="detail-wrap">
                      <div className="heading-600-16 title">{productDETAILS?.machine_details?.data?.product?.name}</div>
                      <div className="price-wrap">
                        <div className="price-item">
                          <div className="heading-400-14-12 price-heading light-txt">Machine Price</div>
                          <div className="heading-400-14-12 price-heading light-txt">Machine Advance</div>
                        </div>
                        <div className="price-item">
                          <div className="heading-600-14 price">{productDETAILS?.price_details?.fmachine_price}</div>
                          <div className="heading-600-14 price">{productDETAILS?.price_details?.fadvance_amount}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right-wrap">
                    <div className="heading-600-20 amount-heading">Advance Amount Summary</div>
                    <div className="price-item">
                      <div className="heading-400-16-12 title">Advance Amount</div>
                      <div className="heading-400-16-12 price">{productDETAILS?.price_details?.fadvance_amount}</div>
                    </div>
                    <div className="price-item">
                      <div className="heading-400-16-12 title">GST ({productDETAILS?.finance_details?.gst})</div>
                      <div className="heading-400-16-12 price">{productDETAILS?.price_details?.fadvance_gst_amount}</div>
                    </div>
                    <div className="total-wrap">
                      <div className="heading-600-16 title">Total</div>
                      <div className="heading-600-16 total-price">₹{productDETAILS?.price_details?.advance_amount_total?priceConvert(productDETAILS?.price_details?.advance_amount_total):""}</div>
                    </div>
                    <div className="loan-wrap">
                      <div className="select-loan"><input type='checkbox' onClick={() => setfinanceRequired(!financeRequired)} name='check' /></div>
                      <div className="text-wrap">
                        <div className="heading-600-16 heading">Need a loan or Lease to Purchase this Machine?</div>
                        <div className="heading-400-14-12 text">Check the box and our team will get in touch with you in 24 hours to complete the process</div>
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => paytoken()} className="payment-btns">Proceed to Payment</button>
              </div>
            </div>
          </div>
          {/* <div className="bot-icon-wrap mt-5">
            <div className="bot-icon">{botIcon({ width: 37, height: 37 })}</div>
          </div> */}
        </div>
      </div>
      <FooterBottom2 />
    </>
  );
}

export default AdvancePayment