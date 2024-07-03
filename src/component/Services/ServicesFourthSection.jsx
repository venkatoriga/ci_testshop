import React,{useState} from 'react'
import { Container } from 'react-bootstrap'
import FAQs from '../Faq/FAQ/FAQs'
const ServicesFourthSection = () => {
  
  const [displayCount, setDisplayCount] = useState(4);
  const list=[
    {heading:"Which machines do you service?",ans:"We specialise in servicing CNC, VMC, HMC, Lathe, and Wirecut machines."},
    {heading:"Which Controller do you service?",ans:"Our expertise extends to servicing Siemens, Fanuc, Mitsubishi, and Delta controllers. "},
    {heading:"What kind of services do you offer?",ans:"We provide comprehensive mechanical and electrical services."},
    {heading:"How do I request a quote?",ans:"Just click on request a call button and we'll respond promptly to provide a quote"},
    {heading:"What is your typical lead time?",ans:"Expect a response within 24 hours of your inquiry"},
    {heading:"What are your additional services?",ans:"We also offer assessments for hazardous situations, kaizen improvements, and parts observation."},
    {heading:"Can you provide basic maintenance training to our engineers?",ans:"Absolutely, yes."}

]
const onShowMoreHandler = () => {
  setDisplayCount(list.length);
};
const onShowLessHandler=()=>{
setDisplayCount(4);
}
  return (
    <div className='max-container'>
    <Container className="secondsection pt-4">
    <h1 className='heading-600-44-20 text-center c-green'>Have any Questions?</h1>
    <p className="heading-400-20 text-center op-80">Here are some of most Frequently asked questions </p>
  </Container>
  <div>
  <Container className='pl-5 pr-5'> 
    <FAQs list={list.slice(0, displayCount)}/>
  </Container>

  <div className='max-container text-center pt-4 pb-5'>
  <p className='heading-400-20'>Still didn’t find an answer? <span className='heading-600-16 curser-pointer' onClick={displayCount===4 ? onShowMoreHandler:onShowLessHandler}>{`${ displayCount===4 ?"Read More":"Read Less"}`}</span></p>
  </div>
  </div>
    </div>
  )
}

export default ServicesFourthSection