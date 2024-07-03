import React from 'react'
import GoldenStart from '../SubComponent/AllSvgs/GoldenStart'
import HalfGoldenStar from '../SubComponent/AllSvgs/HalfGoldenStar'
import TabSlider from '../SubComponent/AllSlider/TabSlider'

const ReviewSection = ({product,breakpoints}) => {
console.log("ReviewSection123===>>>",product?.product_image[0]);
const timestamp = new Date(product?.created_at);
const date = timestamp.toISOString().split('T')[0];

console.log("Extracted Date:", date);
  return (
    <div className='pt-3 pb-2'>
    <div className='container-fluid tablet-d-pending m-0 row justify-content-between pl-0 pr-0'>
    <div className='col col-6 p-0'><p className='heading-400-16-14 op-60'>{/*product.nameAndDate*/}{date}</p></div>
    <div className='col col-6 d-flex justify-content-end p-0'><p className='heading-500-24-16'>{product.rating}</p> {[0,1,2,3].map(()=><div><GoldenStart/></div>)}
    <div><HalfGoldenStar/></div>
    </div>
    </div>
    <div className='container-fluid tablet-d-pending m-0 row pl-0 pr-0'>
  <p className='heading-400-16-14 p-0'>{/*product.title*/}</p>
    <div className='container-fluid p-0 m-0 row review'>
   
    <TabSlider breakpoints={breakpoints}>
    {   
      product?.product_image?.map((pro,index)=>
      <div className='w-95'>
      { <img className='w-100' src={product?.product_image[index]} alt={product?.product_image[index]}/>}
    {/*index%2===1 && <img className='w-100' src='/asset/review2.png' alt='review2.png'/>*/}
    </div>)
    }
    
    </TabSlider>
    </div>
<div className='d-flex p-0'>{[0,1,2,3].map(()=><div><GoldenStart/></div>)}  <div><HalfGoldenStar/></div></div>
<div className='col col-12 p-0 pt-2 op-60'>
      <p className='heading-400-14'>{product.comments}</p>
</div>
    </div>
    </div>
  )
}

export default ReviewSection