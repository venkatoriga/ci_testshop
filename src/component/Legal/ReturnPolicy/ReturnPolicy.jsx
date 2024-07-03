import React from 'react'
import { Container,Accordion  } from 'react-bootstrap'
const ReturnPolicy = () => {
    const message1=`This Privacy Policy covers the information Origa Technologies Private Limited ("Origa" and/or "We" and/or “Us”) collects from the user(s) ("User(s)" and/or "You") of www.origa.market ("Website") This Privacy Policy should be read in conjunction and together with the Terms of Use of the Website. Personal Information of a User is collected if the User registers with the Website, accesses the Website or take any action on the Website. Here are our privacy principles:`
    const message2=`The Personal Information which You may provide to us and/or which we may collect is or could be the following:` 
    const list1=`Your registration details which may include the password provided by You. You may note that We adopt reasonable security measures to protect Your password from being exposed or disclosed to anyone including the Origa.`
   const list2='Your shipping, billing, tax registration, and other information pertaining to Your purchase transaction on the Website.'
   const list3=`Your transaction details. Your usage behaviour of the Website.`
   const list4=`Details of the computer system or computer network which You use to visit the Website and undertake any activity on the Website.`
    const message3=`
    Our primary purposes in collecting information from You are to allow You to use the Website and various features and services offered by the Origa on or in relation to the Website; contact you for any services provided by the Origa or its affiliates or its various service providers or Origa business partners and advertisers; to record Your information and details as permitted and required under applicable laws, statutory direction or judiciary orders; to serve various promotion materials and advertising materials to you; and such other uses as provided in the User Agreement and this Privacy Policy. We may also use the information for transactional emails or to provide You with information, direct marketing, online and offline advertising and other materials regarding products, services and other offers from time to time in connection with the Origa or its parent, subsidiary and affiliated companies ("Origa Entities") and its joint ventures.`
   const list=[{heading:'Privacy Policy'},{heading:'Full Disclosure'},{heading:'Policy Guidelines'},{heading:'Know Your Customer (KYC) and Prevention of Money Laundering (PML) Policy - 2018'},{
    heading:"Legal Disclaimer"
   }]
    return (
        <Container className='privacypolicy-maindiv'>
        {list.map((products,index)=>(
            <Accordion  flush className='accordionborder'>
      <Accordion.Item eventKey={index} >
        <Accordion.Header className="accordion-header">{products.heading}</Accordion.Header>
        <Accordion.Body>
            
            <p className='privacypolicy-para'>{message1}</p>
            <h1 className='privacypolicy-heading'>Information Collection and Use</h1>
        <Container>
            <p className='privacypolicy-para'>{message2}</p>
            <p className='privacypolicy-para'>&nbsp;&nbsp;1.<p className='listp'>{list1}</p></p>
            <p className='privacypolicy-para'>&nbsp;&nbsp;2.<p className='listp'>{list2}</p></p>
            <p className='privacypolicy-para'>&nbsp;&nbsp;3.<p className='listp'>{list3}</p></p>
            <p className='privacypolicy-para'>&nbsp;&nbsp;4.<p className='listp'>{list4}</p></p>
            <p className='privacypolicy-para'>{message3}</p>
        </Container>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        ))}
    </Container>
  )
}

export default ReturnPolicy