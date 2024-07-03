import React, { useState } from 'react';
import "./SixSection.css"
import { searchIcon } from '../../../helpers/Icons';
import { Accordion } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const SixSection = () => {
const navigate=useNavigate();
    const [activeAccordion, setActiveAccordion] = useState(null);
    const onAccordionClick = (index) => {
        if (index === activeAccordion) {
            setActiveAccordion(null);
        } else {
            setActiveAccordion(index);
        }
    };
    const accordionData = [
        { question: "How long does it take on an average to sell a Machine?",answer: "We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks", },
        { question: "How long does it take on an average to sell a Machine?", answer: "We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks", },
        { question: "How long does it take on an average to sell a Machine?", answer: "We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks", },
        { question: "How long does it take on an average to sell a Machine?", answer: "We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks", },
        { question: "How long does it take on an average to sell a Machine?", answer: "We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks", }
    ];

    const onReadMoreHandler=()=>{
        navigate('/faqs')
        }
    return (
        <>
            <div className='stpper-container questions-wrap'>
                <div className="container-fluid p-0 m-0 row justify-content-center align-items-center g-5">
                    <div className="heading-wrap text-center">
                        
                        <div className="heading-600-32 heading-600-32-24">Have any Questions?</div>
                        <div className="heading-400-16-12 light-txt mt-3">Here are some of the most Frequently asked questions </div>
                    </div>
                    <div className="accordion-1">
                        {accordionData.map((item, index) => (
                            <Accordion activeKey={activeAccordion} flush className='accordionborder' key={index}>
                            <Accordion.Item eventKey={index} >
                                <Accordion.Header className="accordion-header dark" onClick={() => onAccordionClick(index)}>
                                    {item.question}
                                </Accordion.Header>
                                <Accordion.Body>
                                    {item.answer && <p className='heading-400-16-12'>{item.answer}</p>}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        ))}
                    </div>
                    <p className='heading-400-20 text-center'>Still didn’t find an answer? <span className='heading-600-16 curser-pointer' onClick={onReadMoreHandler}>Read More</span></p>

                </div>
            </div>
            <div className="search-bar-wrappper">
                <div className="search-bar">
                    <div class="searchbar-icon">{searchIcon({width:20,height:20})}</div>
                    <input type="text" className='heading-400-16-12' placeholder='Which Machine do you wish to Sell?'/>
                    <button type='button' className='origa-button heading-600-16-14' onClick={() => window.location = "/sell/machine-detail"}>Sell at Origa</button>
                </div>
            </div>
        </>
    );
}

export default SixSection