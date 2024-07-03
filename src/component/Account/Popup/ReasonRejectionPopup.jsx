import React, { useEffect } from 'react'
import { closeIcon } from '../../../helpers/Icons';
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
const ReasonRejectionPopup = ({ modalAction, product }) => {
  const onRejectHndler = async () => {
    console.log('workin....');
    try {
      const { data } = await secondClient.mutate({
        mutation: schedulevisitCancelList,
        variables: {
          "requestinput": {
            "buymachineid": product.buy_machine_id,
            "rejectedby": "Seller",
            "rejectedreason": "Unavailable on the selected dates, please schedule for a later date"
          }
        }
      })
      modalAction(false)
      window.location.reload();

    } catch (error) {
      console.log("Rejection API ERROR", error);
    }
  }
  // useEffect(() => {
  //   onRejectHndler()
  // }, [])
  return (
    <div className="bi-popup-wrap">
      <div className="back" onClick={() => modalAction(false)}></div>
      <div className="inner align-items-center">
        <button onClick={() => modalAction(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>

        <div className="heading-600-20-16">Reason for Visit Rejection</div>
        <div className='pt-4'>
          <img src='asset/ReasonRejection.png' alt='ReasonRejection.png' />
        </div>
        <p className='heading-400-14-12 op-80'>Unavailable on the selected dates, please schedule for a later date</p>
        <div className='w-100 text-center'>
        <button type="button" className="continue-btn" onClick={() => onRejectHndler()}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ReasonRejectionPopup