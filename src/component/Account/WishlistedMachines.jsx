import React,{useState} from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Breadcrumbs from '../SubComponent/Breadcrumbs';
import {useLocation, useNavigate } from 'react-router-dom';
import HeartProductCategory from '../SubComponent/AllBlock/HeartProductCategory';
import { filterIcon } from '../../helpers/Icons';
import CategoryPopup from './Popup/CategoryPopup';
const WishlistedMachines = () => {
  const [showModel,setShowModel]=useState(false);
    const breadcrumbsItems = [ { name: "Home page", link: "/" }, { name: "My Account", link: "/myaccount" }];
    const navigate=useNavigate();
    const location=useLocation();
    const{state}=location;
    console.log("wishlisted machine===>>>",state.productData);
    const boldtitle="My Machines";
    const currentMachines =state.productData

    const onFilterHandler=()=>{
setShowModel(!showModel)
    }
  
    return (
    <div className='container-fluid m-0'>
    {showModel && <CategoryPopup onHide={onFilterHandler}/>}
    <div className='max-container pt-4'>
    <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} backnavi={()=>navigate('/wishlist')} />
    <div className='pt-5'>
    <h1 className='heading-600-44-24'>Wishlistetd  Machines</h1>
    <p className='heading-400-16-14 op-60'>From Machines to tools to finance everything you need in one place</p>
    </div>
    
    {/*dropdown button*/}
    {/*<div className='hide-992'>
        <div className='container-fluid p-0 m-0 row d-flex justify-content-end'>
        <div className='col col-md-auto'>
          <DropdownButton id="dropdown-basic-button" className='dropdown-button' title="Category">
            <Dropdown.Item href="#/action-1">AMC</Dropdown.Item>
            <Dropdown.Item href="#/action-2">VMC</Dropdown.Item>
            <Dropdown.Item href="#/action-3">CMC</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className='col col-md-auto'>
          <DropdownButton id="dropdown-basic-button" className='dropdown-button' title="Brand">
            <Dropdown.Item href="#/action-1">Brand1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Brand2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Brand3</Dropdown.Item>
          </DropdownButton>
        </div>
        <div className='col col-md-auto'>
          <DropdownButton id="dropdown-basic-button" className='dropdown-button' title="Sub category">
            <Dropdown.Item href="#/action-1">Sub category1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Sub category2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Sub category3</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
    </div>*/}
    {/* <div className='show-992'> 
    <div className='container-fluid p-0 m-0 row d-flex justify-content-end'>
    <button className=" button-outline" onClick={onFilterHandler}>{filterIcon({width:22,height:22,fill:"#73509E"})}All Filters</button>
    </div> 
    </div> */}

<div className='max-container pt-5'>

{currentMachines.length > 0 ? (
  <div className='d-flex between-to-center flex-wrap'>
      {currentMachines.map((machine,index) => (
        <div className='container-fluid m-0 p-0' style={{height:"500px",maxWidth:"350px"}} key={index}>
          <HeartProductCategory product={machine} index={index}/>
          </div>
      ))}
  </div>
) : (
  <div>No Data</div>
)}

</div>

    </div>
    
    </div>
  )
}

export default WishlistedMachines