import React, { useState } from 'react'
import './ProductBlock.css'
import { Container } from 'react-bootstrap'
import Button from '../../Button/Button';
import Correct from '../../SubComponent/AllSvgs/Correct';
import Wrong from '../../SubComponent/AllSvgs/Wrong';
import { useNavigate } from 'react-router-dom';
const ProductBlock = (props) => {
    const navigate = useNavigate();
   
    const [isHovered, setIsHovered] = useState(false);
    
    const { title, price, imageUrl,id,onProductBlockNavigate,product} = props;

    const onMouseEnterhandler = () => {
        setIsHovered(true);
    };

    const onMouseLeavehandler = () => {
        setIsHovered(false);
    };
    const onClickhandle = () => {
        window.scrollTo(0, 0);
        // navigate('/product');
        navigate(`/contactus`);
        //console.log(id,"Show Product")
        //onProductBlockNavigate(product)
    }

    return (
        <Container className={`productblockmaindiv h-470 w-392  ${isHovered ? "hovered" : ""}`} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
            <div className='d-flex pb-2'>
                <div className='amount-lyt'>
                    <h1 className='heading-600-24-20 text-wrap'>{title}</h1>
                    {/* <p className='price'>{price}</p> */}
                    {/* <strike className="heading-300-14-10 op-60"><p>MRP ₹35,000</p></strike>
                    <p className='discount_no c-active'>10% OFF</p>
                    <p className='limited_time'>Limited time offer 2 Days </p>  */}
                </div>
                <div className="imgdiv">
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
               <Wrong fill={isHovered ? "#FFFFFF":null} inner={isHovered ? "#000000":null}/> <p className='pl-1 heading-400-14-12'>Preventive <br/> Maintenance</p> 
                </div>
               
                <div className='col-lg-6 col-6 d-flex op-60'>
                <Wrong fill={isHovered ? "#FFFFFF":null} inner={isHovered ? "#000000":null}/><p className='pl-1 heading-400-14-12'>Updates</p> 
                </div>
             
            </div>
            <div className='col col-12 d-flex justify-content-end'>{isHovered && <Button message={"Contact Us"} callFunction={onClickhandle} />}</div>
        </Container>
    )
}

export default ProductBlock