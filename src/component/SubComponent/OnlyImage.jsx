import React from 'react'

const OnlyImage = ({product,index}) => {
    
    // console.log("Onlyimage working==>>>",product.imageurl);
  return (
    <div  key={index}>
    <img className='w-100' src={product.imageurl} alt={product.imageurl}/>
    </div>
  )
}

export default OnlyImage