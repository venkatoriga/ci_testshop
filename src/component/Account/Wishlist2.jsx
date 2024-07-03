import React,{useState} from 'react'

import CategoryPopup from './Popup/CategoryPopup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Breadcrumbs from '../SubComponent/Breadcrumbs';
import WishlistRatingBlock from '../SubComponent/AllBlock/WishlistRatingBlock';
import { useLocation, useNavigate } from 'react-router-dom';
import { filterIcon } from '../../helpers/Icons';
const Wishlist2 = () => {
  const [showModel,setShowModel]=useState(false);
  const location=useLocation();
  const navigate=useNavigate();
  const breadcrumbsItems = [ { name: "Home page", link: "/" }, { name: "My Account", link: "/myaccount" }];
  const boldtitle="My Machines";

   
    const{state}=location;
    const onFilterHandler=()=>{setShowModel(!showModel)}
    // console.log("state 2==>>",state.productData);
    const currentMachines=state.productData
  return (
    <div className='container-fluid m-0'>
     {showModel && <CategoryPopup onHide={onFilterHandler}/>}
    <div className='max-container pt-4'>
    <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} backnavi={()=>navigate('/wishlist')}/>
    <div className='pt-5'>
    
    <h1 className='heading-600-44-24'>Wish-listed Products in Store</h1>
    <p className='heading-400-16-14 op-60'>From Machines to tools to finance everything you need in one place</p>
    </div>
    
    {/*dropdown button*/}
    <div className='hide-992'>
    <div className='container-fluid p-0 m-0 row d-flex justify-content-end'>
    <div className='col col-md-auto'>
    <DropdownButton id="dropdown-basic-button" className='dropdown-button' title="Price">
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </DropdownButton>
    </div>
    <div className='col col-md-auto'>
    <DropdownButton id="dropdown-basic-button" className='dropdown-button' title="Category">
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </DropdownButton>
    </div>
    <div className='col col-md-auto'>
    <DropdownButton id="dropdown-basic-button" className='dropdown-button' title="Brand">
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </DropdownButton>
    </div>
    <div className='col col-md-auto'>
    <DropdownButton id="dropdown-basic-button" className='dropdown-button' title="Sub category">
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </DropdownButton>
    </div>
    
        
    </div>
    </div>
    <div className='show-992'> 
    <div className='container-fluid p-0 m-0 row d-flex justify-content-end'>
    <button className=" button-outline" onClick={onFilterHandler}>{filterIcon({width:22,height:22,fill:"#73509E"})}All Filters</button>
    </div> 
    </div>
    </div>
{/*product list*/}

<div className='max-container pt-5'>



  {currentMachines.length > 0 ? (
    <div className='d-flex flex-wrap'>
    {currentMachines.map((store,index) => (
      <div className='container-fluid p-0 m-0' style={{height:"500px",maxWidth:'350px'}} key={index}>
        <WishlistRatingBlock product={store}/>
        </div>
    ))}
</div>
  ) : (
    <div>No Data</div>
  )}
  


</div>
    </div>
  )
}

export default Wishlist2