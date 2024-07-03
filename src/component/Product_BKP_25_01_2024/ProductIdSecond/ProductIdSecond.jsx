import React,{useState,useEffect} from 'react'
import ProductIdThirdSection from '../productIdcomponent/ProductIdThirdSection'
import ProductIdSixSection from '../productIdcomponent/ProductIdSixSection'
import ProductIdSecondSection from '../productIdcomponent/ProductIdSecondSection'
import ProductIdSeventhSection from '../productIdcomponent/ProductIdSeventhSection'
import ProductIdFourthSection from '../productIdcomponent/ProductIdFourthSection'
import ProductIdFirstSection from '../productIdcomponent/ProductIdFirstSection'
import ProductIdEightSection from '../productIdcomponent/ProductIdEightSection'
import ProductIdFifthSection from '../productIdcomponent/ProductIdFifthSection'
import Footer from '../../Footer/Footer'
import { useParams,useLocation } from 'react-router-dom'
import axios from 'axios'
const ProductIdSecond = () => {
  const {id}=useParams();
  const [pincode, setPincode] = useState('');
  const [messageShow, setMessageShow] = useState(false);
  console.log("params id===>>>",id);
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
  return (
    <>
    <ProductIdFirstSection pincodeHandle={handlePincodeChange} pincode={pincode}/>
    <ProductIdSecondSection product={productData}/>
    <ProductIdThirdSection product={productData} messageShow={messageShow} pin={pincode}/>
    <ProductIdFourthSection/>
    <ProductIdFifthSection/>
    <ProductIdSixSection/>
    <ProductIdSeventhSection/>
  <ProductIdEightSection product={productData}/>
     {/* bottom message  */}
            <div className='p-r hide-992'>
                
               <div className='container-fluid bg-white border-top-blur-2 p-a  bootom-0' style={{marginTop:"15.8rem"}}>
                    <div className='max-container'>
<div className="row">
    <div className="col col-md-4">
            <p className='heading-600-24-16 m-0 pt-5'>STAR AMC PLAN</p>
           {messageShow && <p className='heading-500-14 text-danger pt-1'>This plan is not available at the Pincode - {pincode}</p>}  
    </div>
    <div className="col col-md-4 d-flex align-items-center">
        <p className='heading-600-24-16 m-0'>₹{productData.price}</p>
    </div>
    <div className="col col-md-4 d-flex justify-content-end align-items-center ">
    <button className='button-outline'>Buy Now</button>
    {/* <button className='button'>Add to Cart</button> gap-3*/}
    </div>
</div>
                    </div>
               </div>
            </div>
    <Footer/>
    </>
  )
}

export default ProductIdSecond