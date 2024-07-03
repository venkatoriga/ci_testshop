import React,{useEffect, useState} from 'react'
import ReviewSection from '../ReviewSection'
import WriteReviewPopup from '../../Account/Popup/WriteReviewPopup';
import client from '../../Services/ServicesPopup/apolloclient';
// import WriteReviewDropdownPopup from '../../Account/Popup/WriteReviewDropdownPopup';
import { gql } from '@apollo/client';
const ProductIdEightSection = ({product}) => {
  const [displayCount, setDisplayCount] = useState(2);
const [showModel,setShowModel]=useState(false);
const [reviewData,setreviewData]=useState();
const PRODUCT_REVIEW=gql`
query productRating($productId:String!) {
  productRating(productId: $productId) {
    message
    code
    response
  }
}

`
  const reviews=[
    {
    nameAndDate:"Krishna, 10 July 2023 ",
    title:"The plan assured me about my machine safety",
    message:"After opting for this plan, i have got a peace of mind as my last complaint was resolved quickly and efficiently within the time promised. The price is also quite affordable, the technician are quite professionally trained."    
   
  },
    {
       nameAndDate:"Balram, 5 July 2023 ",
      title:"Affordable",
      message:"Affordable"    
    },
    {
      nameAndDate:"Ram, 8 Dec 2023 ",
      title:"Affordable",
      message:"Affordable"    
      },
   {
      nameAndDate:"Laxman, 15 Dec 2023 ",
      title:"Affordable",
      message:"Affordable"    
    }
  ]
        
    const breakpoints={
      def:6,
      a:4,
      b:3,
      c:2,
      d:2,
      e:2
    }
    const onShowMoreHandler = () => {
      setDisplayCount(reviewData.length);
    };
    const onShowLessHandler=()=>{
    setDisplayCount(2);
    }

    const onReviewHandler=()=>{
setShowModel(!showModel);
    }
   
    useEffect(()=>{
      const fetchReviewApi=async()=>{
        try {
          const { data } = await client.mutate({
            mutation:PRODUCT_REVIEW ,
            variables:{"productId":`${product.amc_plan_id}`}
          });
       console.log("fetch Review API Response==>",data);
      setreviewData(data.productRating?.response?.process_list);

        } catch (error) {
          console.error('API Error==>', error.message);
      
        }
      }
      fetchReviewApi()
    },[])

    console.log("review update====>>",reviewData);

    if(!reviewData){
      return <div>loading...</div>
    }
  return (
    <>
    {showModel ? <WriteReviewPopup modalAction={onReviewHandler} productDetails={product}/>:null}
    <div className="container-fluid">
      <div className='max-container  pt-5 my-5'>
    <div className='container-fluid p-0 m-0 row d-flex justify-content-between pb-5 pr-0 pl-0'>
        <div className='col col-5 p-0'><h1 className='heading-600-44-20'>Reviews</h1></div>
        <div className='col col-6 p-0 d-flex justify-content-end'><button className='button' onClick={onReviewHandler}>Write a Review</button></div>
    </div>
    {/*review for desktop*/}
    <div className=' p-0'> 
    
    {reviewData.slice(0, displayCount).map((product,index)=>
        <>
        {index!==0 && <div className='border'></div>}
        <ReviewSection product={product} breakpoints={breakpoints} />
        </>
        )
    }
    <p className="heading-600-14 curser-pointer" onClick={displayCount===2 ? onShowMoreHandler:onShowLessHandler}>{`${ displayCount===2 ?"See all Reviews":"See Less Reviews"}`}</p>
    </div>

       {/*review for tab and phone */} 

       {/* <div className="show-992">
       <Slider5 hide={"show-992"} listofdata={reviews} prevview={2} productCategory={productCategory}/>        
       </div> */}
    <div className='text-end'>
    <img src='/asset/Frame1000004018.png' alt='Frame1000004018.png'/>
    </div>
</div>
    </div>
    </>
  )
}

export default ProductIdEightSection