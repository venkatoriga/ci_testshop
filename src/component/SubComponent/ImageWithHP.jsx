import React from 'react'

const ImageWithHP = ({imageurl,heading,para}) => {
  return (
    <>
    <div className='col col-12 pt-2'>
    <img src={imageurl} alt={imageurl} className='img-fluid'/>
    </div>
    <div className="col col-12 pt-3">
        <h1 className='heading-600-44-20'>{heading}</h1>
    </div>
    <div className="col col-lg-11 col-12 pt-2">
        <p className='heading-400-16 op-80'>{para}</p>
    </div>
    </>
  )
}

export default ImageWithHP