import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {leftArrowIcon,botIcon} from "../../../helpers/Icons";
import {ApolloClient,InMemoryCache} from '@apollo/client';
import FooterBottom from "../../Footer/FooterBottom";
import TokenModal from "../Modals/TokenModal";
import LoginModel from '../../Authentication/LoginModel/LoginModel';
import client from "./ProductPage/appolloclient";
import gql from 'graphql-tag';
import "./Token.css";
import Confirmation from "./Confirmation";
import { secondClient, GET_MACHINE_DETAILS, CreatePayments, update_machine_Token_amount,BUY_MACHINE_MUTATION,userID } from '../../OrigaExtentionAPI/mutations'
const clientToken = secondClient
const clientBuyMachine = secondClient


const Token = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const loggedin = localStorage.getItem('userToken');
    const productId = queryParams.get('id') 
    const buymachine_id = queryParams.get('buyMachineId');
    const message = queryParams.get('message')
    let showModal = false
    const [SuccessPopUp, setSuccessPopUp] = useState(false);
    const [PaymentLink, setPaymentLink] = useState([]);
    const [loginPortal, setLoginPortal] = useState(false);
    useEffect(() => {
        if (loggedin) {
            return
        } else {
            setLoginPortal(true);
        }
    }, [loggedin]);
    const handleModal = (status) => {
        if(status){
            showModal = true
            // setShowModal(status);
            document.body.classList.add('no-overflow');
        } else {
            showModal = false
            // setShowModal(false);
            document.body.classList.remove('no-overflow');
        }
    }
    if (message === 'Paid'  || message === 'NOTPAID' ) {
        handleModal(true)
    }
    const [productDETAILS, setProductDETAILS] = useState({});
    const [userDETAILS, setuserDETAILS] = useState({});
    const [BuyM, setBuyMachine] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try{
                const id = localStorage.getItem('id');
                const { data } = await clientToken.mutate({
                    mutation: GET_MACHINE_DETAILS,
                    variables: { productId: productId, "customerId": id,"buyMachineId":buymachine_id  },
                });
                setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)
                updateFormattedPrice()
            }catch(error) {
                console.error('Error fetching data:', error);
            }
        };
        // const getuserData = async () => {
        //     try{
        //         const {data} = await client.mutate({
        //             mutation: userID,
        //             variables: {},
        //             context: {
        //                 headers: {
        //                     Authorization: loggedin ? `Bearer ${loggedin}` : '',
        //                 },
        //             },
        //         });
        //         setuserDETAILS(data)
        //         console.log("API Response==>", data);
        //     }catch(error){
        //         console.error('Error fetching data:', error);
        //     }
        // };
        //getuserData()
        fetchData();
    }, []);
    const paytoken = async (buyRes) => {
        try{
            const lastName = localStorage.getItem('lastName');
            const firstName = localStorage.getItem('firstName');
            const number = localStorage.getItem('number');
            let name = firstName + ' ' + lastName
            const machine_ID = buymachine_id !== "0" ? buyRes:buyRes.id
            //  window.location.href = url;
            //let url = `https://devextension.origa.market/paymentredirect?id=${productId}`
            const inputpaytoken = {
                "amount": (Number(productDETAILS?.price_details?.token_amount) + Number(productDETAILS?.price_details?.token_gst_amount)),
                "createdby": name,
                "mobileno": number,
                "paymentmethod": "PAGE",
                "paymentstatus": "PEN",
                "redirecturl": `https://devextension.origa.market/paymentredirect?id=${productId}&buyMachineId=${machine_ID}`
            }
            clientToken
                .mutate({
                    mutation: CreatePayments,
                    variables: {
                        inputpayment: inputpaytoken  // Fix the variable name here
                    },
                })
                .then(({ data }) => {
                    // Handle success, access data.createPayment for the response
                    // console.log(data.createPayment.responseurl,'responseurl')
                    updateTokenAmount(buyRes, data.createPayment)
                    // window.location.href =  data.createPayment.responseurl;
                    // console.log('Mutation success:', data.createPayment);
                })
                .catch((error) => {
                    // Handle error
                    console.error('Mutation error:', error);
                });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const buymachine = async () => {
        try{
            const id = localStorage.getItem('id');
            const inputbuymachine = {
                customerid: id,
                variantid: productDETAILS?.machine_details?.data?.product?.variants[0].id,
                productid: productId,
                slugname: productDETAILS?.machine_details?.data?.product?.slug,
                status: "Pending",
                createdby: id
            };
            clientBuyMachine
                .mutate({
                    mutation: BUY_MACHINE_MUTATION,
                    variables: {
                        input: inputbuymachine
                    },
                })
                .then(({ data }) => {
                    // Handle success, access data.createBuymachine for the response
                    console.log('Mutation success:', data.createBuymachine);
                    // updateTokenAmount(data.createBuymachine)
                    paytoken(data.createBuymachine)
                })
                .catch((error) => {
                    // Handle error
                    console.error('Mutation error:', error);
                });
            // setBuyMachine(data)s
        }catch(error){
            console.error('Error  Buy Machine:', error);
        }
    }
    const updateTokenAmount = (buyRes, paymentRes) => {
        try {
            const id = localStorage.getItem('id');
            const inputbuymachine = {
                "id": buymachine_id !== "0" ? parseInt(buyRes):parseInt(buyRes.id),
                "customerid": id,
                "variantid": productDETAILS?.machine_details?.data?.product?.variants[0].id,
                "slugname": productDETAILS?.machine_details?.data?.product?.slug,
                "tokenpaymentamount": (Number(productDETAILS?.price_details?.token_amount) + Number(productDETAILS?.price_details?.token_gst_amount)),
                "tokenpaymentstatus": "Completed",
                "tokenpaymentid": paymentRes?.payment?.PaymentID,
                "tokenpaymenttransactionid": paymentRes?.payment?.merchantTransactionId,
                "tokenpaymentinvoiceid": 34
            }
            clientToken
                .mutate({
                    mutation: update_machine_Token_amount,
                    variables: {
                        inputbuymachine: inputbuymachine
                    },
                })
                .then(({data}) => {
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
        }catch(error){
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
                // Add more fields as needed
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
    const onHidePortal = () => {
        //setPricebtn(!!localStorage.getItem('id'))
        setLoginPortal(false);
        window.location.reload();
    }
    return (
        <>
        {loginPortal && <LoginModel onHide={onHidePortal} />}
          {showModal && (
                <TokenModal modalAction={handleModal} message={message} proid={productId} buymachine_id={buymachine_id} />
            )}
              {SuccessPopUp && (
                <Confirmation setSuccessPopUp={setSuccessPopUp} PaymentLink={PaymentLink}/>
            )}
            <div className="container-fluid">
                <div className="max-container my-5">
                    <div className="token-wrap">
                        <div className="btn-wrap">
                            <button onClick={() => navigate(-1)} className="back-btn">{leftArrowIcon({width:24,height:24})}</button>
                        </div>
                        <div className="content-wrap">
                            <div className="body-wrap">
                                <div className="heading-600-20 heading">Token Amount</div>
                                <div className="product-wrap">
                                    <div className="left-wrap">
                                        <img className="product-img" src={productDETAILS?.machine_details?.data?.product?.thumbnail?.url || "/asset/placeholder.png"} alt="hitachi-img"/>
                                        <div className="heading-600-16 title">{productDETAILS?.machine_details?.data?.product?.name}</div>
                                        <div className="price-wrap">
                                            <div className="price-item">
                                                <div className="heading-400-14-12 price-heading light-txt">Machine Price</div>
                                                <div className="heading-400-14-12 price-heading light-txt">Block for 7 days</div>
                                            </div>
                                            <div className="price-item">
                                                <div className="heading-600-14 price">{productDETAILS?.price_details?.fmachine_price}</div>
                                                <div className="heading-600-14 price">{productDETAILS?.price_details?.ftoken_amount}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="right-wrap">
                                        <div className="heading-600-20 amount-heading">Token Amount Summary</div>
                                        <div className="price-item">
                                            <div className="heading-400-16-12 title">Token Amount</div>
                                            <div className="heading-400-16-12 price">{productDETAILS?.price_details?.ftoken_amount}</div>
                                        </div>
                                        <div className="price-item">
                                            <div className="heading-400-16-12 title">GST Amount ({productDETAILS?.finance_details?.gst})  </div>
                                            <div className="heading-400-16-12 price">{productDETAILS?.price_details?.ftoken_gst_amount}</div>
                                        </div>

                                        <div className="total-wrap">
                                            <div className="heading-600-16 title">Total</div>
                                            <div className="heading-600-16 total-price">{productDETAILS?.price_details?.ftoken_amount_total}</div>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={() => buymachine_id !== '0'  ?  paytoken(buymachine_id) : buymachine() } className="payment-btns">Proceed to Payment</button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="bot-icon-wrap mt-5">
                        <div className="bot-icon">{botIcon({width:37,height:37})}</div>
                    </div> */}
                </div>
            </div>
            <FooterBottom/>
        </>
    );
}
export default Token;