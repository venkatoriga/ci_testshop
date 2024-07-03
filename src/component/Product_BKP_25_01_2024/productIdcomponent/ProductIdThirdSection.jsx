import React,{useState} from 'react'
import BlackStar from '../../SubComponent/AllSvgs/BlackStar'
import Wrong from '../../SubComponent/AllSvgs/Wrong'
import {Evolve,RemoteAssistance,RegularUpdates,QualityAssurances} from '../../SubComponent/AllSvgs/Icons2416'
import { useNavigate } from 'react-router-dom'
import client from '../../Services/ServicesPopup/apolloclient'
import { gql } from 'graphql-tag';
import LoginModel from '../../Authentication/LoginModel/LoginModel'
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
const ProductIdThirdSection = ({product,messageShow,pin}) => {
  const navigate=useNavigate();
  const [displayCount, setDisplayCount] = useState(4);
  const {price,total_amount,gst_amount,description,type,validity_in_years,free_bd,free_pm,scope_of_work}=product;
  const [responseData, setResponseData] = useState(null);
  const [loginPortal, setLoginPortal] = useState(false);
  const loggedIn= !!localStorage.getItem('userToken') ;
  const scopeOfWorkArray = JSON.parse(scope_of_work);
console.log("USER LOGGED IN",loggedIn);
  const onNavigateHandler=()=>{
    console.log("navigation working");
    navigate('/managepagedetails1')
  }
  const onShowMoreHandler = () => {
    setDisplayCount(scopeOfWorkArray.length);
  };
const onShowLessHandler=()=>{
  setDisplayCount(4);
}
  // console.log("scope_of_work==>>>",displayCount,scopeOfWorkArray.length);
  console.log('messageShow',messageShow);

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


  const onHidePortal = () => {
    setLoginPortal(false);
}
  return (
    <> {loginPortal && <LoginModel onHide={onHidePortal} />}
    <div className='container-fluid tablet-d-padding'>
    <div className='max-container wrap-24-16'>
    <div className='container-fluid p-0 m-0 row divider-bottom'>
        <div className='col col-lg-4 col-6 p-0'>
        <p className='heading-400-14-12 op-80'> The Plan Price(Excluding GST)</p>
        <p className='heading-600-16-14'>₹{price}&nbsp; <strike className='heading-400-14-12 op-60'>{""}</strike> </p>
 {/* <p className='heading-400-14-12'> 4.2 Stars <BlackStar/></p>*/}
        </div>
        <div className='col col-lg-3 col-6 p-0'>
        <p className='heading-600-16-14'> <span className='heading-400-14-12 op-80'>Plan Amount:</span>&nbsp;₹{price}</p>
        <p className='heading-600-16-14'><span className='heading-400-14-12 op-80'>GST(18%): </span>&nbsp;₹{gst_amount}</p>
        <p className='heading-600-16-14'> <span className='heading-400-14-12 op-80'>Total Amount:</span>&nbsp;₹{total_amount}</p>
        </div>
        <div className='col col-lg-5 hide-992 p-0'>
                <div className='p-0 m-0 gap-5 d-flex justify-content-end '>
                <button className='button-outline' onClick={onBuyHandler}>Buy Now</button>
  {/*<button className='button' onClick={onNavigateHandler}>Add To Cart</button>*/}
                </div>
               {messageShow && <div className='d-flex justify-content-end align-items-center heading-400-14-10 c-red pt-3'>
               <Wrong fill={"#CB1923"} inner={"#FFFFFF"}/>&nbsp;This plan is not available at the Pincode - {pin}
                </div>}
        </div>

        <div className='col col-12 p-0'>
        <div className='row pt-5 pb-3'>
          <div className='col col-auto heading-400-14-12 op-80'>Description: </div>
          <div className='col col-10'>{description.replace(/["\[\]]/g, '')}</div>
        </div>
        </div>
        </div>

    <div className='contaienr-fluid p-0 m-0 pt-3 row'>
    {/* Key features start */}
      <div className="col col-lg-6 col-12 p-0">
      <p className='heading-400-14 op-70'>Key features</p>
      <p className='heading-500-16 hide-992'>Service type: Annual Maintenance Contract</p>
      <p className='heading-500-16 hide-992'>Product Covered:{type}</p>
     
     {/* for tablet & Mobile start*/}
     <div className='p-0 m-0 show-992'>
      <div className="container-fluid p-0 m-0 row ">
        <div className="col col-12 p-0"><p className='heading-400-14 op-70'> Service type:</p></div>
        <div className="col col-12 p-0"><p className='heading-500-14'> Annual Maintenance Contract</p></div>
      </div>
      <div className="container-fluid p-0 m-0 row  ">
        <div className="col col-12 p-0"> <p className='heading-400-14 op-70'>Product Covered:</p></div>
        <div className="col col-12 p-0"><p className='heading-500-14'>{type}</p> </div>
      </div>
</div>
 {/* for tablet & Mobile end*/}
      <p className='heading-500-16'>Zero Documentation Required</p>
      <p className='heading-500-16'>{validity_in_years} year Service period</p>
      <p className='heading-500-16'>Total Visits:{+free_bd + +free_pm}</p>
      <p className='heading-500-16'>Break Down:{free_bd}</p>
      <p className='heading-500-16'>Preventive Measures:{free_pm}</p>
      </div>
      {/* Key features end */}

      {/* Service Scope start */}
      <div className="col col-lg-4 col-12 p-0">
        {/*<p className='heading-400-14 op-70'>Service Scope</p>
        <p className='heading-400-14'><Evolve/>&nbsp;Evolve Program</p>
        <p className='heading-400-14'><RemoteAssistance/>&nbsp;Remote assistance</p>
        <p className='heading-400-14'><RegularUpdates/>&nbsp;Regular Updates</p>
  <p className='heading-400-14'><QualityAssurances/>&nbsp;Quality Assurances</p>*/}
  <p className='heading-400-14 op-70'>Service Scope</p>    
  {scopeOfWorkArray.slice(0, displayCount).map((scope,index)=>(<>
        <p className='heading-400-14'><Evolve/>&nbsp;{scope}</p>
        </>
      ))}
      {displayCount === scopeOfWorkArray.length ? <button className='button mt-2' onClick={onShowLessHandler}>Show Less</button>:<button className='button mt-5' onClick={onShowMoreHandler}>Show More</button>}
      
      </div>
      <div className='col col-12 show-992 p-0'>
      <div className='p-0 m-0 gap-5 d-flex justify-content-end '>
      <button className='button-outline' onClick={onBuyHandler}>Buy Now</button>
{/*<button className='button' onClick={onNavigateHandler}>Add To Cart</button>*/}
      </div>
     {messageShow && <div className='d-flex justify-content-end align-items-center heading-400-14-10 c-red pt-3'>
     <Wrong fill={"#CB1923"} inner={"#FFFFFF"}/>&nbsp;This plan is not available at the Pincode - 401 202
      </div>}
</div>
    
    </div>
    </div>
    </div>
    </>
  )
}

export default ProductIdThirdSection