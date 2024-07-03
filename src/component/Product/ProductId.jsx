import React,{useEffect, useState} from 'react'
import ProductIdFirstSection from './productIdcomponent/ProductIdFirstSection'
import ProductIdSecondSection from './productIdcomponent/ProductIdSecondSection'
import ProductIdThirdSection from './productIdcomponent/ProductIdThirdSection'
import ProductIdFourthSection from './productIdcomponent/ProductIdFourthSection'
import ProductIdSixSection from './productIdcomponent/ProductIdSixSection'
import ProductIdFifthSection from './productIdcomponent/ProductIdFifthSection'
import Footer from '../Footer/Footer'
import ProductIdSeventhSection from './productIdcomponent/ProductIdSeventhSection'
import ProductIdEightSection from './productIdcomponent/ProductIdEightSection'
import { useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import client from '../Services/ServicesPopup/apolloclient'
import { gql } from 'graphql-tag';
import LoginModel from '../Authentication/LoginModel/LoginModel'

const CREATE_PAYMENT= gql`
mutation CreateAmc($amcPlanData: AMCPlanInput!) {
  createAmc(amcPlanData: $amcPlanData) {
    message
    success
    paymenturl
    referenceid
  }
}
`;
const ProductId = () => {
const {id}=useParams();
const [pincode, setPincode] = useState('');
const [messageShow, setMessageShow] = useState(false);
const [responseData, setResponseData] = useState(null);
const [loginPortal, setLoginPortal] = useState(false);
console.log("params id===>>>",id);
const loggedIn= !!localStorage.getItem('userToken') ;
const location=useLocation();
const productData= location.state && location.state.product
console.log("product data=>>",productData);

const handlePincodeChange = (e) => {
  const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=6) {
    setPincode(sanitizedInput);
  }

 
};

const onBuyHandler=async()=>{
  if(!loggedIn)
  {
    setLoginPortal(true);
    return;
  }
      try {
        const { data } = await client.mutate({
          mutation:CREATE_PAYMENT ,
          variables:{
            "amcPlanData": {
              "appAmcPlanId": 4,
              "customerId": "VXNlcjoxMTA=",
              "stage": "PAYMENT",
              "serviceType":"AMC"
            }
          }
          
        });
     console.log("API Response paymentgetway==>>>",data);
  setResponseData(data);
  window.location.href = data.createAmc.paymenturl;
    
      } catch (error) {
        console.error('API Error==>', error.message);
    
      }
    }

useEffect(()=>{
const fetchServiceArea = () => {
  console.log("fetch area=>>",pincode);
  // Define your GraphQL query
  const graphqlQuery = {
      query: `
          query ServiceArea($pincode: Int!) {
              nearestServicearea(userPincode: $pincode) {
                  message
                  code
              }
          }
      `,
      variables: {
          pincode: parseInt(pincode, 10)
      }
  };
  axios.post('https://devextension.origa.market/graphql/', graphqlQuery)
      .then(response => {
          const data = response.data.data.nearestServicearea;
          console.log("nearestServicearea Productmain==>>",data.code);
          if (data && data.code) {
            if(data.code===1003) {
              setMessageShow(true);
            } else{
              setMessageShow(false)
            }
          }
      
          
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
};
if(pincode.length===6){
  fetchServiceArea()
}

},[pincode])

const onHidePortal = () => {
  setLoginPortal(false);
}

  return (
    <>
    {loginPortal && <LoginModel onHide={onHidePortal} />}
    <ProductIdFirstSection pincodeHandle={handlePincodeChange} pincode={pincode}/>
    <ProductIdSecondSection product={productData}/>
    <ProductIdThirdSection  product={productData} messageShow={messageShow} pin={pincode} />
    <ProductIdFourthSection/>
    <ProductIdFifthSection/>
    <ProductIdSixSection/>
    <ProductIdSeventhSection/>
    <ProductIdEightSection product={productData}/>
            
    <Footer/>
    <div className='bottom-price-stripe hide-992'>
                
               <div className='container-fluid bg-white border-top-blur-2 p-a  '>
                    <div className='max-container'>
<div className="row d-flex align-items-center py-3">
    <div className="col col-md-4 ">
            <p className='heading-600-24-16 m-0'>STAR AMC PLAN</p>
            {messageShow && <p className='heading-500-14 text-danger pt-1'>{ pincode.length<6 ? "Insufficient length":"This plan is not available at the Pincode"} - {pincode}</p>}  
    </div>
    <div className="col col-md-4 ">
        <p className='heading-600-24-16 m-0'>₹{productData.price}</p>
    </div>
    <div className="col col-md-4 d-flex justify-content-end ">
    <button className='button-outline' onClick={onBuyHandler}>Buy Now</button>
    {/* <button className='button' >Add to Cart</button> gap-3*/}
    </div>
</div>
                    </div>
               </div>
            </div>
    </>
  )
}

export default ProductId