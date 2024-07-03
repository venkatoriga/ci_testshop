//use in "/annual" fourth section 
import React,{useState} from 'react'

const EventBlockline = ({product,index}) => {
 
    const [isHovered, setIsHovered] = useState(false);
        const onMouseEnterhandler = () => {
          setIsHovered(true);
        };
        const onMouseLeavehandler = () => {
          setIsHovered(false);
        };
  return (
    <div className={` ishoverd ${isHovered ? "hovered":" c-green"}`} key={index} onMouseEnter={onMouseEnterhandler} onMouseLeave={onMouseLeavehandler}>
    <div className='h-200' ><img className='w-100 h-100' src={product.imageurl} alt={product.imageurl}/></div>
    <div className='p-2'>
    <p className={`heading-500-18-14  text-center ${ isHovered ? "":"title-pink-line"}`}>{product.title}</p>
    
    <p className={`heading-400-14-12 p-2 text-center hide-992 ${isHovered ? "show":"hide"}`}>{product.message}</p>
    <p className={`heading-400-14-12 p-2 text-center show-992`}>{product.message}</p>
    </div>
    </div>
  )
}

export default EventBlockline