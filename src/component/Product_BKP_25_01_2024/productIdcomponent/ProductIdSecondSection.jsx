import React,{useState} from 'react'
import ImageSlider from '../../Buying/Modals/ImageSlider';
import { framre3dIcon } from '../../../helpers/Icons';
import { heartIcon } from '../../../helpers/Icons'
import useWishListAddOrUpdate from '../../SubComponent/useWishListAddOrUpdate';
import TabSlider from '../../SubComponent/AllSlider/TabSlider';
// import client from '../../Services/ServicesPopup/apolloclient';
// import { gql } from '@apollo/client';
// const WISHLIST_ADD_UPDATE=gql`
// mutation ($requestinput: CreateUpdateWishListItemInput!) {
//     createOrUpdateWishlistItem(requestinput: $requestinput) {
//       message
//       success
//     }
//   }
  
// `
const ProductIdSecondSection = ({product}) => {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
//   const [heartColor,setHeartColor]=useState()
const  { onWishlistHandler , heartColor } =useWishListAddOrUpdate();
 const sliderImage=[{product: product.plan_image, name:"prduct1"},{product: product.plan_image, name:"prduct2"},{product: product.plan_image, name:"prduct3"}]
  const onMouseEnterhandler = () => {
    setIsHovered(true);
  };
  const onMouseLeavehandler = () => {
    setIsHovered(false);
  };
 
    const handleModal = (status) => {
        if(status){
            setShowModal(status);
        }else{
            setShowModal(false);
        }
    }

//     const userId=localStorage.getItem('id');
//    const onWishlistHandler= async()=>{
//     const {data}=await client.mutate({
//         mutation:WISHLIST_ADD_UPDATE,
//         variables:{
//             "requestinput": {
//                 "userid":  userId,
//                 "addProductids": [productid],
//                 "names": ["My Wishlist"],
//                 "quantity": 1,
//                 "removeProductids": [],
//                 "category": "MACHINE",
//                 "productDetails": [{
//                         "productid": productid,
//                         "image":product.plan_image,
//                         "price":price
//                     }
//                 ]
//             }
//             }
            
//     })
//     if(data.createOrUpdateWishlistItem.success){
// setHeartColor(prev=>({
//     ...prev,
// fill:"#73509E",
// stroke:"#73509E"
//      } ) )
//     }
//    } 
const breakpoints={
  def:1,
  a:3,
  b:2,
  c:2,
  d:1,
  e:1
}
const onSubmitHandler=()=>{
onWishlistHandler(product.amc_plan_id,product.plan_image,product.price,product.name)
}
console.log("ProductIdSecondSection===>>>",product);
  return (
    <div className='container-fluid'>
    <div className='max-container p-0'>
    <div className="name-wrap">
    <div className="heading-wrap">
        <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14">STAR Annual maintenance contract (AMC) plan for {product.type} machine </div>
  {/*<div className="heading-400-14-12 light-txt">{plan}</div>*/}
    </div>
    <div className="people" onClick={onSubmitHandler}>
      
        {heartIcon({width:25,height:25,fill:heartColor.fill,stroke:heartColor.stroke})}
    </div>
</div>
    </div>

    <div className='xmax-container'>
    <div className="img-wrap">
                {showModal && (
                    <ImageSlider modalAction={handleModal} sliderImage={sliderImage}/>
                )}
            </div>
            <div className="hide-992 product-img-wrap">
                <div className={`product shadow2`}  onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
                    <img className="img-fluid" src={product.plan_image} alt={product.plan_image}/>
                   {isHovered && <div className="drag" onClick={() => handleModal(true)}>View all</div>}
                </div>
                <div className={`product shadow2`}>
                    <img className="img-fluid" src={product.plan_image} alt={product.plan_image}/>
                </div>
                <div className={`product shadow2`}>
                    <img className="img-fluid" src={product.plan_image} alt={product.plan_image}/>
                    <button className="framre">{framre3dIcon({width:30,height:30})}</button>
                </div>
            </div>
            <div className='show-992'>
<TabSlider breakpoints={breakpoints}>
<div className='product-img-wrap'>
<div className={`product shadow2`}>
  <img className="img-fluid" src={product.plan_image} alt={product.plan_image}/>
</div>
</div>
<div className='product-img-wrap'>
<div className={`product shadow2`}>
    <img className="img-fluid" src={product.plan_image} alt={product.plan_image}/>
</div>
  </div>
  <div className='product-img-wrap'>
  
 <div className={`product shadow2`}>
                    <img className="img-fluid" src={product.plan_image} alt={product.plan_image}/>
  </div>
</div>

 
</TabSlider>
            </div>
    </div>
    </div>
  )
}

export default ProductIdSecondSection