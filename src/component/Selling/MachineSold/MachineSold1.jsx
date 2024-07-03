import React,{useState,useEffect} from 'react';
import MachineSaleImage from "../MachineSale/MachineSaleImage";
import Breadcrumbs from "../../SubComponent/Breadcrumbs";
import Footer from "../../Footer/Footer";
import {botIcon, downIcon, editIcon, inspectionIcon, ratingIcon} from "../../../helpers/Icons";
import gql from 'graphql-tag';
import "./MachineSold1.css";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
const clientMachine = new ApolloClient({
    uri: 'https://devextension.origa.market/graphql/',
    cache: new InMemoryCache(),
});

const GET_MACHINE_DETAILS = gql`
  query customerSellMachineDetails($customerId: String!, $pdId: BigInt!) {
    customerSellMachineDetails(customerId: $customerId, pdId: $pdId) {
      message
      code
      response
    }
  }
`;

const MachineSold1 = () => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [productDETAILS, setProductDETAILS] = useState({});
    const [machineDetail, setMachineDetail] = useState({
        name: "CNC Machine",
        status: "processing",
        brand: "Hitachi",
        images: ["/asset/image529(1).png", "/asset/image529(1).png", "/asset/image529(1).png"],
        activeStep: "registration",
        is_scheduled: false,
        registration_date: "12th June 2023",
        inspection_date: "",
        documentation_date: "",
        enlisting_date: "",
        sale_date: "",
        payment_date: "",
        dates: [],
        times: [],
        first_name: "",
        last_name: "",
        email: "",
        phone_no: "",
        alternate_no: "",
        address: "",
        address1: "",
        zipcode: "",
        documents: [],
        visiting_days: [],
        visiting_hours: [],
        listed_price: "₹4,00,000",
        inspection_price: "₹3,50,000",
        wishlist: "+24",
        wishlist_percent: "+23%",
        wishlist_total: "164",
        view: "+145",
        view_percent: "+10%",
        view_total: "1200",
        years_old: "7 Years Old",
        amount_received: "₹ 3,50,000",
        transaction_id: "53574647",
        transaction_date: "22nd July 2023",
        rating: "4.5",
        review: "Selling at Origa has been a great experience, once I filled out the form they really took care of everything else. I got a much better deal then what I was being offered earlier."
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = localStorage.getItem('id');
                const productId = queryParams.get('id');
                let reqBody = { customerId: id, pdId: productId }; // Ensure the variable names match your GraphQL query
                console.log(reqBody);

                const { data } = await clientMachine.mutate({
                    mutation: GET_MACHINE_DETAILS,
                    variables: reqBody,
                });

                console.log("Main data useEffect", data);
                // Handle the response data as needed (not shown in the provided code).
                setProductDETAILS(data?.customerSellMachineDetails?.response)
                machineDetail.first_name = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.contactdetails?.firstname;
                machineDetail.last_name = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.contactdetails?.lastname;
                machineDetail.email = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.contactdetails?.useremailid;
                machineDetail.address = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.machinelocation?.address1;
                machineDetail.address1 = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.machinelocation?.address2;
                machineDetail.zipcode = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.machinelocation?.pincode;
                machineDetail.activeStep = data?.customerSellMachineDetails?.response?.process_details[data?.customerSellMachineDetails?.response?.process_details.length - 1]["task_name"]
                machineDetail.phone_no = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.contactdetails?.phoneno;
                machineDetail.alternate_no = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.contactdetails?.alternateno;
                console.log("API Response ==>", data?.customerSellMachineDetails?.response);
                console.log("machine details data===>>>", machineDetail);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };



        fetchData();
    }, []);
    console.log('productDETAILS===================>',productDETAILS);
    const handleDropdownToggle = () => {
        setDropdownVisible(!isDropdownVisible);
      };    
    const breadcrumbsItems = [
        {name:"Account",link:"/"},
        {name:"My Machines",link:"/buy/my-machine"},
        // {name:"Up for sale",link:"/machine-inspection"}
];
const boldtitle = "Up for Sale";
return (
    <>
        <div className="container-fluid col-cust">
            <div className="max-container my-5">
                <div className="top-wrap">
                    <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} backnavi={() => navigate('/buy/my-machine')}/>
                </div>
                <div className="name-wrap">
                    <div className="heading-wrap">
                        <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">{productDETAILS?.machine_details?.data?.product?.name} <span className='processing-btn heading-400-12-10'>sold</span></div>
                        <div className="heading-400-14-12 light-txt">{productDETAILS?.machine_details?.data?.product?.attributes?.Brands}</div>
                    </div>
                    <button type="button" className="contact-btn heading-400-14-12">View Inspection report</button>
                </div>
            </div>
        </div>
        <MachineSaleImage/>
        <div className="container-fluid col-cust">
            <div className="max-container my-4">
                <div className="machine-sell-progress">
                <div className="machine-content">
                            <div

                                className={`content-item ${productDETAILS.process_details &&
                                    productDETAILS.process_details[0]?.status
                                    ?
                                    `${productDETAILS?.process_details[0]?.status.toLowerCase()}` : "pending"
                                    }`}

                            >
                                <span className="first">
                                    {inspectionIcon({ width: 28, height: 28 })}
                                </span>
                                <div className="t-a-c hide-576">Registration</div>
                                <div className="t-a-c show-576">Regis-</div>
                                <div className="t-a-c m-0 show-576">tration</div>
                                {productDETAILS.process_details &&
                                    productDETAILS.process_details[0]?.task_date ? (
                                    <div className="t-a-c light-txt">
                                        {productDETAILS.process_details &&
                                            productDETAILS.process_details[0]?.task_date}
                                    </div>
                                ) : null}
                            </div>
                            <div

                                className={`content-item ${productDETAILS.process_details &&
                                    productDETAILS.process_details[1]?.status
                                    ?
                                    `${productDETAILS?.process_details[1]?.status.toLowerCase()}` : "pending"
                                    }`}
                            >
                                <span className="second svg-fill inspection-after">
                                    {inspectionIcon({ width: 28, height: 28 })}
                                </span>
                                <div className="t-a-c hide-576">Inspection</div>
                                <div className="t-a-c show-576">Inspe-</div>
                                <div className="t-a-c show-576 m-0">ction</div>
                                {productDETAILS.process_details &&
                                    productDETAILS.process_details[1]?.task_date ? (
                                    <div className="t-a-c light-txt">
                                        {productDETAILS.process_details &&
                                            productDETAILS.process_details[1]?.task_date}
                                    </div>
                                ) : null}
                            </div>
                            <div

                                className={`content-item ${productDETAILS.process_details &&
                                    productDETAILS.process_details[2]?.status
                                    ?
                                    `${productDETAILS?.process_details[2]?.status.toLowerCase()}` : "pending"
                                    }`}
                            >
                                <span className={`second svg-fill ${productDETAILS.process_details &&
                                    productDETAILS.process_details[2]?.status === "Completed" ? "doc-after" : ""} `}>
                                    {inspectionIcon({ width: 28, height: 28 })}
                                </span>
                                <div className="t-a-c hide-576">Documentation</div>
                                <div className="t-a-c show-576">Docum-</div>
                                <div className="t-a-c show-576 m-0">entation</div>
                                {productDETAILS.process_details &&
                                    productDETAILS.process_details[2]?.task_date ? (
                                    <div className="t-a-c light-txt">
                                        {productDETAILS.process_details &&
                                            productDETAILS.process_details[2]?.task_date}
                                    </div>
                                ) : null}
                            </div>
                            <div
                                className={`content-item ${productDETAILS.process_details &&
                                    productDETAILS.process_details[3]?.status
                                    ?
                                    `${productDETAILS?.process_details[3]?.status.toLowerCase()}` : "pending"
                                    }`}
                            >
                                <span className="second svg-fill">
                                    {inspectionIcon({ width: 28, height: 28 })}
                                </span>
                                <div className="t-a-c">Enlisting</div>

                                {productDETAILS.process_details &&
                                    productDETAILS.process_details[3]?.task_date ? (
                                    <div className="t-a-c light-txt pt-18-576">
                                        {productDETAILS.process_details &&
                                            productDETAILS.process_details[3]?.task_date}
                                    </div>
                                ) : null}
                            </div>
                            <div
                                className={`content-item ${productDETAILS.process_details &&
                                    productDETAILS.process_details[4]?.status
                                    ?
                                    `${productDETAILS?.process_details[4]?.status.toLowerCase()}` : "pending"
                                    }`}
                            >
                                <span className="second svg-fill">
                                    {inspectionIcon({ width: 28, height: 28 })}
                                </span>
                                <div className="t-a-c">Sale</div>
                                {productDETAILS.process_details &&
                                    productDETAILS.process_details[4]?.task_date ? (
                                    <div className="t-a-c light-txt pt-18-576">
                                        {productDETAILS.process_details &&
                                            productDETAILS.process_details[4]?.task_date}
                                    </div>
                                ) : null}
                            </div>
                            <div
                                className={`content-item ${productDETAILS.process_details &&
                                    productDETAILS.process_details[5]?.status
                                    ?
                                    `${productDETAILS?.process_details[5]?.status.toLowerCase()}` : "pending"
                                    }`}
                            >
                                <span className="second">
                                    {inspectionIcon({ width: 28, height: 28 })}
                                </span>
                                <div className="t-a-c ">Payment Received</div>
                            </div>
                        </div>
                    {/* <div className="machine-content">
                        <div className="content-item">
                            <span className="first">{inspectionIcon({width: 28, height: 28 })}</span>
                            <div className="t-a-c">Registration</div>
                            <div className="t-a-c light-txt">12th June 2023</div>
                        </div>
                        <div className="content-item">
                            <span className="second">{inspectionIcon({ width: 28, height: 28 })}</span>
                            <div className="t-a-c light-txt">Inspection</div>
                            <div className="t-a-c light-txt">15th June 2023</div>
                        </div>
                        <div className="content-item">
                            <span className="second">{inspectionIcon({ width: 28, height: 28 })}</span>
                            <div className="t-a-c light-txt">Documentation</div>
                        </div>
                        <div className="content-item">
                            <span className="second">{inspectionIcon({ width: 28, height: 28 })}</span>
                            <div className="t-a-c light-txt enlisting">Enlisting</div>
                        </div>
                        <div className="content-item">
                            <span className="second">{inspectionIcon({ width: 28, height: 28 })}</span>
                            <div className="t-a-c light-txt">Sale</div>
                        </div>
                        <div className="content-item">
                            <span className="second">{inspectionIcon({ width: 28, height: 28 })}</span>
                            <div className="t-a-c light-txt">Payment Received</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        <div className="container-fluid col-cust">
            <div className="max-container my-4">
                <div className="paymet-box-wrap">
                    <div className="box-item col-md-6">
                        <div className="amount-info">
                            <div className="top-wrap">
                                <div className="name">
                                    <div className="heading-400-14-12 light-txt">Buyer Name</div>
                                    <div className="heading-500-16">{productDETAILS?.buyer_details?.first_name}</div>
                                </div>
                                {/* <div className="icon" onClick={handleDropdownToggle}>{downIcon({width:24,height:24})}</div> */}
                            </div>
                            <div className="botttom">
                                <div className="bottom-info">
                                    <div className="heading-400-14-12 light-txt">Amount Received</div>
                                    <div className="heading-500-16">-</div>
                                </div>
                                <div className="bottom-info">
                                    <div className="heading-400-14-12 light-txt">Transcation Id</div>
                                    <div className="heading-500-16">-</div>
                                </div>
                                <div className="bottom-info">
                                    <div className="heading-400-14-12 light-txt">Transcation Date</div>
                                    <div className="heading-500-16">-</div>
                                </div>
                            </div>
                        </div>
                        {/* {isDropdownVisible && (
                            <div className="lists">
                                <div className="list-item">Item 1</div>
                                <div className="list-item">Item 2</div>
                                <div className="list-item">Item 3</div>
                            </div>
                        )} */}
                    </div>
                    <div className="box-item-1 col-md-6">
                        <div className="rating-info">
                            <div className="top-wrap">
                                <div className="title heading-400-14-12 light-txt mb-2">Rate your Experience with Origa</div>
                                <div className="icon"><span className="heading-600-14 heading-600-14-12">Write a reivew </span> {editIcon({width:24,height:24})}</div>
                            </div>
                            {/* <div className="rating mb-3">{ratingIcon({width:539,height:24})}</div> */}
                            <div className="review heading-500-16">Selling at Origa has been a great experience, once I filled out the form they really took care of everything else. I got a much better deal then what I was being offered earlier.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className="max-container my-5">
            <div className="bot-icon-wrap">
                <div className="bot-icon">{botIcon({width:37,height:37})}</div>
            </div>
        </div> */}
        <Footer/>
    </>
);
}

export default MachineSold1;