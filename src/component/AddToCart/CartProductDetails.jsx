import React,{useState} from 'react'
import ButtonActive from '../Button/ButtonActive'
import BuyButton from '../Button/BuyButton'
import Heart from '../SubComponent/AllSvgs/Heart'
import Checkbox from '../SubComponent/AllSvgs/Checkbox'
const CartProductDetails = ({ productData }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [onCheckBox,setOnCheckBox]=useState(false);
    const [count,setCount]=useState(1);

    const onMouseEnterhandler = (value) => {
        setIsHovered(value);
      };
    
      const onMouseLeavehandler = (value) => {
        setIsHovered(value);
      };
      const onCheckBoxHandler=(event)=>{
        setOnCheckBox(!onCheckBox);
        event.stopPropagation();
      }
      const onDecreaseAmount=()=>{
        if(count===1)return
        setCount((prev)=>prev-1);
      }
      const onIncreaseAmount=()=>{
        setCount((prev)=>prev+1);
      }
    // if (!productData) {
    //     return <div>Loading...</div>; // You can also display a loading message or handle the case when data is not available yet.
    // }
    // console.log(productData,"Card added")

    return (
        <div className={`container-fluid p-0 m-0 row mb-4 border border-8p ${isHovered ? 'bg-green':null} `} onMouseEnter={()=>onMouseEnterhandler(true)}
        onMouseLeave={()=>onMouseLeavehandler(false)}>
            <div className='col col-md-5  d-flex'>
           <div className='pt-3 m-0'>
           <div><Heart fill={`${isHovered ? '#73509E':""}`}/></div>
           <div><img src="asset/yourorder.png" alt="yourorder.png" /></div>
                
            <div><p className='heading-600-16 text-center pt-4'>Buy 2 get 10% off</p></div>
           </div>
            </div>

            <div className='col col-md-6 col-12'>
                <div className='row pt-3'>
                    <div className='col d-flex'>
                        <ButtonActive message={"Active"} />
                        <p className='pl-2 heading-400-14 v-center'>Valid till  <span className='heading-600-14'>23 July 2024</span></p>
                    </div>
                    
                </div>
                <div className='row pt-2'>
                    <div className='col col-lg-12 '>
                         <h1 className='heading-600-20'>STAR Annual maintenance contract (AMC) plan for Hitachi CNC machine </h1>
                        {/*{productData.name} */}
                    </div>
                </div>


                <div className='row  pb-3 pt-3'>
                    <div className='col col-12 heading-600-20 align-self-center'>₹5,449</div>
                    <div className='col col-12 '>
                    <p className='heading-400-14-12 op-80'>MRP<strike className='pl-1'> ₹6,499</strike> <span className='c-active'>66% Off</span></p> </div>
                    <div className='col col-md-7 '>
                        <div className='row d-flex '>
                            <div className='col col-4'><BuyButton message={"-"} callFunction={onDecreaseAmount}/></div>
                            <div className='col col-4 text-center v-center heading-600-20'>{count}</div>
                            <div className='col col-4 p-0'><BuyButton message={"+"} callFunction={onIncreaseAmount}/></div>
                        </div>
                    </div>

                </div>

            </div>
            <div className={`col col-md-1 p-0 m-0 d-j-a ${isHovered ? 'bg-white':null}`}>
            <div className="check-box d-j-a" onClick={onCheckBoxHandler}>
            <Checkbox fill={onCheckBox ? "#000000" :"#FFFFFF"}/>
          </div>
            </div>
        </div>
    )
}

export default CartProductDetails