import React, { useEffect, useState } from 'react'
import MyAccountAccordian from './MyAccountAccordian'
import AccountFooter from './AccountFooter'
import { useNavigate } from 'react-router-dom'
import Slash from '../SubComponent/Slash'
import LeftArrow from '../SubComponent/LeftArrow'
import Breadcrumbs from '../SubComponent/Breadcrumbs'
const MyAccount = () => {
const navigate= useNavigate();
const isSmallScreen=window.innerWidth<=576;
   const heading="My Account"
    const para="Grow your business by giving it the right fuel it needs. Don't worry about financing; Team Origa has you covered for that."
    const breadcrumbsItems = [{ name: "Home Page", link: "/" }];
useEffect(()=>{
    window.scrollTo(0,0)
},[])
    return (<>
    <div className='container-fluid'>
            <div className='max-container'>
                    {/*<div className='row pt-4'>
                        <div className="col col-auto mg-0 pr-0"  onClick={()=>navigate('/')}><LeftArrow/></div>
                        <div className="col col-auto mg-0 pr-0 curser-pointer" onClick={()=>navigate('/')}>Home Page</div>
                        <div className="col col-auto p-0"><Slash/></div>
<div className="col col-auto pr-0 heading-600-14">{heading}</div>
    </div>*/}
    <Breadcrumbs backnavi={()=>navigate('/')} boldtitle={heading} items={breadcrumbsItems}/>
            </div>
            <div className='max-container pt-5 pb-5'>
              
                    <div className='row d-flex align-items-center'>
                        <div className='col col-lg-10 mx-auto bg-F9F9F9'> 
                            <div className={`container ${isSmallScreen ? "pt-5":"p-5"}`}>
                                <div className='row justify-content-between '>
                                    <div className='col col-auto'>
                                        <h1 className='heading-600-24'>{heading}</h1>
                                    </div>
                                    <div className='col col-auto curser-pointer' onClick={()=>navigate('/logout')}>
                                        <h2 className="heading-600-14 ">Log out</h2>
                                    </div>
                                </div>
                                <div className='row'>
                        <div className='col col-md-9 heading-400-14 op-60'>{para}</div>
                    </div>
                  <div className='container-fluid p-0 py-4'>
                        <MyAccountAccordian />
                  </div>
                            </div>
                        </div>
                       
                    </div>
                   

                    {/* <div className='p-r p-0 d-flex justify-content-end'>
                    <img className='p-a pt-2 right-0' src='asset/Frame1000004018.png' alt='Frame1000004018.png'/>
                </div> */}
            </div>
            
        </div>
       
        <AccountFooter/>
        </>
  )
}

export default MyAccount
