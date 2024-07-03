import React, { useState, useEffect } from "react";
import Cplus from "../../SubComponent/Cplus";
import EditIcon from "../../SubComponent/EditIcon";
import EmailIcon from "../../SubComponent/EmailIcon";
import PhoneIcon from "../../SubComponent/PhoneIcon";
import Button from "../../Button/Button";
import Breadcrumbs from "../../SubComponent/Breadcrumbs";
import RadioButton from "../../SubComponent/AllSvgs/RadioButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../SubComponent/Loader";
import AccountFooter from "../AccountFooter";
const ManageAddress = () => {
    const breadcrumbsItems = [{ name: "Home Page", link: "/" }, { name: "My Account", link: "/myaccount" }];
    const boldtitle = "Manage Address";
    const [activeAddress, setActiveAddress] = useState(0);
    const [isSmallScreen] = useState(window.innerWidth <= 992)
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(
                    'https://devextension.origa.market/api/fetchcustomeraddress',
                    {
                        id: localStorage.getItem('id'),
                    }
                );

                setData(response?.data?.response?.data?.user?.addresses);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Loader />;
    if (error) return <p>Error: {error.message}</p>;
    console.log("fetch manage address===>>>", data);

    const onRadioHandler = (index) => {
        setActiveAddress(index)
    }
    return (
        <>
            <div className="container-fluid pt-4">
                <div className="max-container">
                    <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} backnavi={() => navigate('/myaccount')} />
                </div>

                <div className={`${isSmallScreen ? "container-fluid" : "container"} pt-5`}>
                    {data?.length >= 1 ? <div className="row">
                        <div className={`col col-md-12 ${isSmallScreen ? "pt-4" : "p-5"} bg-F9F9F9`}>
                            <div className="row pt-3 justify-content-between">
                                <div className="col col-md-6 col-12 heading-600-24-20">
                                    Select a Delivery Address
                                </div>
                                <div className={`col col-md-4 col-12  ${isSmallScreen ? "pt-3" : ""}`}>
                                    <div className="d-flex justify-content-end curser-pointer" onClick={() => navigate('/addaddress', { state: { cancelNavi: "/manageaddress", saveNavi: "/manageaddress", status: "Add Address" } })}>
                                        <Cplus />
                                        <p className="m-0 pl-2 heading-600-14">
                                            Add New Address
                                        </p>

                                    </div>
                                </div>
                            </div>
                            {/*               use map here    */}
                            {data.map((add, index) => (
                                <>
                                    <div className="row justify-content-between pt-4">
                                        <div className="col col-lg-7 col-md-9 col-12">
                                            <div className="d-flex align-items-center" onClick={() => onRadioHandler(index)}>
                                                <RadioButton w={24} h={24} fInner={activeAddress === index ? "#73509E" : "none"} fOuter={activeAddress === index ? "#73509E" : "#AAAAAA"} />
                                                <p className="pl-3 heading-600-20 m-0">{`${add.firstName} ${add.lastName}`}</p>
                                            </div>
                                            <div className="pt-2 heading-400-14 op-80" style={{ paddingLeft: "39px" }}>
                                                {add.streetAddress1}, {add.city}, {add.countryArea} {add.postalCode}
                                            </div>
                                            {/* phone number */}
                                            <div className="pt-2" style={{ paddingLeft: "39px" }}>
                                                <div className="row pb-4">

                                                    <div className="col col-lg-4 col-12 pr-0">
                                                        <div className="d-flex"> <PhoneIcon />  <p className="heading-400-16-14 op-80">{add.phone}</p></div>

                                                    </div>

                                                    <div className="col col-lg-8 col-12 ">
                                                        <div className="d-flex"> <EmailIcon /> <p className="heading-400-16-14 op-80">{add?.email}</p> </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col col-lg-5 col-md-3 col-12 d-flex justify-content-end">
                                            <div className="d-flex curser-pointer" onClick={() => navigate(`/addaddress?AddressId=${add?.id}`, { state: { cancelNavi: "/manageaddress", saveNavi: "/manageaddress", status: "Edit Address", edit_address: add } })}>
                                                <EditIcon />
                                                <p className="pl-1 heading-600-14-12">Edit Address</p>
                                            </div>
                                        </div>
                                    </div>




                                </>
                            ))}
                            {/* end map here */}

                            <div className="container pt-5">
                                <div className="row  justify-content-end pt-5 pb-5">
                                    <div className="col col-md-auto">
                                        <Button message={"Deliver Here"} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        :
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <div><img src="/asset/NoAddressfound.png" /></div>
                            <div className="text-center" style={{ paddingTop: "24px" }}><h2 className="heading-600-20-16">No Address Found!</h2>
                                <p className="heading-400-14-12 op-80  pb-4">Add an Address in your Account</p>
                                <button className="button" onClick={() => navigate('/addaddress', { state: { cancelNavi: "/manageaddress", saveNavi: "/manageaddress", status: "Add Address" } })}>Add New Address</button>
                            </div>
                        </div>}
                </div>
            </div>
            <AccountFooter />
        </>
    );
};

export default ManageAddress;