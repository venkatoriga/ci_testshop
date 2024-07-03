import React from 'react'

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Breadcrumbs from '../SubComponent/Breadcrumbs';
import WishListBlock from '../SubComponent/AllBlock/WishListBlock';
import { useNavigate } from 'react-router-dom';
import AccountFooter from './AccountFooter';
const Wishlist3 = () => {
    const navigate=useNavigate();
    const breadcrumbsItems = [ { name: "Home page", link: "/" }, { name: "My Account", link: "/myaccount" }];
    const boldtitle="My Machines";
    const containerData = [
        {
            title: "PRO Plan",
            price:'₹25,000',
            message: "Get a one time repair service if your machin has broken down",
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png",

        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png",
        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png",
        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png",
        },
        {
            title: "PRO Plan",
            price:'₹25,000',
            message: "Get a one time repair service if your machin has broken down",
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png",

        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png",
        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "/asset/machine-half.png",
        }, {
            title: "PRO Plan",
            price:'₹25,000',
            message: 'Get a one time repair service if your machin has broken down',
            discount: 25,
            productQuentity: 200,
            imageUrl: "asset/machine-half.png",
        }
    ];
  return (<>
    <div className='container-fluid m-0'>
    <div className='max-container pt-4'>
    <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle}  backnavi={()=>navigate('/wishlist')}/>
    <div className='pt-5'>
    
    <h1 className='heading-600-44-24'>Wishlisted  Machines</h1>
    <p className='heading-400-16-14 op-60'>From Machines to tools to finance everything you need in one place</p>
    </div>
    
    {/*dropdown button*/}
    <div className='container-fluid p-0 m-0 row d-flex justify-content-end'>
    <div className='col col-md-auto'>
    <DropdownButton id="dropdown-basic-button" className='dropdown-button' title="Price">
    <Dropdown.Item href="#/action-1">₹10000</Dropdown.Item>
    <Dropdown.Item href="#/action-2">₹100000</Dropdown.Item>
    <Dropdown.Item href="#/action-3">₹1000000</Dropdown.Item>
  </DropdownButton>
    </div>
    <div className='col col-md-auto'>
    <DropdownButton id="dropdown-basic-button" className='dropdown-button' title="Machine">
    <Dropdown.Item href="#/action-1">AMC</Dropdown.Item>
    <Dropdown.Item href="#/action-2">VMC</Dropdown.Item>
    <Dropdown.Item href="#/action-3"> CMC</Dropdown.Item>
  </DropdownButton>
    </div>
    
    
        
    </div>
    
    </div>
{/*product list*/}

<div className='max-container pt-5'>

<div className='d-flex  flex-wrap '>
      {containerData.map((product,index) => (
        <div className='container-fluid m-0 p-0' style={{height:"500px",maxWidth:"400px"}} key={index}>
         <WishListBlock product={product}/>
          </div>
      ))}
  </div>
</div>
    </div>
    <AccountFooter/>
    </>
  )
}

export default Wishlist3