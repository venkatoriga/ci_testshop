import React from 'react'

const MALeftsection = ({heading,para}) => {
  return (
    <div className='row'>
        <div className='col col-12 heading-500-20'>{heading}</div>
        <div className='col col-12 heading-400-14 op-60 pt-2'>{para}</div>
    </div>
  )
}

export default MALeftsection