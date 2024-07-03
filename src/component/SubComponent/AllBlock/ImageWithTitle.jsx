import React from 'react'

const ImageWithTitle = ({product,index}) => {
  return (
    <div className='text-center' key={index}>
    <div style={{maxWidth:"20rem"}}><img className='w-100' src={product.imageUrl} alt={product.imageUrl}/></div>
    <p className='heading-600-18-14'>{product.title}</p>
    </div>
  )
}

export default ImageWithTitle