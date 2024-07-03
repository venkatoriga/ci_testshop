import React from 'react'

const TitleandPara = ({title,para}) => {
  return (
    <>
    <div className='row'>
        <div className='col heading-500-20'>{title}</div>
    </div>
    <div className='row'>
        <div className='col heading-400-14 op-60'>{para}</div>
    </div>
    </>
    
  )
}

export default TitleandPara