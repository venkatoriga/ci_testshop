import React, { useState } from 'react'
import { closeIcon } from '../../../helpers/Icons';
import StepperTick from '../../SubComponent/AllSvgs/StepperTick';
import { gql } from '@apollo/client';
import client from '../../Services/ServicesPopup/apolloclient';
import { secondClient, schedulevisitCancelList } from '../../OrigaExtentionAPI/mutations'
const REASON_REJCTION_API = gql`
query customerScheduleVisitsRejectMymachine($ompUserId:String!) {
    customerScheduleVisitsRejectMymachine(ompUserId: $ompUserId) {
      message
      code
      response
    }
  }
  
`
const ReasonCancellationPopup = ({ modalAction, product }) => {
  const [selecteReason, setSelecteReason] = useState("");

  const onSelectOption = (value) => {

    setSelecteReason(value)
  }

  const onRejectHndler = async () => {
    //console.log('working...');
    const userId = localStorage.getItem('id');
    try {
      const { data } = await secondClient.mutate({
        mutation: schedulevisitCancelList,
        variables: {
          "requestinput": {
            "buymachineid": product.buy_machine_id,
            "rejectedby": "Buyer",
            "rejectedreason": selecteReason
          }
        }
      })

      //if (data?.customerScheduleVisitsRejectMymachine?.code === 1000) {
        modalAction(false)
        window.location.reload();
      //}

    } catch (error) {
      console.log("Rejection API ERROR", error);
    }
  }

  const onBackToPageHandler = () => {
    onRejectHndler()

  }
  return (
    <div className="bi-popup-wrap">
      <div className="back" onClick={() => modalAction(false)}></div>
      <div className="inner align-items-start">
        <button onClick={() => modalAction(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
        <div className='w-80 h-center'>
          <div className="heading-600-20-16 p-0">Reason for Cancellation</div>

          <p className='heading-400-14-12 text-start pt-2'>Select the reason/s :</p>

          {/*reason*/}

          <div className='w-100'>

            <div className='border p-0'>

              <div className={`d-flex justify-content-between p-0 ${selecteReason === "Not available on scheduled date" ? 'bg-green' : null}`} onClick={() => onSelectOption("Not available on scheduled date")}>
                <p className='heading-400-14 v-center pl-3'>Not available on scheduled date</p>
                <StepperTick fill={` ${selecteReason === "Not available on scheduled date" ? '#9B9E51' : "#FFFFFF"}`} />
              </div>
            </div>

            <div className='border mt-2'>

              <div className={`d-flex justify-content-between p-0 ${selecteReason === "Time constraint" ? 'bg-green' : null}`} onClick={() => onSelectOption("Time constraint")}>
                <p className='heading-400-14 v-center pl-3'>Time constraint</p>
                <StepperTick fill={` ${selecteReason === "Time constraint" ? '#9B9E51' : "#FFFFFF"}`} />
              </div>
            </div>

            <div className='border mt-2'>

              <div className={`d-flex justify-content-between p-0 ${selecteReason === "Don’t wish to sell my Machine anymore" ? 'bg-green' : null}`} onClick={() => onSelectOption("Don’t wish to sell my Machine anymore")}>
                <p className='heading-400-14 v-center pl-3'>Don’t wish to sell my Machine anymore</p>
                <StepperTick fill={` ${selecteReason === "Don’t wish to sell my Machine anymore" ? '#9B9E51' : "#FFFFFF"}`} />
              </div>
            </div>

            <div className='border mt-2'>

              <div className={`d-flex justify-content-between p-0 ${selecteReason === "Cost Considerations" ? 'bg-green' : null}`} onClick={() => onSelectOption("Cost Considerations")}>
                <p className='heading-400-14 v-center pl-3'>Cost Considerations</p>
                <StepperTick fill={` ${selecteReason === "Cost Considerations" ? '#9B9E51' : "#FFFFFF"}`} />
              </div>
            </div>
          </div>

          <div className='pt-3 w-100'>
            <textarea type='text' placeholder='Please write product review here (Optional)' rows={4} className='w-100 p-3 heading-400-16-14' />
          </div>

          <div className='w-100 text-center'>
            <button type="button" className="continue-btn" onClick={onBackToPageHandler}>Submit</button>
          </div>
        </div>

      </div>


    </div>
  );
}

export default ReasonCancellationPopup 