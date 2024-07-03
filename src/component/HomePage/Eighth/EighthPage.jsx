import React from 'react'
import './Eighth.css'
import { Container } from 'react-bootstrap'
import ListofServiceWithoutdes from './ListofserviceWithoutdes/ListofServiceWithoutdes'
import DollerWithStar from '../../SubComponent/AllSvgs/DollerWithStar'
import TickWithBox from '../../SubComponent/AllSvgs/TickWithBox'
import ThumbsUpWithThreeCircle from '../../SubComponent/AllSvgs/ThumbsUpWithThreeCircle'
import CircleArrow from '../../SubComponent/AllSvgs/CircleArrow'
import TickWithFirstFinger from '../../SubComponent/AllSvgs/TickWithFirstFinger'
const EighthPage = () => {
  const listofData = [
    {
      svgcode: <DollerWithStar/>,
      title: "One stop solution for equipment life cycle management"
    },
    {
      svgcode: <TickWithBox/>,
      title: "Tech enabled approach"
    },
    {
      svgcode: <ThumbsUpWithThreeCircle/>,
      title: "Decade-Long Expertise"
    },
    {
      svgcode:<CircleArrow/>,
      title: "Client-Centric Focus"
    }, {
      svgcode:<TickWithFirstFinger/>,
      title: "Transparent communication"
    }
  ]
  return (
    <Container fluid>
        <div className='max-container pt-4'>
        <Container className="text-center pt-5 ">
          
          <h1 className='heading-600-44-20 text-center c-green'>Think Equipment. Think Origa!</h1>
          <p className="heading-400-16 text-center op-80 pt-2">Choose Origa for expertise you can trust and service you deserve</p>
        </Container>
        

        <Container fluid className="eightsection-list pt-5">

         <div className='w-100'>
         <div className="row p-0 d-flex j-content-between-center">
            {listofData.map((product, index) => (
              <div className="col-lg-2 col-md-6 col-6 p-0">
                <ListofServiceWithoutdes key={index} svgcode={product.svgcode} para={product.title} />
              </div>
            ))}
           
          </div>
         </div>

        </Container>
      </div>
   
    </Container>
  )
}

export default EighthPage