import React, { useEffect } from 'react'
import SecondSection from '../SecondSection'
import FourthSection from '../FourthSection';
import FifthSection from '../FifthSection';

import Footer from '../../Footer/Footer';
import AmcMaitainLandingPageThirdSection from './AmcMaitainLandingPageThirdSection';
import AmcMaintainLandingFirstSection from './AmcMaintainLandingFirstSection';
const AmcMaintainLandingPage = () => {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  return (
    <>
        <AmcMaintainLandingFirstSection/>
        <SecondSection/>
        <AmcMaitainLandingPageThirdSection/>
        <FourthSection />
            <FifthSection />
             <Footer /> 
    </>
  )
}

export default AmcMaintainLandingPage