import React, { useState, useEffect, useRef } from "react";
import "./Machine.css";
import { useLocation, useNavigate } from "react-router-dom";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import gql from "graphql-tag";
import ProductImages from "./ProductImages";
import Footer from "../../../../Footer/Footer";
import FooterBottom from "../../../../Footer/FooterBottom";
import PhoneModal from "../../../Modals/PhoneModal";
import DetailedReport from "../../Modals/DetailedReport";
import WithdrawModal from "../../../Modals/WithdrawModal";
import DateModal from "../../../Modals/DateModal";
import UploadRecieptsModal from "../../../Modals/UploadRecieptModal";
import ThankYouModal from "../../../Modals/ThankYouModal";
import { settingIcon, blockedTokenIcon, paidAdvanceIcon, financeIcon, fullPaidIcon, deliverdIcon, visualIcon, machineDynamicIcon, machineStaticIcon, conditionIcon, infoIcon, tickIcon, userSettingIcon, waterIcon, spareIcon, gearIcon, botIcon } from "../../../../../helpers/Icons";
import Slider from "react-slick";
import { secondClient, GET_MACHINE_DETAILS } from '../../../../OrigaExtentionAPI/mutations'
import Breadcrumbs from "../../../../SubComponent/Breadcrumbs";
import Slider7 from "../../../../SubComponent/AllSlider/Slider7";
import BuyBlock from "../../../../Block/BuyBlock";
const clientMachine = secondClient
const MachinePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSmallScreen] = useState(window.innerWidth <= 576)
    const queryParams = new URLSearchParams(location.search);
    const loggedin = localStorage.getItem("userToken");
    const productId = queryParams.get('id');
    const buyMachineId = queryParams.get('buyMachineId');
    const [productDETAILS, setProductDETAILS] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [showUploadRecieptsModal, setShowUploadRecieptsModal] = useState(false);
    const [showThanksModel, setShowThanksModel] = useState(false);
    const [showLoginModel, setShowLoginModal] = useState(false);
    const [tabsClasses, setTabsClasses] = useState({ blockedToken: "active", paidAdvance: "pending", arrangingFinance: "pending", paidFullAmount: "pending", delivered: "pending" });
    const [deliverdStepClasses, setDeliverdStepClasses] = useState({ schedulePickUp: "active", pickedUp: "pending", outForDelivery: "pending", commissioning: "pending" });
    const [activetab, setActiveTab] = useState("lease");
    const [showInfo, setShowinfo] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [renew, setRenew] = useState(false);
    const [docurl, setdocurl] = useState();
    const [outputDateStr, setOutputDateStr] = useState({ Blocked_Time: "", Paid_Advance_Time: "", Arranging_Finance_Time: "", Paid_Full_Amount: "", Delivered_Time: "" });
    const sliderRef = useRef(null);
    const options = {
        autoplay: false,
        dots: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const block = <BuyBlock />
    const breakpoints = {
        a: 2.3,
        b: 2.3,
        c: 2,
        d: 2,
        e: 1.2
    }
    const sliderProduct = [
        {
            heading: "Visual Inspection Remarks",
            message: "Table T slot broken Normal wear and tear due to ageing and uses",
            imageUrl: "/asset/Inspection.png"
        },
        {
            heading: "Machine Dynamic Remarks",
            message: "Origa will provide servicing for your machine so you don’t need to worry about anything...",
            imageUrl: "/asset/Dynamic.png"
        },
        {
            heading: "Machine Static Geometrical Test",
            message: "Spindle Runout :- 3 micron TIR with needs dial gauge Axis Backlash :-X axis 10 microns,Y axis 5 microns , Z axis 5 microns"
            ,
            imageUrl: "/asset/Geometrical.png"
        },
        {
            heading: "Electrical & Pneumatic Condition",
            message: "Origa can provide a lease and loan to enable you to purchase the machine you need",
            imageUrl: "/asset/Pneumatic.png"
        },
    ];
    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        let process = productDETAILS?.process_details;
        console.log('process=======>***************', productDETAILS);
        if (process) {
            for (let index = 0; index < process.length; index++) {
                if (process[index].task_name === "Blocked With Token") {
                    handleChangeTabs("blockedToken", "active");
                    convertDateFormat(process[index]?.task_date, "Blocked_Time")
                }
                if (process[index].task_name === "Paid Advance") {
                    handleChangeTabs("blockedToken", "completed");
                    handleChangeTabs("paidAdvance", "active");
                    convertDateFormat(process[index]?.task_date, "Paid_Advance_Time")
                }
                if (process[index].task_name === "Arranging Finance") {
                    handleChangeTabs("blockedToken", "completed");
                    handleChangeTabs("paidAdvance", "completed");
                    handleChangeTabs("arrangingFinance", "active");
                    convertDateFormat(process[index]?.task_date, "Arranging_Finance_Time")
                }
                if (process[index].task_name === "Paid Full Amount") {
                    handleChangeTabs("blockedToken", "completed");
                    handleChangeTabs("paidAdvance", "completed");
                    handleChangeTabs("arrangingFinance", "completed");
                    handleChangeTabs("paidFullAmount", "active");
                    convertDateFormat(process[index]?.task_date, "Paid_Full_Amount")
                }
                if (process[index].task_name === "Delivered") {
                    handleChangeTabs("blockedToken", "completed");
                    handleChangeTabs("paidAdvance", "completed");
                    handleChangeTabs("arrangingFinance", "completed");
                    handleChangeTabs("paidFullAmount", "completed");
                    handleChangeTabs("delivered", "active");
                    convertDateFormat(process[index]?.task_date, "Delivered_Time")
                }
            }
        }
    }, [productDETAILS && productDETAILS.process_details]);
    const handleChangeTabs = (name, value) => {
        setTabsClasses((prevState) => ({ ...prevState, [name]: value }));
    }
    const fetchData = async () => {
        try {
            const id = localStorage.getItem('id');
            const { data } = await clientMachine.mutate({ mutation: GET_MACHINE_DETAILS, variables: { productId: productId, "customerId": id, "buyMachineId": buyMachineId } });
            setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)
            updateFormattedPrice()
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const onCallFunHandler = () => {
        navigate(`/buy/add-address?id=${productDETAILS?.machine_details?.data?.product?.id}&buyMachineId=${buyMachineId}`);
    }
    const onShowPortal = (status) => {

        if (status === 'TOKEN') {
            navigate(`/buy/pay-token?id=${productDETAILS?.machine_details?.data?.product?.id}&message=Unpaid&buyMachineId=${buyMachineId}`);
        }
        else {
            navigate(`/buy/advance-payment?id=${productDETAILS?.machine_details?.data?.product?.id}&message=Unpaid&buyMachineId=${buyMachineId}`);
        }
    }
    const handleModal = (status) => {
        if (status) {
            setShowModal(status);
        } else {
            setShowModal(false);
        }
    }
    const handleUploadModal = (status) => {
        if (status) {
            setShowUploadRecieptsModal(status);
            document.body.classList.add('no-overflow');
        } else {
            setShowUploadRecieptsModal(false);
            document.body.classList.remove('no-overflow');
        }
    }


    const updateFormattedPrice = () => {
        setProductDETAILS((prevDetails) => ({
            ...prevDetails,
            price_details: {
                ...prevDetails.price_details,
                amc_cost: formatCurrency(prevDetails.price_details.amc_cost),
                delivery_charges: formatCurrency(prevDetails.price_details.delivery_charges),
                machine_price: formatCurrency(prevDetails.price_details.machine_price),
                machine_total_price: formatCurrency(prevDetails.price_details.machine_total_price),
                repairing_cost: formatCurrency(prevDetails.price_details.repairing_cost),
                token_amount: formatCurrency(prevDetails.price_details.token_amount),
                token_amount_total: formatCurrency(prevDetails.price_details.token_amount_total),
                token_gst_amount: formatCurrency(prevDetails.price_details.token_gst_amount),
                // advance_amount: formatCurrency(371250),
                // advance_amount_total: formatCurrency(438075),
                // advance_gst_amount: formatCurrency(66825),
                amc_cost_excluded: true,
                delivery_charges_excluded: false,
                // machine_price: formatCurrency(1485000),
                // machine_total_price: formatCurrency(1505000),
                repairing_cost_excluded: true,
                // Add more fields as needed
            },
        }));
    };
    const BasicInfo = productDETAILS?.machine_table_views?.["Basic Information"];
    const BasicInfoValues = BasicInfo
        ? Object.values(BasicInfo).join(" / ")
        : "-";
    console.log('BasicInfoValues=====>', BasicInfoValues);
    
    const tableStrokeSize = productDETAILS?.machine_table_views?.["Table Stroke Size"];
    const tableStrokeSizeValues = tableStrokeSize
        ? Object.values(tableStrokeSize).join(" * ")
        : "-";
    console.log('tableStrokeSizeValues=====>', tableStrokeSizeValues);

    const spindleSize = productDETAILS?.machine_table_views?.["Spindle"];
    const spindleSizeValues = spindleSize
        ? Object.values(spindleSize).join(" / ")
        : "-";
    console.log('spindleSize=====>', spindleSizeValues);
    const OtherDetails = productDETAILS?.machine_table_views?.["Other Details"];
    const OtherDetailsValues = OtherDetails
        ? Object.values(OtherDetails).join(" * ")
        : "-";
    console.log('OtherDetailsValues=====>', OtherDetailsValues);

 
    const formatCurrency = (value) => {
        const fractionDigits = value % 1 !== 0 ? 2 : 0;
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits,
        }).format(value || 0);
    };


    const handleThanksModal = (status) => {
        if (status) {
            setShowThanksModel(status);
            document.body.classList.add('no-overflow');
        } else {
            setShowThanksModel(false);
            document.body.classList.remove('no-overflow');
        }
    }
    const downloadInspectionReport = async () => {
        try {
            const response = await fetch('https://devextension.origa.market/api/getinspectionreport', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ "id": productDETAILS.buymachine_id }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setdocurl(data?.docurl)
            handleModal("detailed-report")
            console.log(data, 'response');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    const convertDateFormat = (inputDate, dateKey) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const outputDate = `${day} ${monthNames[monthIndex]} ${year}`;
        setOutputDateStr((prev) => ({ ...prev, [dateKey]: outputDate }));
    }
    const styleHandle = (value, color) => {
        return { "--percent": `${value}`, "stroke": color };
    }
    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    }
    const scheduleService = () => {
        setSchedule(true)
    }
    const requestChange = () => {
        setRenew(true)
    }
    const handleCustomChange = (name, value) => {
        setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
    const [product, setProduct] = useState({
        name: "CNC Machine",
        brand: "Hitachi",
        activeStep: "blockedToken",
        blockedTill: "04 July 2023, 23:59",
        timeRemaining: "00:00:00:10",
        tokenExpired: false,
        blockedToken_date: "12th June 2023",
        paidAdvance_date: "",
        arrangingFinance_date: "",
        paidFullAmount_date: "",
        documents: [],
        schedulePickUp_date: "10 July 2023, 12:12",
        pickedUp_date: "",
        outForDelivery_date: "",
        commissioning_date: "",
        activeDeliverdStep: "schedulePickUp",
    });
    const product_images = [
        { is_product_images: true },
        {
            images: [
                { product: "asset/unused-machine.png", name: "One time Repair", description: "Quick and reliable one-time repair service for all your machine needs. Get it fixed hassle-free today" },
                { product: "asset/working-condition.png", name: "Commissioning/ Decommissioning ", description: "Ensure optimal performance with our professional commissioning service for machines" },
                { product: "asset/not-working.png", name: "Logistics", description: "Seamless transportation and timely delivery with our efficient and secure service." }
            ]
        }
    ];
    const images = {
        autoplay: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    console.log({ productDETAILS: productDETAILS })
    const breadcrumbsItems = [{ name: "Account ", link: "/myaccount" }, { name: "My Machines", link: "buy/my-machine" }];
    const boldtitle = 'Owned'

    return (
        <>
            <div className="max-container pt-3">
                <Breadcrumbs backnavi={() => navigate('/buy/my-machine')} boldtitle={boldtitle} items={breadcrumbsItems} />
            </div>
            {showUploadRecieptsModal && (
                <UploadRecieptsModal modalAction={handleUploadModal} handleCustomChange={handleCustomChange} setShowThanksModel={handleThanksModal} hasThanksModal={true} product={product} />
            )}
            {showThanksModel && (
                <ThankYouModal modalAction={handleThanksModal} />
            )}
            {(showModal === "withdraw-modal") && (
                <WithdrawModal modalAction={handleModal} buyMachineId={buyMachineId} productID={productDETAILS?.machine_details?.data?.product?.id} />
            )}
            {(showModal === "speak-expert") && (
                <PhoneModal modalAction={handleModal} />
            )}
            {(showModal === "detailed-report") && (
                <DetailedReport docurl={docurl} modalAction={handleModal} />
            )}
            {showModal === "date-modal" && (
                <DateModal productId={productDETAILS?.machine_details?.data?.product?.id} productDETAILS={productDETAILS} buyMachineId={buyMachineId} modalAction={handleModal} />
            )}
            {productDETAILS.machine_details?.data && productDETAILS.blocked_details && (
                <div className="container-fluid col-cust">
                    <div className="max-container my-4">
                        <div className="machine-info-main">
                            <div className="machine-item">
                                {/* <div className="heading-wrap">
                                    <div className="heading-wrap">
                                        <span className="heading-600-24 heading-600-24-20 heading-600-24-16">
                                            {productDETAILS?.machine_details?.data?.product?.name}
                                        </span>
                                        <span className="machine-label p-12">{productDETAILS.product_status}</span>
                                    </div>
                                    <span className="location">{productDETAILS?.machine_details?.data?.product?.name}</span>
                                </div> */}

                                <div className="inner-item">
                                    <div className="heading-wrap">
                                        <span className="heading-600-24 heading-600-24-20 heading-600-24-16">{productDETAILS?.machine_details?.data?.product?.name}</span>
                                        {/* <span className="location">{productDETAILS?.machine_details?.data?.product?.name}</span> */}
                                        <span className="machine-label p-12">{productDETAILS.product_status}</span>
                                    </div>
                                </div>
                                <div className="inner-item">
                                    <div className="heading-600-16-12">{productDETAILS?.price_details?.machine_price || '1,00,000'}</div>
                                </div>
                            </div>
                            {(productDETAILS?.price_details?.token_payment_status === "PAYMENT_SUCCESS" && productDETAILS.product_status !== 'Owned' && productDETAILS?.price_details?.advance_payment_status !== "PAYMENT_SUCCESS") ? (
                                <div className="machine-item">
                                    <div className="inner-item-2">
                                        <div className="light-txt">Blocked Till</div>
                                        <div className="heading-500-14">{productDETAILS?.blocked_details?.blocked_till_date}</div>
                                    </div>
                                    <div className="inner-item-column">
                                        <div className="progress-circle-main">
                                            <svg>
                                                <circle cx="25" cy="25" r="20"></circle>
                                                <circle className="main-circle" cx="25" cy="25" r="20" style={styleHandle(58, "#9B9E51")}></circle>
                                            </svg>
                                        </div>
                                        <div className="inner-item">
                                            <div className="light-txt">Time Remaining</div>
                                            <div className="heading-500-14">{productDETAILS?.blocked_details?.remaining_time}</div>
                                        </div>
                                    </div>
                                    <div className="inner-item">
                                        <div className="light-txt">Next Step</div>
                                        <div className="heading-500-14">{productDETAILS?.blocked_details?.next_step}</div>
                                    </div>
                                </div>
                            ) : (null)}
                        </div>
                    </div>
                </div>
            )}
            {/* Product Images */}
            {productDETAILS?.machine_details?.data?.product?.media && (
                <ProductImages media={productDETAILS?.machine_details?.data?.product?.media} />
            )}
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="machine-buy-progress">
                        <div className="machine-content">
                            <div className={`content-item ${tabsClasses.blockedToken}`}>
                                <span className="first">{blockedTokenIcon({ width: 14, height: 18 })}</span>
                                <div className="t-a-c heading-600-16 line-height-normal-679">Blocked with Token</div>
                                <div className="t-a-c light-txt">{outputDateStr.Blocked_Time}</div>
                            </div>
                            <div className={`content-item ${tabsClasses.paidAdvance}`}>
                                <span className="second svg-fill">{paidAdvanceIcon({ width: 19, height: 18 })}</span>
                                <div className="t-a-c heading-600-16 line-height-normal-679">Paid Advance</div>
                                <div className="t-a-c light-txt">{outputDateStr.Paid_Advance_Time}</div>
                            </div>
                            {productDETAILS?.process_details?.map((task, index) => {
                                if (task.task_name?.includes("Arranging Finance")) {
                                    return (
                                        <div key={index} className={`content-item ${tabsClasses.arrangingFinance}`}>
                                            <span className="second svg-fill">{financeIcon({ width: 38, height: 38 })}</span>
                                            <div className="t-a-c heading-600-16 line-height-normal-679">Arranging Finance</div>
                                            <div className="t-a-c light-txt">{outputDateStr.Arranging_Finance_Time}</div>
                                        </div>
                                    );
                                }
                                return null; 
                            })}

                            <div className={`content-item ${tabsClasses.paidFullAmount}`}>
                                <span className="second svg-fill">{fullPaidIcon({ width: 39, height: 38 })}</span>
                                <div className="t-a-c heading-600-16 line-height-normal-679">Paid Full Amount</div>
                                <div className="t-a-c light-txt">{outputDateStr.Paid_Full_Amount}</div>
                            </div>
                            <div className={`content-item ${tabsClasses.delivered}`}>
                                <span className="second">{deliverdIcon({ width: 38, height: 38 })}</span>
                                <div className="t-a-c heading-600-16 line-height-normal-679">Delivered</div>
                                <div className="t-a-c light-txt">{outputDateStr.Delivered_Time}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Machine Exyra Data */}
            {productDETAILS && (
                <div className="container-fluid col-cust">
                    <div className="max-container my-4">
                        <div className="extra-data-wrap-main">
                            <div className="extra-data-section">
                                {tabsClasses.delivered == "completed" ? (
                                    <>
                                        <div className={`${schedule ? "section-service" : "extra-data-section"}`}>
                                            <div className="extra-data-item yellow-bg">
                                                <div className="head-owned">
                                                    <div className="heading-wrap">
                                                        {productDETAILS?.machine_details?.data?.product?.name}
                                                        {productDETAILS?.machine_details?.data?.product?.name}
                                                        <span>{productDETAILS?.price_details?.machine_price ? productDETAILS?.price_details?.machine_price : '0'}</span>
                                                    </div>
                                                    <button className="process">{productDETAILS?.product_status}</button>
                                                </div>
                                                <div className="tiles-owned-wrap">
                                                    <div className="tile">
                                                        <div className="tile-wrap">
                                                            <span className="heading-400-16-12 item">CNC System</span>
                                                            <span className="heading-400-16-12 item">Table</span>
                                                            <span className="heading-400-16-12 item">Travels</span>
                                                        </div>
                                                        <div className="tile-wrap">
                                                            <span className="heading-400-16-12">Fanuc Series Oi-MB</span>
                                                            <span className="heading-400-16-12">1100 x 550 mm</span>
                                                            <span className="heading-400-16-12">1000 x 555 x 600 mm</span>
                                                        </div>
                                                    </div>
                                                    <div className="tile">
                                                        <div className="tile-wrap">
                                                            <span className="heading-400-16-12 item">ATC</span>
                                                            <span className="heading-400-16-12 item">Spindle</span>
                                                        </div>
                                                        <div className="tile-wrap">
                                                            <span className="heading-400-16-12">20 pockets</span>
                                                            <span className="heading-400-16-12">BT40 / 8000 rpm</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {renew ? (
                                                <div className="extra-data-section">
                                                    <div className="extra-data-item">
                                                        <div className="head">
                                                            <div className="heading-wrap">
                                                                <span className="heading-600-14">Annual Maintenance Contract <span className="light-txt heading-400-14-12">| Gold Plan</span></span>
                                                                <span className="heading-500-16-14">{productDETAILS?.price_details?.machine_price ? productDETAILS?.price_details?.machine_price : '1,00,000'}</span>
                                                            </div>
                                                            <button className="service-schedule">Renew AMC</button>
                                                        </div>
                                                        <div className="tiles-maintaine-wrap">
                                                            <div className="tile">
                                                                <div className="tile-wrap">
                                                                    <span className="light-txt heading-400-14-10">AMC Status</span>
                                                                    <span className="heading-500-16-14">Valid Till</span>
                                                                </div>
                                                                <div className="tile-wrap">
                                                                    <span className="light-txt heading-400-14-10">Expired</span>
                                                                    <span className="heading-500-16-14">10 July 2024</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    {schedule && (
                                                        <div className="extra-data-item">
                                                            <div className="head">
                                                                <div className="heading-wrap heading-600-16-14">Service Scheduled</div>
                                                            </div>
                                                            <div className="service-maintaine-bottom">
                                                                <div className="services-wrap">
                                                                    <div className="tile">
                                                                        <div className="tile-wrap">
                                                                            <span className="light-txt heading-400-14-10">Technician Name</span>
                                                                            <span className="heading-500-16-14">Manoj Kumar</span>
                                                                        </div>
                                                                        <div className="tile-wrap">
                                                                            <span className="light-txt heading-400-14-10">Contact Number</span>
                                                                            <span className="heading-500-16-14">+91-9954367899</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="tile">
                                                                        <div className="tile-wrap">
                                                                            <span className="light-txt heading-400-14-10">Scheduled Date</span>
                                                                            <span className="heading-500-16-14">15 Dec 2023</span>
                                                                        </div>
                                                                        <div className="tile-wrap">
                                                                            <span className="light-txt heading-400-14-10">Scheduled Time</span>
                                                                            <span className="heading-500-16-14">10:00 AM</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="bottom-buton-wrap">
                                                                <button className="req-btn heading-600-14-12" type="button" onClick={requestChange} disabled={productDETAILS.product_status === 'Cancelled'}>Request Change</button>
                                                                <button className="req-btn heading-600-14-12" type="button" onClick={requestChange}>Request Cancellation</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                        <div className="extra-data-item">
                                            <div className="head">
                                                <div className="heading-wrap">
                                                    <span>Annual Maintenance Contract <span className="light-txt">| Gold Plan</span></span>
                                                    <span>{productDETAILS?.price_details?.machine_price ? productDETAILS?.price_details?.machine_price : '1,00,000'}</span>
                                                </div>
                                                <button className="service-schedule" disabled={productDETAILS.product_status === 'Cancelled'} onClick={scheduleService}>Schedule Service</button>
                                            </div>
                                            <div className="tiles-maintaine-wrap">
                                                <div className="tile maintenance-wrap">
                                                    <div className="tile-wrap">
                                                        <span className="heading-400-16-12 light-txt">Service Provider</span>
                                                        <span className="heading-500-16-14">VRV Systems</span>
                                                    </div>
                                                    <div className="tile-wrap">
                                                        <span className="heading-400-16-12 light-txt">Valid Till</span>
                                                        <span className="heading-500-16-14">10 July 2024 </span>
                                                    </div>
                                                    <div className="tile-wrap">
                                                        <span className="heading-400-16-12 light-txt">Contact Number</span>
                                                        <span className="heading-500-16-14">1800-042-4353</span>
                                                    </div>
                                                    <div className="tile-wrap">
                                                        <span className="heading-400-16-12 light-txt">Email</span>
                                                        <span className="heading-500-16-14">support@vrvsystems.com</span>
                                                    </div>
                                                    <div className="tile-wrap">
                                                        <span className="heading-400-16-12 light-txt">Last Service Date</span>
                                                        <span className="heading-500-16-14">Not yet availed</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="service-maintaine-bottom">
                                                <div className="heading heading-400-16-12 light-txt">Service Scope</div>
                                                <div className="service-wrap">
                                                    <div className="service-item">
                                                        <span className="icon">{gearIcon({ width: 24, height: 25 })}</span>
                                                        <span className="heading-400-14">3 Maintenance services* </span>
                                                    </div>
                                                    <div className="service-item">
                                                        <span className="icon">{userSettingIcon({ width: 24, height: 25 })}</span>
                                                        <span className="heading-400-14">10% discount on Labour charges (except accidental)</span>
                                                    </div>
                                                    <div className="service-item">
                                                        <span className="icon">{waterIcon({ width: 25, height: 25 })}</span>
                                                        <span className="heading-400-14">2 Additional free washing*</span>
                                                    </div>
                                                    <div className="service-item">
                                                        <span className="icon">{waterIcon({ width: 25, height: 25 })}</span>
                                                        <span className="heading-400-14">2 Additional free washing*</span>
                                                    </div>
                                                    <div className="service-item">
                                                        <span className="icon">{spareIcon({ width: 25, height: 25 })}</span>
                                                        <span className="heading-400-14">5% discount on spare parts and accessories.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="extra-data-item yellow-bg">
                                        <div className="head">
                                            <div className="heading-wrap">
                                                {productDETAILS?.machine_details?.data?.product?.name} | {productDETAILS?.machine_table_views?.["Basic Information"]['Brands']}
                                                <span>{productDETAILS?.price_details?.machine_price ? productDETAILS?.price_details?.machine_price : '1,00,000'}</span>
                                            </div>
                                            <button className="process" disabled={productDETAILS.product_status === 'Cancelled'}>
                                                {productDETAILS.product_status}
                                            </button>

                                            {/* <button className={`${productDETAILS.tokenExpired ? "process-exp" : "process"}`}>{!productDETAILS.tokenExpired ? (
                                                productDETAILS?.price_details?.full_payment_status === "PAYMENT_SUCCESS" ? "Owned" : "In Process"
                                            ) : (
                                                "Token Expired"
                                            )}
                                            </button> */}

                                        </div>
                                        <div className="tiles-wrap">
                                            <div className="tile">
                                                <span className="heading-400-16-12">Basic Information</span>
                                                <span className="heading-400-16-12">{BasicInfoValues}</span>
                                        
                                            </div>
                                            <div className="tile">
                                                <span className="heading-400-16-12">Table</span>
                                                <span className="heading-400-16-12">{tableStrokeSizeValues}</span>
                                            </div>
                                            {/* <div className="tile">
                                                <span className="heading-400-16-12">Travels</span>
                                                <span className="heading-400-16-12">1000 x 555 x 600 mm</span>
                                            </div> */}
                                            <div className="tile">
                                                <span className="heading-400-16-12">Spindle</span>
                                                <span className="heading-400-16-12">{spindleSizeValues}</span>
                                            </div>
                                            <div className="tile">
                                                <span className="heading-400-16-12">Other Details</span>
                                                <span className="heading-400-16-12">{OtherDetailsValues}</span>
                                            </div>
                                            {/* <div className="tile">
                                                <span className="heading-400-16-12">ATC</span>
                                                <span className="heading-400-16-12">20 pockets</span>
                                            </div> */}
                                        </div>
                                        {/* <div className="tiles-wrap">

                                            <div className="tile">
                                                <span className="heading-400-16-12">Table</span>
                                                <span className="heading-400-16-12">1100 x 550 mm</span>
                                            </div>
                                            <div className="tile">
                                                <span className="heading-400-16-12">Travels</span>
                                                <span className="heading-400-16-12">1000 x 555 x 600 mm</span>
                                            </div>
                                            <div className="tile">
                                                <span className="heading-400-16-12">Spindle</span>
                                                <span className="heading-400-16-12">BT40 / 8000 rpm</span>
                                            </div>
                                            <div className="tile">
                                                <span className="heading-400-16-12">ATC</span>
                                                <span className="heading-400-16-12">20 pockets</span>
                                            </div>
                                        </div> */}
                                    </div>

                                )}
                                <>
                                    {!product.tokenExpired ? (
                                        productDETAILS?.product_status !== 'Owned' && (
                                            <>
                                                {product.activeStep == "arrangingFinance" && product.documents.length > 0 || product.activeStep == "delivered" ? "" : (

                                                    <div className="extra-data-item">
                                                        <div className="head">
                                                            <div className="head-heading heading-600-16-14">Finance This Machine with Origa</div>
                                                            {productDETAILS.product_status !== 'Cancelled' &&(
                                                                <button className="main-btn">Check Eligibility</button>
                                                            )}
                                                        </div>
                                                        <div className="tab-wraps">
                                                            <div className="body-wrap">
                                                                <div className="btn-wrap-tab">
                                                                    <button onClick={() => handleActiveTab("lease")} className={activetab === "lease" ? "active tab-btn" : "tab-btn"}>Lease</button>
                                                                    <button onClick={() => handleActiveTab("loan")} className={activetab === "loan" ? "active tab-btn" : "tab-btn"}>Loan</button>
                                                                </div>
                                                                <div className="content-wrap">
                                                                    {activetab === "lease" ? (
                                                                        <>
                                                                            <div>Starting From</div>
                                                                            <div class="heading-600-24-20">₹ 4,000<span class="heading-400-14-12 light-txt">/ Month</span></div>
                                                                            <div className="">Tenure of 10 years</div>
                                                                            <div className="">*Subject to change as per terms and conditions</div>
                                                                        </>
                                                                    ) : (
                                                                        <div>Loading...</div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="icon-wrap">
                                                                {activetab === "lease" ? (
                                                                    <>
                                                                        <div className="icon-item">
                                                                            <div className="">Smaller Payments</div>
                                                                            <span>{settingIcon({ width: 15, height: 15 })}</span>
                                                                        </div>
                                                                        <div className="icon-item">
                                                                            <div className="">No Ownership risks</div>
                                                                            <span>{settingIcon({ width: 15, height: 15 })}</span>
                                                                        </div>
                                                                        <div className="icon-item">
                                                                            <div className="">Flexibility to upgrade</div>
                                                                            <span>{settingIcon({ width: 15, height: 15 })}</span>
                                                                        </div>
                                                                        <div className="icon-item">
                                                                            <div className="">Potential Tax Benefits</div>
                                                                            <span>{settingIcon({ width: 15, height: 15 })}</span>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="icon-item">
                                                                            <div className="">Smaller Payments</div>
                                                                            <span>{settingIcon({ width: 15, height: 15 })}</span>
                                                                        </div>
                                                                        <div className="icon-item">
                                                                            <div className="">No Ownership risks</div>
                                                                            <span>{settingIcon({ width: 15, height: 15 })}</span>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {/* {productDETAILS.activeStep == "arrangingFinance" && (
                                                <div className="extra-data-item">
                                                    <div className="head">
                                                        <div className="head-heading">Finance This Machine with Origa</div>
                                                        <button className="main-btn">Contact Origa Finance</button>
                                                    </div>
                                                    <div className="bottom-wrap">
                                                        <div className="light-txt heading-400-16-12 apply-text">You have applied for a Lease</div>
                                                        <div class="heading-600-24-20">₹ 4,000<span class="heading-400-14-12 light-txt">/ Month</span></div>
                                                        <div className="">Tenure of 10 years</div>
                                                        <div className="bi-bottom">
                                                            <div className="tile">
                                                                <span className="light-txt heading-400-14-12">Application status</span>
                                                                <span className="heading-500-16-14">04 July 2023, 23:59</span>
                                                            </div>
                                                            <div className="tile">
                                                                <span className="light-txt heading-400-14-12">Expected Sanction date</span>
                                                                <span className="heading-500-16-14">02:02:30:12</span>
                                                            </div>
                                                            <div className="tile">
                                                                <span className="light-txt heading-400-14-12">Application date</span>
                                                                <span className="heading-500-16-14">04 July 2023</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )} */}
                                                {product.activeStep == "arrangingFinance" && (
                                                    <div className="extra-data-item">
                                                        <div className="head no-boder">
                                                            <div className="heading-wrap">
                                                                <span className="light-txt heading-400-14-12">Delivery Address</span>
                                                                <span className="heading-500-16-14">Kamla Mills, Andheri East, Behind Holy Cross Church Mumbai, 400093</span>
                                                            </div>
                                                            <button className="simple-btn heading-600-14">Edit</button>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        )
                                    ) : (
                                        productDETAILS?.schedule_visit_details?.schedule_visit_date ? (
                                            <div className="extra-data-item">
                                                <div className="head no-boder">
                                                    <div className="heading-wrap">
                                                        {productDETAILS?.machine_details?.data?.product?.attributes['Machine Location']}
                                                        <span>{productDETAILS?.schedule_visit_details?.schedule_visit_date} {productDETAILS?.schedule_visit_details?.schedule_visit_time}</span>
                                                    </div>
                                                    <button className="simple-btn">Schedule a visit</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="extra-data-item">
                                                <div className="head no-boder">
                                                    <div className="heading-wrap">
                                                        Inspect this machine in person

                                                    </div>
                                                    {/* <button className="simple-btn" onClick={() => handleModal("date-modal")} disabled={productDETAILS.product_status === 'Cancelled'}>Schedule a visit</button> */}
                                                </div>
                                            </div>)
                                    )}
                                </>
                            </div>
                            {tabsClasses.delivered == "completed" ? "" : (
                                <div className="extra-data-section">
                                    {productDETAILS?.price_details?.token_payment_status === "PAYMENT_SUCCESS" && productDETAILS.product_status !== 'Owned' && product.activeStep == "blockedToken" && (
                                        <>

                                            {!product.tokenExpired ? (
                                                productDETAILS?.price_details?.advance_payment_status != 'PAYMENT_SUCCESS' && productDETAILS?.price_details?.advance_payment_status != 'PAYMENT_INITIATED' && (
                                                    <div className="extra-data-item">
                                                        <div className="head">
                                                            <div className="heading-wrap">
                                                                Advance Amount
                                                                <span> {productDETAILS?.price_details?.advance_amount_total ? productDETAILS?.price_details?.advance_amount_total : '1,00,000'} </span>
                                                            </div>
                                                            <button onClick={() => onShowPortal('ADVANCE')} className="main-btn">Pay Now</button>
                                                        </div>
                                                        <div className="body">
                                                            <div className="light-txt">Why do I pay an advance?</div>
                                                            <div className="">The time will expire and you can arrange for your finance in the meantime. It will also make you eligible for Origa Lease and Loan.</div>
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="extra-data-item">
                                                    <div className="head no-boder">
                                                        <div className="heading-wrap">
                                                            Still Interested in the Machine?
                                                            <span>Get in touch with us if you are still interested in purchasing the machine</span>
                                                        </div>
                                                        <button onClick={() => handleModal("speak-expert")} className="main-btn">Get In touch</button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {product.activeStep == "arrangingFinance" && (
                                        <>
                                            {product.documents.length < 1 ? (
                                                <div className="extra-data-item">
                                                    <div className="head">
                                                        <div className="heading-wrap heading-600-16-14">Payment instructions</div>
                                                        <button onClick={() => handleUploadModal(true)} className="main-btn">Upload payment receipt</button>
                                                    </div>
                                                    <div className="tiles-wrap">
                                                        <div className="tile">
                                                            <span className="light-txt heading-400-14-12">Total Payable</span>
                                                            <span className="heading-500-16-14">₹ 6,30,000</span>
                                                        </div>
                                                        <div className="tile">
                                                            <span className="light-txt heading-400-14-12">Account Name</span>
                                                            <span className="heading-500-16-14">Origa Market</span>
                                                        </div>
                                                        <div className="tile">
                                                            <span className="light-txt heading-400-14-12">Account Number</span>
                                                            <span className="heading-500-16-14">5378 5455 9975</span>
                                                        </div>
                                                        <div className="tile">
                                                            <span className="light-txt heading-400-14-12">Bank Name</span>
                                                            <span className="heading-500-16-14">ICICI Bank</span>
                                                        </div>
                                                        <div className="tile">
                                                            <span className="light-txt heading-400-14-12">IFSC Code</span>
                                                            <span className="heading-500-16-14">ICI00042266</span>
                                                        </div>
                                                    </div>
                                                    <div className="body">
                                                        <div className="light-txt heading-400-14-12">Kindly note that the transaction will be complete only after we have verified the receipt of payment uploaded by you.</div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="extra-data-item">
                                                    <div className="head">
                                                        <div className="heading-wrap heading-500-16-14">Payment instructions</div>
                                                        <button onClick={() => window.location = "/buy/apply-loan"} className="simple-btn heading-600-14">Contact Origa Finance</button>
                                                    </div>
                                                    <div className="body">
                                                        <div className="light-txt thanks-text-upload heading-400-14">Thank you for uploaded the Payment receipt and we are currently verifying it and we will get back within 24-48 working hours.</div>
                                                    </div>
                                                    <div className="body">
                                                        <div className="heading-wrap heading-500-16-14">Payment receipt</div>
                                                        <div className="light-txt heading-400-14">You can edit and view your payment receipt here</div>
                                                    </div>
                                                    <div className="btn-wraps">
                                                        <button class="basic btns heading-600-16-14">View receipt</button>
                                                        <button class="btns heading-600-16-14">Edit Document</button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                    {product.activeStep == "arrangingFinance" && product.documents.length > 0 || product.activeStep == "delivered" ? "" : (
                                        <div className="extra-data-item">
                                            <div className="head">
                                                <div className="heading-600-16-14">Price Breakdown</div>
                                            </div>
                                            <div className="tiles-wrap">
                                                <div className="tile">
                                                    <span className="light-txt heading-400-14-12">Machine Price</span>
                                                    <span className="heading-500-16-14">{productDETAILS?.price_details?.machine_price ? productDETAILS?.price_details?.machine_price : '0'}</span>
                                                </div>
                                                <div className="tile">
                                                    <span className="light-txt heading-400-14-12">Delivery Charges</span>
                                                    <span className="heading-500-16-14">{productDETAILS?.price_details?.delivery_charges_excluded ? (<strike className=""> {productDETAILS?.price_details?.delivery_charges ? productDETAILS?.price_details?.delivery_charges : '0'}</strike>
                                                    ) : (<span className=""> {productDETAILS?.price_details?.delivery_charges ? productDETAILS?.price_details?.delivery_charges : '0'}</span>
                                                    )}</span>


                                                </div>
                                                <div className="tile">
                                                    <span className="light-txt heading-400-14-12">Repairing cost</span>
                                                    <span className="heading-500-16-14">{productDETAILS?.price_details?.repairing_cost_excluded ? (<strike className=""> {productDETAILS?.price_details?.repairing_cost ? productDETAILS?.price_details?.repairing_cost : '0'}</strike>
                                                    ) : (<span className=""> {productDETAILS?.price_details?.repairing_cost ? productDETAILS?.price_details?.repairing_cost : '0'}</span>
                                                    )}</span>
                                                </div>
                                                <div className="tile">
                                                    <span className="light-txt heading-400-14-12">1 Year AMC</span>
                                                    <span className="heading-500-16-14">{productDETAILS?.price_details?.amc_cost_excluded ? (<strike className=""> {productDETAILS?.price_details?.amc_cost ? productDETAILS?.price_details?.amc_cost : '0'}</strike>
                                                    ) : (<span className=""> {productDETAILS?.price_details?.amc_cost ? productDETAILS?.price_details?.amc_cost : '0'}</span>
                                                    )}</span>
                                                </div>
                                                <div className="tile total-tile">
                                                    <span className="heading-600-16-14">Total</span>
                                                    <span className="heading-600-16-14">{productDETAILS?.price_details?.amc_cost ? productDETAILS?.price_details?.machine_total_price : '0'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {product.activeStep == "delivered" && (
                                        <div className="extra-data-item">
                                            <div className="head">
                                                <div>Estimated Date of Delivery: 13 July 2023</div>
                                            </div>
                                            <div className="deliverd-process-wrap">
                                                <div className={`deliverd-step ${deliverdStepClasses.schedulePickUp}`}>
                                                    <span className="proces-button">{tickIcon({ width: 12, height: 12 })}</span>
                                                    <div className="t-a-c">Scheduled for pick-up</div>
                                                    {product.schedulePickUp_date ? (
                                                        <div className="t-a-c light-txt"><span className="mr-2">|</span> {product.schedulePickUp_date}</div>
                                                    ) : null}
                                                </div>
                                                <div className={`deliverd-step ${deliverdStepClasses.pickedUp}`}>
                                                    <span className="proces-button">{tickIcon({ width: 12, height: 12 })}</span>
                                                    <div className="t-a-c">Picked up by transport partner</div>
                                                    {product.pickedUp_date ? (
                                                        <div className="t-a-c light-txt"><span className="mr-2">|</span> {product.pickedUp_date}</div>
                                                    ) : null}
                                                </div>
                                                <div className={`deliverd-step ${deliverdStepClasses.outForDelivery}`}>
                                                    <span className="proces-button">{tickIcon({ width: 12, height: 12 })}</span>
                                                    <div className="t-a-c">Out for Delivery</div>
                                                    {product.outForDelivery_date ? (
                                                        <div className="t-a-c light-txt"><span className="mr-2">|</span> {product.outForDelivery_date}</div>
                                                    ) : null}
                                                </div>
                                                <div className={`deliverd-step ${deliverdStepClasses.commissioning}`}>
                                                    <span className="proces-button">{tickIcon({ width: 12, height: 12 })}</span>
                                                    <div className="t-a-c">Scheduled for Commissioning</div>
                                                    {product.commissioning_date ? (
                                                        <div className="t-a-c light-txt"><span className="mr-2">|</span> {product.commissioning_date}</div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {product.activeStep == "arrangingFinance" && product.documents.length > 0 || product.activeStep == "delivered" ? "" : (
                                        <>
                                            {!product.tokenExpired && (
                                                <div className="extra-data-item">
                                                    <div className="head no-boder" style={{ paddingBottom: product.activeStep === "paidAdvance" || product.activeStep === "paidFullAmount" ? "15px" : "0" }}>
                                                        <div className="heading-wrap">
                                                            {   /*  <span className="light-txt heading-400-14-12">Machine Location</span>*/}
                                                            <span className="heading-500-14">  {productDETAILS?.schedule_visit_details?.schedule_visit_date && productDETAILS?.schedule_visit_details?.schedule_visit_time ? `${productDETAILS?.schedule_visit_details?.schedule_visit_date} ,${productDETAILS?.schedule_visit_details?.schedule_visit_time}` : " Inspect this machine in person"} </span>
                                                        </div>
                                                        {product.activeStep === "arrangingFinance" && (
                                                            <div className="heading-wrap">
                                                                <span className="light-txt heading-400-14-12">Visit Completed</span>
                                                                <span className="heading-500-14">{productDETAILS?.schedule_visit_details?.schedule_visit_date} {productDETAILS?.schedule_visit_details?.schedule_visit_time}</span>
                                                            </div>
                                                        )}
                                                        {product.activeStep === "paidFullAmount" || product.activeStep === "arrangingFinance" || productDETAILS.product_status === 'Owned' ? "" : (<button className="simple-btn heading-600-14" disabled={productDETAILS.product_status === 'Cancelled' } onClick={() => handleModal("date-modal")}  >Schedule a visit</button>)}
                                                    </div>
                                                    {product.activeStep === "paidAdvance" && (
                                                        <div className="visit-date-cancle">
                                                            <div className="top-wrap">
                                                                <div className="heading-wrap light-txt">Schedule visit date</div>
                                                                <button className="simple-btn heading-600-14">Request Change</button>
                                                            </div>
                                                            <div className="bottom-wrap">
                                                                <div className="heading-wrap heading-500-16-14">{productDETAILS?.schedule_visit_details?.schedule_visit_date} {productDETAILS?.schedule_visit_details?.schedule_visit_time}</div>
                                                                <button className="simple-btn heading-600-14">Request Cancellation</button>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {product.activeStep === "paidFullAmount" && (
                                                        <div className="visit-date-cancle">
                                                            <div className="bi-top-wrap">
                                                                <div className="heading-wrap heading-400-14-12 light-txt">Visit Completed</div>
                                                                <div className="date-text heading-500-16-14">{productDETAILS?.schedule_visit_details?.schedule_visit_date} {productDETAILS?.schedule_visit_details?.schedule_visit_time}</div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
            {productDETAILS.buymachine_id && (
                <div className="container-fluid col-cust">
                    <div className="max-container my-4 benefits-main-wrap-1">
                        <div className={`head d-f-block`} >
                            <div className="heading-wrap" >
                                <div className="heading-600-32 heading-600-32-20 text-left">Product Benefits</div>
                                <div className="heading-400-14-12 light-txt">From Machines to tools to finance everything you need in one place</div>
                            </div>
                            <button onClick={() => downloadInspectionReport()} className="box-btn d-f-block-box-btn heading-600-14 heading-600-14-12">View Detailed Report</button>
                        </div>
                        {!isSmallScreen && <div className="benefits-content-2">
                            <Slider ref={sliderRef} {...options}>
                                <div className="item">
                                    <div className="title">
                                        {visualIcon({ width: 24, height: 24 })}
                                    </div>
                                    <div className="content-section">
                                        <div className="heading-600-16">Visual Inspection Remarks</div>
                                        <div className="desc heading-400-16-14 light-txt">Table T slot broken Normal wear and tear due to ageing and uses</div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="title">
                                        {machineDynamicIcon({ width: 28, height: 28 })}
                                    </div>
                                    <div className="content-section">
                                        <div className="heading-600-16">Machine Dynamic Remarks</div>
                                        <div className="desc heading-400-16-14 light-txt">Origa will provide servicing for your machine so you don’t need to worry about anything...</div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="title">
                                        {machineStaticIcon({ width: 30, height: 30 })}
                                    </div>
                                    <div className="content-section">
                                        <div className="heading-600-16">Machine Static Geometrical Test</div>
                                        <div className="desc heading-400-16-14 light-txt">Spindle Runout :- 3 micron TIR with needs dial gauge Axis Backlash :-X axis 10 microns,Y axis 5 microns , Z axis 5 microns</div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="title">
                                        {conditionIcon({ width: 28, height: 28 })}
                                    </div>
                                    <div className="content-section">
                                        <div className="heading-600-16">Electrical & Pneumatic Condition</div>
                                        <div className="desc heading-400-16-14 light-txt">Origa can provide a lease and loan to enable you to purchase the machine you need</div>
                                    </div>
                                </div>
                            </Slider>

                        </div>}

                    </div>
                    {isSmallScreen && <div className="buy-slider">
                        <div className=" row for-mobile w-100 pt-3  card-slider-controller ">
                            <Slider7 breakpoints={breakpoints} listofdata={sliderProduct} productCategory={block} shadow={true} />
                        </div>
                    </div>}
                </div>
            )}
            {/* Withdraw Section */}
            {productDETAILS.product_status != 'Owned' && productDETAILS.product_status != 'Cancelled' && productDETAILS?.price_details?.token_payment_status === "PAYMENT_SUCCESS" && (
                <div className="container-fluid col-cust">
                    <div className="max-container my-4">
                        <div className="withdraw-main">
                            <div className="heading-600-16">Wish to withdraw your order?</div>
                            <button onClick={() => handleModal("withdraw-modal")} className="withdraw-btn" disabled={productDETAILS.product_status === 'Cancelled'}>Withdraw Order </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Speak to our Expert */}
            <div className="container-fluid col-cust">
                <div className="max-container my-4">
                    <div className="speak-expert-wrap-main">
                        <div className="image-wrap">
                            <img src="/asset/speak-expert.png" />
                        </div>
                        <div className="speak-content-wrap">

                            <div class="heading-600-32 heading-600-32-20 text-left">Speak to our Expert</div>
                            <div className="heading-400-16-14">Still have a few doubts regarding the machine? Have a word with our expert. Get a one time repair Get a one time repairservice if your machin has broken down Still have a few doubts regarding the machine? Have a word with our expert.</div>
                            {productDETAILS.product_status !== 'Cancelled' &&(
                            <button onClick={() => navigate('/contactus')} type="button" className="box-item-btn" >Get a Callback</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* Shop at Origa */}
            {tabsClasses.delivered == "completed" && (
                <>
                    <div className="container-fluid deliverd-completed">
                        <div className="max-container">
                            <div className='row pb-5'>
                                <div className='col col-lg-8 col-12 left-section'>
                                    <img src="asset/OrigaService.png" alt="Image" className='img-fluid' />
                                    <div className='heading heading-600-32-20'>Shop at Origa for</div>
                                    <div className='heading-400-16-14 op-80'>From Machines to tools to finance everything you need in one place</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {product_images[0].is_product_images && (
                        <div className="main-slide-wrap ">
                            <Slider {...images} ref={sliderRef}>
                                {product_images[1].images.map((product, index) => (
                                    <div key={index} className="slider-card-item p-4">
                                        <div className="prodcut-img-wrap">
                                            <img src={product.product} alt="" className="product-img" />
                                        </div>
                                        <div className="contents-wrap">
                                            <div className="product-name">{product.name}</div>
                                            <div className="heading-400-16-12">{product.description}</div>
                                            <button className="avail-btn">Enquire Now</button>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </>
            )}
            {/* Bot Section */}
            {/* <div className="max-container my-4">
                <div className="bot-icon-wrap-main">
                    <div className="bot-icon">{botIcon({ width: 37, height: 37 })}</div>
                </div>
            </div> */}
            {tabsClasses.delivered == "completed" ? (
                <FooterBottom />
            ) : (
                <Footer />
            )}
            {/* Call to action */}
            {productDETAILS && (
                <div className="call-to-action-wrap-machine">
                    <div className="container-fluid col-cust">
                        <div className="max-container my-0 benefits">
                            <div className="call-to-action-machine">
                                <div className="">
                                    <div className="heading-600-24 heading-600-24-20 heading-600-24-16">{productDETAILS?.machine_details?.data?.product?.name}</div>
                                </div>
                                <div className="">
                                    <div className="heading-600-24 heading-600-24-20 heading-600-24-16">{productDETAILS?.price_details?.machine_price || '1,00,000'}</div>
                                </div>
                                <div class="btns-wrap">
                                    {productDETAILS?.price_details?.full_payment_status !== 'PAYMENT_SUCCESS' && productDETAILS.product_status !== 'Cancelled' && !productDETAILS?.process_details?.some(task => task.task_name.includes("Arranging Finance")) && (
                                        <>
                                            {(productDETAILS?.price_details?.token_payment_status === 'PAYMENT_SUCCESS' && productDETAILS?.price_details?.full_payment_status !== 'PAYMENT_INITIATED') &&
                                                (productDETAILS?.price_details?.advance_payment_status !== 'PAYMENT_SUCCESS' && productDETAILS?.price_details?.advance_payment_status !== 'PAYMENT_INITIATED') && (
                                                    <>
                                                        <button type="button" onClick={() => onShowPortal('ADVANCE')} className="box-item-btn buy-now" disabled={productDETAILS.product_status === 'Cancelled'}>
                                                            Pay Advance of {productDETAILS?.price_details?.advance_amount ? productDETAILS?.price_details?.advance_amount : '1,00,000'}
                                                        </button>
                                                        <button onClick={onCallFunHandler} type="button" className="box-item-btn" disabled={productDETAILS.product_status === 'Cancelled'}>
                                                            Pay Full Amount
                                                        </button>
                                                    </>
                                                )}

                                            {(productDETAILS?.price_details?.token_payment_status === 'PAYMENT_INITIATED' ||
                                                productDETAILS?.price_details?.advance_payment_status === 'PAYMENT_INITIATED' ||
                                                productDETAILS?.price_details?.full_payment_status === 'PAYMENT_INITIATED') && (
                                                    <div className="payment-in-progress">
                                                        {/* <button type="button" className="box-item-btn"> */}
                                                        <button type="button" className="orange-btn">
                                                            Payment In Progress
                                                        </button>
                                                        <div className="heading-400-14-12 light-txt">
                                                            Please Try After Sometime..
                                                        </div>
                                                    </div>
                                                )}

                                            {(productDETAILS?.price_details?.full_payment_status !== 'PAYMENT_INITIATED' &&
                                                productDETAILS?.price_details?.token_payment_status !== 'PAYMENT_SUCCESS' &&
                                                productDETAILS?.price_details?.token_payment_status !== 'PAYMENT_INITIATED') && (
                                                    <>
                                                        <button type="button" onClick={() => onShowPortal('TOKEN')} className="box-item-btn buy-now">
                                                            Book with Token of {productDETAILS?.price_details?.token_amount_total}
                                                        </button>
                                                        <button onClick={onCallFunHandler} type="button" className="box-item-btn" disabled={productDETAILS.product_status === 'Cancelled'}>
                                                            Pay Full Amount
                                                        </button>
                                                    </>
                                                )}

                                            {productDETAILS?.price_details?.advance_payment_status === 'PAYMENT_SUCCESS' && (
                                                <button onClick={onCallFunHandler} type="button" className="box-item-btn" disabled={productDETAILS.product_status === 'Cancelled'}>
                                                    Pay Full Amount
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
export default MachinePage;