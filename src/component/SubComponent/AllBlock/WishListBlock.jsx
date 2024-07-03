import React,{useState} from 'react'
import Button from '../../Button/Button';
import ButtonOutline from '../../Button/ButtonOutline';
import Heart from '../AllSvgs/Heart';
import { Evolve1,RemoteAssistance1,RegularUpdates1 } from '../AllSvgs/Icons2816';
const  WishListBlock = (props) => {
     
    const [isHovered, setIsHovered] = useState(false);
   
    const { title, price, imageUrl} = props.product;
   
    // console.log("I am working",props);
    const onMouseEnterhandler = () => {
        setIsHovered(true);
    };

    const onMouseLeavehandler = () => {
        setIsHovered(false);
    };
    const onClickhandle = () => {
        // window.scrollTo(0, 0);
        
    }
    const onDeleteHandle=()=>{
       // window.scrollTo(0, 0);
    }
  return (
    <div className={`w-392 h-460 ishoverd p-0 ${isHovered ? "hovered border-8p" : ""}` }  onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
    <div className={`container pr-0 ${isHovered ? "" : "border-left border-right border-bottom border-8p"}`}>
    <div className='pt-3'>
    <Heart fill={isHovered ? "#73509E":""}/>
    </div>
    <div className='container-fluid p-0 m-0 row pb-2'>
        <div className='col col-7 p-0 d-flex align-items-end'>
            <div className='p-0 m-0'>
            <h1 className='heading-600-24-20 m-0'>{title}</h1>
            <p className='heading-600-32-24 text-start m-0 p-0'>{price}</p>
            <strike className="heading-300-14-10 op-60">MRP ₹35,000</strike>
            <p className='heading-600-16-12 c-active m-0'>10% OFF</p>
            <p className='heading-300-14-10 m-0'>Limited time offer 2 Days </p>
            </div> 
        </div>
        <div className="col col-5 p-0 imgdiv justify-content-end">
            <img src={imageUrl} alt={imageUrl} />
        </div>
    </div>
    <div className='row pt-2'>
    <div className='col col-12 pr-4'>
        <p className='break-line'></p>
    </div>
        <div className='col-lg-6 col-6 d-flex'>
          <Evolve1 fill={isHovered ? "#FFFFFF":"#211E24"}/><p className='pl-1 heading-400-14-12'>Evolve program</p> 
        </div>
       
       
        <div className='col-lg-6 col-6 d-flex '>
        
        <RegularUpdates1 fill={isHovered ? "#FFFFFF":"#211E24"}/><p className='pl-1 heading-400-14-12'>Updates</p> 
        </div>
        <div className='col-lg-6 col-6 d-flex'>
       <RemoteAssistance1 fill={isHovered ? "#FFFFFF":"#211E24"}/><p className='pl-1 heading-400-14-12'>Remote assistance</p> 
        </div>
   
       
     
    </div>
    <div className='col col-12 pl-0 pt-2 pb-5 gap-4 d-flex justify-content-between'>
    {isHovered && <>
    <ButtonOutline callFunction={ onDeleteHandle} message={"Delete"}/>
        <Button message={"View Plan"} callFunction={onClickhandle} />
    </> }</div>

    </div>
    </div>
  )
}

export default  WishListBlock