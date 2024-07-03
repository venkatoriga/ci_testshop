import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../SubComponent/Breadcrumbs";
import Footer from "../../Footer/Footer";
import { barIcon, botIcon, editIcon, inspectionIcon, eyeIcon, heratfillIcon, registrationIcon, documnetIcon, downloadIcon, shareIcon, enListingIcon, paymentRecievedIcon, downIcon, ratingIcon, ratingFillIcon, ratinghalfIcon, upIcon } from "../../../helpers/Icons";
import MachineSaleImage from "./MachineSaleImage";
import RemoveMachineModal from "../Modals/RemoveMachineModal";
import ScheduleModal from '../Modals/ScheduleModal';
import UserModal from '../Modals/UserModal';
import MachineLocationModal from '../Modals/MachineLocationModal';
import UploadDocumentModal from '../Modals/UploadDocumentModal';
import VisitingDaysModal from '../Modals/VisitingDaysModal';
import LoginModal from "../Modals/LoginModal";
import "./ViewMachineSale.css";
import { useLocation, useNavigate } from 'react-router-dom';
import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache } from '@apollo/client';
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

const UpdateProductDraftSchedule = gql`
mutation UpdateProductDraftSchedule($draftData: UpdateProductDraftScheduleInput!) {
    updateProductdraftschedule(draftData: $draftData) {
        message
        __typename
    }
}
`;

const ViewMachineSale = () => {
    const breadcrumbsItems = [{ name: "Account", link: "/myaccount" }, { name: "My Machine", link: "/buy/my-machine" }];
    const boldtitle = "Up for Sale";
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const loggedin = localStorage.getItem('userToken');
    const [showUserModel, setShowUserModel] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [productDETAILS, setProductDETAILS] = useState({});
    const productId = queryParams.get('id');

    if (loggedin) {

    }

    const priceConvert = (price) => {
        price = typeof price === 'string' ? price : String(price);


        let count = 1;
        let comma = 3;
        let formatedPrice = ""
        for (let i = price.length - 1; i >= 0; i--) {
            formatedPrice = price[i] + formatedPrice
            if (count === comma) {
                formatedPrice = "," + formatedPrice
                comma = 2;
                count = 0;
            } count++;

        }
        //console.log("==>>", formatedPrice)
        if (formatedPrice[0] === ",") {
            formatedPrice = formatedPrice.slice(1, formatedPrice.length)
        }
        return formatedPrice;



    };
    const [tabsClasses, setTabsClasses] = useState({ registration: "active", inspection: "pending", documentation: "pending", enlisting: "pending", sale: "pending", payment: "pending" });
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
    const [hasMultipleForm, setHasMultipleForm] = useState(true);
    const [showRemoveRequestModal, setShowRemoveRequestModal] = useState(false);
    const [showScheduledModal, setShowScheduledModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [showLocationModal, setShowLocationModal] = useState(false);
    const [showUploadDocumentModal, setShowUploadDocumentModal] = useState(false);
    const [showVisitingDaysModal, setShowVisitingModal] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const handleDropdownToggle = () => {
        setDropdownVisible(!isDropdownVisible);
    };
    const handleCustomChange = (name, value) => {
        console.log('working');
        console.log('name', name);
        console.log('value', value);
        setMachineDetail((prevState) => ({ ...prevState, [name]: value }));
    }

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

            // Handle the response data as needed (not shown in the provided code).
            setProductDETAILS(data?.customerSellMachineDetails?.response)
            machineDetail.first_name = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.contactdetails?.firstname;
            machineDetail.last_name = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.contactdetails?.lastname;
            machineDetail.email = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.contactdetails?.useremailid;
            machineDetail.address = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.machinelocation?.address1;
            machineDetail.address1 = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.machinelocation?.address2;
            machineDetail.zipcode = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.machinelocation?.pincode;
            machineDetail.phone_no = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.contactdetails?.phoneno;
            machineDetail.alternate_no = data?.customerSellMachineDetails?.response?.inspection_details?.contact_info?.contactdetails?.alternateno;
            // machineDetail.activeStep=data?.customerSellMachineDetails?.response?product_status
            console.log("API Response ==>", data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    console.log(machineDetail, 'machineDetail')
    const hasScheduled = () => {
        // inspection_details
        console.log(machineDetail, 'machineDetail')
        let shown = false;
        if (machineDetail.dates.length == 0 || machineDetail.times.length == 0 || !machineDetail.first_name || !machineDetail.last_name || !machineDetail.email || !machineDetail.address || !machineDetail.zipcode) {
            shown = true;
        }
        if (!shown && !machineDetail.is_scheduled) {

            // setTimeout(() => {
            //     setHasMultipleForm(false);
            //     handleCustomChange("is_scheduled",true);
            //     handleCustomChange("activeStep","inspection");
            //     handleCustomChange("inspection_date","15th June 2023");
            //     setTabsClasses((prevState) => ({...prevState,registration:"completed",inspection:"active"}));
            // },20000);
        }
        return productDETAILS?.inspection_details?.inspection_date_time ? false : true;
    }
    const handleRemoveRequestModal = (status) => {
        if (status) {
            setShowRemoveRequestModal(status);
            document.body.classList.add('no-overflow');
        } else {
            setShowRemoveRequestModal(false);
            document.body.classList.remove('no-overflow');
        }
    }
    const handleScheduledModal = (status) => {
        if (status) {
            setShowScheduledModal(status);
            document.body.classList.add('no-overflow');
        } else {
            setShowScheduledModal(false);
            document.body.classList.remove('no-overflow');
        }
    }
    const handleUserModal = (status) => {
        if (status) {
            setShowUserModal(status);
            document.body.classList.add('no-overflow');
        } else {
            setShowUserModal(false);
            document.body.classList.remove('no-overflow');
        }
    }
    const handleLocationModal = (status) => {
        if (status) {
            setShowLocationModal(status);
            document.body.classList.add('no-overflow');
        } else {
            setShowLocationModal(false);
            document.body.classList.remove('no-overflow');
        }
    }
    const handleUploadDocumentModal = (status) => {
        if (status) {
            setShowUploadDocumentModal(status);
            document.body.classList.add('no-overflow');
        } else {
            setShowUploadDocumentModal(false);
            document.body.classList.remove('no-overflow');
            if (machineDetail.documents.length > 0 && machineDetail.activeStep == "Inspection") {
                setTimeout(() => {
                    handleCustomChange("activeStep", "Enlisting");
                    handleCustomChange("documentation_date", "17th June 2023");
                    handleCustomChange("enlisting_date", "20th June 2023");
                    setTabsClasses((prevState) => ({ ...prevState, inspection: "completed", documentation: "completed", enlisting: "active" }));
                }, 2000);
            }
        }
    }
    const handleVisitingDaysModal = (status) => {
        if (status) {
            setShowVisitingModal(status);
            document.body.classList.add('no-overflow');
        } else {
            setShowVisitingModal(false);
            document.body.classList.remove('no-overflow');
        }
    }
    const renderDatesHtml = (dates) => {
        let dateArry = [];
        // dates.map((selectedDate) => {
        //     dateArry.push(`${selectedDate.day} ${selectedDate.month.shortName} ${selectedDate.year}`)
        // });
        return dateArry.join(", ");
    }


    const renderRatingStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={i}>{ratingFillIcon({ width: 24, height: 23 })}</span>);
        }
        if (hasHalfStar) {
            stars.push(<span key="half">{ratinghalfIcon({ width: 24, height: 24 })}</span>);
        }
        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<span key={`empty-${i}`}>{ratingIcon({ width: 24, height: 24 })}</span>);
        }

        return stars;
    };

    const handleSchedule = async (Machine_Location) => {
        console.log('Machine_Location', Machine_Location);
        let inspectionschedule = {};
        let i = 1;
        console.log('machineDetail---->', machineDetail);

        machineDetail.dates.map((selectedDate) => {
            inspectionschedule[`date${i}`] = `${selectedDate.year}-${selectedDate.month.number}-${selectedDate.day}`;
            inspectionschedule[`time${i}`] = machineDetail.times[i - 1];
            i++;
        });

        let contactdetails = {
            "firstname": machineDetail.first_name,
            "lastname": machineDetail.last_name,
            "useremailid": machineDetail.email,
            "phoneno": machineDetail.phone_no,
            "alternateno": machineDetail.alternate_no
        }


        let machinelocation = {
            "address1": Machine_Location.address,
            "address2": Machine_Location.address1,
            "pincode": Machine_Location.zipcode
        }

        const draftData = {
            "pdid": productDETAILS?.pdid,
            "inspectionschedule": inspectionschedule,
            "machinelocation": {
                "contactdetails": contactdetails,
                "machinelocation": machinelocation
            }
        }

        console.log(draftData)
        const { data } = await clientMachine.mutate({
            mutation: UpdateProductDraftSchedule,
            variables: { draftData: draftData },
        });
        fetchData();
        // console.log(data);
        // console.log({form})
        // setShowSkipModel(true);
    }

    console.log(productDETAILS, 'productDETAILS')

    if (machineDetail.activeStep == "Enlisting" && machineDetail.visiting_days.length && machineDetail.visiting_hours.length) {
        setTimeout(() => {
            handleCustomChange("activeStep", "payment");
            handleCustomChange("sale_date", "20th July 2023");
            handleCustomChange("payment_date", "22nd July 2023");
            setTabsClasses((prevState) => ({ ...prevState, enlisting: "completed", sale: "completed", payment: "completed" }));
        }, 30000);
    }
    console.log(
        productDETAILS.process_details &&
            productDETAILS.process_details[0]?.task_name === "Registration"
            ? true
            : false,
        'productDETAILS Registration'
    );

    const modalAction = (status) => {
        setShowModel(status);
    }
    const token = localStorage.getItem('userToken');
    if (!token && !showModel) {
        setShowModel(true)
    }
    return (
        <>

            {showModel ? (
                <LoginModal modalAction={modalAction} setShowUserModel={setShowUserModel} type="phone" />
            ) : null}
            {showRemoveRequestModal ? (
                <RemoveMachineModal id={productDETAILS.pdid} modalAction={handleRemoveRequestModal} />
            ) : null}
            {showScheduledModal ? (
                <ScheduleModal modalAction={handleScheduledModal} hasMultipleForm={hasMultipleForm} setShowUserModel={handleUserModal} machineDetail={machineDetail} handleCustomChange={handleCustomChange} />
            ) : null}
            {showUserModal ? (
                <UserModal modalAction={handleUserModal} hasMultipleForm={hasMultipleForm} setShowLocationModal={handleLocationModal} machineDetail={machineDetail} handleCustomChange={handleCustomChange} />
            ) : null}
            {showLocationModal ? (
                <MachineLocationModal modalAction={handleLocationModal} hasMultipleForm={hasMultipleForm} machineDetail={machineDetail} handleCustomChange={handleCustomChange} handleSchedule={handleSchedule} />
            ) : null}
            {showUploadDocumentModal ? (
                <UploadDocumentModal modalAction={handleUploadDocumentModal} machineDetail={machineDetail} handleCustomChange={handleCustomChange} />
            ) : null}
            {showVisitingDaysModal ? (
                <VisitingDaysModal modalAction={handleVisitingDaysModal} machineDetail={machineDetail} handleCustomChange={handleCustomChange} />
            ) : null}
            <div className="container-fluid col-cust">
                <div className="max-container my-5">

                    <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} backnavi={() => navigate('/buy/my-machine')} />

                    <div className="name-wrap">
                        <div className="heading-wrap">
                            <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">{productDETAILS.draft_machine_details?.product_name} <span className={productDETAILS.product_status === 'Cancel' ? 'btn btn-danger btn-sm' : 'procesing-btn heading-400-12-10'}>{productDETAILS.product_status}</span></div>
                            <div className="heading-500-16 light-txt">{productDETAILS.machine_details?.data?.product?.attributes?.Brands}</div>
                        </div>
                        <button type="button" className="contact-btn heading-400-14-12" onClick={() => navigate('/contactus')}>Contact Origa</button>
                    </div>
                </div>
            </div>
            <MachineSaleImage media={productDETAILS.draft_machine_details?.product_image} />
            {/* <MachineSaleImage media={productDETAILS.machine_details?.data?.product?.media} /> */}
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
                                    {registrationIcon({ width: 28, height: 28 })}
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
                                    {documnetIcon({ width: 28, height: 28 })}
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
                                    {enListingIcon({ width: 28, height: 28 })}
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
                                <span className="second after-last-child">
                                    {paymentRecievedIcon({ width: 28, height: 28 })}
                                </span>
                                <div className="t-a-c ">Payment Received</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {hasScheduled() ? (
                <div className="container-fluid col-cust">
                    <div className="max-container my-4">
                        {productDETAILS.product_status !== 'Cancel' && (
                            <div className="bi-box-wrap bi-wrap">
                                <div className="bi-box-item">
                                    <div className="inner remove-req">
                                        <div className="heading-400-14-12 light-txt">Wish to remove your selling request from Origa?</div>
                                        <button className="box-btn heading-600-14 heading-600-14-12" onClick={() => handleRemoveRequestModal(true)}>Remove Request</button>
                                    </div>
                                </div>

                                <div className="bi-box-item">
                                    <div className="inner-1">
                                        <div className="schedule-heading heading-400-14-12">Schedule your free Inspection</div>
                                        <div className="text heading-500-16">Our qualified team will come to inspect your machine and help enlist your machine on Origa so you can find the best deal for your machine</div>
                                        <button type='button' className='schdule-btn heading-400-16-12' onClick={() => handleScheduledModal(true)}>Schedule now</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="container-fluid col-cust">
                    <div className="max-container my-4">
                        <div className="bi-box-wrap">
                            <div className="bi-box-item">
                                {productDETAILS.process_details?.length <= 2 && (
                                    <div className="inner">
                                        <div className="inner-info">
                                            <div className="inner-info-1">
                                                <div className="heading heading-400-14-10 light-txt">Preferred Inspection Date</div>
                                                <div className="date-details heading-500-16-14" >{productDETAILS.inspection_details?.inspection_date_time?.date1}
                                                    {productDETAILS.inspection_details?.inspection_date_time?.date2 && (<span> ,{productDETAILS.inspection_details?.inspection_date_time?.date2}</span>)}  {productDETAILS.inspection_details?.inspection_date_time?.date3 && (<span>, {productDETAILS.inspection_details?.inspection_date_time?.date3}</span>)}</div>
                                            </div>
                                            <div className="inner-info-1">
                                                <div className="heading heading-400-14-10 light-txt">Preferred Inspection Time</div>
                                                <div className="date-details heading-500-16-14">{productDETAILS.inspection_details?.inspection_date_time?.time1}

                                                    {productDETAILS.inspection_details?.inspection_date_time?.time2 && (<span> ,{productDETAILS.inspection_details?.inspection_date_time?.time2}</span>)}  {productDETAILS.inspection_details?.inspection_date_time?.time3 && (<span>, {productDETAILS.inspection_details?.inspection_date_time?.time3}</span>)}</div>
                                            </div>
                                        </div>
                                        {productDETAILS.product_status !== 'Cancel' && (
                                            <div className="edit-icon" onClick={() => handleScheduledModal(true)}>{editIcon({ width: 24, height: 24 })}</div>
                                        )}
                                    </div>

                                )}


                                {productDETAILS.process_details?.length > 2 && productDETAILS.process_details[2]?.status !== 'Completed' && (
                                    <div className="inner">
                                        <div className="inner-info">
                                            <div className="inner-wrap-content">
                                                <div className="inner-info-1">
                                                    <div className="heading heading-400-14-10 light-txt">Additional Documents Needed</div>
                                                    <div className="date-details heading-500-16-14 mt-2">We require you to upload the documents for timely processing of your Machine and listing it successfully.</div>
                                                    <div className="pdf-details heading-500-16-14 mt-3">PNG, PDF, JPEG,JPG |Max Size 5 MB</div>
                                                </div>
                                                <div className="edit-icon">{editIcon({ width: 24, height: 24 })}</div>
                                            </div>
                                            <div className="inner-info-1 pt-4">
                                                <div className="inner-info-top">
                                                    <div className="heading heading-400-14">Machine Ownership Document</div>
                                                    <div className="date-details heading-400-14">Ownweship.pdf {barIcon({ width: 3, height: 12 })}</div>
                                                </div>
                                                <div className="inner-info-top">
                                                    <div className="agreement heading-400-14">Machine Sale Agreement</div>
                                                    <button type="button" className='upload-btn' > <a
                                                        href={productDETAILS.inspection_details?.inspection_report[0]}
                                                        download="your-file-name.pdf"
                                                        className='download-link'
                                                    >
                                                        Download Document
                                                    </a>  </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {machineDetail.activeStep == "Enlisting" && (
                                    <>
                                        <div className="inner-wrap-info d-flex">
                                            <div className="inner">
                                                <div className="views-wrap">
                                                    <div className="views-wrap-left heading-400-14-10 light-txt">views <span className="number heading-500-16"> (0)</span></div>
                                                    <div className="views-number heading-600">{0}<span className="heading-500-16 light-txt"> (0)</span></div>
                                                </div>
                                                <div className="eye-icon">{eyeIcon({ width: 24, height: 24 })}</div>
                                            </div>
                                            <div className="inner">
                                                <div className="views-wrap">
                                                    <div className="views-wrap-left heading-400-14-10 light-txt">Wishlist <span className="number heading-500-16"> ({`% ${productDETAILS?.wishlist_details?.wishlist_percent || 0}`})</span></div>
                                                    <div className="views-number heading-600">{productDETAILS?.wishlist_details?.wishlist_count}<span className="heading-500-16 light-txt"> ({productDETAILS?.wishlist_details?.wishlist_total_count || 0})</span></div>
                                                </div>
                                                <div className="edit-icon">{heratfillIcon({ width: 24, height: 24 })}</div>
                                            </div>
                                        </div>
                                        <div className="inner">
                                            <div className="amount-info-enlisting">
                                                <div className="top-wrap">
                                                    <div className="top-left">
                                                        <div className="heading heading-400-14-12 light-txt mb-2">Listed Price</div>
                                                        <div className="heading-500-16-14">₹ {priceConvert(productDETAILS?.price_details?.machine_price)}</div>
                                                    </div>
                                                    {/* <div className="top-right">
                                                        <div className="heading heading-400-14-12 light-txt mb-2">Preferred Inspection Price</div>
                                                        <div className="heading-500-16-14">{machineDetail.inspection_price}</div>
                                                    </div> */}
                                                </div>
                                                <div className="bottom-wrap">
                                                    {!isDropdownVisible && (<div className="price-breakdown heading-500-14">View Price Breakdown <span onClick={handleDropdownToggle}>{downIcon({ width: 24, height: 24 })}</span></div>)}
                                                </div>
                                                {isDropdownVisible && (
                                                    <div className="price-breakdown-lists pt-2">
                                                        <div className="title heading-500-14">View Price BreakDown <span onClick={handleDropdownToggle}>{upIcon({ width: 24, height: 24 })}</span></div>
                                                        <div className="list-item heading-500-16-14"><span className="price-list">₹ {priceConvert(productDETAILS?.price_details?.payable_to_seller)} </span><span>|</span> <span className="heading-400-14-12">Payable to Seller</span></div>
                                                        <div className="list-item heading-500-16-14"><span className="price-list">₹ {priceConvert(productDETAILS?.price_details?.repairs_before_selling)}</span> <span>|</span> <span className="heading-400-14-12">Repairs before selling</span></div>
                                                        <div className="list-item heading-500-16-14"><span className="price-list">₹ {priceConvert(productDETAILS?.price_details?.amc_cost)}</span><span>|</span> <span className="heading-400-14-12">1 Year AMC</span></div>
                                                        <div className="list-item heading-500-16-14"><span className="price-list">₹ {priceConvert(productDETAILS?.price_details?.transporation)} </span><span>|</span> <span className="heading-400-14-12">Transportation</span></div>
                                                        <div className="list-item heading-500-16-14"><span className="price-list">₹ {priceConvert(productDETAILS?.price_details?.origa_profit)} </span><span>|</span> <span className="heading-400-14-12">Origa Profit</span></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                                {machineDetail.activeStep == "payment" && (
                                    <>
                                        <div className="inner">
                                            <div className="amount-info">
                                                <div className="top-wrap">
                                                    <div className="name">
                                                        <div className="heading-400-14-12 light-txt mb-1">Buyer Name</div>
                                                        <div className="heading-500-16">Ramesh Patel</div>
                                                    </div>
                                                    {!isDropdownVisible && (<div className="icon" onClick={handleDropdownToggle}>{downIcon({ width: 24, height: 24 })}</div>)}
                                                </div>
                                                <div className="bottom-wrap pb-2">
                                                    <div className="bottom-info">
                                                        <div className="heading-400-14-12 light-txt">Amount Received</div>
                                                        <div className="heading-500-16-14">{machineDetail.amount_received}</div>
                                                    </div>
                                                    <div className="bottom-info">
                                                        <div className="heading-400-14-12 light-txt">Transaction ID</div>
                                                        <div className="heading-500-16-14">{machineDetail.transaction_id}</div>
                                                    </div>
                                                    <div className="bottom-info">
                                                        <div className="heading-400-14-12 light-txt">Transaction Date</div>
                                                        <div className="heading-500-16-14">{machineDetail.transaction_date}</div>
                                                    </div>
                                                </div>
                                                {isDropdownVisible && (
                                                    <div className="price-breakdown-lists pt-2">
                                                        <div className="title heading-500-14">View Price BreakDown <span onClick={handleDropdownToggle}>{upIcon({ width: 24, height: 24 })}</span></div>
                                                        <div className="list-item heading-500-16-14"><span className="price-list">₹ {productDETAILS?.price_details?.payable_to_seller} </span><span>|</span> <span className="heading-400-14-12">Payable to Seller</span></div>
                                                        <div className="list-item heading-500-16-14"><span className="price-list">₹ {productDETAILS?.price_details?.repairs_before_selling}</span> <span>|</span> <span className="heading-400-14-12">Repairs before selling</span></div>
                                                        <div className="list-item heading-500-16-14"><span className="price-list">₹ {productDETAILS?.price_details?.amc_cost}</span><span>|</span> <span className="heading-400-14-12">1 Year AMC</span></div>
                                                        <div className="list-item heading-500-16-14"><span className="price-list">₹ {productDETAILS?.price_details?.transporation} </span><span>|</span> <span className="heading-400-14-12">Transportation</span></div>
                                                        <div className="list-item heading-500-16-14"><span className="price-list">₹ {productDETAILS?.price_details?.origa_profit} </span><span>|</span> <span className="heading-400-14-12">Origa Profit</span></div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
                                {productDETAILS.product_status !== 'Cancel' && (
                                    // {machineDetail.activeStep === "payment" && productDETAILS.product_status !== 'Cancel' && (
                                    <div className="inner remove-req">
                                        <div className="heading-400-14-12 light-txt">Wish to remove your selling request from Origa?</div>
                                        <button className="box-btn heading-600-14 heading-600-14-12" onClick={() => { handleRemoveRequestModal(true) }}>Remove Request</button>
                                    </div>
                                )}

                            </div>
                            <div className="bi-box-item">
                                {machineDetail.activeStep == "payment" ? "" : (
                                    <>
                                        {machineDetail.activeStep == "Enlisting" && (
                                            <>
                                                <div className="inner inner-column">
                                                    <div className="inner-info-left heading-400-16-12">
                                                        <span>{machineDetail.years_old}</span>
                                                        <span className="ml-2">|  Origa Rating:</span>
                                                        <span className="ml-2">A+</span>
                                                        <span className="ml-2">{downloadIcon({ width: 20, height: 20 })}</span>
                                                    </div>
                                                    <div className="edit-icon share heading-600-14 heading-600-14-12" onClick={() => { window.location = "/" }}>View on Website {shareIcon({ width: 24, height: 24 })}</div>
                                                </div>
                                                <div className="inner">
                                                    <div className="inner-info">
                                                        <div className="heading-400-14-12 light-txt">Visiting Days</div>
                                                        <div className="heading heading-500-16-14">{machineDetail.visiting_days.join(", ")}</div>
                                                    </div>
                                                    <div className="inner-info">
                                                        <div className="heading-400-14-12 light-txt">Visiting Hours</div>
                                                        <div className="heading heading-500-16-14">{machineDetail.visiting_hours.join(", ")}</div>
                                                    </div>
                                                    <div className="edit-icon" onClick={() => handleVisitingDaysModal(true)}>{editIcon({ width: 24, height: 24 })}</div>
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}
                                {machineDetail.activeStep == "payment" && (
                                    <>
                                        <div className="inner">
                                            <div className="rating-info">
                                                <div className="top-wrap">
                                                    <div className="title heading-400-14-12 light-txt mb-2">Rate your Experience with Origa</div>
                                                    <div className="edit-icon"><span className="heading-600-14 heading-600-14-12">Write a reivew </span> {editIcon({ width: 24, height: 24 })}</div>
                                                </div>
                                                <div className="rating mb-3">
                                                    {renderRatingStars(parseFloat(machineDetail.rating))}
                                                </div>
                                                <div className="review heading-500-16">{machineDetail.review}</div>
                                            </div>
                                        </div>
                                    </>
                                )}
                                {productDETAILS.inspection_details?.contact_info && (
                                    <>
                                        <div className="inner">
                                            <div className="inner-info-1">
                                                <div className="heading heading-400-14-10 light-txt mb-2">Point of Contact Details</div>
                                                <div className="heading-500-16-14 name">{machineDetail.first_name} {machineDetail.last_name}</div>
                                                <div className="email heading-500-16-14">{machineDetail.email}&nbsp;&nbsp;{" "}
                                                    {productDETAILS.inspection_details?.contact_info?.contactdetails?.phoneno}
                                                </div>
                                            </div>
                                            {productDETAILS.product_status !== 'Cancel' && (
                                                <div className="edit-icon" onClick={() => { handleUserModal(true) }}>{editIcon({ width: 24, height: 24 })}</div>
                                            )}
                                        </div>
                                        <div className="inner">
                                            <div className="inner-info-1">
                                                <div className="heading heading-400-14-10 light-txt mb-2">Machine Location</div>
                                                <div className="addresss heading-500-16-14">{machineDetail.address}{machineDetail.address1 ? ` ${machineDetail.address1}` : ''} {machineDetail.zipcode}</div>
                                            </div>
                                            {productDETAILS.product_status !== 'Cancel' && (
                                                <div className="edit-icon" onClick={() => { handleLocationModal(true) }}>{editIcon({ width: 24, height: 24 })}</div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* <div className="max-container view-machine-bot">
                <div className="bot-icon-wrap">
                    <div className="bot-icon">{botIcon({ width: 37, height: 37 })}</div>
                </div>
            </div> */}
            <Footer />
        </>
    );
}
export default ViewMachineSale;