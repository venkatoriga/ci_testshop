
import React,{useState} from 'react'
import Heart from '../AllSvgs/Heart'
import Button from '../../Button/Button';

const WishListHeartBlock = ({product,index}) => {
    const [isHovered, setIsHovered] = useState(false);
  
    const onMouseEnterhandler = () => {
      setIsHovered(true);
    };
  
    const onMouseLeavehandler = () => {
      setIsHovered(false);
    };
  return (

    <div className={`row w-400 h-485 p-2 ${isHovered ? 'bg-green':''}`} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler} key={index}>
          <div className=" p-2">
            <div className=' d-flex justify-content-end'>
               <Heart fill={isHovered ? "#73509E":""}/>
            </div>
            <div style={{height:"215px",width:"215px"}} className='h-center'>
              <img src={product.imageurl} className="w-100" alt={product.imageurl} />
            </div>
            <div className="mt-4">
              <p className={`heading-600-20-16 ${isHovered ? "bottom-halfline1":"bottom-halfline"}`}>{product.title}</p>
              <p className="heading-400-14-12 op-50 my-2">{product.para}</p>
              <div className="pricesection d-flex justify-content-between">
                <p className='heading-400-16-14'>{product.time}</p>
                <p className="fs-20 fw-bold">{product.price}</p>
              </div>
             
              {isHovered && <div className='text-end'><Button message={"Avail Service"} /></div>}
            </div>
          </div>
        
  
    </div>

  )
}

export default WishListHeartBlock