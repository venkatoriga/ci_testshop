import React, { useState }  from 'react'
import { Container,Accordion  } from 'react-bootstrap'

const FAQs = ({list}) => {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const onAccordionClick = (index) => {
      if (index === activeAccordion) {
        setActiveAccordion(null);
      } else {
        setActiveAccordion(index);
      }
    };
   
  return (
    <Container className='privacypolicy-maindiv'>
    {list.map((product,index)=>(
        <Accordion activeKey={activeAccordion} flush className='accordionborder' key={index}>
  <Accordion.Item eventKey={index} >
    <Accordion.Header className="accordion-header heading-600-20 dark" onClick={() => onAccordionClick(index)}
        >{product.heading}
    </Accordion.Header>
    <Accordion.Body> 
        {product.ans && <p className='privacypolicy-para'>{product.ans}</p>}
        {product.ans1 && <div>
          {product.ans1.map((pro,index)=>(
            <div key={index}>
            <p className='underline-black m-0'>{pro.title}</p>
            <p className=''>{pro.para}</p>
            </div>
            
          ))}
        </div>}
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

    ))}
</Container>
  )
}

export default FAQs