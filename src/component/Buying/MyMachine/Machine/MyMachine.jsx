import React, { useState, useEffect } from "react";
import Breadcrumbs from "../../../SubComponent/Breadcrumbs";
import Footer from "../../../Footer/Footer";
import MachineSale from "../../../Selling/MachineSale/MachineSale";
import MachineSold from "../../../Selling/MachineSold/MchineSold";
import "./MyMachine.css";
// import { dollerIcon, filterIcon, tagIcon } from "../../../../helpers/Icons";
import {dollerIcon,filterIcon,financeIcon,tagIcon} from "../../../../helpers/Icons";
import { useNavigate } from "react-router-dom";
import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { secondClient, customerMyMachinesQuery, customerMyMachinesSold } from '../../../OrigaExtentionAPI/mutations'

const clientToken = secondClient
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
    console.log("==>>", formatedPrice)
    if (formatedPrice[0] === ",") {
        formatedPrice = formatedPrice.slice(1, formatedPrice.length)
    }
    return formatedPrice;

};
const MyMachine = () => {
    const [activeTab, setActiveTab] = useState("owned");
    const [Owned, setOwned] = useState([]);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 364);
    const [isSize, setSize] = useState({ width: 38, height: 38 });
    const [OrderList, setOrderList] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        let search = (window.location.search).replace("?type=", "");
        if (search == "") {
            search = "owned";
        }
        setActiveTab(search);
    }, [])
    useEffect(() => {
        if (activeTab === 'sold') {
            SoldMachineLists();
        }
    }, [activeTab]);
    const SoldMachineLists = async () => {
        try {
            const id = localStorage.getItem('id');
            secondClient.query({ query: customerMyMachinesSold, variables: { "ompUserId": id } }).then(({ data }) => {
                console.log('data=>', data?.customerMyMachinesSold?.response?.sell_machine);
                setOrderList(data?.customerMyMachinesSold?.response);
            }).catch((error) => {
                console.error('Mutation error:', error);
            });
        } catch (error) {
            console.error('Error  Buy Machine:', error);
        }
    }
    const onCallFunHandler = () => {
        navigate('/buy/add-machine')
    }
    const breadcrumbsItems = [
        { name: "Account", link: "/myaccount" }
    ];
    const boldtitle = "My Machines";
    useEffect(() => {
        myMachineLists();
        if (isSmallScreen) {
            setSize((prev) => ({ ...prev, width: 34, height: 34 }))
        }
    }, []);
    const myMachineLists = async () => {
        try {
            const id = localStorage.getItem('id');
            clientToken.mutate({ mutation: customerMyMachinesQuery, variables: { "ompUserId": id } }).then(({ data }) => {

                setOwned(data.customerMyMachinesOwned.response.mymachines);
            }).catch((error) => {
                console.error('Mutation error:', error);
            });
        } catch (error) {
            console.error('Error  Buy Machine:', error);
        }
    }
    const viewPage = (id, machineid) => {
        const payTokenUrl = `/buy/machine-page?id=${id}&buyMachineId=${machineid}`;
        window.location = payTokenUrl;
    }
    const onSellAnotherHandler=()=>{
        navigate('/sell/machine-detail')
    }
    return (
        <>
            <div className="container-fluid">
                <div className="max-container my-5">
                    <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} backnavi={() => navigate('/myaccount')} />
                    <div className="header-wrap-my-machine">
                        <div className="tab-wrap-my-machine">
                            <button onClick={() => setActiveTab("owned")} className={activeTab === "owned" ? "active btn" : "btn"} type="button">Owned</button>
                            <button onClick={() => setActiveTab("sale")} className={activeTab === "sale" ? "active btn" : "btn"} type="button">Up for Sale</button>
                            <button onClick={() => setActiveTab("sold")} className={activeTab === "sold" ? "active btn" : "btn"} type="button">Sold machines</button>
                        </div>
                        <div className="btn-wrap">
                            {(activeTab == "owned" || activeTab == "sold") && (
                                <button className="btn machine heading-600-16-14" onClick={onCallFunHandler}>Add Your Machine</button>
                            )}
                            {activeTab == "sale" && (
                                <button className="btn machine heading-600-16-14" onClick={onSellAnotherHandler}>Sell Another Machine</button>
                            )}
                            {/* <div className="short-wrap">
                                <button className="heading-600-16-14 short-btn">{filterIcon({ width: 22, height: 22, fill: "#73509E" })}Filters</button>
                            </div> */}
                        </div>
                    </div>
                    <div className="layout-wrap-machine">
                        {activeTab == "owned" && (
                            <>
                                {Owned && Owned.map((machine, index) => (
                                    <div key={index} className="max-container detail-wrap">
                                        <div className="img-wrap-1">
                                            <img className="img-1" src={machine?.product_image && machine?.product_image[0]?.imageUrl
                                                ? machine?.product_image[0]?.imageUrl
                                                : (machine?.product_image && machine?.product_image[0] ? machine?.product_image[0] : "/asset/placeholder.png")}
                                            />
                                            {/* <img className="img-1" src={machine&&machine.product_image?machine.product_image[0] : '/asset/placeholder.png'} alt="cnc machine"/> */}
                                        </div>
                                        <div className="price-wrap">
                                            <div className="top">
                                            {machine.product_status === "Owned" && <button className={ "bi-process-btn owned"}>{machine.product_status}</button>}
                                            {machine.product_status === "Processing" && <button className={ "bi-process-btn"}>{machine.product_status}</button>}
                                                {machine.product_status === "Cancelled"  && <button className={"bi-process-btn cna-btn"}>{machine.product_status}</button>}
                                                <div className="right bi-process-wrap">
                                                    {machine?.process_details && machine.process_details.length > 0 ? (
                                                        <><span className={`${machine.process_details[0]["status"]==="Started" ? "started":"completed"} completed`} >{tagIcon({width:isSize.width,height:isSize.height,className:`${machine.process_details[0]["status"]==="Started" ? "active":"completed"}` })}</span>
                                                   </>
                                                    ) : (
                                                        <span className="pending">{tagIcon({width:isSize.width,height:isSize.height,className:"pending"})}</span>
                                                    )}

                                                    {machine?.process_details && machine.process_details.length > 1 ? (<>
                                                        <span className={`${machine.process_details[1]["status"]==="Started" ? "started":"completed"} completed`} >{dollerIcon({width:isSize.width,height:isSize.height,className:`${machine.process_details[1]["status"]==="Started" ? "active":"completed"}`})}</span>
                                                        {machine.process_details[1]["status"]==="Started" && <div className="status-content1 heading-400-12-10">Advance Paid</div>}</>
                                                        ) : (
                                                        <span className="pending">{dollerIcon({width:isSize.width,height:isSize.height,className:"pending"})}</span>
                                                    )}
                                                    {machine?.process_details && machine.process_details.length > 2 ? (<>
                                                        <span className={`${machine.process_details[2]["status"]==="Started" ? "started":"completed"} completed`} >{dollerIcon({width:isSize.width,height:isSize.height,className:`${machine.process_details[2]["status"]==="Started" ? "active":"completed"}`})}</span>
                                                        {machine.process_details[2]["status"]==="Started" && <div className="status-content2 heading-400-12-10">Financing</div>}</>
                                                        ) : (
                                                        <span className="pending">{dollerIcon({width:isSize.width,height:isSize.height,className:"pending"})}</span>
                                                    )}
                                                    {machine?.process_details && machine.process_details.length > 3 ? (
                                                        <>
                                                        <span className={`${machine.process_details[3]["status"]==="Started" ? "started":"completed"} completed`} >{dollerIcon({width:isSize.width,height:isSize.height,className:`${machine.process_details[3]["status"]==="Started" ? "active":"completed"}`})}</span>
                                                        {machine.process_details[3]["status"]==="Started" && <div className="status-content3 heading-400-12-10">Full Payment</div>}</>
                                                        ) : (
                                                        <span className="pending">{dollerIcon({width:isSize.width,height:isSize.height,className:"pending"})}</span>
                                                    )}
                                                    {machine?.process_details && machine.process_details.length > 4 ? (<>
                                                        <span className={`${machine.process_details[4]["status"]==="Started" ? "started":"completed"} completed last-child-svg`} >{dollerIcon({width:isSize.width,height:isSize.height,className:`${machine.process_details[4]["status"]==="Started" ? "active":"completed"}`})}</span>
                                                        {machine.process_details[4]["status"]==="Started" && <div className="status-content4 heading-400-12-10">Delivered</div>}</>
                                                        ) : (
                                                        <span className="pending">{dollerIcon({width:isSize.width,height:isSize.height,className:"pending"})}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="bottom">
                                                <div className="left-wrap">
                                                    <div className="name heading-600-20 heading-600-20-16">{machine.product_name}{machine?.brand &&<span className="heading-400-20-14 op-60">&nbsp;| {machine.brand}</span>}</div>
                                                    <div className="price">₹{priceConvert(machine.product_price)}</div>
                                                </div>
                                                <div className="right-wrap">
                                                    <div className="block-info">
                                                        <div className="block-info__text heading-400-14-12">Blocked Till</div>
                                                        <div className="heading-400-14-12">{machine.blocked_till_date}</div>
                                                    </div>
                                                    <div className="advance-info">
                                                        {machine.product_status !== "Owned" && machine.product_status !== "Cancelled" && (
                                                            <p className=" heading-600-16-14 m-0 text-center" type="button">Apply for Lease/Loan</p>
                                                        )}
                                                        <button onClick={() => viewPage(machine.product_id, machine.buymachine_id)} className="button heading-600-16-14" type="button">View Details</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                        {activeTab === "sale" && (
                            <MachineSale />
                        )}
                        {activeTab === "sold" && (
                            <MachineSold OrderList={OrderList} />
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MyMachine;
