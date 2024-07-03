import React, { useState } from 'react'
import { Container, Accordion } from 'react-bootstrap'
import './PrivacyPolicy.css'
const PrivacyPolicy = () => {

  const [activeAccordion, setActiveAccordion] = useState(0);

  const onAccordionClick = (index) => {
    if (index === activeAccordion) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  return (
    <div className='max-container privacypolicy-maindiv mb-5'>
      
        <Accordion activeKey={activeAccordion}  flush className='accordionborder' key={0}>
          <Accordion.Item eventKey={0} >
            <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(0)}>Privacy Policy</Accordion.Header>
            <Accordion.Body>

              <p className='legal-para op-60'>This Privacy Policy covers the information Origa Markets Private Limited ("Origa" and/or "We" and/or “Us”) collects from the user(s) ("User(s)" and/or "You") of www.origa.market ("Website") This Privacy Policy should be read in conjunction and together with the Terms of Use of the Website. Personal Information of a User is collected if the User registers with the Website, accesses the Website or take any action on the Website. Here are our privacy principles:</p>
              <h1 className='privacypolicy-heading'>Information Collection and Use</h1>
              <Container style={{paddingLeft:"40px"}}>
                <p className='legal-para op-60'>The Personal Information which You may provide to us and/or which we may collect is or could
                  be the following:
                </p>
                <div className='d-flex legal-para op-60 pl-2'>1.&nbsp;<p className='listp'>Your registration details which may include the password provided by You. You may note that We adopt reasonable security measures to protect Your password from being exposed or disclosed to anyone including the Origa.</p></div>
                <div className='d-flex legal-para op-60 pl-2'>2.&nbsp;<p className='listp'>Your shipping, billing, tax registration, and other information pertaining to Your purchase transaction on the Website.</p></div>
                <div className='d-flex legal-para op-60 pl-2'>3.&nbsp;<p className='listp'>Your transaction details. Your usage behavior of the Website.</p></div>
                <div className='d-flex legal-para op-60 pl-2'>4.&nbsp;<p className='listp'>Details of the computer system or computer network which You use to visit the Website and undertake any activity on the Website.</p></div>
                <p className='legal-para op-60 pt-4'>Our primary purposes in collecting information from You is to allow You to use the Website and various features and services offered by the Origa on or in relation to the Website; contact you for any services provided by the Origa or its affiliates or its various service providers or Origa business partners and advertisers; to record Your information and details as permitted and required under applicable laws, statutory direction or judiciary orders; to serve various promotion materials and advertising materials to you; and such other uses as provided in the User Agreement and this Privacy Policy. We may also use the information for transactional emails or to provide You with information, direct marketing, online and offline advertising and other materials regarding products, services and other offers from time to time in connection with the Origa or its parent, subsidiary and affiliated companies ("Origa Entities") and its joint ventures.
               <br/>
                We may also collect information to track User behavior and preferences for internal analytics from all Users of the Website. This information is collected through the use of server log files and tracking technologies to collect and analyze certain types of technical information and may include cookies and web beacons.
                We may combine your Personal Information, other information and information collected from tracking technologies and aggregate it with information collected from other Users using our Website to attempt to provide You with a better experience on our Website.
                You understand, agree and acknowledge that our collection, storage and processing of your Personal Information is for a lawful purpose connected with a function or activity of the Origa Entities and its joint ventures. You further understand, agree and acknowledge that your Personal Information which is classified as sensitive personal information as per applicable laws is considered necessary for the Origa to provide various services on its Website to You and for Your usage of the Website and other services provided by Origa in relation to the Website.
                </p>
              </Container>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion activeKey={activeAccordion}  flush className='accordionborder' key={1}>
        <Accordion.Item eventKey={1} >
          <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(1)}>Information Sharing and Disclosure</Accordion.Header>
          <Accordion.Body>

            <p className='legal-para op-60'>Origa is the recipient of all the Personal Information and shall exercise reasonable commercial endeavors for the prevention of the Personal Information provided by the Users. We may enable access of the Users' information to the Origa Entities, joint ventures, agents or third parties for the purposes of the services provided by them or for any other marketing related activity undertaken by or on behalf of the Origa Entities and/or its joint ventures. We will ensure on reasonable commercial efforts basis that the third parties and agents employed by us for the purposes of the Website are under an obligation to maintain confidentiality with respect to the Personal Information provided by the Users and to use it strictly for the purposes of the Website only.</p>
           
            
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <Accordion activeKey={activeAccordion}  flush className='accordionborder' key={2}>
      <Accordion.Item eventKey={2} >
        <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(2)}>Compliance with Laws and Law Enforcement</Accordion.Header>
        <Accordion.Body>
          <p className='legal-para op-60'>Origa cooperates with mandated government and law enforcement agencies or to any third parties by an order under law for the time being in force to enforce and comply with the law. We will disclose any information about You to government or law enforcement officials or private parties as we, in our sole discretion, believe necessary or appropriate to respond to claims and legal process, to protect the property and rights of Origa or a third party, to protect the safety of the public or any person, or to prevent or stop any illegal, unethical or legally actionable activity. Origa may also provide your Personal Information to various tax authorities upon any demand or request from them.</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>


  <Accordion activeKey={activeAccordion}  flush className='accordionborder' key={3}>
  <Accordion.Item eventKey={3} >
    <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(3)}>Business Transfers</Accordion.Header>
    <Accordion.Body>
      <p className='legal-para op-60'>Origa may sell, transfer or otherwise share some or all of its assets, including your Personal Information, in connection with a merger, acquisition, reorganization or sale of assets or in the event of bankruptcy. Should such a sale or transfer occur, we will ensure that the Personal Information You have provided through the Website is stored and used by the transferee in a manner that is consistent with this Privacy Policy.</p>
    </Accordion.Body>
  </Accordion.Item>
</Accordion>

<Accordion activeKey={activeAccordion}  flush className='accordionborder' key={4}>
<Accordion.Item eventKey={4} >
  <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(4)}>Email Policies</Accordion.Header>
  <Accordion.Body>
    <p className='legal-para op-60'>Origa may use your Personal Information for the aforementioned purposes of the Website. You have full control regarding which of these emails You want to receive. If You decide at any time that You no longer wish to receive such communications from us, please follow the unsubscribe instructions provided in any of the communications. Please note that once we receive your request, it may take an additional period of time for your opt-out to become effective.</p>
  </Accordion.Body>
</Accordion.Item>
</Accordion>


<Accordion activeKey={activeAccordion}  flush className='accordionborder' key={5}>
<Accordion.Item eventKey={5} >
  <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(5)}>Deleting Your Information</Accordion.Header>
  <Accordion.Body>
    <p className='legal-para op-60'>If You wish to have the Personal Information that You have provided to us deleted, You can always do so by sending a request to us on the e-mail id of as provided on the contact us page. You may note that deletion of certain Personal Information may lead to cancellation of your registration with the Website and your access to certain features of the Website.</p>
  </Accordion.Body>
</Accordion.Item>
</Accordion>


<Accordion activeKey={activeAccordion}  flush className='accordionborder' key={6}>
<Accordion.Item eventKey={6} >
  <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(6)}>Security</Accordion.Header>
  <Accordion.Body>
    <p className='legal-para op-60'>Origa uses ordinary industry standard technology designed to help keep your Personal Information safe. The secure server software (SSL) encrypts all information You put in before it is sent to us. Furthermore, all of the customer data we collect is protected against unauthorized access. To prevent unauthorized access, maintain data accuracy, and ensure correct use of information, We will employ commercially reasonable and practicable security practices and procedures and security methods and technologies. We will also ensure on reasonable commercial efforts basis that any agent or third party that we employ complies with the same security standards as us for the protection of your Personal Information.
    <br/>
    Your information may be transferred to or be maintained on computers, computer systems and computer resources located outside of your state or country where the privacy laws may not be as protective as those where you live. If You are located outside India and choose to provide information to us, please be aware that Origa keeps or transfers information to India and processes it there. Your submission of such information represents your agreement to that transfer.
    <br/>
    Unfortunately, the transmission of information over the Internet is not completely secure. Although We strive to protect your personal data, We cannot guarantee the security of your data while it is being transmitted to our site; any transmission is at your own risk. Once We have received your information, We have commercially reasonable procedures and security features in place to reasonably endeavor to prevent unauthorized access.
    </p>
  </Accordion.Body>
</Accordion.Item>
</Accordion>

<Accordion activeKey={activeAccordion}  flush className='accordionborder' key={7}>
<Accordion.Item eventKey={7} >
  <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(7)}>Links to Other Sites / Financial Data</Accordion.Header>
  <Accordion.Body>
    <p className='legal-para op-60'>
    We may provide links to other websites for your convenience and information. These sites may have their own privacy policies in place, which we recommend You review if You visit any linked websites. We are not responsible for the content of linked sites or any use of the sites.
    <br/>
    While transacting on the Website, You may provide your financial information including without limitation your bank account details, credit card account details or your details pertaining to any payment settlement or pre-paid instrument service provider. You understand, agree and acknowledge that the Website and Origa never receives Your financial and payment information from these service provider. Your personal information, sensitive personal information and financial information will be dealt by these service providers in accordance with their respective privacy policies and other terms and conditions and Origa and Website shall not be liable, accountable or responsible for your personal information, sensitive personal information and financial information which you provide to these service providers.
    </p>
  </Accordion.Body>
</Accordion.Item>
</Accordion>

<Accordion activeKey={activeAccordion}  flush className='accordionborder' key={8}>
<Accordion.Item eventKey={8} >
  <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(8)}>Changes in Privacy Policy</Accordion.Header>
  <Accordion.Body>
    <p className='legal-para op-60'>
    From time to time We may update this Privacy Policy. Your continued subscription to our Services constitutes an acceptance of the then-current Privacy Policy and Terms of Use so We encourage You to visit this page periodically to review any changes.
    </p>
  </Accordion.Body>
</Accordion.Item>
</Accordion>

<Accordion activeKey={activeAccordion}  flush className='accordionborder' key={9}>
<Accordion.Item eventKey={9} >
  <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(9)}>Phishing</Accordion.Header>
  <Accordion.Body>
    <p className='legal-para op-60'>Identity theft and the practice currently known as "phishing" are of great concern to Origa. Safeguarding information to help protect You from identity theft is a top priority. We do not and will not, at any time, request your credit card information or national identification numbers in a non-secure or unsolicited e-mail or telephone communication.</p>
  </Accordion.Body>
</Accordion.Item>
</Accordion>

<Accordion activeKey={activeAccordion}  flush className='accordionborder' key={10}>
<Accordion.Item eventKey={10} >
  <Accordion.Header className="accordion-header" onClick={() => onAccordionClick(10)}>Contact Us</Accordion.Header>
  <Accordion.Body>
    <p className='legal-para op-60'>If You have any questions about this Privacy Policy, the practices of Origa or your dealings with the Website, You can contact us by writing to us at info@origaleasing.com</p>
  </Accordion.Body>
</Accordion.Item>
</Accordion>
    </div>
  )
}

export default PrivacyPolicy

