import React, { useEffect } from 'react';
import { closeIcon } from '../../../helpers/Icons';
const SuccessPopup = ({onNavi,message}) => {
    const success = '/asset/Congratulation.png'
    useEffect(() => {
        if (onNavi) {
            setTimeout(() => {onNavi()}, 2000);
        } 
      }

,[]);


    return (
        <>
        <div className="bi-popup-wrap">
            <div className="back" ></div>
            <div className="inner">
                <button onClick={onNavi}  className="close">{closeIcon({width:16,height:16})}</button>
                <img src={success} alt={success}/>
                <div className="heading-600-20 heading-600-20-16 t-a-c">{message}</div>
              
                <div>
               
                </div>
            </div>
        </div>
        
        </>
    );
};

export default SuccessPopup;
 