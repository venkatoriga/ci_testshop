import React, { useState, useRef, useEffect } from "react";

import "./ViewProduct.css";
import Breadcrumbs from "../../../SubComponent/Breadcrumbs";
import Footer from "../../../Footer/Footer";
import ImageSlider from "../../Modals/ImageSlider";
import VideoModal from "../../Modals/VideoModal";
import PhoneModal from "../../Modals/PhoneModal";
import DateModal from "../../Modals/DateModal";
import Slider from "react-slick";
import TenureSlider from "../../../../helpers/TenureSlider";
import CheckPurple from '../../../SubComponent/CheckPurple'
import CallCenterIcon from '../../../SubComponent/CallCenterIcon'
import PricesCompetitive from '../../../SubComponent/PricesCompetitive'
import InvoiceIcon from '../../../SubComponent/invoiceIcon'
import DetailedInspection from "../../Modals/DetailedInspection";
import { locationIcon, framre3dIcon, callCentreIcon, heartIcon, botIcon, infoIcon, smallpaymentIcon, ownershipIcon, flexibilityIcon, taxIcon, conserveIcon, maintenanceIcon, leftArrowIcon, rightArrowIcon, starIcon, visualIcon, spareIcon } from "../../../../helpers/Icons";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoginModel from '../../../Authentication/LoginModel/LoginModel';
import { secondClient, GET_SPARE_DETAILS } from '../../../OrigaExtentionAPI/mutations'
import useWishListAddOrUpdate from "../../../SubComponent/useWishListAddOrUpdate";
import Cart from "../../../SubComponent/Cart/Cart";
import { gql } from 'graphql-tag';
import MachinePurchaseModal from "./QuationModel";
import Loader from "../../../SubComponent/Loader";
const CREATE_CONTACT_US = gql`
  mutation CreateConatctUs($contactusinput: ContactUsInput!) {
    createContactUs(contactusinput: $contactusinput) {
      contactus {
        id
        firstname
        lastname
        emailid
        reasonId {
          id
          reasonTitle
          reasonDescription
        }
        queryDescription
      }
      message
      success
    }
  }
`;


const client = secondClient
const ViewSpareProduct = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
    const { handleClick } = Cart();
    const productId = queryParams.get('id');
    const groupId = queryParams.get('group_id');
    // console.log('productId---->', productId);
    const [deliveryLocation, setDeliveryLocation] = useState("");
    const [buymachineId, setBuymachineId] = useState(0);
    const [QuationModel, SetQuationModel] = useState(false);
    const storedLocation = localStorage.getItem("deliveryLocation");
    const [activeTab, setActiveTab] = useState("Basic Information");
    const [showInfo, setShowinfo] = useState(false);
    const [financeTab, setFinanceTab] = useState("lease");
    const sliderBenefitsRef = useRef(null);
    const [loading, setLoading] = useState(true);
    if (storedLocation && !deliveryLocation) {
        setDeliveryLocation(storedLocation);
    }
    const [isFill, setIsFill] = useState("#FFF");
    const [isStorke, setIsStorke] = useState('#000')
    const [productPage, setProductPage] = useState(""); // product-page || below-5-lakhs || above-5-lakhs
    const [showModal, setShowModal] = useState(false);
    const [productDETAILS, setProductDETAILS] = useState({});
    const [VarientAttributes, setVarientAttributes] = useState([]);
    console.log("productDETAILS", productDETAILS)
    const [loginPortal, setLoginPortal] = useState(false);
    const [infokey, setinfokey] = useState(0);
    const sliderProductRef = useRef(null);
    const [pricebtn, setPricebtn] = useState(!!localStorage.getItem('id'))
    const { onWishlistHandler, heartColor } = useWishListAddOrUpdate();


    const handlecart = () => {
        //handleClick()
    }

    const [quantity, setQuantity] = useState(1);
    const price = productDETAILS?.productDetails?.sales_rate;

    const handleIncreaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecreaseQuantity = () => {
        setQuantity(prevQuantity => Math.max(prevQuantity - 1, 1));
    };
    const product = [
        { is_header: true, product_name: productDETAILS?.machine_details?.data?.product?.name, shortlist: 200 },
        { is_product_images: true, images: productDETAILS?.machine_details?.data?.product?.medias },
        {
            is_product_info: true,
            tabs_section: [
                { is_tabs_section: true }
            ],
            product_detail: [
                { is_product_detail: true, year_purchase: 2019, machine_location: "Andheri Mumbai" }
            ],
            price_section: [
                { is_price_section: true, heading: "Looking to purchase products in bulk?", desc: "Purchase item in bulk quantity", desc1: "Get at best price for your business", btn_text: "Get a Quote" }
            ],
            token_section: [
                { is_token_section: true, heading: `ORIGA Benefits`, desc: "Competitive Prices.", desc1: "Response within 24 hrs.", desc2: "GST Invoice Available", btn_text: "Pay Token", extre_info: "If you are interested to purchase the machine and wish to block it so that no one else can purchase it you would need to pay a non refundable token. This will block the machine for 7 days, in this period you would need to either complete or finance the rest of the payment." }
            ],

        },

        {
            is_benefits: false,
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


    ];
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
    const styleHandle = (value, color) => {
        return {
            "--percent": `${value}`,
            "stroke": color
        };
    };
    const handleActiveTab = (tab) => {
        setActiveTab(tab);
    }
    const handleFinanceTab = (tab) => {
        setFinanceTab(tab);
    }
    const nextSliderBenefitsRef = () => {
        sliderBenefitsRef.current.slickNext();
    };
    const previousSliderBenefitsRef = () => {
        sliderBenefitsRef.current.slickPrev();
    };
    const isProductPriceMore = () => {
        let machinePrice = productDETAILS?.sales_rate;
        if (parseInt(machinePrice) > 1) {
            return true;
        }
        return false;
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            let id = localStorage.getItem('id');
            if (id === null) {
                id = "";
            }
            try {
                const { data } = await client.query({ query: GET_SPARE_DETAILS, variables: { groupId: groupId || '', itemId: productId || '' } });
                setProductDETAILS(data?.inventoryItem?.response)
                setLoading(false)
                updateFormattedPrice()
            } catch (error) {
            }
        }
        fetchData();
    }, [groupId, productId]);
    const onShowPortal = async () => {
        const loggedin = !!localStorage.getItem('userToken');
        if (loggedin) {
            const firstname = localStorage.getItem('firstName');
            const lastName = localStorage.getItem('lastName');
            const email = localStorage.getItem('emailId')
            const phonenumber = localStorage.getItem('number');
            try {
                setLoading(true)
                const { data } = await client.mutate({
                    mutation: CREATE_CONTACT_US,
                    variables: {
                        contactusinput: {
                            firstname: firstname,
                            lastname: lastName,
                            emailid: email,
                            reasonid: 5,
                            queryDescription: `Product:${productDETAILS?.name}, ProductId:${productDETAILS?.id}`,
                            phonenumber: phonenumber
                        }
                    }
                });
                console.log("API Response==>", data);
                setLoading(false)
                SetQuationModel(true);
            } catch (error) {
                setLoading(false)
                console.error('API Error==>', error.message);
            }
        } else {
            setLoginPortal(true);
        }
    }

    const onHidePortal = () => {
        setLoginPortal(false);
        onShowPortal()
        //window.location.reload();
    }
    useEffect(() => {
        let search = (window.location.search).replace("?type=", "");
        if (search == "") {
            search = "product-page";
        }
        setProductPage(search);
    }, [])


    const updateFormattedPrice = () => {
        setProductDETAILS((prevDetails) => ({
            ...prevDetails,
            price_details: {
                ...prevDetails.price_details,
                //amc_cost: formatCurrency(prevDetails.price_details.amc_cost),
                //delivery_charges: formatCurrency(prevDetails.price_details.delivery_charges),
                machine_price: formatCurrency(prevDetails.sales_rate),
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

    const handleModal = async (status, obj) => {

        const loggedin = !!localStorage.getItem('userToken');
        if (!loggedin) {
            setLoginPortal(true);
            return
        }

        if (status === 'phone-modal') {
            const loggedin = !!localStorage.getItem('userToken');
            if (!loggedin) {
                setLoginPortal(true);
                return
            }
            else {
                navigate(`/buy/add-address?id=${(productId)}&buyMachineId=${buymachineId || 0}&sparetools=${true}`);
            }
        }
        if (status) {
            setShowModal(status);
        } else {
            setShowModal(false);
            const id = localStorage.getItem('id');
            console.log('obj------------>', obj);
            setBuymachineId(obj?.buymachine_id)
            try {

                const { data } = await client.query({ query: GET_SPARE_DETAILS, variables: { itemId: productId } });
                setProductDETAILS(data?.inventoryItem?.response)
                updateFormattedPrice()
            } catch (error) {
            }
        }
    }



    const breadcrumbsItems = [
        { name: "Buy Machines", link: "/buy" },
        { name: "Spares", link: "/buy/product-listing" }
    ];
    const boldtitle = productDETAILS?.machine_details?.data?.product?.name;


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

    function handlesizeandcolour (key){
        // console.log('key------>',key);
        setinfokey(key)


    }

    const onSubmitHandler = () => {
        console.log('product====>', productDETAILS?.machine_details?.data?.product);
        const productId = productDETAILS?.machine_details?.data?.product?.id
        const thumbnail = productDETAILS?.machine_details?.data?.product?.thumbnail?.url
        const pricing = productDETAILS?.machine_details?.data?.product?.pricing?.priceRange?.start?.gross?.amount
        const Brands = productDETAILS?.machine_details?.data?.product?.attributes?.Brands
        const category = productDETAILS?.machine_details?.data?.product?.category?.parent?.name
        const subcategory = productDETAILS?.machine_details?.data?.product?.category?.name
        onWishlistHandler(productId, thumbnail, pricing, Brands, category, subcategory)
    }



    const productDetailsArray = Array.isArray(productDETAILS) ? productDETAILS : [productDETAILS];

    const renderButtons = () => {
        console.log('renderButtons------>', productDetailsArray);
        const buttons = [];
        var product;
        Object.keys(productDetailsArray).forEach((key) => {
            product = productDetailsArray[key];
        
        });
        // console.log('product--->', product);
        Object.keys(product).forEach((productKey) => {
            const productDetail = product[productKey];
            console.log('productDetail--->',productDetail);
            buttons.push(
                <>
             <button key={productKey} className="btn btn-light m-1" onClick={() => handlesizeandcolour(productKey)}>
                    {productDetail?.attributes?.attribute1?.name} {productDetail?.attributes?.attribute1?.options.name}
                    <br />
                    {productDetail?.attributes?.attribute2?.name} {productDetail?.attributes?.attribute2?.options.name}
                    {productDetail?.attributes?.attribute3?.name && (
                        <>
                            <br />
                            {productDetail?.attributes?.attribute3?.name} {productDetail?.attributes?.attribute3?.options.name}
                        </>
                    )}
                </button>
                
                
                </>
            );
        });
        
        return buttons;
      };
      

    
    // Usage in your component's render/return method:
    <div className="box-item">
        <div className="heading-600-18">Size & Colour</div>
        <div className="heading-400-14-12 light-txt">
            {renderButtons()}
        </div>
    </div>



    return (
        <>
            {loading && <Loader />}
            {QuationModel && (
                <>
                    <MachinePurchaseModal SetQuationModel={SetQuationModel} />
                </>
            )}
            {showModal === "image-modal" && (
                <div className="img-wrap-main">
                    {showModal === "image-modal" && (
                        <ImageSlider modalAction={handleModal} />
                    )}
                </div>
            )}
            {/* {showModal === "video" && (
                <VideoModal modalAction={handleModal} video={productDETAILS.product_video[0]} />
            )} */}
            {/* {showModal === "phone-modal" && (
                <PhoneModal modalAction={handleModal} productId={productId} buymachineId={buymachineId} />
            )} */}
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
                            <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">{productDETAILS?.[infokey]?.name}</div>
                        </div>
                        <div className="people heading-400-14-12" >
                            <span onClick={() => { setIsFill('#73509E'); setIsStorke('#73509E') }}>{productDETAILS?.wishlist_details?.wishlist}&nbsp;&nbsp;{heartIcon({ width: 25, onClick: () => onSubmitHandler(), height: 25, fill: isFill, stroke: isStorke })}</span>

                        </div>
                    </div>
                </div>
            </div>

            <div className="product-img-wrap-main">
                <Slider ref={sliderProductRef} {...options}>
                    {productDETAILS?.[infokey]?.images?.productImages.map((image, index) => (
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
                                    {prodcut.tabs_section.map((product, index) => (
                                        product.is_tabs_section && (
                                            <div key={index} className="box-item">
                                                <div className="tabs-wrap">
                                                    {Object.keys(productDETAILS?.[infokey]?.productDetails ?? {}).map((key, index) => (
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
                                                    {Object.keys(productDETAILS?.[infokey]?.productDetails ?? {}).map((key, index) => (
                                                        <React.Fragment key={key}>
                                                            {activeTab === key && (
                                                                <>
                                                                    {Object.entries(productDETAILS?.[infokey]?.productDetails[key] ?? {}).length === 0 ? (
                                                                        <div className="item">
                                                                            <span className="heading-400-14-12 light-txt">No Data</span>
                                                                        </div>
                                                                    ) : (
                                                                        Object.entries(productDETAILS?.[infokey]?.productDetails[key]).map(([subKey, value]) => (
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
                                    <div className="box-item">
                                        <div className="heading-600-18">Size & Colour</div>
                                        <div className="heading-400-14-12 light-txt">
                                            {renderButtons()}
                                        </div>
                                    </div>
                                    {/* <div className="box-item">
                                        <div className="heading-600-18">Size & Colour</div>
                                        <div className="heading-400-14-12 light-txt">
                                            {productDETAILS?.map((product, index) => (
                                                <button className="btn btn-light m-1">
                                                    {product.attributes?.[`attribute${index}`]?.name}:{product.attributes?.[`attribute${index}`]?.options?.name}
                                                </button>

                                            ))
                                            }
                                            {productDETAILS?.[0]?.attributes?.attribute2?.name && (
                                                <button className="btn btn-light m-1">
                                                    {productDETAILS?.[0]?.attributes?.attribute2?.name}: {productDETAILS?.[0]?.attributes?.attribute2?.options?.name}
                                                </button>
                                            )}
                                        </div>
                                    </div> */}

                                    {prodcut.price_section.map((price, index) => (
                                        price.is_price_section && (
                                            <div key={index} className="box-item">
                                                <div className="heading-600-18">{price.heading}</div>
                                                <div className="heading-400-14-12 light-txt"><CheckPurple /> {price.desc}</div>
                                                <div className="heading-400-14-12 light-txt"> <CheckPurple /> {price.desc1}</div>
                                                <button onClick={onShowPortal} type="button" className="box-item-btn" >{price.btn_text}</button>
                                            </div>
                                        )
                                    ))}


                                    {prodcut.token_section.map((token, index) => (
                                        token.is_token_section && (
                                            <div key={index} className="box-item">

                                                <div className="heading-600-18">{token.heading}</div>
                                                <div className="heading-400-14-12 light-txt">  <PricesCompetitive /> {token.desc} <CallCenterIcon />{token.desc1} <InvoiceIcon /> {token.desc2}</div>


                                            </div>

                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
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
                                                <div className="heading-400-14-12 light-txt pt-3">{head.desc}</div>
                                            </div>
                                            <button onClick={() => handleModal("detailed-inspection")} className="box-btn heading-600-14 heading-600-14-12">{head.btn_text}</button>
                                        </div>
                                    ))}
                                    <div className="benefits-content">
                                        <div className="benefits-content-head">
                                            <div className="slider-button-wrap">
                                                <button className="slider-button" onClick={previousSliderBenefitsRef}>{leftArrowIcon({ width: 24, height: 24 })}</button>
                                                <button className="slider-button" onClick={nextSliderBenefitsRef}>{rightArrowIcon({ width: 24, height: 24 })}</button>
                                            </div>
                                        </div>
                                        <Slider ref={sliderBenefitsRef} {...BenefitsOptions} className="cust-slider">
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
                                                            {infoIcon({ width: 24, height: 24, onClick: () => handleModal(showModal === "external-visual" ? false : "external-visual") })}
                                                            {showModal === "external-visual" && (
                                                                <span className="hidden-txt hidder-txt-first">The external Machine Condition is rated as 4/5 which means there are barely a few dents and scratches.</span>
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
                                                            {infoIcon({ width: 24, height: 24, onClick: () => handleModal(showModal === "geometric-test" ? false : "geometric-test") })}
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
                                                            {infoIcon({ width: 24, height: 24, onClick: () => handleModal(showModal === "pneumatic-condition" ? false : "pneumatic-condition") })}
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
                                                            {infoIcon({ width: 24, height: 24, onClick: () => handleModal(showModal === "machine-usage" ? false : "machine-usage") })}
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
            <Footer />
            <div className="call-to-action-wrap-main">
                <div className="container-fluid col-cust">
                    <div className="max-container my-0 benefits">
                        <div className="call-to-action-main">
                            <div className="text-contain">
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16">{productDETAILS?.[infokey]?.name}</div>
                                <div className="light-txt">Brand: {productDETAILS?.[infokey]?.productDetails?.["Basic Information"].Brand || 'N/A'}</div>
                                <div className="light-txt">No of Stock: {productDETAILS?.[infokey]?.available_stock || 'N/A'}</div>
                            </div>
                            <div>
                                <div className="heading-600-24 heading-600-24-20 heading-600-24-16">₹.{productDETAILS?.[infokey]?.saleprice * quantity}</div>
                                {/* <div className="light-txt"><span>or </span>₹{TenureAmount}/month</div> */}
                            </div>
                            <div className="btns-wrap">
                                <div className="quantity-selector">
                                    <button onClick={handleDecreaseQuantity} className="box-item-btn">-</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span className="badge badge-secondary">&nbsp;&nbsp;&nbsp;&nbsp;{quantity}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    &nbsp;&nbsp;&nbsp;&nbsp;<button onClick={handleIncreaseQuantity} className="box-item-btn">+</button>
                                </div>
                                <button onClick={() => handlecart(quantity)} type="button" className="box-item-btn">Add to Cart</button>
                                <button onClick={() => handleModal("phone-modal", quantity)} type="button" className="box-item-btn buy-now">Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {loginPortal && <LoginModel onHide={onHidePortal} />}
        </>
    );
}
export default ViewSpareProduct;