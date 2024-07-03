import React from 'react'
import { Container } from 'react-bootstrap'
import Inspection from '../SubComponent/AllSvgs/Inspection'
import Servicing from '../HomePage/SecondPage/SVGs/Servicing'
import Finance from '../SubComponent/AllSvgs/Finance'
import Transportation from '../SubComponent/AllSvgs/Transportation'
import ListofServiceWithoutdes from '../HomePage/Eighth/ListofserviceWithoutdes/ListofServiceWithoutdes'
const BuySectionSeven = () => {
    const listofData=[{
        svgcode:<Inspection/>,
        title:"Financial Services",
        para:'Acquire equipment hassle-free through our leasing or loan options',
        url: "https://www.origaleasing.com/en/"
    },{
        svgcode:<div className='op-60'><Servicing/></div>,
        title:"Transportation",
        para:'Experience the convenience of equipment delivery at any location across India',
        url: ''
    },{
        svgcode:<Finance/>,
        title:"Commissioning & Decommissioning",
        para:'Ensure seamless functionality with our expert team handling the installation and decommissioning of equipment',
        url: ''
    },{
        svgcode:<Transportation/>,
        title:"Equipment Maintenance",
        para:'Keep your operations running smoothly with one-call access to preventive maintenance, breakdown services, and Annual Maintenance Contracts (AMC). ',
        url: ''
    }];
    const handleClick = (url) => {
      if (url.trim() !== '') {
        window.open(url, "_blank");
      }
    };
  return (
    <div>
    <div className='max-container pt-5'>
        <Container className="secondsection pt-4">
          
          <h1 className='heading-600-44-20 text-center'>Unlock additional services</h1>
          <p className="heading-400-16-14 text-center op-80">Experience the full range of benefits with our premium service offering.</p>
        </Container>
       

        <div className="container-fluid p-0 m-0 row pt-5">
          {listofData.map((product, index) => (
            <div className="col-lg-3 col-md-5 col-6 ">
              <ListofServiceWithoutdes key={index} svgcode={product.svgcode} title={product.title} para={product.para} onClick={() => handleClick(product.url)}/>
            </div>
          ))}
        </div>

     
        </div>
    </div>
  )
}

export default BuySectionSeven