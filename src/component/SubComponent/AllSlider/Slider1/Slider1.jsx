import React,{ useState,useRef,useEffect } from 'react'
import { Container } from 'react-bootstrap';
import AllOrigaService from '../../../OrigaService/AllOrigaService';
import VectorBlock from '../../../Vector/VectorBlock';
import ProductBlock from '../../../Annual/Block/ProductBlock';
const Slider1 = ({imageUrl,heading,para,listOfData}) => {
    const [box, setBox] = useState(0);
    const sliderRef = useRef(null);
    const btnpressprev = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
        console.log(width)
    }

    const btnpressnext = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft + width;
        console.log(width)
    }

    useEffect(() => {
        setBox(sliderRef.current);
    }, [])
  return (
    <Container fluid className="pt-5">
    <div className='max-container pt-5'>
       <div className='row d-flex flex-column'>
       <AllOrigaService imageurl={imageUrl}/>
        <div className='row pr-0'>
        <div className='col col-lg-10 col-12'>
       
        <h1 className='heading-600-44-20'>{heading}</h1>
        <p className='heading-400-20-14 op-80'>{para}</p>
    </div>
    <div className='col col-lg-2 d-flex justify-content-end pr-0 '>
    <div className="hide-992 p-0"> <VectorBlock onMoveLeft={btnpressprev} onMoveRight={btnpressnext} /></div>
    </div>
        </div>
       
       </div>   
    </div>

    <div className="xmax-container sixthSectionSlider " ref={sliderRef}>
        {
            listOfData.map((product, index) => (
               <ProductBlock
                    id={product.id}
                    key={index}
                    title={product.name}
                    price={product.price}
                    plan={product.plan}
                    imageUrl={product.plan_image}
                    border={true}
                />
             
            ))
        }
    </div>
    <div className='show-992 h-center w-fit'><VectorBlock onMoveLeft={btnpressprev} onMoveRight={btnpressnext} /></div>
</Container>
  )
}

export default Slider1