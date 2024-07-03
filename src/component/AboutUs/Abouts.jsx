import React from 'react'
import Hero from '../AboutUs/Hero/Hero'
import Visions from '../AboutUs/Visions/Visions'
import Mission from './Mission/Mission';
import Founders from './Founders/Founders';
import Values from './Values/Values'
import Events from './Events/Events';
import Audience from './Audience/Audience'
import Footer from './Footer/Footer';
const Abouts = () => {
  return (
    <div>
        <Hero/>
      <Visions />
      <Mission />
      <Founders />
      <Values />
      <Events />
      <Audience />
      <Footer/>
    </div>
  )
}

export default Abouts