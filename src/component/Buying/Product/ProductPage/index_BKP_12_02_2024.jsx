import React, { useState, useRef, useEffect } from "react";
import "./ViewProduct.css";
import Breadcrumbs from "../../../SubComponent/Breadcrumbs";
import Footer from "../../../Footer/Footer";
import ImageSlider from "../../Modals/ImageSlider";
import VideoModal from "../../Modals/VideoModal";
import PhoneModal from "../../Modals/PhoneModal";
import DateModal from "../../Modals/DateModal";
import DetailedInspection from "../../Modals/DetailedInspection";
import { locationIcon, heartIcon, framre3dIcon, infoIcon, smallpaymentIcon, ownershipIcon, flexibilityIcon, taxIcon, conserveIcon, maintenanceIcon, leftArrowIcon, rightArrowIcon, starIcon, visualIcon, machineDynamicIcon, machineStaticIcon, conditionIcon, botIcon } from "../../../../helpers/Icons";
import TenureSlider from "../../../../helpers/TenureSlider";
import Slider from "react-slick";
import { useLocation } from 'react-router-dom';
import gql from 'graphql-tag';
import { useNavigate } from 'react-router-dom';
import LoginModel from '../../../Authentication/LoginModel/LoginModel';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { secondClient, GET_MACHINE_DETAILS } from '../../../OrigaExtentionAPI/mutations'
import SimilarProducts from './SimilarProducts'
import useWishListAddOrUpdate from "../../../SubComponent/useWishListAddOrUpdate";
const client = secondClient
const ViewProduct = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const productId = queryParams.get('id');
    const [deliveryLocation, setDeliveryLocation] = useState("");
    const [buymachineId, setBuymachineId] = useState(0);
    const storedLocation = localStorage.getItem("deliveryLocation");
    if (storedLocation && !deliveryLocation) {
        setDeliveryLocation(storedLocation);
    }
    const [isFill, setIsFill] = useState("#FFF");
    const [isStorke, setIsStorke] = useState('#000')
    const [isHeart, setIsHeart] = useState('')
    const [isHeartFill, setIsHeartFill] = useState(false);
    const [productPage, setProductPage] = useState(""); // product-page || below-5-lakhs || above-5-lakhs
    const [showModal, setShowModal] = useState(false);
    const [SimilarProductsItem, setSimilarProductsItem] = useState([]);
    const [activeTab, setActiveTab] = useState("Basic Information");
    const [financeTab, setFinanceTab] = useState("lease");
    const [productDETAILS, setProductDETAILS] = useState({});
    const [showInfo, setShowinfo] = useState(false);
    const sliderRef = useRef(null);
    const sliderProductRef = useRef(null);
    const sliderBenefitsRef = useRef(null);
    const sliderSimilarProductsRef = useRef(null);
    const [loginPortal, setLoginPortal] = useState(false);
    const [slideroutput, setslideroutput] = useState();
    const [TenureAmount, setTenureAmount] = useState();
    const [pricebtn, setPricebtn] = useState(!!localStorage.getItem('id'))
    const { onWishlistHandler, heartColor } = useWishListAddOrUpdate();
    // console.log("SimilarProductsItem======>", SimilarProductsItem)
    // console.log("slideroutput======>", slideroutput)
    useEffect(() => {
        const selectedFinanceDetail = productDETAILS?.finance_details_list?.find(detail => detail.tenure_of_lease === slideroutput);

        if (selectedFinanceDetail) {
            console.log("Lease Rental (Excluding GST):", selectedFinanceDetail.lease_rental_exclude_gst);
            setTenureAmount(selectedFinanceDetail.lease_rental_exclude_gst);
        }

        console.log("TenureAmount======>", TenureAmount);
    }, [slideroutput, productDETAILS]);
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            let id = localStorage.getItem('id');
            if (id === null) {
                id = "";
            }
            try {
                const { data } = await client.mutate({ mutation: GET_MACHINE_DETAILS, variables: { productId: productId, "customerId": id, "buyMachineId": buymachineId } });
                setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)
                updateFormattedPrice()
            } catch (error) {
            }
        }
        fetchData();
    }, [productId]);
    const onShowPortal = () => {
        const loggedin = !!localStorage.getItem('userToken');
        if (loggedin) {
            navigate(`/buy/pay-token?id=${productId}&message=Unpaid&buyMachineId=${buymachineId}`);
            return
        } else {
            setLoginPortal(true);
        }
    }
    const onHidePortal = () => {
        setPricebtn(!!localStorage.getItem('id'))
        setLoginPortal(false);
        window.location.reload();
    }
    useEffect(() => {
        let search = (window.location.search).replace("?type=", "");
        if (search == "") {
            search = "product-page";
        }
        setProductPage(search);
    }, [])
    const next = () => {
        sliderRef.current.slickNext();
    };
    const previous = () => {
        sliderRef.current.slickPrev();
    };



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

    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    }
    const handleFinanceTab = (tab) => {
        setFinanceTab(tab);
    }
    const handleModal = async (status, obj) => {

        const loggedin = !!localStorage.getItem('userToken');
        if (!loggedin) {
            setLoginPortal(true);
            return
        }
        if (status) {
            setShowModal(status);
        } else {
            setShowModal(false);
            const id = localStorage.getItem('id');
            console.log('obj------------>', obj);
            setBuymachineId(obj?.buymachine_id)
            try {
                const { data } = await client.mutate({ mutation: GET_MACHINE_DETAILS, variables: { productId: productId, "customerId": id, "buyMachineId": obj?.buymachine_id } });
                setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)
                updateFormattedPrice()
            } catch (error) {
            }
        }
    }
    const options = {
        autoplay: false,
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 479, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    };
    const BenefitsOptions = {
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
    };
    const BuyerOptions = {
        autoplay: false,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1080, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    };
    const breadcrumbsItems = [
        { name: "Buy Machines", link: "/buy" },
        { name: "CNC Machine", link: "/buy/product-listing" }
    ];
    const boldtitle = productDETAILS?.machine_details?.data?.product?.name;
    const styleHandle = (value, color) => {
        return {
            "--percent": `${value}`,
            "stroke": color
        };
    };
    const product = [
        { is_header: true, product_name: productDETAILS?.machine_details?.data?.product?.name, shortlist: 200 },
        { is_product_images: true, images: productDETAILS?.machine_details?.data?.product?.medias },
        {
            is_product_info: true,
            video: [
                { isVideo: true, content: "Watch Video The machine is working perfectly", btn_text: "Watch Video" }
            ],
            schedule: [
                { is_schedule: true, content: "Inspect this machine in person", btn_text: "Schedule a visit" }
            ],
            tabs_section: [
                { is_tabs_section: true }
            ],
            product_detail: [
                { is_product_detail: true, year_purchase: 2019, machine_location: "Andheri Mumbai" }
            ],
            price_section: [
                { is_price_section: true, heading: "Check if this product fits in your Budget", desc: "Get a Free 1 Year AMC and product delivery with your purchase", btn_text: "Click for Price" }
            ],
            token_section: [
                { is_token_section: true, heading: `Block this Machine for ₹5,000 Now`, desc: "Pay a token in order to block this machine for 7 days.", btn_text: "Pay Token", extre_info: "If you are interested to purchase the machine and wish to block it so that no one else can purchase it you would need to pay a non refundable token. This will block the machine for 7 days, in this period you would need to either complete or finance the rest of the payment." }
            ],

        },
        {
            is_finance: true,
            head: [
                { heading: "Get Finance for this Machine from Origa", desc: "From Machines to tools to finance everything you need in one place" }
            ]
        },
        {
            is_benefits: true,
            head: [
                { heading: "Product Benefits", desc: "From Machines to tools to finance everything you need in one place", btn_text: "View Detailed Report" }
            ],
            benefits_items: [
                { id: 1, ratio: "04/05", label: "Good", color: "#D6F518", percent: 58, title: "External Visual Condition", extre_info: "The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches." },
                { id: 2, ratio: "05/05", label: "Great", color: "#077D55", percent: 100, title: "Static Geometric Test", extre_info: "The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches." },
                { id: 3, ratio: "02/05", label: "Workable", color: "#E86427", percent: 28, title: "Electric & Pneumatic Condition", extre_info: "The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches." },
                { id: 4, ratio: "03/05", label: "Fair", color: "#F6CF41", percent: 42, title: "Machine Usage History", extre_info: "The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches." },
            ]
        },
        {
            is_benefits_layout_2: true,
            head: [
                { heading: "Product Benefits", desc: "From Machines to tools to finance everything you need in one place", btn_text: "View Detailed Report" }
            ],
            benefits_layout_2_items: [
                { title: "Visual Inspection Remarks", desc: "Table T slot broken Normal wear and tear due to ageing and uses" },
                { title: "Machine Dynamic Remarks", desc: "Origa will provide servicing for your machine so you don’t need to worry about anything..." },
                { title: "Machine Static Geometrical Test", desc: "Spindle Runout :- 3 micron TIR with needs dial gauge Axis Backlash :-X axis 10 microns,Y axis 5 microns, Z axis 5 microns" },
                { title: "Electrical & Pneumatic Condition", desc: "Origa can provide a lease and loan to enable you to purchase the machine you need" }
            ]
        },
        {
            is_buyers: true,
            head: [
                { heading: "Origa Market Buyers", desc: "From Machines to tools to finance everything you need in one place" }
            ],
            buyers_content: [
                { id: 1, product: "/asset/Pune.png", buyer: "/asset/user-image.png", name: "Rajesh Sharma", position: "Word Workshop Owner", star: "4", desc: "“Origa not just helped me find a good second hand machine, but also assisted me to get finance to purchase the machine", machine: "CNC Machine", date: "24 July 2023" },
                { id: 2, product: "/asset/product-image.png", buyer: "/asset/user-image.png", name: "Priya Yadav", position: "Word Workshop Owner", star: "4", desc: "“Origa not just helped me find a good second hand machine, but also assisted me to get finance to purchase the machine", machine: "CNC Machine", date: "24 July 2023" },
                { id: 3, product: "/asset/product-image.png", buyer: "/asset/user-image.png", name: "Ram Kapoor", position: "Word Workshop Owner", star: "4", desc: "“Origa not just helped me find a good second hand machine, but also assisted me to get finance to purchase the machine", machine: "CNC Machine", date: "24 July 2023" },
                { id: 4, product: "/asset/product-image.png", buyer: "/asset/user-image.png", name: "Rajesh Sharma", position: "Word Workshop Owner", star: "4", desc: "“Origa not just helped me find a good second hand machine, but also assisted me to get finance to purchase the machine", machine: "CNC Machine", date: "24 July 2023" },
                { id: 5, product: "/asset/product-image.png", buyer: "/asset/user-image.png", name: "Rajesh Sharma", position: "Word Workshop Owner", star: "4", desc: "“Origa not just helped me find a good second hand machine, but also assisted me to get finance to purchase the machine", machine: "CNC Machine", date: "24 July 2023" }
            ]
        },
        {
            is_similarMachines: true,
            head: [
                { heading: "Similar Machines you may like", desc: "From Machines to tools to finance everything you need in one place", btn_text: "View Shop" }
            ],
            // machines: [
            //     { id: 1, product: "/asset/image560(2).png", buyer: "/asset/user-image.png", machine_name: "CNC Machine", brand: "Hitachi", location: "Mumbai", years_old: 7, price: "7,55,000", btn_text: "Avail Service", heart: true },
            //     { id: 2, product: "/asset/image560(2).png", buyer: "/asset/user-image.png", machine_name: "CNC Machine", brand: "Hitachi", location: "Mumbai", years_old: 7, price: "7,55,000", btn_text: "Avail Service", heart: true },
            //     { id: 3, product: "/asset/image560(2).png", buyer: "/asset/user-image.png", machine_name: "CNC Machine", brand: "Hitachi", location: "Mumbai", years_old: 7, price: "7,55,000", btn_text: "Avail Service", heart: false },
            //     { id: 4, product: "/asset/image560(2).png", buyer: "/asset/user-image.png", machine_name: "CNC Machine", brand: "Hitachi", location: "Mumbai", years_old: 7, price: "7,55,000", btn_text: "Avail Service", heart: true },
            //     { id: 5, product: "/asset/image560(2).png", buyer: "/asset/user-image.png", machine_name: "CNC Machine", brand: "Hitachi", location: "Mumbai", years_old: 7, price: "7,55,000", btn_text: "Avail Service", heart: true }
            // ]
        },
        {
            is_speak_to_expert: true,
            speak_to_expert: [
                { banner: "/asset/speak-expert.png", head_img: "/asset/OrigaService.png", heading: "Speak to our Expert", desc: "Still have a few doubts regarding the machine? Have a word with our expert. Get a one time repair Get a one time repairservice if your machin has broken down Still have a few doubts regarding the machine? Have a word with our expert.", btn_text: "Get a Callback" }
            ]
        }
    ];
    const handleInputChange = (event) => {
        const value = event.target.value;
        const numericValue = value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
        const formattedValue = numericValue.substring(0, 6); // Limit to 6 characters
        setDeliveryLocation(formattedValue);
        localStorage.setItem("deliveryLocation", formattedValue);
    }
    const handlepinChange = (event) => {
        const value = event.target.value;
        // If the input length is less than 6, set the value to empty
        const formattedValue = value.length < 6 ? "" : value;
        // Limit to 6 characters
        const truncatedValue = formattedValue.substring(0, 6);
        setDeliveryLocation(truncatedValue);
        // Save deliveryLocation to local storage
        localStorage.setItem("deliveryLocation", truncatedValue);
    }
    const isProductPriceMore = () => {
        let machinePrice = productDETAILS?.price_details?.machine_price;
        if (parseInt(machinePrice) > 500000) {
            return true;
        }
        return false;
    }
    const handleExternalModal = (item) => {
        if (showModal === item) {
            handleModal(false);
        } else {
            handleModal(item);
        }
    }
    const onSubmitHandler = () => {
        console.log('product====>',productDETAILS?.machine_details?.data?.product);
        // console.log('product====>',productDETAILS?.machine_details?.data?.product?.id);
        // console.log('product====>',productDETAILS?.machine_details?.data?.product?.thumbnail?.url);
        // console.log('product====>',productDETAILS?.machine_details?.data?.product?.pricing?.priceRange?.start?.gross?.amount);
        // console.log('product====>',productDETAILS?.machine_details?.data?.product?.attributes?.Brands);
        // console.log('product====>',productDETAILS?.machine_details?.data?.product?.category?.name);
        // console.log('product====>',productDETAILS?.machine_details?.data?.product?.category?.parent?.name);
        const productId = productDETAILS?.machine_details?.data?.product?.id
        const thumbnail = productDETAILS?.machine_details?.data?.product?.thumbnail?.url
        const pricing = productDETAILS?.machine_details?.data?.product?.pricing?.priceRange?.start?.gross?.amount
        const Brands = productDETAILS?.machine_details?.data?.product?.attributes?.Brands
        const category = productDETAILS?.machine_details?.data?.product?.category?.parent?.name
        const subcategory = productDETAILS?.machine_details?.data?.product?.category?.name
        onWishlistHandler(productId,thumbnail,pricing,Brands,category,subcategory)
    }


    return (
        <>
            {showModal === "image-modal" && (
                <div className="img-wrap-main">
                    {showModal === "image-modal" && (
                        <ImageSlider modalAction={handleModal} />
                    )}
                </div>
            )}
            {showModal === "video" && (
                <VideoModal modalAction={handleModal} video={productDETAILS.product_video[0]} />
            )}
            {showModal === "phone-modal" && (
                <PhoneModal modalAction={handleModal} productId={productId} buymachineId={buymachineId} />
            )}
            {showModal === "date-modal" && (
                <DateModal productId={productId} productDETAILS={productDETAILS} buyMachineId={buymachineId} modalAction={handleModal} />
            )}
            {showModal === "detailed-inspection" && (
                <DetailedInspection modalAction={handleModal} productId={productId} />
            )}
            <div className="container-fluid col-cust">
                <div className="max-container my-5">
                    <div className="top-wrap-main">
                        <div>
                            <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} backnavi={() => navigate('/buy/product-listing')} />
                        </div>
                        <div className="form-group">
                            <input type="text" value={deliveryLocation} onChange={handleInputChange} onBlur={handlepinChange} placeholder="Set Delivery Location" />
                            {locationIcon({ width: 24, height: 24 })}
                        </div>
                    </div>
                    <div className="name-wrap-main">
                        <div className="heading-wrap">
                            <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">{productDETAILS?.machine_details?.data?.product?.name}</div>
                        </div>
                        <div className="people heading-400-14-12" >
                            <span onClick={() => { setIsFill('#73509E'); setIsStorke('#73509E') }}>{productDETAILS?.wishlist_details?.wishlist}&nbsp;&nbsp;{heartIcon({ width: 25, onClick: () => onSubmitHandler(), height: 25, fill: isFill, stroke: isStorke })}</span>

                        </div>
                    </div>
                </div>
            </div>

            <div className="product-img-wrap-main">
                <Slider ref={sliderProductRef} {...options}>
                    {productDETAILS?.machine_details?.data?.product?.media.map((image, index) => (
                        <div key={index} className="product">
                            <img className="product-img" src={image.url} alt="" />
                            {image.button_type === "view_all" ? (
                                <div className="drag" onClick={() => handleModal("image-modal")}>View all</div>
                            ) : image.button_type === "3d" ? (
                                <button className="framre">{framre3dIcon({ width: 30, height: 30 })}</button>
                            ) : (
                                <></>
                            )}
                        </div>
                    ))}
                </Slider>
            </div>
            {product.map((prodcut) => (
                prodcut.is_product_info && (
                    <div className="container-fluid col-cust">
                        <div className="max-container my-4">
                            <div className="box-wrap-main">
                                <div className="box-inner">
                                    {prodcut.video.map((video, index) => (
                                        video.isVideo && (
                                            <div key={index} className="box-item">
                                                <div className="inner">
                                                    <div className="heading-400-14-12 light-txt">{video.content}</div>
                                                    <button onClick={() => handleModal("video")} className="box-btn heading-600-14 heading-600-14-12">{video.btn_text}</button>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                    {productDETAILS?.schedule_visit_details?.schedule_visit_date ? (<div className="box-item">
                                        <div className="inner">
                                            <button className="box-btn heading-600-14 heading-600-14-12">Schedule Date &Time</button>

                                            <div className="heading-400-14-12 light-txt">  {productDETAILS?.schedule_visit_details?.schedule_visit_date} {productDETAILS?.schedule_visit_details?.schedule_visit_time}</div>
                                        </div>
                                    </div>) : (<div className="box-item">
                                        <div className="inner">

                                            <div className="heading-400-14-12 light-txt">Inspect this machine in person</div>
                                            <button onClick={() => handleModal("date-modal")} className="box-btn heading-600-14 heading-600-14-12">Schedule a Visit</button>

                                        </div>
                                    </div>)}


                                    {prodcut.tabs_section.map((product, index) => (
                                        product.is_tabs_section && (
                                            <div key={index} className="box-item">
                                                <div className="tabs-wrap">
                                                    {Object.keys(productDETAILS?.machine_table_views ?? {}).map((key, index) => (
                                                        <button
                                                            key={key}
                                                            onClick={() => handleActiveTab(key)}
                                                            className={
                                                                activeTab === key
                                                                    ? "active tab-btn heading-600-14 heading-600-14-12"
                                                                    : "tab-btn heading-600-14 heading-600-14-12"
                                                            }
                                                            type="button"
                                                        >
                                                            {key}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="items-wrap">
                                                    {Object.keys(productDETAILS?.machine_table_views ?? {}).map((key, index) => (
                                                        <React.Fragment key={key}>
                                                            {activeTab === key && (
                                                                <>
                                                                    {Object.entries(productDETAILS?.machine_table_views[key] ?? {}).length === 0 ? (
                                                                        <div className="item">
                                                                            <span className="heading-400-14-12 light-txt">No Data</span>
                                                                        </div>
                                                                    ) : (
                                                                        Object.entries(productDETAILS?.machine_table_views[key]).map(([subKey, value]) => (
                                                                            <div key={subKey} className="item">
                                                                                <span className="heading-400-14-12 light-txt">{subKey}</span>
                                                                                <span className="heading-500-16">{value}</span>
                                                                            </div>
                                                                        ))
                                                                    )}
                                                                </>
                                                            )}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                                <div className="box-inner">
                                    {prodcut.product_detail.map((product, index) => (
                                        product.is_product_detail && (
                                            <div key={index} className="box-item">
                                                <div className="inner">
                                                    <div className="heading-400-14-12"><span className="light-txt">Year of Purchase:</span> <b>{productDETAILS?.machine_details?.data?.product?.attributes?.Year}</b></div>
                                                    <div className="heading-400-14-12"><span className="light-txt">Machine Location:</span> <b>{productDETAILS?.machine_details?.data?.product?.attributes['Machine Location']}</b></div>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                    {prodcut.price_section.map((price, index) => (
                                        price.is_price_section && (
                                            <div key={index} className="box-item">
                                                <div className="heading-600-18">{price.heading}</div>
                                                <div className="heading-400-14-12 light-txt">{price.desc}</div>
                                                <button onClick={onShowPortal} type="button" className="box-item-btn" disabled={pricebtn}>{price.btn_text}</button>
                                            </div>
                                        )
                                    ))}
                                    {prodcut.token_section.map((token, index) => (
                                        token.is_token_section && (
                                            <div key={index} className="box-item">
                                                <div className="heading-600-18">Block this Machine for {productDETAILS?.price_details?.token_amount_total} Now</div>
                                                <div className="heading-400-14-12 light-txt">
                                                    <span>{token.desc}</span>
                                                    {token.extre_info && (
                                                        <div className="info-text-wrap">
                                                            <span onClick={() => setShowinfo(!showInfo)}>{infoIcon({ width: 24, height: 24 })}</span>
                                                            {showInfo && (
                                                                <span className="info-text">{token.extre_info}</span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="btn-wrap">
                                                    {/* <button type="button" onClick={() => handleModal("phone-modal")} className="box-item-btn buy-now">Buy Now</button> */}
                                                    <button onClick={onShowPortal} type="button" className="box-item-btn">{token.btn_text}</button>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ))}
            {product.map((product) => (
                product.is_finance && (
                    <>
                        {product.head.map((head, index) => (
                            <div key={index} className="max-container my-5" id="finance">
                                <div className="finance-head">
                                    <div className="heading-600-32 heading-600-32-20 text-left">{head.heading}</div>
                                    <div className="heading-400-14-12 light-txt">{head.desc}</div>
                                </div>
                            </div>
                        ))}
                        <div className="finance-wrap-main">
                            <div className="max-container my-5">
                                <div className="body">
                                    <div className="left">
                                        <div className="tabs-wrap">
                                            <button onClick={() => handleFinanceTab("lease")} className={financeTab === "lease" ? "active tab-btn heading-600-24-20" : "tab-btn heading-600-24-20"} type="button">Lease</button>
                                            {/* <button onClick={() => handleFinanceTab("loan")} className={financeTab === "loan" ? "active tab-btn heading-600-24-20" : "tab-btn heading-600-24-20"} type="button">Loan</button> */}
                                        </div>
                                        {financeTab === "lease" ? (
                                            <>
                                                <div className="content">
                                                    <div className="heading-400-14-12 light-txt">Starting From</div>
                                                    <div className="heading-600-24-20">₹ {TenureAmount}<span className="heading-400-14-12 light-txt">/ Month</span></div>
                                                    <div className="heading-400-14-12 light-txt">*Subject to change as per terms and conditions</div>
                                                </div>
                                                <TenureSlider
                                                    name="tenure"
                                                    FinanceDetails={productDETAILS?.finance_details_list}
                                                    handleChange={null}
                                                    setslideroutput={setslideroutput}
                                                />
                                                <button onClick={() => navigate("/buy/apply-loan", { state: { productDETAILS:productDETAILS,buymachineId:buymachineId } })} type="button" className="box-item-btn">Check Eligibility</button>
                                            </>
                                        ) : (
                                            <div>No Data</div>
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="inner">
                                            <div className="item">
                                                <div className="icon">{smallpaymentIcon({ width: 24, height: 24 })}</div>
                                                <div className="icon-txt">Smaller Payments</div>
                                            </div>
                                            <div className="item">
                                                <div className="icon">{ownershipIcon({ width: 24, height: 24 })}</div>
                                                <div className="icon-txt">No Ownership risks</div>
                                            </div>
                                            <div className="item">
                                                <div className="icon">{flexibilityIcon({ width: 24, height: 24 })}</div>
                                                <div className="icon-txt">Flexibility to upgrade</div>
                                            </div>
                                            <div className="item">
                                                <div className="icon">{taxIcon({ width: 24, height: 24 })}</div>
                                                <div className="icon-txt">Potential Tax Benefits</div>
                                            </div>
                                            <div className="item">
                                                <div className="icon">{conserveIcon({ width: 24, height: 24 })}</div>
                                                <div className="icon-txt">Conserve cash flow</div>
                                            </div>
                                            <div className="item">
                                                <div className="icon">{maintenanceIcon({ width: 24, height: 24 })}</div>
                                                <div className="icon-txt">Maintenance and support</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            ))}
            {!isProductPriceMore() ? (
                product.map((prodcut) => (
                    <div className="container-fluid col-cust" key={prodcut.productId}>
                        <div className="max-container my-4 benefits-main">
                            {prodcut.is_benefits && (
                                <>
                                    {prodcut.head.map((head, index) => (
                                        <div className="head" key={index}>
                                            <div className="heading-wrap">
                                                <div className="heading-600-32 heading-600-32-20 text-left">{head.heading}</div>
                                                <div className="heading-400-14-12 light-txt">{head.desc}</div>
                                            </div>
                                            <button onClick={() => handleModal("detailed-inspection")} className="box-btn heading-600-14 heading-600-14-12">{head.btn_text}</button>
                                        </div>
                                    ))}
                                    <div className="benefits-content">
                                        <Slider ref={sliderBenefitsRef} {...BenefitsOptions}>
                                            <div className="item">
                                                <div className="progress-circle">
                                                    <svg>
                                                        <circle cx="65" cy="65" r="60"></circle>
                                                        <circle className="main-circle" cx="65" cy="65" r="60" style={styleHandle(58, "#D6F518")}></circle>
                                                    </svg>
                                                    <div className="score-wrap">
                                                        <div className="heading-600-20 heading-600-20-16 t-a-c">04/05</div>
                                                        <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Good</div>
                                                    </div>
                                                </div>
                                                <div className="title t-a-c">
                                                    <span>
                                                        External Visual Condition
                                                        <div className="svg-wrap">
                                                            {infoIcon({ width: 24, height: 24, onClick: () => handleModal("external-visual") })}
                                                            {showModal === "external-visual" && (
                                                                <span className="hidden-txt">The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches.</span>
                                                            )}
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="progress-circle">
                                                    <svg>
                                                        <circle cx="65" cy="65" r="60"></circle>
                                                        <circle className="main-circle" cx="65" cy="65" r="60" style={styleHandle(100, "#077D55")}></circle>
                                                    </svg>
                                                    <div className="score-wrap">
                                                        <div className="heading-600-20 heading-600-20-16 t-a-c">05/05</div>
                                                        <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Great</div>
                                                    </div>
                                                </div>
                                                <div className="title t-a-c">
                                                    <span>
                                                        Static Geometric Test
                                                        <div className="svg-wrap">
                                                            {infoIcon({ width: 24, height: 24, onClick: () => handleModal("geometric-test") })}
                                                            {showModal === "geometric-test" && (
                                                                <span className="hidden-txt">The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches.</span>
                                                            )}
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="progress-circle">
                                                    <svg>
                                                        <circle cx="65" cy="65" r="60"></circle>
                                                        <circle className="main-circle" cx="65" cy="65" r="60" style={styleHandle(28, "#E86427")}></circle>
                                                    </svg>
                                                    <div className="score-wrap">
                                                        <div className="heading-600-20 heading-600-20-16 t-a-c">02/05</div>
                                                        <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Workable</div>
                                                    </div>
                                                </div>
                                                <div className="title t-a-c">
                                                    <span>
                                                        Electric & Pneumatic Condition
                                                        <div className="svg-wrap">
                                                            {infoIcon({ width: 24, height: 24, onClick: () => handleModal("pneumatic-condition") })}
                                                            {showModal === "pneumatic-condition" && (
                                                                <span className="hidden-txt">The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches.</span>
                                                            )}
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="item">
                                                <div className="progress-circle">
                                                    <svg>
                                                        <circle cx="65" cy="65" r="60"></circle>
                                                        <circle className="main-circle" cx="65" cy="65" r="60" style={styleHandle(42, "#F6CF41")}></circle>
                                                    </svg>
                                                    <div className="score-wrap">
                                                        <div className="heading-600-20 heading-600-20-16 t-a-c">03/05</div>
                                                        <div className="heading-600-14 heading-600-14-12 light-txt t-a-c">Fair</div>
                                                    </div>
                                                </div>
                                                <div className="title t-a-c">
                                                    <span>
                                                        Machine Usage History
                                                        <div className="svg-wrap">
                                                            {infoIcon({ width: 24, height: 24, onClick: () => handleModal("machine-usage") })}
                                                            {showModal === "machine-usage" && (
                                                                <span className="hidden-txt">The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches.</span>
                                                            )}
                                                        </div>
                                                    </span>
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                product.map((prodcut) => (
                    prodcut.is_benefits_layout_2 && (
                        <div className="container-fluid col-cust">
                            <div className="max-container my-4 benefits-main-2">
                                {prodcut.head.map((head, index) => (
                                    <div className="head" key={index}>
                                        <div className="heading-wrap">
                                            <div className="heading-600-32 heading-600-32-20 text-left">{head.heading}</div>
                                            <div className="heading-400-14-12 light-txt">{head.desc}</div>
                                        </div>
                                        <button onClick={() => handleModal("detailed-inspection")} className="box-btn heading-600-14 heading-600-14-12">{head.btn_text}</button>
                                    </div>
                                ))}
                                <div className="benefits-content-2">
                                    {prodcut.benefits_layout_2_items.map((benefit, index) => (
                                        <div key={index} className="item">
                                            <div className="title">
                                                {visualIcon({ width: 24, height: 24 })}
                                            </div>
                                            <div className="content-section">
                                                <div className="heading-600-16">{benefit.title}</div>
                                                <div className="desc heading-400-16-14 light-txt">{benefit.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                ))
            )}
            {product.map((prodcut) => (
                prodcut.is_buyers && (
                    <div className="xmax-container plr25">
                        <div className="market-buyers-main">
                            {prodcut.head.map((head, index) => (
                                <div key={index} className="container-fluid col-cust">
                                    <div className="max-container my-5 market-buyers-inner">
                                        <div className="head">
                                            <div className="heading-wrap">
                                                <div className="heading-600-32 heading-600-32-20 text-left">{head.heading}</div>
                                                <div className="heading-400-14-12 light-txt">{head.desc}</div>
                                            </div>
                                            <div className="slider-button-wrap">
                                                <button className="slider-button" onClick={previous}>{leftArrowIcon({ width: 24, height: 24 })}</button>
                                                <button className="slider-button" onClick={next}>{rightArrowIcon({ width: 24, height: 24 })}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="main-slider-wrap">
                                <Slider ref={sliderRef} {...BuyerOptions} className="cust-slider">
                                    {prodcut.buyers_content.map((buyer) => (
                                        <div key={buyer.id} className="slider-card-item">
                                            <img src={buyer.product} className="product-img" />
                                            <div className="main-content-wrap">
                                                <div className="top-wrap">
                                                    <div className="user-wrap">
                                                        <img src={buyer.buyer} className="user-img" />
                                                        <div className="user-info">
                                                            <div className="heading-600-20 heading-600-20-16">{buyer.name}</div>
                                                            <div className="heading-400-14-12 light-txt">{buyer.position}</div>
                                                        </div>
                                                    </div>
                                                    <div className="star heading-400-14-12 light-txt">
                                                        <span>{buyer.star} Stars</span>
                                                        {starIcon({ width: 24, height: 24, fill: "#000" })}
                                                    </div>
                                                </div>
                                                <div className="desc heading-400-16-14">{buyer.desc}</div>
                                                <div className="product-info heading-400-14-12 light-txt">{buyer.machine} | Purchased on {buyer.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                )
            ))}
            <SimilarProducts setSimilarProductsItem={setSimilarProductsItem} />
            {product.map((prodcut) => (
                prodcut.is_similarMachines && (
                    <div className="similar-machines-main plr25">
                        {prodcut.head.map((head, index) => (
                            <div key={index} className="container-fluid col-cust">
                                <div className="max-container my-5 similar-machines-inner">
                                    <div className="head">
                                        <div className="heading-wrap">
                                            <div className="heading-600-32 heading-600-32-20 text-left">{head.heading}</div>
                                            <div className="heading-400-14-12 light-txt">{head.desc}</div>
                                        </div>
                                        <button onClick={() => window.location = "/buy/product-listing"} className="box-btn heading-600-14 heading-600-14-12">
                                            {head.btn_text}
                                            <span className="arrow-icon">{rightArrowIcon({ width: 24, height: 24 })}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="main-slider-wrap">
                            <Slider ref={sliderSimilarProductsRef} {...options} className="cust-slider">
                                {SimilarProductsItem?.map((machine) => (
                                    <div key={machine?.id} className="slider-card-item">
                                        <button className="heart" type="button">{heartIcon({ width: 25, height: 25, fill: "none", stroke: "#000" })}</button>
                                        <div className="prodcut-img-wrap">
                                            <img src={machine?.thumbnail} style={{ width: 300, height: 280 }} alt="" className="product-img" />
                                        </div>
                                        <div className="contents-wrap">
                                            <div className="product-name">{machine?.productName}</div>
                                            <div className="heading-400-14-12 light-txt">{machine?.attributes?.Brands} | {machine?.attributes?.["Machine Location"]}</div>
                                            <div className="bottom-wrap">
                                                <div className="time">{product.mfgYear === 1900 ? "N/A" : product.mfgYear}</div>
                                                <div className="fs-20">₹{machine.grossPrice}</div>
                                            </div>
                                            <button onClick={() => navigate(`/buy/cnc-machine?id=${machine?.productId}`)} className="avail-btn">Avail Service</button>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                )
            ))}
            {product.map((prodcut) => (
                prodcut.is_speak_to_expert && (
                    prodcut.speak_to_expert.map((expert, index) => (
                        <div key={index} className="container-fluid col-cust">
                            <div className="max-container my-4">
                                <div className="speak-expert-wrap-main">
                                    <div className="image-wrap">
                                        <img src={expert.banner} />
                                    </div>
                                    <div className="speak-content-wrap">

                                        <div class="heading-600-32 heading-600-32-20 text-left">{expert.heading}</div>
                                        <div className="">{expert.desc}</div>
                                        <button onClick={() => handleModal("phone-modal")} type="button" className="box-item-btn">{expert.btn_text}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )
            ))}
            {/* <div className="max-container my-5">
                <div className="bot-icon-wrap">
                    <div className="bot-icon">{botIcon({ width: 37, height: 37 })}</div>
                </div>
            </div> */}
            <Footer />
            <div className="call-to-action-wrap-main">
                <div className="container-fluid col-cust">
                    <div className="max-container my-0 benefits">
                        <div className="call-to-action-main">
                            <div className="text-contain">
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16">{productDETAILS?.machine_details?.data?.product?.name}</div>
                                <div className="light-txt">Year of Purchase: {productDETAILS?.machine_details?.data?.product?.attributes?.Year}</div>
                            </div>
                            <div>
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16">{productDETAILS?.price_details?.machine_price}</div>
                                <div className="light-txt"><span>or </span>₹{TenureAmount}/month</div>
                            </div>
                            <div class="btns-wrap">
                                <button onClick={() => handleModal("phone-modal")} type="button" class="box-item-btn buy-now">Buy Now</button>
                                <button onClick={() => onShowPortal()} type="button" class="box-item-btn">Book with Token of {productDETAILS?.price_details?.token_amount_total}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loginPortal && <LoginModel onHide={onHidePortal} />}
        </>
    );
}
export default ViewProduct;