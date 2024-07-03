import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Wrong from '../AllSvgs/Wrong';
import Correct from '../AllSvgs/Correct';
import Button from '../../Button/Button';
const PlanBlock = (props) => {
     
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const { title, price, imageUrl,id} = props.product;
    // console.log("I am working",props);
    const onMouseEnterhandler = () => {
        setIsHovered(true);
    };

    const onMouseLeavehandler = () => {
        setIsHovered(false);
    };
    const onClickhandle = () => {
        window.scrollTo(0, 0);
        // navigate('/product');
        // navigate(`/product/${planId}`);
        console.log(id,"Show Product")
        // navigate(`/product/${ id }`);
    }
  return (
    <div className={`w-392 h-460 ishoverd p-0 ${isHovered ? "hovered" : ""}` }  onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
    <div className={`container pr-0 ${isHovered ? "" : "border-left border-right border-bottom border-8p"}`}>
    
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
          <Correct fill={isHovered ? "#FFFFFF":null}/> <p className='pl-1 heading-400-14-12'>Evolve program</p> 
        </div>
        <div className='col-lg-6 col-6 d-flex'>
        <Correct fill={isHovered ? "#FFFFFF":null}/><p className='pl-1 heading-400-14-12'>Safety Checks</p>
 
        </div>
        <div className='col-lg-6 col-6 d-flex'>
        <Correct fill={isHovered ? "#FFFFFF":null}/><p className='pl-1 heading-400-14-12'>Remote Assist</p> 
        </div>
        <div className='col-lg-6 col-6 d-flex'>
        <Correct fill={isHovered ? "#FFFFFF":null}/> <p className='pl-1 heading-400-14-12'>Quality Checks</p> 
        </div>
        <div className='col-lg-6 col-6 d-flex op-60'>
       <Wrong fill={isHovered ? "#FFFFFF":null} inner={isHovered ? "#000000":"#FFFFFF"}/> <p className='pl-1 heading-400-14-12'>Preventive <br/> Maintenance</p> 
        </div>
       
        <div className='col-lg-6 col-6 d-flex op-60'>
        <Wrong fill={isHovered ? "#FFFFFF":null} inner={isHovered ? "#000000":"#FFFFFF"}/><p className='pl-1 heading-400-14-12'>Updates</p> 
        </div>
     
    </div>
    <div className='col col-12  pb-5 d-flex justify-content-end'>{isHovered && <Button message={"View Plan"} callFunction={onClickhandle} />}</div>

    </div>
    </div>
  )
}

export default PlanBlock