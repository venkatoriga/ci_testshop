import React, { useState } from 'react'
import ImageWithHP from '../../SubComponent/ImageWithHP'
import './seventhsection.css'
import RightArrow from '../../SubComponent/RightArrow'
import Slider2 from '../../SubComponent/AllSlider/Slider2/Slider2'
import HeartProductCategory from '../../SubComponent/AllBlock/HeartProductCategory'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const  SeventhPage = ({topsectionData,sliderData,productCategory}) => {
  const [isSmallScreen,setIsSmallScreen]=useState(window.innerWidth<=992);
const navigate=useNavigate();
let heartProductCategory= <HeartProductCategory />
if(productCategory){
heartProductCategory=productCategory
}
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
  //console.log("==>>", formatedPrice)
  if (formatedPrice[0] === ",") {
      formatedPrice = formatedPrice.slice(1, formatedPrice.length)
  }
  return formatedPrice;



};

const onViewAllHandler=()=>{
  if(topsectionData.navi){
    navigate(`/buy/product-listing?searchInput=${''}`)
    //navigate(topsectionData.navi ,{state:{productData:bottomSectionData}})
  }
} 
const findYearDifference = (targetYear) => {
  const currentYear = new Date().getFullYear();
  const yearDifference = currentYear - targetYear;
  return yearDifference;
}

const CustomerId = localStorage.getItem('id');
let RecentlyViewed;
if (CustomerId === null){
  RecentlyViewed = JSON.parse(localStorage.getItem("SelectedProducts")) || [];
}else{
  RecentlyViewed = JSON.parse(localStorage.getItem("SelectedProductsWithUser")) || [];
  RecentlyViewed = RecentlyViewed.filter((product) => product.userId === CustomerId);
}
console.log("RecentlyViewed===>>>",RecentlyViewed);
let bottomSectionData = RecentlyViewed.length > 0
  ? RecentlyViewed.map((product, index) => ({
      productId: product?.productId,
      imageurl: product?.thumbnail,
      title: product?.productName,
      para: `${product?.attributes?.Brands} | ${product?.attributes?.["Machine Location"]}`, 
      time: product?.mfgYear === 1900 ? "N/A" : `${findYearDifference(product.mfgYear)} Year Old`,
      price: `₹${priceConvert(product?.grossPrice)}`,
    }))
  : [];

if(sliderData){
  bottomSectionData=sliderData
 }
 console.log("slider Data==>>>",sliderData);
    useEffect(() => {
      const handleResize = () => {
          setIsSmallScreen(window.innerWidth <= 992);
      };

      window.addEventListener("resize", handleResize);

      // Clean up the event listener when the component unmounts
      return () => {
          window.removeEventListener("resize", handleResize);
      };
  }, []);
  return (
    <div className='container-fluid'>
      <div className="max-container  pt-5">
      <div className='row pb-5'>
          <div className='col col-lg-8 col-12 p-0'>
          <ImageWithHP heading={topsectionData.heading} para={topsectionData.message}/>
          </div>
        {<div className={`col col-lg-4 d-flex align-self-center ${isSmallScreen ? "justify-content-center":"justify-content-end"}`}>
        <p className='heading-600-14-12 v-center'>{topsectionData.buttonName} </p>
        <div className='arrow-div ml-2'>
        <RightArrow callFun={onViewAllHandler}/>
        </div> 
          </div>}
         
            </div>
      </div>
    <div className='xmax-container'>

      <Slider2 listofdata={bottomSectionData} productCategory={  heartProductCategory} hide={"show-992"}/>
    </div>
      <div className='show-992 pb-5'></div>
    </div>
  );
}

export default SeventhPage