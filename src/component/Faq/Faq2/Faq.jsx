import React, { useState,useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import FaqService from './Faqservice/FaqService'
import FAQs from './FAQ/FAQs'
import FaqBottom from './FaqBottom/FaqBottom'
import Footer from '../Footer/Footer'
import Search1 from '../SubComponent/Search/Search1'
import BuyMachine from '../HomePage/SecondPage/SVGs/BuyMachine'
import Servicing from '../HomePage/SecondPage/SVGs/Servicing'
import SafetyFaq from '../SubComponent/AllSvgs/SafetyFaq'
import InstallationFaq from '../SubComponent/AllSvgs/InstallationFaq'
import WsFaq from '../SubComponent/AllSvgs/WsFaq'
import Orderfaq from '../SubComponent/AllSvgs/Orderfaq'
const Faq = () => {
  const [isActive,setIsActive]=useState(0);
  
  const [searchInput, setSearchInput] = useState('');
  const faqs=[{heading:"What is an Operating lease?",
  ans:"An operating lease is a contract wherein the owner, called the Lessor, permits the user, called the Lessee, to use an asset for a particular period without any transfer of ownership rights"},
  {heading:"What are the benefits of operating a lease to a lessee?",
ans1:[{title:"Minimises risk of obsolescence",para:"Rapid technology development in the present era has increased the risk of obsolescence in some industries. The manufacturers have to change their equipment to ensure high productivity or to improve the quality of the product."},
{title:"Ideal when there are limited use needs",para:"It doesn’t make sense to make a large cash outlay for an asset that will only be used for a short period."},
{title:"Preserves capital and eases borrowing problems",para:"With a lease, the lessee can avoid a hefty up-front charge and can make payments as you generate cash flow with your new asset."},
{title:"Provides access to added technical or administrative services",para:"Users lacking staff or expertise of handling specialised equipment can get support from the lessor."},
{title:"Tax benefits of leasing",para:"A lease allows the lessee to deduct the payments as operating expenses during the period in which they are paid. If the lessee purchases the asset, interest as well as depreciation may be deducted. In most cases, lease tax benefits turn out to be higher."},
{title:"Inflation hedge",para:"With the lease, an asset can be bought at today’s price and the payments can be made from tomorrow’s earnings, which provides an inflation hedge."},
{title:"Protects lessee’s balance sheet",para:"Generally, an asset purchased increases the debt and reduces the available cash. In contrast, leases are not recorded as debt and are treated as an operating expense."},
{title:"Improves lessee’s balance sheet ratio",para:"Lease payments are accounted as operating expenses, as a result the company’s profits to fixed assets ratio improves. This in turn permits greater bank borrowing capacity, in some cases"}

]
},
  {heading:"Who owns the equipment in the Operating lease?",
  ans:"Origa will be the owner of the equipment for the lease term"},
  {heading:"How do I apply for a lease?",
  ans:"You can contact us at +918828099099 ( 9 AM to 9 PM IST)"},
  {heading:"In how many days will my lease request be sanctioned?",
  ans:"If all documents are in place, we can sanction within 7 days"},
  {heading:"Do I need to provide collateral to avail of a lease?",
  ans:"No collateral is required. You only pay a security deposit which is a small percentage of the value of the equipment"},
 {heading:"When will I receive the equipment?",
 ans:"Once the applicant's lease request is approved, we issue a sanction letter. Once the sanction letter is issued the applicant is required to pay the security deposit. After receipt of the security deposit, payment is released by Origa to the OEM/ dealer and he delivers the equipment to the applicant."},
 {heading:"What documents are required to apply for a lease?",
 ans:"Minimum documents required: KYC documents, Financial documents: ITR for past 3 years, Bank statements: for the last 6 months, Sanction letters for other finance availed"},
 {heading:"Can I buy the equipment at the end of the lease term?",
 ans:"Yes, you can. We provide an option to return and upgrade with better equipment, re-lease for a substantially lower amount, or keep the equipment instead of the security deposit"},
 {heading:"Is this a legally and regulatory-compliant way of financing?",
 ans:"It is 100% legal and compliant with regulations to lease. We are a RBI registered NBFC. (link on RBI website)"},
 {heading:"Which machines do you service?",ans:"We specialise in servicing CNC, VMC, HMC, Lathe, and Wirecut machines."},
  {heading:"Which Controller do you service?",ans:"Our expertise extends to servicing Siemens, Fanuc, Mitsubishi, and Delta controllers."},
  {heading:"What kind of services do you offer?",ans:"We provide comprehensive mechanical and electrical services."},
  {heading:"How do I request a quote?",ans:"Just click on the \"request a call\" button, and we'll respond promptly to provide a quote."},
  {heading:"What is your typical lead time?",ans:"Expect a response within 24 hours of your inquiry"},
  {heading:"What are your additional services?",ans:"We also offer assessments for hazardous situations, kaizen improvements, and parts observation."},
  {heading:"Can you provide basic maintenance training to our engineers?",ans:"Absolutely, yes."},
]
  const faqData = [
    { title: "Buy machines", imageSource:<BuyMachine/> },
    { title: "Loan or Lease Machines", imageSource: <Servicing/> },
    { title: "Service & Maintenance", imageSource: <SafetyFaq/>},
    { title: "Sell Machines", imageSource: <InstallationFaq/> },
    { title: "Tools, Spare and Consumables", imageSource: <WsFaq/> }/* ,
    { title: "Ordering & Shipping", imageSource:<Orderfaq/> } */
  ]
  const list=[[{heading:"	How can I ensure the accuracy of the evaluation of the used machine?",
  ans:"We conduct a thorough 50-point quality check by experts, and the inspection report is shared with the client beforehand to ensure transparency and accuracy."},
  {heading:"Do you provide a warranty or guarantee for the used machines you sell?",
  ans:"No, we do not offer warranties or guarantees for our used machines."},
  {heading:"	How recently was the inventory of used machines updated?",
  ans:"Our inventory is updated on a daily basis to provide you with the most current listings."},
  {heading:"	Do you provide machine reconditioning services?",
  ans:"Yes, we offer machine reconditioning services to ensure optimal performance and longevity of the machines."},
  {heading:"What types of machines do you sell?",
  ans:"We sell all kinds of machine tooling and healthcare machines to cater to various industries and needs."},
 {heading:"	Do you provide installation and de-installation services?",
 ans:"Yes, we offer installation and de-installation services for the machines purchased from us to ensure proper setup and operation."},
 {heading:"	Which areas or regions do you operate in?",
 ans:"We have operations across India, serving customers pan India with our comprehensive services and quality products."}
],
[{heading:"What is an Operating lease?",
  ans:"An operating lease is a contract wherein the owner, called the Lessor, permits the user, called the Lessee, to use an asset for a particular period without any transfer of ownership rights"},
   {heading:"What are the benefits of operating a lease to a lessee?",
ans1:[{title:"Minimises risk of obsolescence",para:"Rapid technology development in the present era has increased the risk of obsolescence in some industries. The manufacturers have to change their equipment to ensure high productivity or to improve the quality of the product."},
{title:"Ideal when there are limited use needs",para:"It doesn’t make sense to make a large cash outlay for an asset that will only be used for a short period."},
{title:"Preserves capital and eases borrowing problems",para:"With a lease, the lessee can avoid a hefty up-front charge and can make payments as you generate cash flow with your new asset."},
{title:"Provides access to added technical or administrative services",para:"Users lacking staff or expertise of handling specialised equipment can get support from the lessor."},
{title:"Tax benefits of leasing",para:"A lease allows the lessee to deduct the payments as operating expenses during the period in which they are paid. If the lessee purchases the asset, interest as well as depreciation may be deducted. In most cases, lease tax benefits turn out to be higher."},
{title:"Inflation hedge",para:"With the lease, an asset can be bought at today’s price and the payments can be made from tomorrow’s earnings, which provides an inflation hedge."},
{title:"Protects lessee’s balance sheet",para:"Generally, an asset purchased increases the debt and reduces the available cash. In contrast, leases are not recorded as debt and are treated as an operating expense."},
{title:"Improves lessee’s balance sheet ratio",para:"Lease payments are accounted as operating expenses, as a result the company’s profits to fixed assets ratio improves. This in turn permits greater bank borrowing capacity, in some cases"}

]
},
  {heading:"Who owns the equipment in the Operating lease?",
  ans:"Origa will be the owner of the equipment for the lease term"},
  {heading:"How do I apply for a lease?",
  ans:"You can contact us at +918828099099 ( 9 AM to 9 PM IST)"},
  {heading:"In how many days will my lease request be sanctioned?",
  ans:"If all documents are in place, we can sanction within 7 days"},
  {heading:"Do I need to provide collateral to avail of a lease?",
  ans:"No collateral is required. You only pay a security deposit which is a small percentage of the value of the equipment"},
 {heading:"When will I receive the equipment?",
 ans:"Once the applicant's lease request is approved, we issue a sanction letter. Once the sanction letter is issued the applicant is required to pay the security deposit. After receipt of the security deposit, payment is released by Origa to the OEM/ dealer and he delivers the equipment to the applicant."},
 {heading:"What documents are required to apply for a lease?",
 ans:"Minimum documents required: KYC documents, Financial documents: ITR for past 3 years, Bank statements: for the last 6 months, Sanction letters for other finance availed"},
 {heading:"Can I buy the equipment at the end of the lease term?",
 ans:"Yes, you can. We provide an option to return and upgrade with better equipment, re-lease for a substantially lower amount, or keep the equipment instead of the security deposit"},
 {heading:"Is this a legally and regulatory-compliant way of financing?",
 ans:"It is 100% legal and compliant with regulations to lease. We are a RBI registered NBFC. (link on RBI website)"}
],[
  {heading:"Which machines do you service?",ans:"We specialise in servicing CNC, VMC, HMC, Lathe, and Wirecut machines."},
  {heading:"Which Controller do you service?",ans:"Our expertise extends to servicing Siemens, Fanuc, Mitsubishi, and Delta controllers."},
  {heading:"What kind of services do you offer?",ans:"We provide comprehensive mechanical and electrical services."},
  {heading:"How do I request a quote?",ans:"Just click on the \"request a call\" button, and we'll respond promptly to provide a quote."},
  {heading:"What is your typical lead time?",ans:"Expect a response within 24 hours of your inquiry"},
  {heading:"What are your additional services?",ans:"We also offer assessments for hazardous situations, kaizen improvements, and parts observation."},
  {heading:"Can you provide basic maintenance training to our engineers?",ans:"Absolutely, yes."},
],[
  {heading:"What types of machine tooling  and healthcare equipment are you interested in acquiring?",
  ans:"We are open to considering various types of machine tooling, including CNC, VMC, milling machines, lathes, routers, and more. In healthcare, we are interested in medical imaging equipment, diagnostic devices, patient monitoring systems, and others."},
  {heading:"What condition do the machines need to be in for you to consider purchasing them?",
  ans:"While we prefer machines in good working condition, we also consider those that may require minor repairs or refurbishment. However, the extent of repairs needed will influence our decision."},
  {heading:"How do you determine the value of used CNC and healthcare machines?",
  ans:"The value of used machines is assessed based on factors such as age, condition, brand, functionality, and market demand. We may also consider the cost of potential refurbishment or repairs."},
  {heading:"What documentation do you require from sellers?",
  ans:"We typically require documentation such as photos, maintenance records, service history, manuals, and any relevant certifications or compliance documentation."},
  {heading:"Do you offer pickup or should sellers arrange transportation of the machines?",
  ans:"	Depending on the location and size of the machines, we may arrange for pickup or request sbuyers to organize transportation. We'll discuss logistics on a case-by-case basis."},
  {heading:"Are there any specific brands or models you're particularly interested in?",
  ans:"	While we're open to various brands and models, we may have preferences based on market demand, compatibility with existing equipment, and our customers' needs. Feel free to inquire about specific models."},
  {heading:"How can I initiate the process of selling or giving you my used machines?",
  ans:"	If you have used CNC or healthcare machines you'd like to sell, please visit our sell page and submit machine details or contact our purchasing department. You can reach us by phone, email, or through our website, and we'll guide you through the process."},
]]
const filteredList = faqs.filter(item =>
  item.heading.toLowerCase().includes(searchInput.toLowerCase()) ||
  (item.ans && item.ans.toLowerCase().includes(searchInput.toLowerCase()))
);

console.log("searchF===>>>",filteredList);
useEffect(() => {
  window.scrollTo(0,0)
}, [])

  return (<>
    <div className='container-fluid tablet-d-padding bg-gray pb-5'>
      <div className="max-container d-f-cc pl-0 pr-0 pt-5">

        <h1 className='heading-600-44-20 pt-5'>Have any Questions?</h1>
        <Container className='p-0' style={{maxWidth:"774px"}}>
        <Search1 message={"Search for a Question"} left={true} onInputChange={(e) => setSearchInput(e.target.value)}/>
        </Container> 
       
      {filteredList.length===17 && <Container fluid className='p-0 d-f-g-1 mt-5 mb-5 mlr-0'>
        {faqData.map((product,index)=>(<FaqService index={index} title={product.title} imageSource={product.imageSource} onCallFun={()=>setIsActive(index)} activediv={isActive===index ? "faqs-click":""}/>))}
      </Container>}
    
  </div>

    </div>

    <div className='container-fluid tablet-d-padding'>
    <div className='max-container '>
   {filteredList.length===17 ? <> <div>
      <h1 className='heading-600-32-20 mt-5 w-100 pt-5 mb-2 text-center'>Here are some of the most frequently asked questions</h1>
      <div className='hide-992 w-67 h-center'>
      {isActive<4 && <FAQs list={list[isActive]}/>}
     </div>
     <div className='show-992 container p-0'>
     {isActive<4 && <FAQs list={list[isActive]}/>}
     </div>
   </div>
   <FaqBottom/>
   </>
   :<div>
   <div className='hide-992 w-67 h-center'>
      <FAQs list={filteredList}/>
     </div>
     <div className='show-992 container p-0'>
     <FAQs list={filteredList}/>
     </div>

   </div>
   
   }
   
  </div>
 
    </div> 
    <div className='text-end pb-3'>
    <img src='/asset/Frame1000004018.png' alt='Frame1000004018.png'/>
    </div>
    <Footer/>
    </>
  )
}

export default Faq