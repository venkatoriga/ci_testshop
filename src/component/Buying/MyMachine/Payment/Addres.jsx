import React, { useState, useEffect } from "react";
import './Address.css';
import { addIcon, editIcon, ellipsePurpleIcon, ellipseWhiteIcon, emailIcon, leftArrowIcon, phoneIcon, vectorLineIcon } from "../../../../helpers/Icons";
import { useLocation } from 'react-router-dom';
import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { useNavigate } from "react-router-dom";
import { secondClient, GET_MACHINE_DETAILS, Update_Delivery_Address, BUY_MACHINE_MUTATION } from '../../../OrigaExtentionAPI/mutations'
import LoginModel from '../../../Authentication/LoginModel/LoginModel';
const clientToken = secondClient




const Address = () => {
  const [productDETAILS, setProductDETAILS] = useState({});
  const [userDETAILS, setuserDETAILS] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const loggedin = localStorage.getItem('userToken');
  const productId = queryParams.get('id')
  var buyMachineId = queryParams.get('buyMachineId')
  var FinanceFlow = queryParams.get('FinanceFlow')
  console.log('FinanceFlow---->', FinanceFlow);
  const [loginPortal, setLoginPortal] = useState(false);
  useEffect(() => {
    if (loggedin) {
      return
    } else {
      setLoginPortal(true);
    }
  }, [loggedin]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');
        const response = await fetch('https://devextension.origa.market/api/fetchcustomeraddress', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ "id": id }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Convert the response to JSON
        const data = await response.json();
        setuserDETAILS(data.response.data.user)
        console.log(data, 'response');
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);

  const handleCheckboxChange = (index) => {
    // Update the selected address index when checkbox is clicked
    setSelectedAddressIndex(index);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('id');

        const { data } = await clientToken.mutate({
          mutation: GET_MACHINE_DETAILS,
          variables: { productId: productId, "customerId": id, "buyMachineId": buyMachineId },
        });
        setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)
        console.log("API Response==>", data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const onCallFunHandler = async () => {

    try {
      const id = localStorage.getItem('id');
      if (buyMachineId === '0') {
        const inputbuymachine = {
          customerid: id,
          variantid: productDETAILS?.machine_details?.data?.product?.variants[0].id,
          productid: productId,
          slugname: productDETAILS?.machine_details?.data?.product?.slug,
          status: "Pending",
          createdby: id
        };
        clientToken
          .mutate({
            mutation: BUY_MACHINE_MUTATION,
            variables: {
              input: inputbuymachine
            },
          })
          .then(async ({ data }) => {
            console.log('Createddata----------->', data?.createBuymachine?.id);
            var machineId = data?.createBuymachine?.id
            const Deliverydata = await clientToken.mutate({
              mutation: Update_Delivery_Address,
              variables: {
                "inputbuymachine": {
                  "id": data?.createBuymachine?.id,
                  "customerid": id,
                  "variantid": productDETAILS?.machine_details?.data?.product?.variants[0].id,
                  "slugname": productDETAILS?.machine_details?.data?.product?.slug,
                  "deliveryaddress": { "address": (userDETAILS.addresses[selectedAddressIndex].streetAddress1 + ' ' + userDETAILS.addresses[selectedAddressIndex].streetAddress2 + ' ' + ' ' + userDETAILS.addresses[selectedAddressIndex].cityArea + ' ' + userDETAILS.addresses[selectedAddressIndex].city + ' ' + userDETAILS.addresses[selectedAddressIndex].countryArea + ' ' + userDETAILS.addresses[selectedAddressIndex].country?.country + ' ' + userDETAILS.addresses[selectedAddressIndex].postalCode), "state": userDETAILS.addresses[selectedAddressIndex].countryArea, "firstname": (userDETAILS.addresses[selectedAddressIndex].firstName + ' ' + userDETAILS.addresses[selectedAddressIndex].lastName) },
                  "billingaddressid": userDETAILS.addresses[selectedAddressIndex].id,
                  "shippingaddressid": userDETAILS.addresses[selectedAddressIndex].id
                }
              },
            })
            console.log('Deliverydata---->', Deliverydata);
            if (Deliverydata?.data?.updateBuymachineDeliveryaddress?.success) {
              console.log(Deliverydata?.data?.updateBuymachineDeliveryaddress?.message, 'dff')
              if(!FinanceFlow){
                navigate(`/buy/order-summary?id=${productId}&message=Unpaid&buyMachineId=${machineId ? machineId: buyMachineId}`)
              }
              else{
                navigate(`/buy/machine-page?id=${productId}&buyMachineId=${buyMachineId}`)
              }
            }
            else {
              console.log('fail', Deliverydata)
            }
          })
      }
      else {
        const { data } = await clientToken.mutate({
          mutation: Update_Delivery_Address,
          variables: {
            "inputbuymachine": {
              "id": buyMachineId,
              "customerid": id,
              "variantid": productDETAILS?.machine_details?.data?.product?.variants[0].id,
              "slugname": productDETAILS?.machine_details?.data?.product?.slug,
              "deliveryaddress": { "address": (userDETAILS.addresses[selectedAddressIndex].streetAddress1 + ' ' + userDETAILS.addresses[selectedAddressIndex].streetAddress2 + ' ' + ' ' + userDETAILS.addresses[selectedAddressIndex].cityArea + ' ' + userDETAILS.addresses[selectedAddressIndex].city + ' ' + userDETAILS.addresses[selectedAddressIndex].countryArea + ' ' + userDETAILS.addresses[selectedAddressIndex].country?.country + ' ' + userDETAILS.addresses[selectedAddressIndex].postalCode), "state": userDETAILS.addresses[selectedAddressIndex].countryArea, "firstname": (userDETAILS.addresses[selectedAddressIndex].firstName + ' ' + userDETAILS.addresses[selectedAddressIndex].lastName) },
              "billingaddressid": userDETAILS.addresses[selectedAddressIndex].id,
              "shippingaddressid": userDETAILS.addresses[selectedAddressIndex].id
            }
          },
        });;
        if (data?.updateBuymachineDeliveryaddress?.success) {
          console.log(data?.updateBuymachineDeliveryaddress?.message, 'dff')
          if(!FinanceFlow){
            navigate(`/buy/order-summary?id=${productId}&message=Unpaid&buyMachineId=${buyMachineId}`)
          }
          else{
            navigate(`/buy/machine-page?id=${productId}&buyMachineId=${buyMachineId}`)
          }
        }
        else {
          console.log('fail', data)
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const addresses = [
    { name: 'Rajesh Kapoor', address: 'Indira Mills, Bandra East, Das Disha Marg, Andheri Gufa, Mumbai, Maharashtra 401 208', phone: '+91-94305 45234', email: 'rajeshkapoor@indiramills.com' },
    { name: 'Rajesh Kapoor', address: 'Indira Mills, Bandra East, Das Disha Marg, Andheri Gufa, Mumbai, Maharashtra 401 208', phone: '+91-94305 45234', email: 'rajeshkapoor@indiramills.com' }
  ];

  const addressPage = () => {
    const navi = location?.state?.onNavi;
    console.log('navi----->', navi);
    if (navi) {
      navigate(navi)
    } else {
      navigate(`/buy/cnc-machine?id=${productId}`)
    }
  }
  const onHidePortal = () => {
    //setPricebtn(!!localStorage.getItem('id'))
    setLoginPortal(false);
    window.location.reload();
  }

  const handleNavigate = () => {
    if(!FinanceFlow){
      window.location = `/buy/new-address?id=${productId}&buyMachineId=${buyMachineId}`
    }
    else{
      
      window.location = `/buy/new-address?id=${productId}&buyMachineId=${buyMachineId}&FinanceFlow=${true}`
    }
}
  return (
    <>
      {loginPortal && <LoginModel onHide={onHidePortal} />}
      <div className="container-fluid">
        <div className="max-container my-5">
          <div className="details-wrap">
            {!FinanceFlow && (
              <div className="btn-wrap" onClick={addressPage}><button className="back-btn">{leftArrowIcon({ width: 24, height: 24 })}</button></div>
            )}
            <div className="content-wrap">
              <div className="address-top-wrap">
                <div className="dilevery-address heading-600-16"><span className='dilevery-address-1'>{ellipsePurpleIcon({ width: 32, height: 32 })}</span>Delivery Address</div>
                {!FinanceFlow && (
                  <>
                    <div className='line'>{vectorLineIcon({ width: 88, height: 1 })}</div>

                    <div className="order-sumary heading-600-16"><span className='order-sumary-2'>{ellipseWhiteIcon({ width: 32, height: 32 })}</span>Order Summary</div>
                  </>
                )}
              </div>
              <div className="bottom-wrap">
                <div className="top-heading">
                  <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14 select-heading">Select a Delivery Address</div>
                  <div className="add-address heading-600-14 heading-600-14-12" onClick={handleNavigate}><span className='addicon'>{addIcon({ width: 14, height: 14 })}</span>Add New Address</div>
                </div>
                <div className="bottom-wrap-detail">
                  {userDETAILS.addresses && userDETAILS.addresses.map((detail, index) => (
                    <div className="add-bottom-line">
                      <div className='detail-lists' key={index}>
                        <div className="check"><input className='radio' type="radio" id={`select-${index}`} checked={selectedAddressIndex === index} onChange={() => handleCheckboxChange(index)} /></div>
                        <div className="check-details">
                          <div className="select heading-600-20 heading-600-20-16">{detail.firstName + ' ' + detail.lastName}</div>
                          <div className="text heading-400-14-12">{detail.streetAddress1 + ' ' + detail.streetAddress2 + ' ' + ' ' + detail.cityArea + ' ' + detail.city + ' ' + detail.countryArea + ' ' + detail.country?.country + ' ' + detail.postalCode}</div>
                          <div className="contact-details">
                            <div className="heading-400-14-12 phone"><span>{phoneIcon({ width: 24, height: 24 })}</span> {detail.phone}</div>
                            {/* <div className="heading-400-14-12  emailby"><span>{emailIcon({ width: 24, height: 24 })}</span> {userDETAILS.email}</div> */}
                          </div>
                        </div>
                        <div className="edit-address hide-576 heading-600-14 heading-600-14-12"><span className='editicon curser-pointer' onClick={() => navigate(`/buy/new-address?id=${productId}&buyMachineId=${buyMachineId}`, { state: { userDetails: detail } })} >{editIcon({ width: 24, height: 24 })}</span> Edit Address</div>
                      </div>
                      <div className="text-end show-576 heading-600-14 heading-600-14-12"><span className='editicon curser-pointer' onClick={() => navigate(`/buy/new-address?id=${productId}`, { state: { userDetails: detail, emailId: userDETAILS.email } })} >{editIcon({ width: 24, height: 24 })}</span> Edit Address</div>
                      {/* <div className="text-end  heading-600-14 heading-600-14-12"><span className='editicon curser-pointer' onClick={()=>navigate(`/buy/new-address?id=${productId}&buyMachineId=${buyMachineId}`,{state:{userDetails:detail}})} >{editIcon({width:24,height:24})}</span>  /div> */}
                    </div>
                  ))}
                </div>
              </div>
              <div className="btn-wrap">
                <button class="deliver-btns heading-600-16" onClick={onCallFunHandler}>Deliver Here</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Address