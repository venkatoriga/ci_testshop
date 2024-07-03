import React,{useState,useRef} from 'react'
import { closeIcon } from '../../../helpers/Icons';
import GoldenStart from '../../SubComponent/AllSvgs/GoldenStart';
import HalfGoldenStar from '../../SubComponent/AllSvgs/HalfGoldenStar';
import { gql } from '@apollo/client';
import client from '../../Services/ServicesPopup/apolloclient';
import axios from 'axios';
const WRITE_REVIEW_POPUP=gql`
mutation createProductrating($requestinput: ProductRatingInput!){
  createProductrating(requestinput: $requestinput) {
    response
    message
    success
  }
}

`
const WriteReviewPopup = ({modalAction,productDetails}) => {
    const [selectedFiles, setSelectedFiles] = useState(null);
    const fileInputRef = useRef(null);
 const [comments,setComments]=useState(null);
   
    const handleButtonClick = () => {
      if (fileInputRef.current) {
          fileInputRef.current.click();
      }
  };

  const handleFileChange = (e) => {
   
      const file = e.target.files[0];
      setSelectedFiles(file);
     
  };

const onCommentHandler=(e)=>{
setComments(e.target.value);
}

  console.log("selected File",selectedFiles,comments);
  
const onSubmitHandler=async()=>{
  const formData = new FormData();
  
   formData.append('file', selectedFiles);
   console.log("image ready to upload==>>",formData);

   const uploadImage= await axios.post('https://devextension.origa.market/api/productimageupload/', formData).then((res)=>res);
   console.log("upload image==<<<",uploadImage.data.url);
  
   const {data}=await client.mutate({
    mutation:WRITE_REVIEW_POPUP,
    variables:{
      "requestinput":{
        "customerid" :`${localStorage.getItem('id')}`,
        "productid" :`${productDetails.amc_plan_id}`,
        "marketmates" :"Seller",
        "productimage" :[uploadImage.data.url],
        "comments" :comments,
        "rating" : 5
    }
    }
  })
  if(data){
    console.log("image upload==>>",data);
    alert('done')

  }

}
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction()}></div>
            <div className="inner align-items-start" style={{height:"100%",maxHeight:"80%",overflowY:'auto',scrollbarWidth:'thin',scrollbarColor: "transparent transparent"}}>
                <button onClick={() => modalAction()} className="close">{closeIcon({width:16,height:16})}</button>
                <div className='w-80 h-center'>
                <div className="heading-600-20-16">Write Review</div>
                <p className='heading-400-14-12 text-start pt-2'>let us know about the product.</p>
                <div className='row p-1' style={{backgroundColor:"#F5F5F5"}}>
                <div className='col col-md-4'>
                <div style={{height:"108px",width:"108px"}}>
                    <img className='w-100 h-100' src={productDetails.plan_image} alt={productDetails.plan_image} />
                </div>
                </div>
                <div className='col col-md-6 d-flex justify-content-start align-items-center'>
               <div className='container-fluid p-0 m-0'>
               <div className='heading-600-16-14'>{productDetails.name}</div>
               <div className='heading-400-14 pt-2 op-50'>{productDetails.type}</div>
               <div className='heading-400-14 pt-2 op-80'>{productDetails.message}</div>
               </div>
                </div>

                </div>

                <div className='pt-3'>
                <div className='heading-400-14'>Rate this Product</div>
                <div className='container-fluid p-0 m-0 d-flex'>
                {[0,1,2,3].map(()=><div><GoldenStart/></div>)}
                <div><HalfGoldenStar/></div>
                </div>
                </div>

                <div className='pt-3 w-100'>
                <textarea type='text'  placeholder='Please write product review here (Optional)' rows={4} className='w-100 p-3 heading-400-16-14' onChange={onCommentHandler}/>
                </div>
                <div className='w-100 d-flex justify-content-end'>
                <div className="d-flex">
                            <input
                                type="file"
                                className="form-control"
                                id="customFile"
                                style={{ display: 'none' }}
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                multiple
                            />
                <div  style={{borderRadius:"100%", border:"1px solid #000000",width:"24px",height:"24px"}} className='d-j-a curser-pointer' onClick={handleButtonClick}>
                
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <g clip-path="url(#clip0_1_98780)">
    <path d="M6.4786 11.1733C6.4786 11.3116 6.53357 11.4444 6.63141 11.5422C6.72926 11.64 6.86197 11.695 7.00034 11.695C7.13871 11.695 7.27142 11.64 7.36926 11.5422C7.46711 11.4444 7.52208 11.3116 7.52208 11.1733V7.5211H11.1743C11.3126 7.5211 11.4453 7.46613 11.5432 7.36829C11.641 7.27044 11.696 7.13774 11.696 6.99936C11.696 6.86099 11.641 6.72828 11.5432 6.63044C11.4453 6.53259 11.3126 6.47762 11.1743 6.47762H7.52208V2.82545C7.52208 2.68708 7.46711 2.55437 7.36926 2.45652C7.27142 2.35868 7.13871 2.30371 7.00034 2.30371C6.86197 2.30371 6.72926 2.35868 6.63141 2.45652C6.53357 2.55437 6.4786 2.68708 6.4786 2.82545V6.47762H2.82643C2.68805 6.47762 2.55535 6.53259 2.4575 6.63044C2.35966 6.72828 2.30469 6.86099 2.30469 6.99936C2.30469 7.13774 2.35966 7.27044 2.4575 7.36829C2.55535 7.46613 2.68805 7.5211 2.82643 7.5211H6.4786V11.1733Z" fill="black"/>
  </g>
  <defs>
    <clipPath id="clip0_1_98780">
      <rect width="12.5217" height="12.5217" fill="white" transform="translate(0.739258 0.738281)"/>
    </clipPath>
  </defs>
</svg>
                    

                </div>
                <p className='pl-2 heading-600-14-12'>Add To Photo</p>
                  </div>
               

              
                </div>

               <div className='w-100 text-center'>
               <button type="button" className="continue-btn" onClick={onSubmitHandler}>Submit</button>
               </div>
                </div>
            </div>
        </div>
    );
}

export default WriteReviewPopup