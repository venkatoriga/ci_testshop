import React from 'react'
import Slider1 from '../SubComponent/AllSlider/Slider1/Slider1'

const AddToCartSection2 = () => {

const listOfData=[
    {
        id:'121',
        name:'PRO Plan',
        price:'₹25,000',
        plan:'abc',
        plan_image:'asset/machine-half.png'
    },
    {
        id:'122',
        name:'PRO Plan',
        price:'₹25,000',
        plan:'abc',
        plan_image:'asset/machine-half.png'
    },{
    id:'123',
    name:'PRO Plan',
    price:'₹25,000',
    plan:'abc',
    plan_image:'asset/machine-half.png'
},
{
    id:'124',
    name:'PRO Plan',
    price:'₹25,000',
    plan:'abc',
    plan_image:'asset/machine-half.png'
},{
    id:'125',
    name:'PRO Plan',
    price:'₹25,000',
    plan:'abc',
    plan_image:'asset/machine-half.png'
}]
  return (
    <Slider1 
       heading={"Our AMC plans"}
       imageUrl={"asset/OrigaService.png"}
       listOfData={listOfData} 
       para={"Enjoy the flexibility of selecting from our diverse range of plans"} />
  )
}

export default AddToCartSection2