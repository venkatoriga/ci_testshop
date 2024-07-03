import React from 'react'

const EventBlock = ({imageurl}) => {
  return (
    <div className='swiper__box'>
       <img src={imageurl} className='img-fluid' alt={imageurl} />
            <div className='hover_box'>
                <h2 className='swiper__heading'>Remote Assist</h2>
                <p className='swiper__para'>24x7 assistance from our trained technician in case of any problem related to your machines </p>
            </div>
    </div>
  )
}

export default EventBlock