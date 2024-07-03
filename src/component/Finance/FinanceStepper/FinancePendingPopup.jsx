import React, { useEffect } from 'react';

import EditIcon from "../../SubComponent/EditIcon";
import "./FinancePending.css";
import { useNavigate } from "react-router-dom";
import Button from "../../Button/Button";

function formatISTDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    };
    return new Intl.DateTimeFormat('en-IN', options).format(date);
}

const FinancePendingPopup = ({ pendingresponse, setShowFinancePopup, setShowRemainingField, setPendingValue }) => {
    console.log('pendingresponse-------->',pendingresponse);
    const handleClose = () => setShowFinancePopup(false);
    const enablefullaccess = () => {
        setShowRemainingField(true)
        setShowFinancePopup(false)
    }
    const userRevalidator = async (id, phone_number) => {
        try {
            const response = await fetch(`https://devextension.origa.market/api/getfinancedata`, {
                method: "POST",
                body: JSON.stringify({ "phonenumber": phone_number, "id": id })
            });
            const responseData = await response.json();
            // console.log('Fixed_response----->', responseData);
            setPendingValue(responseData)
            setShowRemainingField(true)
            setShowFinancePopup(false)
            //setModelOption(responseData?.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };
    return (
        <div className="FinancePending-popup">
            <div className="inner">
                <div className="popup-header">
                    <div className="popup-title-container">
                        <h2 className="popup-title">Resume Application</h2>
                    </div>
                    <button className="close" onClick={handleClose}>Close</button>
                </div>

                {/* Table for larger screens */}
                <div className="finance-table-responsive show-on-large">
                    <table className="finance-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Application Date</th>
                                <th>Machine Name</th>
                                <th>Model</th>
                                <th>Applied Amount</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingresponse?.result?.length > 0 ? (
                                pendingresponse.result.map((item, index) => (
                                    <>
                                        <tr key={index}>
                                            <td>{item?.firstname}</td>
                                            <td>{formatISTDate(item?.createdat)}</td>
                                            <td>{item?.othermachine}</td>
                                            <td>{item?.othermodelno}</td>
                                            <td>{item?.machineprice}</td>
                                            <td>
                                                <button onClick={() => userRevalidator(item?.id, item?.phonenumber)}>
                                                    <EditIcon />
                                                </button>
                                            </td>
                                        </tr>

                                    </>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No Pending Finance Details Found</td>
                                </tr>
                            )}
                            
                            <tr>
                                <td colSpan="6">
                                    <div className="button-container">
                                        <div className="button-wrapper">
                                            <Button message={"Create New Finance"} callFunction={enablefullaccess} />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Label-value pairs for smaller screens */}
                <div className="hide-on-large">
                    {pendingresponse?.result?.length > 0 ? (
                        pendingresponse.result.map((item, index) => (
                            <>
                                <div key={index} className="finance-details">
                                    <div className="finance-detail-row">
                                        <div className="finance-label">Name:</div>
                                        <div className="finance-value">{item.firstname}</div>
                                    </div>
                                    <div className="finance-detail-row">
                                        <div className="finance-label">Application Date:</div>
                                        <div className="finance-value">{formatISTDate(item.createdat)}</div>
                                    </div>
                                    <div className="finance-detail-row">
                                        <div className="finance-label">Machine Name:</div>
                                        <div className="finance-value">{item.othermachine}</div>
                                    </div>
                                    <div className="finance-detail-row">
                                        <div className="finance-label">Model:</div>
                                        <div className="finance-value">{item.othermodelno}</div>
                                    </div>
                                    <div className="finance-detail-row">
                                        <div className="finance-label">Applied Amount:</div>
                                        <div className="finance-value">{item.machineprice}</div>
                                    </div>
                                    <button onClick={() => userRevalidator(item.id, item.phonenumber)}>
                                        Edit Details
                                    </button>
                                </div>

                            </>
                        ))
                    ) : (
                        <div>No Pending Finance Details Found</div>
                    )}
                    {/* <div className='pt-5 d-flex justify-content-end'>
                        <div className="btn-wrap">
                            <button onClick={enablefullaccess} type="button" className="box-item-btn">Create New Finance</button>
                        </div>
                    </div> */}
                    <div className="button-container">
                        <div className="button-wrapper">
                        <button onClick={enablefullaccess} type="button" className="box-item-btn" >Create New Finance</button>
                            {/* <Button message={"Create New Finance"} callFunction={enablefullaccess} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancePendingPopup;
