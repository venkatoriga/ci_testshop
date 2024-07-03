/* 
when 
1=>heart image,  after that
2=>image, after that
3=>title+line,  after that
4=>message1,    after that
5=>message2 (left side)+ message3(right side) 

*/
import React, { useState } from 'react'
import Heart from '../AllSvgs/Heart'
import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
import useWishListRemover from "../../SubComponent/useWishListRemover";
const priceConvert = (price) => {
  return price?.replace(/(\d)(?=(\d\d)+\d(\d{3})*$)/g, '$1,');
};

const HeartProductCategory = ({ wishlist,product, index }) => {
  console.log('wishlist======>',product );
  const [isHovered, setIsHovered] = useState(false);
  const [heartColor, setHeartColor] = useState(false);
  const navigate = useNavigate();
  const formattedPrice = priceConvert(product?.price);
  const { removewishlist, heartColor1 } = useWishListRemover();
  const onMouseEnterhandler = () => {
    setIsHovered(true);
  };

  const onMouseLeavehandler = () => {
    setIsHovered(false);
  };

  const onSubmitHandler = () => {
    if (product?.productId || product?.productid) {
      const productId = product.productId || product.productid;
      navigate(`/buy/cnc-machine?id=${productId}`);
    }
  }
  
  const onHeartColor = () => {
    setHeartColor(!heartColor);
  }
  const onHeartColor_1 = (props) => {
    //console.log('props------->',props);
    setHeartColor(!heartColor);
    removewishlist(props?.productid, props?.imageurl, props?.price, props?.title, props?.location, props?.para)
    window.location.reload()
  }
  return (

    <div className={`contaienr-fluid p-0 m-0 row h-485 p-2 ${isHovered ? 'bg-green shadow2' : ''}`} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler} key={index}>
      <div className=" p-2">
        <div className=' d-flex justify-content-end' >
          {/* <div onClick={onHeartColor} className='curser-pointer'><Heart fill={heartColor ? "#73509E" : ""} /></div> */}
          {wishlist === true ? (
            <div onClick={() => onHeartColor_1(product)} className='curser-pointer'><Heart fill={heartColor ? "" : "#73509E"} /></div>
          ):(
          <div onClick={onHeartColor} className='curser-pointer'><Heart fill={heartColor ? "#73509E" : ""} /></div>
          )}
        </div>
        <div className='heart-block-image-size'>
          <img src={product.imageurl} className="w-100 h-100" alt={product.imageurl} />
        </div>
        <div className="mt-4">
          <p className={`heading-600-20-16 ${isHovered ? "bottom-halfline1" : "bottom-halfline"}`}>{product.title}</p>
          <p className="heading-400-14-12 op-50 my-2">{product.para}</p>
          <div className="pricesection d-flex justify-content-between">
            <p className='heading-400-16-14'>{product.time}</p>
            <p className="fs-20 fw-bold">{formattedPrice}</p>
          </div>

          {isHovered && <Button message={"Buy Machine"} callFunction={onSubmitHandler} />}
        </div>
      </div>


    </div>

  )
}

export default HeartProductCategory