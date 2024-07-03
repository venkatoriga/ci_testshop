
import { gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { ScheduledVisitDataAction } from '../../Store/ScheduledData';
import {secondClient } from '../OrigaExtentionAPI/mutations';
const client = secondClient

const SCHEDULE_VISIT_LIST_ME=gql`
query customerScheduleVisits($ompUserId:String!){
    customerScheduleVisits(ompUserId: $ompUserId) {
      message
      code
      response
    }
  }  
`
const SCHEDULE_VISIT_LIST_MY_MACHINE_COPY=gql`
query customerScheduleVisitsMymachine ($ompUserId:String!){
    customerScheduleVisitsMymachine(ompUserId: $ompUserId) {
      message
      code
      response
    }
  }  
`
const useSchedule = () => {
    const userId = localStorage.getItem('id');
   
const dispatch=useDispatch();

    const fetchDataScheduledByMe_1=async()=>{
        try {
            const {data}=await client.mutate({
                mutation:SCHEDULE_VISIT_LIST_ME,
                variables:{"ompUserId": userId}
            })
            // console.log("SCHEDULE_VISIT_LIST_ME responce===>",data?.customerScheduleVisits?.response?.schedule_visit_list);
       
       if(data){
        console.log("Maindatause-->>>===>>>",data);
        let scheduleMyData=await data?.customerScheduleVisits?.response?.schedule_visit_list.map((product)=>{
            // const timestamp = new Date(product?.schedule_visit_date);
            // const Schedule_date = timestamp.toISOString().split('T')[0];
    
    return {
        buy_machine_id:product.buy_machine_id,
        productId:product.product_id,
        ompUserId:product.variant_id,
        imageurl:product.thumbnail,
        status:product?.schedule_visit_status,
        reject_reason:product?.schedule_visit_reject_reason,
        title1:"CNC Machine",
        title2:`| ${product?.brand}`,
        location:true,
        para1:"Scheduled Date",
        data:product?.schedule_visit_date,
        para2:"Scheduled Time",
        time:product?.schedule_visit_time,
        para3:"Machine Location",
        address:product?.machine_location,
        para4:"Point of Contact Name",
        name:product?.otherProductDetails?.contact_name,
        para5:"Contact Number",
        number:product?.otherProductDetails?.contact_number,
        rating:product?.rating
    
    }
            })
    
    dispatch(ScheduledVisitDataAction.Schedule({items:scheduleMyData}))
            // setScheduleDataMyMachine(scheduleMyData);
       }
        } catch (error) {
            console.log("Error SCHEDULE_VISIT_LIST Hook===>>>",error);
        }
     }
   
     const fetchDataVisitByMe_1=async()=>{
        try {
            const {data}=await client.mutate({
                mutation:SCHEDULE_VISIT_LIST_MY_MACHINE_COPY,
                variables:{"ompUserId": userId}
            })
            console.log("SCHEDULE_VISIT_LIST_MY_MACHINE_COPY responce===>",data?.customerScheduleVisitsMymachine?.response?.schedule_visit_list);
       
       if(data){
        let visitData=data?.customerScheduleVisitsMymachine?.response?.schedule_visit_list.map((product)=>{
            
          
            // const timestamp = new Date(product?.schedule_visit_date);
            // const Schedule_date = timestamp.toISOString().split('T')[0];

return {
        buy_machine_id:product.buy_machine_id,
        ompUserId:product.ompUserId,
        imageurl:product?.thumbnail,
        status:product.schedule_visit_status,
        reject_reason:product?.schedule_visit_reject_reason,
        title1:"CNC Machine",
        title2:`| ${product.brand}`,
        location:true,
        para1:"Scheduled Date",
        data:product?.schedule_visit_date,
        para2:"Scheduled Time",
        time:product?.schedule_visit_time,
        para3:"Machine Location",
        address:product?.machine_location,
        para4:"Point of Contact Name",
        name:product?.otherProductDetails?.contact_name,
        para5:"Contact Number",
        number:product?.otherProductDetails?.contact_number,
        rating:product?.rating
    
}
            })

            dispatch(ScheduledVisitDataAction.Visit({items:visitData}))
            // setVisitingMyMachine(visitData);
       }
        } catch (error) {
            console.log("Error SCHEDULE_VISIT_LIST_MY_MACHINE_COPY ===>>>",error);
        }
     }

  return { fetchDataScheduledByMe_1,fetchDataVisitByMe_1}
}

export default useSchedule