import React, { useEffect } from 'react'
import SecondSection from './SecondSection';
import ThirdSection from './ThirdSection';
import FourthSection from './FourthSection';
import FifthSection from './FifthSection';

import Footer from '../Footer/Footer';
import AmcFirstSection from './AmcFirstSection';

const Amc = () => {
   useEffect(()=>{
    window.scrollTo(0,0)
   })
    return (
        <>
          <AmcFirstSection/> 
            <SecondSection />
            <ThirdSection />
            <FourthSection />
            <FifthSection />
             <Footer /> 
        </>
    )
}

export default Amc