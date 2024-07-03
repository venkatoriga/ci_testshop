import React,{useState} from 'react'
import BlueDot from '../AllSvgs/BlueDot'
import Button from '../../Button/Button';
const ProductCategory = ({product,index}) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const onMouseEnterhandler = () => {
      setIsHovered(true);
    };
  
    const onMouseLeavehandler = () => {
      setIsHovered(false);
    };
  return (
    <div className={`row border-8p h-559 p-2 ${isHovered ? 'bg-green':''}`} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler} key={index}>
        <div className='col col-12 d-flex justify-content-end'>
            <div><BlueDot/></div><p className='pl-1'>Up to {product.discount}% OFF</p>
        </div>
        <div className='col col-12'>
            <img className='img-fluid' src={product.imageUrl} alt={product.imageUrl}/>
        </div>
        <div className='col col-12'>
         <p className='heading-400-14-12 op-50'>{product.productQuentity}+ Product Available </p>
         <p className={`heading-600-20-16 ${isHovered ? "bottom-halfline1":"bottom-halfline"}`}> {product.title}</p>
         <p className='textwrap'> {product.message}</p>
         {isHovered && <Button message={"Avail Service"} />}
        </div>
     
    </div>
  )
}

export default ProductCategory