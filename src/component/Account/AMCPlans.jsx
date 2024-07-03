import React, { useState,useEffect } from 'react'
import ProductImages from '../Buying/MyMachine/Machine/MachinePage/ProductImages';
import Breadcrumbs from '../SubComponent/Breadcrumbs';
import { Getservice,Washing,LabourCharges,SpareParts } from '../SubComponent/AllSvgs/Icons2416';
import Slider7 from '../SubComponent/AllSlider/Slider7';
import RightArrow from '../SubComponent/RightArrow';
import WishListBlock from '../SubComponent/AllBlock/WishListBlock';
import { Evolve, RemoteAssistance, RegularUpdates, QualityAssurances } from '../SubComponent/AllSvgs/Icons2416'

import AccountFooter from './AccountFooter';
import WriteReviewPopup from './Popup/WriteReviewPopup';
import WriteReviewDropdownPopup from './Popup/WriteReviewDropdownPopup';
import ReasonRejectionPopup from './Popup/ReasonRejectionPopup';
import { useNavigate,useLocation } from 'react-router-dom';
import Scheduled from "./Scheduled"

const AMCPlans = () => {
  const location = useLocation();
  let jsData = [];
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [amcplan,Setamcplan] = useState({});  
  
  const [servicerequest,Setservicerequest] = useState(false);  
  const plan_id = queryParams.get('plan_id');
  console.log('plan_id===>',plan_id);
  const [similarplans, setsimilarplans] = useState([]);

  const [displayCount, setDisplayCount] = useState(4);

  const onShowMoreHandler = () => {
    setDisplayCount(jsData.length);
    document.getElementById('scopeDiv2').style.display = "";
  };
  const onShowLessHandler = () => {
    setDisplayCount(4);
    document.getElementById('scopeDiv2').style.display = "none";

  }
  // const handleClick = async (value) => {
  function handleClick(value){  
    console.log('Button clicked!');
    let html = "<div className='col col-12'>"
                    +"<p className='heading-400-14-12 op-70'>Service Scope</p>"
                    +'</div>';
    for(var v = 0; v < jsData.length;  v ++){
      html +=   "<div className='col col-3'>"
       html += '<p class="heading-400-14"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M22 3H2V5H22V3ZM13 23V21H21C21.5523 21 22 20.5523 22 20V6H2V20C2 20.5523 2.44772 21 3 21H11V23H13ZM4 19V8H20V19H4ZM13 10H18V12H13V10ZM18 14H13V16H18V14ZM9 10V13H12C12 14.6569 10.6569 16 9 16C7.34315 16 6 14.6569 6 13C6 11.3431 7.34315 10 9 10Z" fill="#211E24"></path></svg>'+jsData[v+1]+' </p>'
        html += "</div>";
        if(v ==4 && value =="show"){
          html += '<button class="button mt-5" onClick={() => handleClick("show")}>Show More</button>';
          break; 
        }

        if(v ==(jsData.length -1) && value =="hide"){
          html += '<button class="button mt-5" onClick={() => handleClick("show")}Show Less</button>';
          break; 
        }       
    }
    return html;
  };

  useEffect(() => {
      // const callAnotherAPI = async (mapingdata) => {
        const scopeDiv = document.getElementById('scopeDiv2');
        scopeDiv.style.display = 'none';
          
      const fetchData = async () => {
       
        try {
          const response = await fetch('https://devextension.origa.market/api/getamcorderdetails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"amc_order_id": plan_id}),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          // Convert the response to JSON
          const data = await response.json();
          const mapingdata = data?.jsondata[0]
          Setamcplan(mapingdata);
          console.log(mapingdata, 'response=====>');

          if (mapingdata) {

            jsData = JSON.parse(mapingdata.service_scope);
            // Create a new div element
            const newDiv = document.createElement('div');
                  
            // Add content based on the loaded API data
            let html = "<div className='col col-12'>"
                        +"<p className='heading-400-14-12 op-70'>Service Scope</p>"
                        +'</div>';
            let html2 = '';  
            jsData = JSON.parse(mapingdata.service_scope);
            for(var v = 0; v < jsData.length;  v ++){
              if(v < 4){
                html +=   "<div className='col col-3'>"
                html += '<p class="heading-400-14"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M22 3H2V5H22V3ZM13 23V21H21C21.5523 21 22 20.5523 22 20V6H2V20C2 20.5523 2.44772 21 3 21H11V23H13ZM4 19V8H20V19H4ZM13 10H18V12H13V10ZM18 14H13V16H18V14ZM9 10V13H12C12 14.6569 10.6569 16 9 16C7.34315 16 6 14.6569 6 13C6 11.3431 7.34315 10 9 10Z" fill="#211E24"></path></svg>'+jsData[v]+' </p>'
                html += "</div>";
              } else {                
                html2 +=   "<div className='col col-3'>"
                html2 += '<p class="heading-400-14"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M22 3H2V5H22V3ZM13 23V21H21C21.5523 21 22 20.5523 22 20V6H2V20C2 20.5523 2.44772 21 3 21H11V23H13ZM4 19V8H20V19H4ZM13 10H18V12H13V10ZM18 14H13V16H18V14ZM9 10V13H12C12 14.6569 10.6569 16 9 16C7.34315 16 6 14.6569 6 13C6 11.3431 7.34315 10 9 10Z" fill="#211E24"></path></svg>'+jsData[v]+' </p>'
                html2 += "</div>";
              }
              //html +=   "<div className='col col-3'>"
                // +"<div className='d-flex align-items-center gap-2 '>"
                //   +'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">'
                //   +'<g opacity="0.6">'
                //     +'<path d="M17.9335 14.6122C18.191 14.58 18.4163 14.5478 18.6738 14.5156C18.9634 14.4834 19.3497 14.3547 19.5428 13.8397L19.575 13.7753V11.4257L19.5428 11.3614C19.3497 10.8464 18.9634 10.7177 18.6738 10.6855C18.4163 10.6533 18.1588 10.6211 17.9335 10.5889C17.8047 10.5567 17.676 10.5567 17.5151 10.5567C17.4829 10.4602 17.4185 10.3314 17.3863 10.2349C17.5794 9.97738 17.8047 9.7199 17.9979 9.46241L18.1266 9.30148C18.4806 8.85088 18.4485 8.36809 18.0622 7.98186C17.6438 7.56344 17.1932 7.11284 16.7748 6.69442C16.3564 6.34037 15.8736 6.30819 15.423 6.66223L15.1011 6.88753C14.908 7.04846 14.6827 7.20939 14.4896 7.37032C14.393 7.33814 14.2643 7.27377 14.1677 7.24158C14.1356 6.85535 14.0712 6.43693 14.039 6.0507C13.9746 5.53573 13.5884 5.21387 13.0734 5.21387C12.4619 5.21387 11.8504 5.21387 11.2388 5.21387C10.6917 5.21387 10.3054 5.53573 10.2411 6.11507C10.2089 6.30819 10.2089 6.5013 10.1767 6.69442C10.1445 6.88753 10.1445 7.08065 10.1123 7.27377C10.0158 7.30595 9.88701 7.37032 9.79045 7.40251C9.50078 7.17721 9.21111 6.95191 8.92143 6.72661L8.82487 6.66223C8.40646 6.34037 7.92367 6.34037 7.53744 6.72661C7.44088 6.82316 6.31437 7.94967 6.25 8.01404C5.83159 8.43246 5.83159 8.88306 6.18563 9.36585L6.41093 9.65552C6.57186 9.84864 6.73279 10.0739 6.89372 10.2671C6.82935 10.3958 6.79716 10.4924 6.76498 10.5889C6.37875 10.6211 5.96033 10.6855 5.5741 10.7177C5.05912 10.782 4.70508 11.1683 4.70508 11.6832V13.5178C4.70508 14.0972 5.02694 14.4512 5.60628 14.5156C5.83159 14.5478 6.08907 14.58 6.31437 14.6122C6.4753 14.6443 6.60405 14.6443 6.76498 14.6765C6.79716 14.7731 6.86153 14.9018 6.89372 14.9984C6.73279 15.1915 6.57186 15.3846 6.41093 15.5777L6.15344 15.8996C5.7994 16.3502 5.83159 16.833 6.21782 17.2514L7.47307 18.5066C7.89148 18.9251 8.34209 18.9573 8.82487 18.571L9.14673 18.3135C9.33985 18.1526 9.56515 17.9917 9.75827 17.8307C9.85482 17.8629 9.95138 17.9273 10.0479 17.9595C10.0479 18.0239 10.0801 18.0882 10.1123 18.1204C10.1123 18.1848 10.1445 18.2492 10.1445 18.3135C10.1767 18.5388 10.2089 18.7963 10.2089 19.0216C10.2411 19.5044 10.4664 19.8263 10.8848 20.0194L10.9491 20.0516H13.2987L13.3631 20.0194C13.7815 19.8585 14.0068 19.5366 14.039 19.0216C14.039 18.7963 14.0712 18.571 14.1034 18.3457C14.1034 18.2492 14.1356 18.1848 14.1356 18.0882C14.1677 18.056 14.1999 18.0239 14.1999 17.9595C14.2965 17.9273 14.393 17.8951 14.4896 17.8307C14.6827 17.9917 14.8758 18.1204 15.0368 18.2813L15.3908 18.5388C15.8414 18.8929 16.3242 18.8607 16.7426 18.4423L17.9979 17.187C18.4163 16.7686 18.4485 16.2858 18.0944 15.8352L17.8691 15.5455C17.7082 15.3202 17.5473 15.1271 17.3541 14.9018C17.3863 14.8053 17.4507 14.7087 17.4829 14.58C17.6438 14.6765 17.8047 14.6443 17.9335 14.6122ZM13.4918 18.3135C13.4596 18.5388 13.4275 18.7963 13.4275 19.0216C13.3953 19.2791 13.3309 19.3757 13.2022 19.44H11.1101C10.9813 19.3757 10.8848 19.2791 10.8848 19.0538C10.8526 18.7963 10.8204 18.5388 10.7882 18.3135C10.756 18.1848 10.756 18.056 10.7238 17.9273C10.7238 17.8951 10.7238 17.8629 10.6917 17.8307V16.1249C10.6917 15.9318 10.5951 15.7387 10.402 15.6099C9.40422 14.934 8.85706 13.7753 8.9858 12.5844C9.08236 11.5867 9.66171 10.6533 10.5307 10.1061L10.4985 12.5201C10.4985 12.7454 10.6273 12.9385 10.8204 13.0672L11.9791 13.7431C12.2044 13.8719 12.4619 13.8719 12.655 13.7109L13.5884 13.035C13.7493 12.9063 13.8459 12.7454 13.8459 12.5523L13.8781 9.91301C14.4252 10.3314 15.2942 11.1683 15.3908 12.5523C15.4874 13.7753 14.908 14.9662 13.9102 15.6743C13.7493 15.803 13.6528 15.964 13.6528 16.1571C13.6528 16.3824 13.6528 16.7042 13.6206 17.0261C13.6206 17.2514 13.6206 17.4767 13.6206 17.6698C13.5884 17.7342 13.5562 17.7986 13.5562 17.8629C13.524 18.0239 13.4918 18.1848 13.4918 18.3135ZM16.8392 15.3524C17.0323 15.5777 17.1932 15.803 17.3863 16.0283L17.6116 16.318C17.7726 16.5111 17.7726 16.6399 17.5794 16.8008L16.3242 18.056C16.1311 18.2492 16.0345 18.2492 15.8414 18.0882L15.4874 17.8307C15.2942 17.6698 15.0689 17.5089 14.8758 17.348C14.6505 17.187 14.4574 17.2192 14.2965 17.2836H14.2643C14.2643 17.187 14.2643 17.1227 14.2643 17.0261C14.2643 16.7042 14.2643 16.3824 14.2643 16.1571C15.4552 15.3202 16.1311 13.9041 16.0023 12.4557C15.8736 10.8142 14.8115 9.78427 14.1999 9.33366C14.0068 9.20492 13.7493 9.17273 13.5562 9.26929C13.3309 9.36585 13.2022 9.59115 13.2022 9.81645L13.17 12.4557L12.2688 13.1316L11.1101 12.4557L11.1423 9.97738C11.1423 9.75208 11.0135 9.52678 10.8204 9.43022C10.6273 9.30148 10.3698 9.33366 10.1767 9.43022C9.11455 10.0739 8.43864 11.1683 8.3099 12.3913C8.18116 13.8075 8.82487 15.1915 10.0158 15.9961V17.2192C9.98357 17.2192 9.95138 17.187 9.9192 17.187C9.79045 17.1227 9.56515 17.0905 9.33985 17.2514C9.11455 17.4123 8.92143 17.6054 8.69613 17.7664L8.37427 18.0239C8.18116 18.1848 8.05241 18.1848 7.89148 17.9917L6.7006 16.8008C6.50749 16.6077 6.50749 16.5111 6.66842 16.318L6.92591 15.9961C7.08684 15.7708 7.24777 15.5777 7.44088 15.3524C7.634 15.1271 7.56962 14.9018 7.50525 14.7731C7.44088 14.6443 7.37651 14.5156 7.34432 14.3547C7.27995 14.1616 7.11902 14.0328 6.92591 14.0328C6.76498 14.0006 6.57186 14.0006 6.41093 13.9684C6.18563 13.9362 5.92814 13.9041 5.70284 13.8719C5.44535 13.8397 5.38098 13.7431 5.38098 13.5178V11.6832C5.38098 11.4579 5.47754 11.3614 5.67066 11.3292C6.08907 11.2648 6.4753 11.2326 6.89372 11.2004C7.18339 11.1683 7.31214 10.9751 7.37651 10.8142C7.40869 10.7177 7.47307 10.5889 7.53744 10.4602C7.60181 10.3314 7.634 10.1061 7.47307 9.88082C7.31214 9.65552 7.11902 9.43022 6.95809 9.20492L6.73279 8.91525C6.57186 8.72213 6.57186 8.59339 6.76498 8.43246C6.82935 8.36809 7.95586 7.24158 8.05241 7.14502C8.21334 6.98409 8.34209 6.98409 8.50302 7.11284L8.56739 7.17721C8.85706 7.40251 9.17892 7.62781 9.46859 7.8853C9.69389 8.07841 9.9192 8.01404 10.0801 7.94967C10.2089 7.8853 10.3376 7.82093 10.4664 7.78874C10.6595 7.72437 10.7882 7.56344 10.8204 7.33814C10.8526 7.11284 10.8848 6.91972 10.8848 6.69442C10.917 6.5013 10.917 6.30819 10.9491 6.11507C10.9813 5.88977 11.0779 5.79321 11.3032 5.79321C11.9147 5.79321 12.5263 5.79321 13.1378 5.79321C13.3309 5.79321 13.4275 5.88977 13.4596 6.08289C13.524 6.5013 13.5562 6.88753 13.5884 7.30595C13.6206 7.62781 13.8137 7.75655 13.9746 7.78874C14.1034 7.82093 14.2321 7.8853 14.3287 7.94967C14.4574 8.01404 14.6827 8.04623 14.8758 7.8853C15.1011 7.72437 15.3264 7.53125 15.5517 7.37032L15.8736 7.11284C16.0667 6.95191 16.1954 6.95191 16.3564 7.14502C16.7748 7.56344 17.2254 8.01404 17.6438 8.43246C17.8047 8.59339 17.8047 8.72213 17.676 8.91525L17.5473 9.07618C17.322 9.33366 17.1288 9.62334 16.9035 9.88082C16.7104 10.1061 16.7748 10.3314 16.8392 10.4924C16.9035 10.6211 16.9679 10.7498 17.0001 10.8786C17.0645 11.0717 17.2254 11.2004 17.4507 11.2326C17.6116 11.2648 17.7726 11.2648 17.9335 11.297C18.191 11.3292 18.4485 11.3614 18.706 11.3936C18.8347 11.3936 18.9313 11.4579 19.0278 11.6189V13.7109C18.9634 13.8719 18.8347 13.9041 18.706 13.9362C18.4485 13.9684 18.191 14.0006 17.9657 14.0328C17.8047 14.065 17.6438 14.065 17.4829 14.0972C17.161 14.065 17.0001 14.1937 16.9357 14.3869C16.8714 14.5478 16.807 14.6765 16.7748 14.8053C16.7104 14.934 16.6782 15.1271 16.8392 15.3524Z" fill="#211E24"/>'
                //     +'<path d="M4.25479 10.1064C4.38353 9.97765 4.38353 9.78453 4.25479 9.65579C4.12604 9.52704 3.93293 9.52704 3.80418 9.65579L3.06391 10.4282C4.06167 6.53375 7.34463 3.54046 11.1104 3.15423C15.9061 2.67144 20.5087 6.40501 21.3777 11.4904C21.4099 11.6513 21.5386 11.7479 21.6996 11.7479C21.7317 11.7479 21.7317 11.7479 21.7639 11.7479C21.9249 11.7157 22.0536 11.5548 22.0214 11.3616C21.088 5.95441 16.1636 1.96335 11.046 2.47833C6.99059 2.92893 3.48232 6.11534 2.388 10.3317L1.96959 9.23737C1.90521 9.07644 1.7121 8.97988 1.55117 9.04426C1.39024 9.10863 1.29368 9.30174 1.35805 9.46267L2.388 12.0054L4.25479 10.1064Z" fill="#211E24"/>'
                //     +'<path d="M22.9865 15.03L21.9565 12.4873L20.0897 14.3863C19.961 14.515 19.961 14.7081 20.0897 14.8369C20.2185 14.9656 20.4116 14.9656 20.5403 14.8369L21.3128 14.0644C20.4116 18.2164 17.0643 21.3706 13.041 21.7568C8.21314 22.2075 3.61056 18.4739 2.77372 13.4207C2.74154 13.2598 2.58061 13.131 2.41968 13.1632C2.25875 13.1954 2.13001 13.3563 2.16219 13.5173C2.96684 18.6026 7.4085 22.4328 12.2364 22.4328C12.5261 22.4328 12.8157 22.4328 13.1054 22.4006C17.3861 21.9822 20.991 18.6348 21.9243 14.1932L22.3428 15.2875C22.4071 15.4162 22.5037 15.4806 22.6324 15.4806C22.6646 15.4806 22.6968 15.4806 22.7612 15.4484C22.9543 15.384 23.0508 15.2231 22.9865 15.03Z" fill="#211E24"/>'
                //     +'</g>'
                //     +'</svg>'
                //   +"<p className='heading-400-14-12 m-0'>"+jsData[v]+"</p>"
                // +"</div>";
                // if(jsData[v+1]){
                //   html += "<div className='d-flex align-items-center gap-2 pt-3'>"
                //     +'<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">'
                //     +'<path d="M17.7292 14.6357C18.7292 12.5712 18.5034 10.1196 17.1808 8.2809L12.5356 1.76477C12.4711 1.668 12.3744 1.63574 12.2776 1.63574C12.1808 1.63574 12.084 1.70026 12.0195 1.76477L7.37436 8.2809C6.05178 10.1196 5.82597 12.5712 6.82597 14.6357C7.79371 16.668 9.66468 17.9261 11.8905 18.0551C12.0195 18.0551 12.1486 18.0551 12.3098 18.0551C12.4711 18.0551 12.5679 18.0551 12.7292 18.0551C14.8905 17.9261 16.7615 16.6357 17.7292 14.6357ZM12.6647 17.4099C12.4066 17.4099 12.1808 17.4099 11.9227 17.4099C9.955 17.2809 8.27759 16.1519 7.40662 14.3454C6.50339 12.4745 6.69694 10.3132 7.89049 8.63574L12.2776 2.47445L16.6647 8.63574C17.8582 10.2809 18.0518 12.4745 17.1486 14.3454C16.3098 16.1519 14.6002 17.3132 12.6647 17.4099Z" fill="black"/>'
                //     +'<path d="M6.50284 5.70004C6.50284 5.47423 6.56735 4.89359 6.98671 4.40971C7.53509 3.79681 8.24477 3.7323 8.47058 3.7323C8.63187 3.7323 8.79316 3.60326 8.79316 3.44197C8.79316 3.28068 8.66412 3.11939 8.50283 3.11939C8.24477 3.08713 7.53509 2.92584 7.01896 2.3452C6.66413 1.92584 6.53509 1.44197 6.50284 1.15165C6.47058 0.990361 6.3738 0.893586 6.21251 0.861328C6.05122 0.861328 5.92219 0.958103 5.88993 1.11939C5.79316 1.44197 5.63187 1.92584 5.21251 2.3452C4.7609 2.82907 4.21251 3.05488 3.85767 3.15165C3.69638 3.18391 3.59961 3.3452 3.59961 3.50649C3.59961 3.66778 3.72864 3.79681 3.88993 3.79681C4.18025 3.82907 4.63187 3.89359 5.05122 4.21617C5.72864 4.7323 5.85767 5.53875 5.85767 5.76455C5.85767 5.92584 6.01896 6.05488 6.18025 6.05488C6.34154 6.02262 6.50284 5.86133 6.50284 5.70004ZM6.148 4.50649C5.98671 4.21617 5.7609 3.92584 5.43832 3.66778C5.27703 3.53875 5.11574 3.44197 4.92219 3.37746C5.18025 3.21617 5.43832 3.02262 5.66413 2.76455C5.85767 2.57101 6.01896 2.3452 6.11574 2.15165C6.21251 2.3452 6.34154 2.57101 6.50284 2.76455C6.7609 3.05488 7.01896 3.24843 7.27703 3.40972C7.01896 3.53875 6.72864 3.7323 6.47058 4.02262C6.34154 4.15165 6.21251 4.31294 6.148 4.50649Z" fill="black"/>'
                //     +'<path d="M21.4055 17.926C21.1474 17.8938 20.4377 17.7325 19.9216 17.1518C19.5668 16.7325 19.4377 16.2486 19.4055 15.9583C19.3732 15.797 19.2764 15.7002 19.1151 15.668C18.9539 15.668 18.8248 15.7647 18.7926 15.926C18.6958 16.2486 18.5345 16.7325 18.1151 17.1518C17.6635 17.6357 17.1151 17.8615 16.7603 17.9583C16.599 17.9905 16.5022 18.1518 16.5345 18.3131C16.5345 18.4744 16.6635 18.6035 16.8248 18.6035C17.1151 18.6357 17.5668 18.7002 17.9861 19.0228C18.6635 19.5389 18.7926 20.3454 18.7926 20.5712C18.7926 20.7325 18.9539 20.8615 19.1151 20.8615C19.2764 20.8615 19.4377 20.7002 19.4377 20.5389C19.4377 20.3131 19.5022 19.7325 19.9216 19.2486C20.4377 18.6357 21.1797 18.5712 21.4055 18.5712C21.5668 18.5712 21.728 18.4422 21.728 18.2809C21.6958 18.0873 21.5668 17.926 21.4055 17.926ZM19.4055 18.797C19.2442 18.9583 19.1474 19.1518 19.0506 19.3131C18.8893 19.0228 18.6635 18.7325 18.341 18.4744C18.1797 18.3454 18.0184 18.2486 17.8248 18.1841C18.0829 18.0228 18.341 17.8293 18.5668 17.5712C18.7603 17.3776 18.9216 17.1518 19.0184 16.9583C19.1151 17.1518 19.2442 17.3776 19.4055 17.5712C19.6635 17.8615 19.9216 18.0551 20.1797 18.2164C19.9539 18.3131 19.6635 18.5067 19.4055 18.797Z" fill="black"/>'
                //     +'</svg>'
                //     +"<p className='heading-400-14-12 m-0'>"+jsData[v+1]+" </p>"
                //   +"</div>"
                // }
                //html += '<p class="heading-400-14"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path opacity="0.6" fill-rule="evenodd" clip-rule="evenodd" d="M22 3H2V5H22V3ZM13 23V21H21C21.5523 21 22 20.5523 22 20V6H2V20C2 20.5523 2.44772 21 3 21H11V23H13ZM4 19V8H20V19H4ZM13 10H18V12H13V10ZM18 14H13V16H18V14ZM9 10V13H12C12 14.6569 10.6569 16 9 16C7.34315 16 6 14.6569 6 13C6 11.3431 7.34315 10 9 10Z" fill="#211E24"></path></svg>'+jsData[v]+' </p>'
                //html += "</div>";
                //if(v ==3){
                  //html += '<button class="button mt-5" onClick="handleClick('+"'"+'show'+"'"+')">Show More</button>'; 
                  //html += '<button class="button mt-5" onClick={() => handleClick("show")}">Show More</button>'; 
                  //break;
                //}
                
                //<button className='button mt-2' onClick={onShowLessHandler}>Show Less</button> : <button className='button mt-5' onClick={onShowMoreHandler}>Show More</button>"
                // {displayCount === scopeOfWorkArray.length ? <button className='button mt-2' onClick={onShowLessHandler}>Show Less</button> : <button className='button mt-5' onClick={onShowMoreHandler}>Show More</button>}
            }
            
      
            // Append the new div to the target div with an id of "targetDiv"
            const targetDiv = document.getElementById('scopeDiv');
            if (targetDiv) {
              targetDiv.innerHTML = html;
            }

            const targetDiv2 = document.getElementById('scopeDiv2');
            if (targetDiv2) {
              targetDiv2.innerHTML = html2;
            }
          }
          
          // Call another API here
          await callAnotherAPI(mapingdata);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      const callAnotherAPI = async (mapingdata) => {
        try {
          const machineTypePayload = JSON.stringify({
            type: mapingdata?.type,
            amc_plan_id: mapingdata?.amc_master_id
            // amc_plan_id: mapingdata?.id
        });
        const response = await fetch('https://contacts.origaleasing.com/basedonTypefetchOncallServiceDetails', {
            method: 'POST',
            body: machineTypePayload,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const responseData = await response.json();
        setsimilarplans(responseData?.jsondata)
        //console.log('responseData************>>>>', responseData?.jsondata);
  
          // Process the response
        } catch (error) {
          console.error('Error fetching another API:', error);
        }
      };
    
      fetchData(); // Call the function to fetch data when the component mounts
    }, []);
  
  const productCategory=<WishListBlock/>

  const [showModal, setShowModal] = useState(false);
  const handleModal = (status) => {
      if(status){
          setShowModal(status);
          document.body.classList.add('no-overflow');
      }else{
          setShowModal(false);
          document.body.classList.remove('no-overflow');
      }
  }
  const ScheduleServiceAPI = async () =>{
    console.log('ScheduleServiceAPI');
    try {
      const response = await fetch('https://devextension.origa.market/api/createservicewithamc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            "usermobile" : amcplan?.contact_number,
            "amc_order_id" : plan_id,
            "service_type" : "Breakdown"
        }
        ),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      else{
        Setservicerequest(true)
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const isSmallScreen=window.innerWidth<=576
  const breadcrumbsItems = [ { name: "Account", link: "/" }, { name: "My Machines", link: "/buy/my-machine" },{name:"Your Orders",link:"/yourorder"}];
  const boldtitle="AMC Plans";
  //const OrderSectionData=[  { title:"Price", price:`₹${amcplan?.amc_cost}`},{ title:"Discount", price:"-"},{ title:"Delivery Charges", price:"Free"},{ title:"GST (18%)", price:"-" }];
  const OrderSectionData=[  { title:"Price", price:`₹${amcplan?.amc_cost}`},{ title:"Discount", price:"-"},{ title:"Delivery Charges", price:"Free"},{ title:"GST (18%)", price:`₹${amcplan?.gst_amount}` }];
  const breakpoints={
    a:2.8,
    b:2.6,
    c:2.1,
    d:1.5,
    e:1.1
  };

  
  const containerData = similarplans?.map(plan => ({
    id: plan.id,
    title: plan.name,
    price: `₹${plan.price}`,
    message: plan.description[0],
    discount: plan.gst_percent,
    productQuentity: 200,
    imageUrl: plan.plan_image,
  }));

const productDetails={
  imageUrl:'asset/popupmachine.png',
  heading:"Star AMC Plan",
  title:"For CNC Hitachi Machine",
  message:"Purchased on: 2 May 2023"
}



  return (
    <> 
    {
      servicerequest && (
        <Scheduled Setservicerequest={Setservicerequest} />
    )}
    {
      showModal && (
        <WriteReviewPopup modalAction={handleModal} productDetails={productDetails}/>
    )
    }
    <div className='container-fluid'>
    {/*section 1*/}
    <div className='max-container pt-4'>
    <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} />
  
    <div className="border-wrap p-3" >
    
    <div className='row d-flex justify-content-between col-reverse'>
    <div className='col col-auto'>
      <div className='d-flex align-items-center gap-2'>
      <div className=" heading-600-24-16">{amcplan?.amc_plan} Annual maintenance contract (AMC) plan</div>
      <button className='button-active'>{amcplan?.status}</button>
    </div>
  
    <div>
    <p className='heading-400-16-14 op-50'>{amcplan?.type}</p>
    </div>
    </div>
      <div className='col col-auto'>
       <p className='heading-600-16-14 text-end'>₹{amcplan?.amc_cost}</p>
       <p className='heading-600-16-14'>Rate & Review Product</p>
       </div>
      
    </div>
    <div class="hide-992 product-img-wrap">
        <div class="d-flex ">
          <div class="product shadow2">
            <img className="img-fluid" src={amcplan.plan_image} alt={amcplan.plan_image}/>
          </div>
          <div class="product shadow2">
            <img className="img-fluid" src={amcplan.plan_image} alt={amcplan.plan_image}/>
          </div>
          <div class="product shadow2">
            <img className="img-fluid" src={amcplan.plan_image} alt={amcplan.plan_image}/>
          </div>
        </div>    
      </div>
    
   
  </div>

  
  
    </div>

    {/*section 2*/}
    <div className='xmax-container'>
 {/* <ProductImages/>*/}
    </div>

    {/*Section-3*/}
    <div className='max-container'>
    <div className='border-wrap'>
    <div className="row p-3 pt-3 ">
          <div className="col">
            <h3 className="heading-600-16 after-full-line pb-3">Order Details</h3>
          </div>
        </div>
    <div className='row pl-3 pr-3 pt-1'>
    <div className='col col-md-3'>
    <p className='heading-400-14-12 op-70'>Order received</p>
    <p className='heading-500-16'>{amcplan?.amc_start_date}</p>
   
    {/* <p className='heading-500-16'>26 July 2023, Mon</p> */}
    </div>
    <div className='col col-md-3'>
    <p className='heading-400-14-12 op-70'>Validity till</p>
    <p className='heading-500-16'>{amcplan?.amc_end_date}</p>
    {/* <p className='heading-500-16'>25 July 2024</p> */}
    </div>
    </div>    
    </div>

    </div>

    {/*section-4*/}
    <div className='max-container'>
    <div className='border-wrap'>
    <div className="row p-3 pt-3 ">
          <div className="col col-12">
          <div className=' after-full-line p-0 pb-3 m-0 row judtify-content-between'>
          <div className='col col-8'>
          <h3 className="heading-600-14">Annual Maintenance Contract <span className='heading-400-14 op-60'>|  {amcplan?.plan}</span></h3>
          <p className='heading-600-16'>₹{amcplan?.amc_cost}</p>
          </div>

            <div className='col col-4 text-end p-0'>
              {/* <button className='button' onClick={() => handleModal(true)}> Schedule Service</button> */}
              <button className='button' onClick={() => ScheduleServiceAPI()}> Schedule Service</button>
            </div>
          </div>
            </div>
            
        </div>

        <div className='row pl-3 pr-3 pt-1'>
    <div className='col col-md-2'>
    <p className='heading-400-14-12 op-70'>Service Provider</p>
    <p className='heading-500-16'>Origa Markets</p>
    </div>
    <div className='col col-md-2'>
    <p className='heading-400-14-12 op-70'>Valid Till</p>
    <p className='heading-500-16'>{amcplan.amc_end_date}</p>
    </div>

    <div className='col col-md-2'>
    <p className='heading-400-14-12 op-70'>Contact Number</p>
    <p className='heading-500-16'>8622099099</p>
    </div>
    <div className='col col-md-3'>
    <p className='heading-400-14-12 op-70'>Email</p>
    <p className='heading-500-16'>info@origa.market</p>
    </div>
    <div className='col col-md-3'>
    <p className='heading-400-14-12 op-70'>Last Service Date</p>
    <p className='heading-500-16'>{amcplan.last_service_date}</p>
    </div>
    </div>   
    <div className='row pl-3 pr-3 pt-2 pb-4' id="scopeDiv1">
    <div className='col col-12'>
    <p className='heading-400-14-12 op-70'>Service Scope</p>
    </div>
    <div className='row pl-3 pr-3 pt-2 ' id="scopeDiv"></div> 
    <div className='row pl-3 pr-3 pb-4' id="scopeDiv2"></div> 
    </div>
    
    
    
    
    {displayCount === jsData.length ? <><button className='button  ml-3 mb-3' onClick={onShowLessHandler}>Show Less</button></> : <> <button className='button ml-3 mb-3' onClick={onShowMoreHandler}>Show More</button></>}        
            
    {/* <div className='col col-3'>
    <div className='d-flex align-items-center gap-2 '>
    <Getservice/>
    <p className='heading-400-14-12 m-0'>3 Maintenance services* </p>
    </div>
    <div className='d-flex align-items-center gap-2 pt-3'>
    <Washing/>
      <p className='heading-400-14-12 m-0'>2 Additional free washing* </p>
    </div>
    </div>
    <div className='col col-4 p-0'>y
    <div className='d-flex align-items-center gap-2'>
    <LabourCharges/>
    <p className='heading-400-14-12 m-0'>10% discount on Labour charges (except accidental)  </p>
    </div>
    <div className='d-flex align-items-center gap-2 pt-3'>
    <SpareParts/>
      <p className='heading-400-14-12 m-0'>5% discount on spare parts and accessories.</p>
    </div>
    </div>
    <div className='col col-4 '>
    <div className='d-flex align-items-center gap-2'>
    <Washing/>
    <p className='heading-400-14-12 m-0'>2 Additional free washing*  </p>
    </div>

   
    </div> */}


    {/* </div> */}
    
    </div>

    </div>
    
    {/*section-5*/}
    <div className='max-container'>
<div className='container-fluid p-0 m-0 row d-flex justify-content-between'>
  
<div className='w-48-100 p-0 show-768 '>
{/* <div className="border-wrap">
      <div className="row p-3 ">
          <div className="col">
            <h3 className="heading-400-14-12">Delivery Address</h3>
            <p className='heading-500-16-14'>Rajeev Singh<br/>
            rajeev@gmail.com , 9833956203</p>
          </div>
          <p className='heading-500-16-14'>
          Solitaire Corporate Park, Building No 1, 111/112, Andheri - Kurla Rd, Chakala, Andheri East, Mumbai, Maharashtra 400093
          </p>
        </div> 
      </div> 
</div> */}
<div className="border-wrap">
      <div className="row p-3 ">
          <div className="col">
            <h3 className="heading-400-14-12">Delivery Address</h3>
            <p className='heading-500-16-14'>{amcplan.factory_name} {amcplan.factory_name === 'dummy' ? " " : amcplan.factory_name}<br/>
            {amcplan.contact_number}</p>
          </div>
          <p className='heading-500-16-14'>
          {amcplan.factory_location}
          {/* Solitaire Corporate Park, Building No 1, 111/112, Andheri - Kurla Rd, Chakala, Andheri East, Mumbai, Maharashtra 400093 */}
          </p>
        </div> 
      </div> 
</div>
<div className="w-48-100  border-wrap">
        <div className="row pt-3">
          <div className="col">
            <h3 className="heading-600-16">Order Summary</h3>
          </div>
        </div>
        <div className="border"></div>
        <div className="pt-2"></div>
        
      {OrderSectionData.map((product, index) => (
        <div className="row" key={index}> 
          <div className="col col-lg-6 col-6">
            <p className="heading-400-14-12 op-60">{product.title}</p>
          </div>
          <div className=" col col-lg-6 col-6 d-flex justify-content-end">
            <p className="heading-500-16 p-0">{product.price}</p>
          </div>
        </div>
    
    ))}
    <div className="border"></div>
    <div className="row pt-3 ">
          <div className="col col-lg-6 col-6">
            {" "}
            <p className="heading-600-16">TOTAL AMOUNT</p>
          </div>
          <div className=" col col-lg-6 col-6 d-flex justify-content-end ">
            <p className="heading-600-16">₹{(amcplan?.total_amount) }</p>
          </div>
        </div>
        <div className="border"></div>
   
        <div className='d-flex justify-content-end' >  
        <div className='pt-4 pr-4  m-0'><p className='heading-600-14-12'>Download Tax Invoice</p></div>
        <div className='pt-4 m-0'><p className='heading-600-14-12'>Download  Invoice</p></div>
        </div>
                
      </div>

      <div className='w-48-100 p-0'>
      <div className=" border-wrap hide-768">
      {/* <div className="row p-3 ">
          <div className="col">
            <h3 className="heading-400-14-12">Delivery Address</h3>
            <p className='heading-500-16-14'>Rajeev Singh<br/>
            rajeev@gmail.com , 9833956203</p>
          </div>
          <p className='heading-500-16-14'>
          Solitaire Corporate Park, Building No 1, 111/112, Andheri - Kurla Rd, Chakala, Andheri East, Mumbai, Maharashtra 400093
          </p>
        </div> 
      </div>  */}

        <div className="row p-3 ">
          <div className="col">
            <h3 className="heading-400-14-12">Delivery Address</h3>
            {/* <p className='heading-500-16-14'>{amcplan.factory_name}<br/> */}
            <p className='heading-500-16-14'>{amcplan.factory_name === 'dummy' ? " " : amcplan.factory_name}<br/>
            {amcplan.contact_number}</p>
          </div>
          <p className='heading-500-16-14'>
          {amcplan.factory_location === 'dummy' ? "  " : amcplan.factory_name}
          {/* Solitaire Corporate Park, Building No 1, 111/112, Andheri - Kurla Rd, Chakala, Andheri East, Mumbai, Maharashtra 400093 */}
          </p>
        </div> 
      </div> 

      
      </div>
 
     
      
  </div>

</div>

{/*Section-6*/}

<div className='max-container'>
    <div className='row py-5'>
    <div className='col col-lg-8 col-12 p-0'>
         
        
    <div className="col col-12 pt-3">
        <h1 className='heading-600-44-20'>Similar Plans</h1>
    </div>
    <div className="col col-12 pt-2">
        <p className='heading-400-16 op-80'>Enjoy the flexibility of selecting from our diverse range of plans</p>
    </div>
          </div>
        {<div className={`col col-lg-4 d-flex align-self-center ${isSmallScreen ? "justify-content-center":"justify-content-end"}`}>
        <p className='heading-600-14-12 v-center'>View all </p>
        <div className='arrow-div ml-2'>
        <RightArrow/>
        </div> 
          </div>}
         
            </div>
        <Slider7 breakpoints={breakpoints} hide={"show-992"} productCategory={productCategory} listofdata={containerData}/>
    </div>
    </div>
    <AccountFooter/></>
  )
}

export default AMCPlans