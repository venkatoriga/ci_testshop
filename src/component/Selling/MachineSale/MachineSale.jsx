import React,{useState,useEffect} from "react";
import "./MachineSale.css";
import {rightArrowIcon,soldAllIcon} from "../../../helpers/Icons";
import UserModal from "../Modals/UserModal";
import ScheduleModal from "../Modals/ScheduleModal";
import MachineLocationModal from "../Modals/MachineLocationModal";
import gql from 'graphql-tag';
import {ApolloClient,InMemoryCache} from '@apollo/client';
import { useNavigate } from "react-router-dom";
// import RightArrow from "../../SubComponent/RightArrow";
const clientToken = new ApolloClient({uri: 'https://devextension.origa.market/graphql/',cache: new InMemoryCache()});
const customerMyMachinesQuery = gql`
    query customerMymachineUpforsale($ompUserId:String!){
        customerMymachineUpforsale(ompUserId: $ompUserId){
            message
            code
            response
        }
    }
`;
const MachineSale = () => {
    const [showScheduleModal,setShowScheduleModal] = useState(false);
    const [showUserModal,setShowUserModel] = useState(false);
    const [sellMachine,setSellMachine] = useState([]);
    const [showLocationModal,setShowLocationModal] = useState(false);
    const navigate=useNavigate();
    const [isIconHoverd,setIconHoverd]=useState(false)
    const scheduleModalAction = (status) => {
        setShowScheduleModal(status);
    }
    const userModalAction = (status) => {
        setShowUserModel(status);
        setShowScheduleModal(false);
    }
    const locationModalAction = (status) => {
        setShowLocationModal(status);
        setShowScheduleModal(false);
        setShowUserModel(false);
    }
    const onActiveStatus=(value)=>{
        const activeStatus=value?.[value?.length-1]?.["task_name"]
        // console.log("activeStatus===>>>",activeStatus);
        if(activeStatus==="Registration")return 1;
        if(activeStatus==="Inspection")return 2;
        if(activeStatus==="Documentation")return 3;
        if(activeStatus==="Enlisting")return 4;
        return 0

    }
    useEffect(() => {
        sellMachineLists();
    },[]);
    const sellMachineLists = async() => {
        try{
            const id = localStorage.getItem('id');
            clientToken.mutate({mutation: customerMyMachinesQuery,variables: {"ompUserId":id}}).then(({data}) => {
                setSellMachine(data?.customerMymachineUpforsale?.response?.sell_machine)
                console.log("btn data selll==>>",data?.customerMymachineUpforsale?.response?.sell_machine);
            }).catch((error) => {
                console.error('Mutation error:', error);
            });
        }catch(error){
            console.error('Error Buy Machine:', error);
        }
    }
    const onNavigateFun=(pid)=>{
        console.log("sale pass id==>>",`/sell/view-machine-sale?id=${pid}`);
    navigate(`/sell/view-machine-sale?id=${pid}`)    
    }
    return (          
        <>  
            {showScheduleModal ? (
                <ScheduleModal modalAction={scheduleModalAction} setShowUserModel={setShowUserModel}/>
            ) : null}
            {showUserModal ? (
                <UserModal modalAction={userModalAction}  setShowLocationModal={setShowLocationModal}/>
            ) : null}
            {showLocationModal ? (
                <MachineLocationModal modalAction={locationModalAction} setShowLocationModal={setShowLocationModal}/>
            ) : null}
            {sellMachine?.map((machine,index) => (
                <div key={index} className="max-container sale-wrap" onMouseEnter={()=>setIconHoverd(index)} onMouseLeave={()=>setIconHoverd(false)}>
                    <div className="img-wrap-1">
                    <img className="img-1" src={machine?.product_image && machine?.product_image[0]?.imageUrl
                                                ? machine?.product_image[0]?.imageUrl
                                                : (machine?.product_image && machine?.product_image[0] ? machine?.product_image[0] : "/asset/placeholder.png")}
                                            />
                        {/* <img className="img-1" src={machine?.product_image&&machine?.product_image[0] ? machine?.product_image[0] : "/asset/placeholder.png"} alt="cnc machine"/> */}
                    </div>
                    {machine?.schedule ? (
                        <div className="price-wrap" >
                            <div className="top">
                                <div className="left-wrap">
                                    <button className={machine?.product_status === "Owned" ? "process-btn owned" : "process-btn"}>{machine?.product_status}</button>
                                    <div className="name heading-600-20 heading-600-20-16">{machine?.product_name?.productName} <span className="heading-400-20 heading-400-20-14">{machine?.product_name?.productName}</span></div>
                                    <div className="paperwork">{machine?.product_status}</div>
                                </div>
                                <div className="right">
                                <span>{soldAllIcon({width:388,height:38,coloractive:"stepper-active",colorPending:"stepper-pending",colorFullFill:isIconHoverd===index ? "stepper-full-fill-hover":"stepper-full-fill", coloractiveL:"stepper-active-l",colorPendingL:"stepper-pending-l",colorFullFillL:isIconHoverd===index ? "stepper-full-fill-hover-l":"stepper-full-fill-l", activeStatus:onActiveStatus(machine?.process_details)})}</span><span className="progress-name">Registration</span>
                                <div className="active-content"><span></span></div>
                                </div>
                                
                            </div>
                            <div className="bottom b-1">
                                <div className="heading-400-14-12 machine-sehdule" onClick={() => setShowScheduleModal(true)}>{machine?.schedule}<span className="arrow-svg">{rightArrowIcon({width:24,height:24})}</span></div>
                                <div className="advance-info">
                                    <button className="view-btn" type="button" onClick={()=>onNavigateFun(machine?.pdid)}>View Details</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="price-wrap" >
                            <div className="top">
                                <div className="left-wrap">
                                   {machine?.product_status === "Listed" && <button className="listed-btn owned">{machine?.product_status}</button>}
                                    {machine?.product_status === "Processing" && <button className="process-btn">{machine?.product_status}</button>}
                                    {machine?.product_status==="Cancel" && <button className="process-btn cna-btn">{machine?.product_status}</button>}
                                    <div className="name heading-600-20 heading-600-20-16">{machine?.product_name?.productName} <span className="heading-400-20 heading-400-20-14"> {machine?.brand ? '|' + machine.brand : ''}</span></div>
                                    <div className="paperwork">{machine?.product_status=="Processing" ?"Processing Paperwork":machine?.product_status}</div>
                                </div>
                                <div className="right">
                                <span>{soldAllIcon({width:388,height:38,coloractive:"stepper-active",colorPending:"stepper-pending",colorFullFill:isIconHoverd===index ? "stepper-full-fill-hover":"stepper-full-fill",  coloractiveL:"stepper-active-l",colorPendingL:"stepper-pending-l",colorFullFillL:isIconHoverd===index ? "stepper-full-fill-hover-l":"stepper-full-fill-l", activeStatus:onActiveStatus(machine?.process_details)})}</span>
                                {machine?.process_details?.length===1 && machine?.process_details[0]["status"]==="Started" && <div className="active-content1"><span className="heading-400-12-10">Registration</span></div>}
                                {machine?.process_details?.length===2 && machine?.process_details[1]["status"]==="Started" && <div className="active-content2"><span className="heading-400-12-10">Inspection</span></div>}
                                {machine?.process_details?.length===3 && machine?.process_details[2]["status"]==="Started" && <div className="active-content3"><span className="heading-400-12-10">Documentation</span></div>}
                                {machine?.process_details?.length===4 && machine?.process_details[3]["status"]==="Started" && <div className="active-content4"><span className="heading-400-12-10">Enlisting</span></div>}
                                {machine?.process_details?.length===5 && machine?.process_details[4]["status"]==="Started" && <div className="active-content5"><span className="heading-400-12-10">Sale</span></div>}
                                {machine?.process_details?.length===6 && machine?.process_details[5]["status"]==="Started" && <div className="active-content6"><span className="heading-400-12-10">Payment Received</span></div>}
                                </div>
                            </div>
                            <div className="bottom">
                                <div className="bottom-left-wrap">
                                    <div className="info heading-400-12-10"><span className="op-50">Buyer Name</span><span className="heading-600-14-12">{machine?.buyer_details.first_name } {machine?.buyer_details.last_name}</span></div>
                                    <div className="info heading-400-12-10"><span className="op-50">Amount Received</span><span className="heading-600-14-12">{machine?.recivedText}</span></div>
                                    <div className="info heading-400-12-10"><span className="op-50">Payment Status</span><span className="heading-600-14-12">{machine?.product_status}</span></div>
                                    <div className="info heading-400-12-10"><span className="op-50">Transaction ID{machine?.transactionText}</span><span className="heading-600-14-12">{machine?.transID}</span></div>
                                    <div className="info heading-400-12-10"><span className="op-50">Transaction Date</span><span className="heading-600-14-12">{machine?.date}</span></div>
                                </div>
                                <div className="advance-info">
                                    <span>Schedule Now{rightArrowIcon({ width: 24, height: 24 })}</span>
                                    <button className="view-btn" type="button" onClick={() => onNavigateFun(machine?.pdid)}>View Details</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};
export default MachineSale;