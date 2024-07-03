import React,{useState,useEffect} from 'react'
import { leftArrowIcon,rightArrowIcon } from '../../helpers/Icons';
import Breadcrumbs from '../SubComponent/Breadcrumbs';
import ScheduledbymeBlock from '../SubComponent/AllBlock/ScheduledbymeBlock';
import VisitingMyMachine from '../SubComponent/AllBlock/VisitingMyMachine';
import AccountFooter from './AccountFooter';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../SubComponent/Loader';
import useSchedule from "../SubComponent/useSchedule";
// import useSchedule from "../component/SubComponent/useSchedule";

const ScheduledVisits = () => {
    const [activeTab,setActiveTab] = useState("Scheduled by me");
    const [pagiCount, setPagiCount] = useState(1);
    const {fetchDataScheduledByMe_1,fetchDataVisitByMe_1} = useSchedule();
    useEffect(() => {
         fetchDataScheduledByMe_1();
         fetchDataVisitByMe_1();
     },[]);
    const [pagiLength,setPagiLength]=useState(0);
const [visitingMyMachine,setVisitingMyMachine]=useState();
const [scheduleDataMyMachine,setScheduleDataMyMachine]=useState();
const [isNoDataFound,setNoDataFound]=useState(false);
const [isNoDataFoundScheduled,setNoDataFoundScheduled]=useState(false);
const sData=useSelector(state=>state.schedule.isScheduledData);
const vData=useSelector(state=>state.schedule.isVisitData);
const navigate=useNavigate();


const ITEMS_PER_PAGE = 4;
const BUTTONS_VISIBLE = 7;

console.log("active page==>>",pagiCount);

const totalPages = Math.ceil(600 / ITEMS_PER_PAGE);

  const onPrevHandler = () => {
    if (pagiCount > 1) {
      setPagiCount(pagiCount - 1);
    }
  };

  const onNextHandler = () => {
    
    if (pagiCount < totalPages && pagiCount*4<pagiLength) {
        console.log("pagiCount next button===>>>",pagiCount);
      setPagiCount(pagiCount + 1);
    }
  };
  const renderPageButtons = () => {
    const buttons = [];
    const middleButton = Math.ceil(BUTTONS_VISIBLE / 2);
    const startButton = Math.max(1, pagiCount - middleButton + 1);
    const endButton = Math.min(startButton + BUTTONS_VISIBLE - 1, totalPages);
    
    for (let i = startButton; i <= endButton; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-btn ${pagiCount === i ? 'active' : ''}`}
          onClick={() => setPagiCount(i)}
          disabled={i*4<pagiLength ? false:true}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };



    const breadcrumbsItems = [ { name: "Home page", link: "/" }, { name: "My Account", link: "/myaccount" }];
    const boldtitle="Scheduled Visits";

const fetchDataScheduledByMe=()=>{setScheduleDataMyMachine(sData);setPagiLength(sData.length);}
const fetchDataVisitByMe=()=>{setVisitingMyMachine(vData);setPagiLength(vData.length);}

useEffect(()=>{
       
         if(activeTab==="Scheduled by me"){
            fetchDataScheduledByMe();
         }
         if(activeTab==="Visiting my Machine"){
            fetchDataVisitByMe()
         }   setPagiCount(1);
     setTimeout(()=>{
      if(vData.length===0){
       setNoDataFound(true)
      }if(sData.length===0){setNoDataFoundScheduled(true)}
     },5000)
    },[activeTab,sData,vData])

    if( activeTab==="Scheduled by me" && ((sData.length==0 && !isNoDataFoundScheduled)|| !scheduleDataMyMachine )){
        return <Loader/>
    }
    if( activeTab==="Visiting my Machine" && ((vData.length==0 && !isNoDataFound) || !visitingMyMachine)){
        return <Loader/>
    }

    return (<>

        <div className='container-fluid m-0'>
        <div className='max-container pt-4'>
        <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} backnavi={()=>navigate('/myaccount')}/>
        <div className='pt-5'>
        <h1 className='heading-600-24'>Scheduled Visits</h1>
        </div>
       
        <div className="d-flex pt-3">
            <div onClick={() => setActiveTab("Scheduled by me")} className={activeTab === "Scheduled by me" ? "active-tab mr-4 curser-pointer" : "heading-400-16-14 op-60 mr-4 curser-pointer"}>Scheduled by me</div>
            <div onClick={() => setActiveTab("Visiting my Machine")} className={activeTab === "Visiting my Machine" ? "active-tab curser-pointer" : "heading-400-16-14 op-60 mr-4 curser-pointer"} >Visiting my Machine</div>
        </div>
       
        <div className='pt-3'>
            {activeTab==="Scheduled by me" && scheduleDataMyMachine.slice((pagiCount-1)*4,pagiCount*4).map((product,index)=>(
                <ScheduledbymeBlock product={product} index={index}/>
            ))}
            {activeTab==="Visiting my Machine" && visitingMyMachine.slice((pagiCount-1)*4,pagiCount*4).map((product,index)=>(
                <VisitingMyMachine product={product} index={index}/>
            ))}
            
        </div>
        {/*pagination start*/}
       { activeTab==="Scheduled by me" && sData.length==0 &&  <p>No Data...</p>}
      {activeTab==="Visiting my Machine" && vData.length==0 && <p>No Data...</p>}
    
    {pagiLength>4 && <div className="bi-pagination-wrap">
                                                <div className="inner">
                                                  <button className="outer-btn" onClick={onPrevHandler}>
                                                  {leftArrowIcon({ width: 24, height: 24 })}
                                                  </button>
                                                  <div className="inner-btns">{renderPageButtons()}</div>
                                                  <button className="outer-btn" onClick={onNextHandler} >
                                                  {rightArrowIcon({ width: 24, height: 24 })}
                                                  </button>
                                                </div>
                                        
                                              </div>}
    {/*pagination end*/}
    
        </div>
        </div>
        
    <div className='max-container pt-5'>
    <div className='container-fluid p-0 m-0 row'>
    {/* <div className='p-r d-flex justify-content-end'>
    <img src='asset/Frame1000004018.png' alt='Frame1000004018.png'/>
    </div> */}
    </div>
    </div>
        <AccountFooter/>
        </>
        )

}

export default ScheduledVisits