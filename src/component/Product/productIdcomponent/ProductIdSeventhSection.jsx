import React,{useState,useEffect} from 'react'
import Slider7 from '../../SubComponent/AllSlider/Slider7';
import PlanBlock from '../../SubComponent/AllBlock/PlanBlock';
const ProductIdSeventhSection = (productData) => {

    console.log('productData---->', productData?.productData);
    const [similarplans, setsimilarplans] = useState([]);
    const fetchProductDetails = async () => {
        const machineTypePayload = JSON.stringify({
            type: productData?.productData?.type,
            amc_plan_id: productData?.productData?.amc_plan_id
        });
        const response = await fetch('https://contacts.origaleasing.com/basedonTypefetchOncallServiceDetails', {
            method: 'POST',
            body: machineTypePayload,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await response.json();
        setsimilarplans(responseData?.jsondata)
        console.log('responseData************>>>>', responseData?.jsondata);
    };

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const productBlock= <PlanBlock/>;
    const breakpoints={
        a:3.3,
        b:2.4,
        c:2.1,
        d:1.5,
        e:1.1
      }
    const heading = "Similar Plans";
    const para =
        "From Machines to tools to finance everything you need in one place";
        const containerData = similarplans?.map(plan => ({
            id: plan.id,
            title: plan.name,
            price: `₹${plan.price}`,
            message: plan.description[0],
            discount: plan.gst_percent,
            productQuentity: 200,
            imageUrl: plan.plan_image,
          }));

    
          // Use containerData in your component
          console.log('containerData:', containerData);
  return (
    <div>
         <div className="xmax-container pt-3 tablet-d-padding ">
                        <div className='max-container p-0 pt-5 pb-5'>
                      
                            <h1>{heading}</h1>
                            <p>{para}</p>
                        </div>

                  
                        <Slider7 listofdata={containerData} productCategory={productBlock} breakpoints={breakpoints}/>
                        
                </div>
    </div>
  )
}

export default ProductIdSeventhSection