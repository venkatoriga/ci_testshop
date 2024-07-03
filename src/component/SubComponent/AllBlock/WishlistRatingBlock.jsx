
import React from 'react'
import GoldenStart from '../AllSvgs/GoldenStart'
import HalfGoldenStar from '../AllSvgs/HalfGoldenStar'
import Heart from '../AllSvgs/Heart'
import { useState } from 'react'
const priceConvert = (price) => {
    return price.replace(/(\d)(?=(\d\d)+\d(\d{3})*$)/g, '$1,');
  };
  
const WishlistRatingBlock = (props) => {

    console.log("WishlistRatingBlock===>>>",props.product);
const [isHovered,setIsHovered]=useState(false);
const onHovered=()=>{
    setIsHovered(!isHovered)
}

let ratingData={
    productid:"asdf",
    imageurl:"asset/castrol.svg",
    title:"Castrol Gear Oil 20 L EP",
    para:"Castrol",
    rating:4.2,
    price:"5,499",
    cutPrice:"6,499",
    discount:"66% Off"

}
if(props.product.status){
    ratingData={
        productid:props.product.productid,
        imageurl:props.product.imageurl,
        title:props.product.title,
        para:"",
        rating:"",
        price:priceConvert(props.product.price),
        cutPrice:false,
        discount:""
    
    }
}
  return (
    <div className={`row p-4   h-500 m-1 ${isHovered ? "bg-green border-8p shadow":''}`} onMouseEnter={onHovered} onMouseLeave={onHovered}>
        <div className="col  col-12 d-flex justify-content-end">
            <Heart fill={isHovered ? "#73509E":''}/>
        </div>
        <div className="col col-12 d-j-a">
            <div className='hw-216'>
            <img  src={ratingData.imageurl} alt="castrol.svg"/>
            </div>
        </div>
        <div className="col col-12 p-0 text-start">
            <h1 className={`heading-600-20-16 ${isHovered ? "bottom-halfline1":"bottom-halfline"}`}>{ratingData.title}</h1>
        </div>
        <div className="col col-6  p-0 text-start">
            <p className='heading-400-14-12 op-50 m-0'>{ratingData.para}</p>
           {ratingData.rating && <div className='d-flex'>
                <div className='heading-400-16-14'>{ratingData.rating}</div>
                {[0,1,2,3].map(()=><div><GoldenStart/></div>)}
                <div><HalfGoldenStar/></div>
            </div>}
        </div>
        <div className="col col-6 p-0">
        <div className='p-r text-end'>
            <p className='heading-600-20-16 m-0'>{ratingData.price}</p>
            {ratingData.cutPrice && <p className='heading-400-14-12 op-80'>MRP<strike className='pl-1'> ₹{ratingData.cutPrice}</strike> <span className='c-active heading-600-14-12'>{ratingData.discount}</span></p> }
        </div>
        </div>
        <div className='col col-12 p-0 d-flex justify-content-end'>
           {isHovered && <button className='button'>Avail Service</button>} 
        </div>
    </div>
  )
}

export default WishlistRatingBlock