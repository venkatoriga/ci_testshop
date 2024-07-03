import React, { useState }  from 'react'
import { Container,Accordion  } from 'react-bootstrap'

const SellTemp = () => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const onAccordionClick = (index) => {
      if (index === activeAccordion) {
        setActiveAccordion(null);
      } else {
        setActiveAccordion(index);
      }
    };
    const list=[{heading:"How long does it take on an average to sell a Machine?",
                ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
                {heading:"will Origa Deliver my Machine?",
                ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
                {heading:"How much extra does Origa Charge",
                ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
                {heading:"Does Origa offers training for operating the machinery",
                ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
                {heading:"Can I see the machines in person before making a purchase?",
                ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
               {heading:"Can I buy or rent heavy machinery from your website?",
               ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
               {heading:"Does Origa offers training for operating the machinery",
               ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
               {heading:"Can I see the machines in person before making a purchase?",
               ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"},
               {heading:"Can I buy or rent heavy machinery from your website?",
               ans:"We cannot provide a fixed number of days but dependant on the condition of your machine it can be sold within 2 - 4 weeks"}
            ]
  return (
    <Container className='privacypolicy-maindiv'>
    {list.map((product,index)=>(
        <Accordion activeKey={activeAccordion} flush className='accordionborder' key={index}>
  <Accordion.Item eventKey={index} >
    <Accordion.Header className="accordion-header heading-600-20 dark" onClick={() => onAccordionClick(index)}>{product.heading}
    </Accordion.Header>
    <Accordion.Body> 
        <p className='privacypolicy-para'>{product.heading}</p>
   
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

    ))}
</Container>
  )
}

export default SellTemp