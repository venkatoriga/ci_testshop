import React from 'react'
import { useNavigate } from 'react-router-dom';

const NewBuyfirstSection = ({benifit}) => {
    const navigate = useNavigate();

  return (
    <div className='container-fluid'>
    <div className='max-container fpb-5'>
    <div className=" row col-reverse-service">
    <div className="col-lg-5 col-md-12 d-flex align-items-center">

        <div className='step-p-16'>
        <img src={benifit.step1} alt={benifit.step1}/>
            <h1 className="heading-600-24-20 mb-12 ">{benifit.title1}</h1>
            <p className="heading-400-16-14 op-80">{benifit.para1}</p>
            <div className='btn-left-to-right-992' style={{paddingTop:"4px"}}>
                <button className="button heading-600-16-14" onClick={ () => navigate(`/buy/product-listing?searchInput=${''}`)} >{benifit.btn1}</button>
            </div>
        </div>

    </div>
    <div className="col-lg-7 col-md-12">
        <div className="text-end">
            <img src={benifit.imageurl1} alt={benifit.imageurl1} className="img-fluid" />
        </div>
    </div>
</div>
<div className="row mt-60 ">
    <div className="col-lg-7 col-md-12">
        <div className="f">
            <img src={benifit.imageurl2} alt={benifit.imageurl2}  className="img-fluid" />
        </div>
    </div>
    <div className="col-lg-5 col-md-12 d-flex align-items-center">
        <div className='step-p-16'>
        <img src={benifit.step2} alt={benifit.step2}/>
            <h1 className="heading-600-24-20 ">{benifit.title2}</h1>
            <p className="heading-400-16-14 op-80">{benifit.para2}</p>
            <div className='btn-left-to-right-992' style={{paddingTop:"4px"}}>
                <button className="button" onClick={ () => navigate(`/buy/product-listing?searchInput=${''}`)} >{benifit.btn2}</button>
            </div>
        </div>
    </div>
</div>
<div className=" row mt-60 col-reverse-service">
<div className="col-lg-5 col-md-12 d-flex align-items-center">

    <div className='step-p-16'>
    <img src={benifit.step3} alt={benifit.step3}/>
        <h1 className="heading-600-24-20 mb-12">{benifit.title3}</h1>
        <p className="heading-400-16-14 op-80">{benifit.para3}</p>
        <div className='btn-left-to-right-992' style={{paddingTop:"4px"}}>
            <button className="button heading-600-16-14" onClick={ () => navigate(`/buy/product-listing?searchInput=${''}`)} >{benifit.btn3}</button>
        </div>
    </div>

</div>
<div className="col-lg-7 col-md-12">

    <div className="text-end">
        <img src={benifit.imageurl3} alt={benifit.imageurl3} className="img-fluid" />
    </div>
</div>
</div>
{benifit?.title4 && <div className="row mt-60">
<div className="col-lg-7 col-md-12">
    <div className="f">
        <img src={benifit.imageurl4} alt={benifit.imageurl4} className="img-fluid" />
    </div>
</div>
<div className="col-lg-5 col-md-12 d-flex align-items-center">
    <div className='step-p-16'>
    <img src={benifit.step4} alt={benifit.step4}/>
        <h1 className="heading-600-24-20">{benifit.title4}</h1>
        <p className="heading-400-16-14 op-80">{benifit.para4}</p>
        <div className='btn-left-to-right-992' style={{paddingTop:"4px"}}>
            <button className="button" onClick={ () => navigate(`/buy/product-listing?searchInput=${''}`)} >{benifit.btn4}</button>
        </div>
    </div>
</div>
</div>}
    </div>
    </div>
  )
}

export default NewBuyfirstSection