import React,{useState} from 'react'
import { Container } from 'react-bootstrap'
import FAQs from '../Faq/FAQ/FAQs'
import { searchIcon,botIcon } from '../../helpers/Icons'
import { useNavigate } from 'react-router-dom'
const BuySectionTen = () => {
  const [isSmallScreen]=useState(window.innerWidth<=567)
const navigate=useNavigate();
  const list=[{heading:"How long does it take on an average to sell a Machine?",
  ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
  {heading:"How long does it take on an average to sell a Machine?",
  ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
  {heading:"How long does it take on an average to sell a Machine?",
  ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
  {heading:"How long does it take on an average to sell a Machine?",
  ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
  {heading:"How long does it take on an average to sell a Machine?",
  ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
  
]

const onReadMoreHandler=()=>{
navigate('/faqs')
}

  return (<>
    <div className='max-container'>
    <Container className="secondsection pt-4">
    
    <h1 className='heading-600-44-20 text-center c-green'>Have any Questions?</h1>
    <p className="heading-400-20 text-center op-80">Here are some of most Frequently asked questions </p>
  </Container>
  <div>
  <Container className={`${isSmallScreen ? '':'pl-5 pr-5'}`}> 
  <FAQs list={list}/>
  </Container>

  <div className='max-container text-center pt-4 pb-5'>
  <p className='heading-400-20'>Still didn’t find an answer? <span className='heading-600-16 curser-pointer' onClick={onReadMoreHandler}>Read More</span></p>
  </div>
  </div>
    </div>
 
 <div className="search-bar-wrappper p-r">
             
{/*               
              <div className="search-bar">
                    <div class="searchbar-icon">{searchIcon({width:20,height:20})}</div>
                    <input type="text" className='heading-400-16-12' placeholder='Which Machine do you wish to Sell?'/>
                    <button type='button' className='origa-button heading-600-16-14'>Sell at Origa</button>
                   
                </div>
             
               <div className='p-a max-container d-flex justify-content-end buy-bot'>
               <div className="bot-icon-wrap mt-1 align-items-center">
                        <div className="bot-icon">{botIcon({width:37,height:37})}</div>
                    </div>
               </div> */}
              
              
            </div>
 </>
 )
}

export default BuySectionTen