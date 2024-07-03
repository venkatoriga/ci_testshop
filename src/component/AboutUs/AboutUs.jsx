import React from 'react'
import Hero from './Hero/Hero'
import Visions from './Visions/Visions'
import Mission from './Mission/Mission';
import Founders from './Founders/Founders';
import MeetOurTeam from './MeetOurTeam/MeetOurTeam';
import Values from './Values/Values'
import Events from './Events/Events';
import News from './News/News';
// import Audience from './Audience/Audience'
import Footer from '../Footer/Footer';
const AboutUs = () => {
  return (
    <>
      <Hero />
  <Visions />
  <Mission />
  <Founders />
  <MeetOurTeam /> 
  <Values />
  <Events /> 
  <News /> 
  {/*<Audience />*/}
  <Footer/> 
    </>
  )
}

export default AboutUs