import React from 'react'

const NetworkFirstSection = () => {
    const heading="Welcome to Origa Network"
    const para="Origa provides tailored machine finance solutions, offering flexible lease and loan options to help you get the Equipment according to your needs. Origa provides tailored machine finance solutions, offering flexible lease and loan options to help you get the Equipment according to your needs."
  return (
    <div className='container-fluid bg-gray1'>
    <div className='max-container pt-5 pb-3 text-center'>
    <h1 className='heading-600-44-24 c-green'>{heading}</h1>
    <p className='heading-400-16-14 op-60 max-996 pt-2 pb-5'>{para}</p>
    </div>
    </div>
  )
}

export default NetworkFirstSection