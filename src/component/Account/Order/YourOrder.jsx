import React, { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import Button from '../../Button/Button'
import OrderDetails from './OrderDetails'
import AccountFooter from '../AccountFooter'
import Breadcrumbs from '../../SubComponent/Breadcrumbs'
import { useNavigate } from 'react-router-dom'
import { secondClient, customerMyAmcplans } from '../../OrigaExtentionAPI/mutations'

const YourOrder = () => {
  const [isSmallScreen] = useState(window.innerWidth <= 769)
  const [OrderList, setOrderList] = useState([]);
  useEffect(() => {
    myMachineLists();
  }, []);
  const myMachineLists = async () => {
    try {
      const id = localStorage.getItem('id');
      secondClient.query({ query: customerMyAmcplans, variables: { "ompUserId": id } }).then(({ data }) => {
        console.log('data=>', data?.customerMyAmcplans?.response?.jsondata);
        setOrderList(data?.customerMyAmcplans?.response?.jsondata);
      }).catch((error) => {
        console.error('Mutation error:', error);
      });
    } catch (error) {
      console.error('Error  Buy Machine:', error);
    }
  }
  const navigate = useNavigate();
  const heading = "Your Orders"
  const add1 = "My Account"
  const breadcrumbsItems = [{ name: "Home Page", link: "/" }, { name: "My Account", link: "/myaccount" }];

  return (
    <>
      <div className='container-fluid' >

        <div className='max-container pt-3'>
          <Breadcrumbs items={breadcrumbsItems} boldtitle={heading} backnavi={() => navigate('/myaccount')} />
        </div>
        <div className='max-container pt-3'>
          <div className='container-fluid p-0 m-0 row'>
            <div className='col heading-600-24 p-0'>{heading}</div>
          </div>
        </div>
        <div className='max-container pt-4'>
          <div className='container-fluid p-0 m-0 row justify-content-between'>
            <div className='col col-md-9 col-12 p-0 d-flex align-items-center'>
              <div className="search1-box ">

                <input style={{ border: '1px solid #3C3C4366' }} className='heading-400-16-12 pl-3' type="text" placeholder={"Search Orders"} />
              </div>
            </div>
            <div className={`col col-md-3 col-12 p-0 ${isSmallScreen ? "pt-4" : ""} text-end`}><Button message={"Search"} /></div>
          </div>
          {OrderList?.map((order, index) => (
            <OrderDetails order={order} />
          ))}
        </div>

      </div>
      <AccountFooter />
    </>
  )
}

export default YourOrder