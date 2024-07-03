import React,{useState,useEffect,useRef} from 'react';
import VectorBlock from '../../Vector/VectorBlock';
import { Container } from 'react-bootstrap';
const UnfortunatelySecondSetion = () => {
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
    const listOfData=[{title:"Mumbai",message:"Over 500 service done",imageUrl:'asset/Mumbai.png'},{title:"Pune",message:"Over 500 service done",imageUrl:'asset/Pune.png'},{title:"Banglore",message:"Over 500 service done",imageUrl:'asset/Banglore.png'},{title:"Mumbai",message:"",imageUrl:'asset/Mumbai.png'}]
    useEffect(() => {

        setBox(sliderRef.current);
    }, [])
  return (
    <Container fluid className="pt-5">
    <div className='max-container pt-5'>
       <div className='container-fluid p-0 m-0 row '>
      
        <div className='row pr-0'>
        <div className='col col-lg-10 col-12 p-0'>
       
        <h1 className='heading-600-44-20'>We offer this service across 52 locations!</h1>
        <p className='heading-400-20-14 op-80'>From Machines to tools to finance everything you need in one place</p>
    </div>
    <div className='col col-lg-2 d-flex justify-content-end pr-0 '>
    <div className="hide-992 p-0"> <VectorBlock onMoveLeft={btnpressnext} onMoveRight={ btnpressprev} /></div>
    </div>
        </div>
       
       </div>
       
       
      
    </div>

    <div className="sixthSectionSlider xmax-container p-0" ref={sliderRef}>
        {
            listOfData.map((product, index) => (
                <div className='unfortunately-image-block' key={index}>
                      <img src={product.imageUrl}  alt={product.imageUrl} />
                    <div className='pt-3'>
                      <p className='heading-600-20-16 w-fit h-center'>{product.title}</p>
                       <p className='heading-400-14-16 op-80 w-fit h-center'>{product.message}</p>
                    </div>
                </div>
            ))
        }
    </div>
    <div className='show-992 h-center w-fit'><VectorBlock onMoveLeft={btnpressnext} onMoveRight={btnpressprev} /></div>
</Container>
  )
}

export default UnfortunatelySecondSetion