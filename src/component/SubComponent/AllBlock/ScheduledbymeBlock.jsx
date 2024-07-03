import React,{useState} from 'react'
import LocationIcon from '../AllSvgs/LocationIcon';
import HalfGoldenStar from '../AllSvgs/HalfGoldenStar';
import GoldenStart from '../AllSvgs/GoldenStart';
import ReasonCancellationPopup from '../../Account/Popup/ReasonCancellationPopup';
import { useNavigate } from 'react-router-dom';
const ScheduledbymeBlock = ({product,index}) => {
    //console.log('product----->',product?.buy_machine_id);
    const [isHovered, setIsHovered] = useState(false);
    const [cancleModel,setCancleModel]=useState(false)
    const navigate=useNavigate();
    const onMouseEnterhandler = () => {
        setIsHovered(true);
    };

    const onMouseLeavehandler = () => {
        setIsHovered(false);
    };

    let btnColor = "yellow-btn";
    if(product.status==="Upcomming"){
        btnColor="yellow-btn"
    }
    if(product.status==="Active"){
        btnColor="green-btn"
    }
    if(product.status==="Rejected By Seller"){
        btnColor="red-btn"
    }
    if(product.status==="Cancelled By Buyer"){
        btnColor="orange-btn"
    }
    if(product.status==="Cancelled by me"){
        btnColor="orange-btn"
    }
// console.log(`ScheduledbymeBlock===>>>${index}`,product);
const onCancleModel=()=>setCancleModel(!cancleModel)
      
        const onScheduleAgainHandler=()=>navigate(`/buy/cnc-machine?id=${product?.productId}&buyMachineId=${product?.buy_machine_id}`)

  return (
    <>
    {cancleModel && <ReasonCancellationPopup product={product} modalAction={onCancleModel}/>}
    <div className={`container-fluid p-3 m-0 mb-5 row  ishoverd p-0 ${isHovered ? "hovered border-8p" : ""}` }   onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
        
        <div className='col col-md-3 col-sm-4 col-12 d-flex justify-content-center align-items-center p-0'>
        <div style={{width:"260px",height:"166px"}}>
                <img className='max-h-100' src={product.imageurl} alt={product.imageurl}/>
        </div>
        </div>
        
        <div className='col col-md-9 col-sm-8 col-12 p-0 '>
      {product?.status && <div className='container-fluid p-0 m-0 row '> <div className='col col-4 p-0'><div className='pt-1-576'><button className={btnColor}>{product.status}</button></div></div></div>}
        <div className='container-fluid p-0 m-0 row'>
            <div className='col col-md-9 col-12 p-0'>
                    <div className='container-fluid p-0 pt-2 m-0 row '>
                            <div className='col col-md-auto col-8  d-flex p-0'>
                                <p className='heading-600-20-16'>{product.title1}</p>&nbsp;&nbsp;
                                <p className='heading-400-20-14'>{product.title2}</p>
                            </div>
                            <div className='col col-md-auto col-4 d-flex p-0'> <div className='d-flex'>
                            <div className='heading-400-16-14'>{product.rating}</div>
                            {[0,1,2,3].map(()=><div><GoldenStart/></div>)}
                            <div><HalfGoldenStar/></div>
                        </div></div>
                            
                    </div>
            </div>

            <div className='col col-md-3 col-12 text-end p-0'>
            <p className='heading-600-14 curser-pointer'>Location <LocationIcon width={32} height={32} fill={`${isHovered ? "#FFFFFF":"#000000"}`}/></p>

            </div>
        </div>

<div className='container-fluid p-0 m-0 pb-3 row'>
        <div className='col-lg-3 col-md-4 col-6 p-0'>
            <p className='heading-400-12-10 op-50 m-0'>{product.para1}</p>
            <p className='heading-600-12-14 m-0'>{product.data}</p>
        </div>
        <div className='col-md-3 col-6 p-0'>
        <p className='heading-400-12-10 op-50 m-0'>{product.para2}</p>
        <p className='heading-600-12-14 m-0'>{product.time}</p>
        </div>
        <div className='col-lg-5 col-md-4 col-12 p-0'>
        <p className='heading-400-12-10 op-50 m-0'>{product.para3}</p>
        <p className='heading-600-12-14 m-0'>{product.address}</p></div>
</div>

<div className='container-fluid p-0 m-0 pb-3 row'>
        <div className='col-lg-3 col-md-4 col-6 p-0'>
            <p className='heading-400-12-10 op-50 m-0'>{product.para4}</p>
            <p className='heading-600-12-14 m-0'>{product.name}</p>
        </div>
        <div className='col-md-3 col-6 p-0'>
        <p className='heading-400-12-10 op-50 m-0'>{product.para5}</p>
        <p className='heading-600-12-14 m-0'>{product.number}</p>
        </div>

</div>

{product.status==="Upcomming" && <div className='container-fluid p-0 m-0 row justify-content-end gap-2'> 
<div className='col col-md-auto p-0 text-end'>
<button className='button-outline' onClick={onCancleModel}>Cancel Visit</button>
</div>
<div className='col col-auto p-0 text-end'>
<button className='button' >Reschedule Visit</button>
</div>

</div>}

{product.status==="Cancelled by me" && <div className='container-fluid p-0 m-0 row justify-content-end'> 
    <div className='col col-lg-3 p-0 text-end'>
    <button className='button' onClick={onScheduleAgainHandler}>Schedule Again</button>
    </div>

</div> }
        </div>
    </div>
    </>
  )
}

export default ScheduledbymeBlock