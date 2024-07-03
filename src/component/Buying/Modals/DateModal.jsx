import React, { useState, useRef, useEffect } from "react";
import "./DateModal.css";
import { hasValidationError, validationError, focusOnFeild } from "../../../helpers/Frontend";
import { closeIcon } from "../../../helpers/Icons";
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import { secondClient, GET_MACHINE_DETAILS, createBuyschedulevisit } from '../../OrigaExtentionAPI/mutations'

const client = secondClient



const DateModal = (productdata) => {

  console.log(productdata, "productdata")
  const [selectedDates, setSelectedDates] = useState([]);
  const [form, setForm] = useState({ dates: [], times: '' });
  const [errors, setErrors] = useState([]);
  var BuyMachineId = productdata.buyMachineId
  const [productDETAILS, setProductDETAILS] = useState({});
  const times = ["10 AM - 12 PM", "12 PM - 2 PM", "2 PM - 4 PM", "4 PM - 6 PM", "6 PM - 8 PM"];
  // const times = ["6 AM - 8 AM", "8 AM - 10 AM", "10 AM - 12 PM", "12 PM - 2 PM", "2 PM - 4 PM", "4 PM - 6 PM", "6 PM - 8 PM", "8 PM - 10 PM", "10 PM - 12 AM"];
  console.log("selecetd Data==>>",selectedDates.year);
  useEffect(() => {
    const fetchData = async () => {
      const id = localStorage.getItem('id');
      try {


        const { data } = await client.mutate({
          mutation: GET_MACHINE_DETAILS,
          variables: { productId: productdata.productId, "customerId": id, "buyMachineId": BuyMachineId },
        });

        setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)

      } catch (error) {
      }
    };

    fetchData();
  }, []);

  const removeDate = (index) => {
    let dates = [...selectedDates];
    dates.splice(index, 1);
   
    setSelectedDates(dates);
  };

  const onTimeClick = (value) => {

    // console.log("Selected Time==>>", value);


    let timeObj = [...form.times];
    if (!timeObj.includes(value)) {
      timeObj.push(value);
    } else {
      timeObj = timeObj.filter((x) => x !== value);
    }

    const limitedDates = timeObj.slice( -1);


    setForm((prevState) => ({ ...prevState, times: limitedDates }));
  };

  const handleDateChange = (value) => {
    // Filter out past dates

    const filteredDates = value.filter((date) => !dayjs(date).isBefore(dayjs(), 'day'));

console.log("filtered date===>>>",filteredDates);
    // Limit the selection to a maximum of 3 dates
    const limitedDates = filteredDates.slice(-1);

    setSelectedDates(limitedDates);
  };
  const handleScheduleVisit = () => {

    let date = ''
    if (selectedDates.length > 0) {
      selectedDates.map((cusCalendar, index) => {

        date = cusCalendar.year + '-' + cusCalendar.month.number + '-' + cusCalendar.day
      })
      console.log(form, 'formkhkh')
      schedulevisit(date, form.times[0])
    }

  };

  const schedulevisit = async (visitdate, visittime) => {
    try {

      console.log(visitdate, visittime, form, "form formform")
      const id = localStorage.getItem('id');
      const slugname = productdata?.productDETAILS?.machine_details?.data?.product?.slug
      const variantId = productdata?.productDETAILS?.machine_details?.data?.product?.variants[0]?.id
      const requestinput = {
        "buymachineid":BuyMachineId,
        customerid: id,
        productid: productdata.productId,
        "visitdate": visitdate,
        "visittime": visittime,
        "variantid": variantId,
        "slugname": slugname

      };
      client.mutate({
        mutation: createBuyschedulevisit,
        variables: {
          requestinput: requestinput
        },
      })
        .then(({ data }) => {
          console.log(data)
          const buymachine_id = data?.createBuyschedulevisit?.response?.buymachine_id
          console.log('DateModal_Component---buymachine_id---->', buymachine_id);
          productdata.modalAction(false, {
            customerid: id,
            productid: productdata.productId,
            "visitdate": visitdate,
            "visittime": visittime,
            "buymachine_id": buymachine_id
          })
        })
        .catch((error) => {
        });
      // setBuyMachine(data)s
    } catch (error) {
    }
  }
  // const buymachine=async()=>{
  // try{

  //   const id = localStorage.getItem('id');

  //     const inputbuymachine = {
  //   customerid:id,
  //   variantid: productDETAILS?.machine_details?.data?.product?.variants[0].id,
  //   productid: productdata.productId,
  //   slugname: productDETAILS?.machine_details?.data?.product?.slug,
  //   status: "Pending",
  //   createdby: id
  // };
  //     clientBuyMachine
  //   .mutate({
  //     mutation: BUY_MACHINE_MUTATION,
  //     variables: {
  //       input: inputbuymachine
  //     },
  //   })
  //   .then(({ data }) => {
  //     // Handle success, access data.createBuymachine for the response
  //     console.log('Mutation success:', data.createBuymachine);
  //     // updateTokenAmount(data.createBuymachine)
  //     // paytoken(data.createBuymachine)
  //   })
  //   .catch((error) => {
  //     // Handle error
  //     console.error('Mutation error:', error);
  //   });
  //     // setBuyMachine(data)s
  // } catch (error) {
  //         console.error('Error  Buy Machine:', error);
  //       }
  // }
  return (
    <div className="bi-popup-wrap">
      <div className="back" onClick={() => productdata.modalAction(false)}></div>
      <div className="inner">
        <button onClick={() => productdata.modalAction(false)} className="close">
          {closeIcon({ width: 16, height: 16 })}
        </button>
        <div className="heading-600-20 heading-600-20-16">Schedule your Visit</div>
        <div className="heading-400-14-12 mb20">
          The Machine is located in Andheri West, Mumbai, Maharashtra. The exact Location will be communicated over email once you schedule your appointment.
        </div>
        <div className="datePickerWraper mb20">
          <div className="datePickerWrap">
            {selectedDates.length > 0 ? (
              selectedDates.map((selectedDate, index) => (
                <div className="datePickerItem heading-600-12" key={index}>
                  {selectedDate?.day} {selectedDate?.month?.shortName} {selectedDate?.year}
                  {closeIcon({ width: 12, height: 12, onClick: () => removeDate(index) })}
                </div>
              ))
            ) : (
              <span className="placeholder">Select dates</span>
            )}
          </div>
          <DatePicker disabled={selectedDates.length >= 3} className="datePickerCalender" onChange={handleDateChange} value={selectedDates} render={<Icon />} />
        </div>
        <div className="bi-cust-group">
          <label className="heading-400-14">Select Day</label>
          <div className="days-time-wrap">
            {times.map((time, index) => (
              <div className={`day-time ${(form.times.includes(time) ? "selected" : "")}`} key={index} onClick={() => onTimeClick(time)}>
                {time}
              </div>
            ))}
          </div>
          {hasValidationError(errors, "times") ? <span className="has-cust-error">{validationError(errors, "times")}</span> : null}
        </div>
        <button type="button" onClick={handleScheduleVisit} className="schedule-btn">
          Schedule Visit
        </button>
      </div>
    </div>
  );
};

export default DateModal;
