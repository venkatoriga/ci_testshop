import React, { useState, useEffect } from 'react';
import LoginModal from "./Modals/LoginModal";
import UserModal from "./Modals/UserModal";
import ThankModal from "./Modals/ThankModal";
import SkipModal from "./Modals/SkipModal";
import UploadDocumentmodal from "./Modals/UploadDocumentModal";
import DatePicker from "react-multi-date-picker";
import { useNavigate,useLocation } from 'react-router-dom';
import { hasValidationError, validationError, focusOnFeild } from "../../helpers/Frontend";
import { closeIcon, morningIcon, afternoonIcon, eveningIcon, leftArrowIcon, plusIcon, minusIcon } from "../../helpers/Icons";
import Icon from "react-multi-date-picker/components/icon";
import './MachineDetail.css';
import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import dayjs from 'dayjs';
import { uploadIcon, fileIcon, deleteIcon } from "../../helpers/Icons";
import LoginModel from '../Authentication/LoginModel/LoginModel';
import Footer from "../Footer/Footer";
import axios from "axios";
import Loader from "../SubComponent/Loader";
const client = new ApolloClient({
    uri: 'https://devextension.origa.market/graphql/',
    cache: new InMemoryCache(),
});

const Sell_MACHINE_MUTATION = gql`
  mutation($inputdraft: ProductDraftDetailsInput!) {
    createProductdraftdetails(inputdraft: $inputdraft) {
      productdraftdetails {
        id
        productName
        productVideo
        prodctImage
        __typename
      }
      message
      id
      processid
      __typename
    }
  }
`;

const UpdateProductDraftSchedule = gql`
mutation UpdateProductDraftSchedule($draftData: UpdateProductDraftScheduleInput!) {
    updateProductdraftschedule(draftData: $draftData) {
        message
        __typename
    }
}
`;
const MachineDetail = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const Segment = queryParams.get('Segment');
    console.log('Segment----->',Segment);
    const token = localStorage.getItem('userToken');
    const MachineValue = localStorage.getItem('MachineValue');
    // window.scroll(0, 0)
    const [selectedDates, setSelectedDates] = useState([]);
    const [form, setForm] = useState({ machines: [{ machine: "", files: [] }], location: "", dates: [], times: [], first_name: "", last_name: "", email: "", phone: "", alter_phone: "", address: "", address1: "", zipcode: "" });
    const [errors, setErrors] = useState([]);
    const [activeStep, setActiveStep] = useState(1);
    const [showModel, setShowModel] = useState(false);
    const [sellData, setsellData] = useState(false);
    const [showUserModel, setShowUserModel] = useState(false);
    const [showThanksModel, setShowThanksModel] = useState(false);
    const [showSkipModel, setShowSkipModel] = useState(false);
    const [showUploadModel, setShowUploadModel] = useState(false);
    const [uploadFiles, setUploadFiles] = useState([]);
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('MachineValue---->', MachineValue);
        if (MachineValue !== null) {
            // Parse the MachineValue from local storage
            const machinesData = JSON.parse(MachineValue);
            console.log('machinesData---->', machinesData);
            setForm(prevForm => ({
                ...prevForm,
                machines: machinesData.map(machine => ({
                    machine: machine.machine,
                    files: machine.files
                }))
            }));
        }
    }, [MachineValue]);
    const timePreferences = [
        { name: "Morning", time: "10 AM - 01 PM", icon: "morning" },
        { name: "Afternoon", time: "01 PM - 06 PM", icon: "afternoon" },
        { name: "Evening", time: "06 PM - 10 PM", icon: "evening" },
    ];
    const onChange = (e) => {
        const { name, value } = e.target;

        // Validate and process only if the field is "location"
        if (name === "location" || name === 'zipcode') {
            let newValue = value.replace(/[^0-9]/gi, '');
            if (newValue === "" || newValue.length <= 6) {
                handleCustom(name, newValue);
            }
        } else if (name === "phone" || name === "alter_phone") {
            let newValue = value.replace(/[^0-9]/gi, '');
            if (newValue === "" || newValue.length <= 10) {
                handleCustom(name, newValue);
            }
        } else {
            handleCustom(name, value);
        }
    }
    const handleCustom = (name, value) => {
        setForm((prevState) => ({ ...prevState, [name]: value }));
    }
    const removeMachine = () => {
        setForm((prevState) => ({
            ...prevState,
            machines: prevState.machines.slice(0, -1) // Remove the last element
        }));
    };


    const addMachine = () => {
        setErrors('')
        setForm((prevState) => ({
            ...prevState,
            machines: [...prevState.machines, { machine: "", files: [] }]
        }));
    };
    const createSellAPi = async () => {
        const id = localStorage.getItem('id');
        const email = localStorage.getItem('email');
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
        const number = localStorage.getItem('number');
        const newError = {};
        // console.log('form--->',form.machines.length);

        if (!form.machines.every(machine => machine.machine !== '')) {
            if (form.machines.length > 1) {
                newError["zipcode"] = "Please enter details for all machines or remove the unused machine Field..!";
            }
            else {
                newError["zipcode"] = "Please enter machine details..!";
            }
            setErrors(newError);
            return;
        }

        try {
            const sellDataArray = [];
            for (const machine of form.machines) {
                const otherDocuments = [];
                const productImages = [];

                // Loop through machine files
                machine.files.forEach((file) => {
                    // Check file extension
                    const extension = file.imageUrl.split('.').pop().toLowerCase();

                    // Check if it's a document file
                    if (extension === 'pdf' || extension === 'doc' || extension === 'docx') {
                        otherDocuments.push(file);
                    } else {
                        productImages.push(file);
                    }
                });
                const inputdraft = {
                    "productname": machine.machine,
                    /* "prodctimage": uploadFiles, */
                    "prodctimage": productImages,
                    // "otherdocuments": otherDocuments,
                    "otherproductdetails": {
                        "otherdocuments": otherDocuments,
                        "level0":Segment,
                        "segment":Segment

                    },
                    "useremailid": email,
                    "pincode": null,
                    "ompuserid": id,
                    "usertype": "Seller",
                    "firstname": firstName,
                    "lastname": lastName,
                    "mobileno": number,
                };
                setloading(true)
                const { data } = await client.mutate({
                    mutation: Sell_MACHINE_MUTATION,
                    variables: { inputdraft: inputdraft },
                });

                sellDataArray.push(data.createProductdraftdetails);
            }
            setloading(false)
            setsellData(sellDataArray);
            setActiveStep(2);
        } catch (error) {
            setloading(false)
            console.log('error----------------------->', error);
        }


    }
    const createSell = async () => {
        if (!token) {
            // Store Machine value in local storage
            const MachineValue = form.machines.map((machine, index) => ({
                machine: machine.machine,
                files: machine.files
            }));
            console.log('MachineValue', MachineValue);
            localStorage.setItem('MachineValue', JSON.stringify(MachineValue));
            setShowModel(true)
        } else {
            createSellAPi();
            localStorage.removeItem('MachineValue');
        }
    }







    const removeDate = (index) => {
        let dates = Object.assign([], selectedDates);
        dates.splice(index, 1);
        setSelectedDates(dates);
    }
    const getSVGIcons = (icon) => {
        if (icon == "morning") {
            return morningIcon({ width: 22, height: 22, fill: "#211E24" });
        } else if (icon == "afternoon") {
            return afternoonIcon({ width: 22, height: 22, fill: "#211E24" });
        } else if (icon == "evening") {
            return eveningIcon({ width: 22, height: 22, fill: "#211E24" });
        }
    }
    const handleTimeChange = (value) => {
        let timeObj = Object.assign([], form.times);
        if (!timeObj.includes(value)) {
            timeObj.push(value);
        } else {
            timeObj = timeObj.filter((x) => x != value);
        }
        setForm((prevState) => ({ ...prevState, times: timeObj }));

    }

    const handleStep2Change = () => {
        const newError = {};
        let positionFocus = "";
        if (!selectedDates.length) {
            newError["dates"] = "Mention your Availability Date";
            positionFocus = positionFocus || "dates";
        }
        if (selectedDates.length && !form.times.length) {
            newError["times"] = "Required";
            positionFocus = positionFocus || "times";
        }
        setErrors(newError);
        if (positionFocus) {
            focusOnFeild(positionFocus);
            return false;
        }
        setActiveStep(3);
    }

    const handleNextChange = async () => {

        const newError = {};
        const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let positionFocus = "";
        if (!form.first_name || !form.first_name.trim()) {
            newError["first_name"] = "Required";
            positionFocus = positionFocus || "first_name";
        } else if (form.first_name && form.first_name.length > 100) {
            newError["first_name"] = "Maximum 100 characters allowed";
            positionFocus = positionFocus || "first_name";
        }
        if (!form.last_name || !form.last_name.trim()) {
            newError["last_name"] = "Required";
            positionFocus = positionFocus || "last_name";
        } else if (form.last_name && form.last_name.length > 100) {
            newError["last_name"] = "Maximum 100 characters allowed";
            positionFocus = positionFocus || "last_name";
        }
        if (!form.email || !form.email.trim()) {
            newError["email"] = "Required";
            positionFocus = positionFocus || "email";
        } else if (form.email && form.email.length > 100) {
            newError["email"] = "Maximum 100 characters allowed";
            positionFocus = positionFocus || "email";
        } else if (form.email && !emailRE.test(form.email)) {
            newError["email"] = "Enter a valid email";
            positionFocus = positionFocus || "email";
        }
        if (!form.phone || !form.phone.trim()) {
            newError["phone"] = "Required";
            positionFocus = positionFocus || "phone";
        } else if (form.phone.length < 10) {
            newError["phone"] = "Enter valid phone number";
            positionFocus = positionFocus || "phone";
        }
        if (!form.address || !form.address.trim()) {
            newError["address"] = "Required";
            positionFocus = positionFocus || "address";
        } else if (form.address && form.address.length > 255) {
            newError["address"] = "Maximum 255 characters allowed";
            positionFocus = positionFocus || "address";
        }
        if (form.address1 && form.address1.length > 255) {
            newError["address1"] = "Maximum 255 characters allowed";
            positionFocus = positionFocus || "address1";
        }
        if (!form.zipcode || !form.zipcode.trim()) {
            newError["zipcode"] = "Required";
            positionFocus = positionFocus || "zipcode";
        } else if (form.zipcode && form.zipcode.length > 10) {
            newError["zipcode"] = "Maximum 10 characters allowed";
            positionFocus = positionFocus || "zipcode";
        }
        setErrors(newError);
        if (positionFocus) {
            focusOnFeild(positionFocus);
            return false;
        }
        let inspectionschedule = {};
        let i = 1;


        selectedDates.map((selectedDate) => {
            inspectionschedule[`date${i}`] = `${selectedDate.year}-${selectedDate.month.number}-${selectedDate.day}`;
            inspectionschedule[`time${i}`] = form.times[i - 1];
            // {selectedDate.day} {selectedDate.month.shortName}

            i++;
        });

        let contactdetails = {
            "firstname": form.first_name,
            "lastname": form.last_name,
            "useremailid": form.email,
            "phoneno": form.phone,
            "alternateno": form.alter_phone
        }


        let machinelocation = {
            "address1": form.address,
            "address2": form.address1,
            "pincode": form.zipcode
        }

        for (const item of sellData) {
            const draftData = {
                "pdid": item?.id,
                "inspectionschedule": inspectionschedule,
                "machinelocation": {
                    "contactdetails": contactdetails,
                    "machinelocation": machinelocation
                }
            };
            setloading(true)
            const { data } = await client.mutate({
                mutation: UpdateProductDraftSchedule,
                variables: { draftData: draftData },
            });
        }
        setloading(false)
        setShowSkipModel(true);
    }
    const onMachineChange = (index, value) => {
        setErrors('')
        // console.log('index------->', index);
        let machineObj = Object.assign([], form.machines);
        machineObj[index]["machine"] = value;
        setForm((prevState) => ({ ...prevState, machines: machineObj }));
    }



    const handleDateChange = (value) => {
        // Filter out past dates
        const filteredDates = value.filter((date) => !dayjs(date).isBefore(dayjs(), 'day'));

        // Limit the selection to a maximum of 3 dates
        const limitedDates = filteredDates.slice(0, 3);

        setSelectedDates(limitedDates);
    };

    const handleLocationBlur = () => {
        const locationValue = form.location;

        // Check if the location value has less than 6 digits
        if (locationValue.length < 6) {
            // If below 6 digits, set the location to an empty string
            setForm((prevForm) => ({
                ...prevForm,
                location: "",
            }));
        }
        // Additional logic can be added here if needed
        // For example, you can perform some action when the input loses focus
    };

    const handleZipcodeBlur = () => {
        const zipcodeValue = form.zipcode;

        // Check if the zipcode value has less than 6 characters
        if (zipcodeValue.length < 6) {
            // If below 6 characters, set the zipcode to an empty string
            setForm((prevForm) => ({
                ...prevForm,
                zipcode: "",
            }));
        }
        // Additional logic can be added here if needed
        // For example, you can perform some action when the input loses focus
    };

    const onHidePortal = () => {
        // setShowUserModel
        setShowModel(false);
        // window.location.reload();
    }

    const handleBrowse = (index) => {
        document.querySelector(`.bi-upload-file-${index}`).value = "";
        document.querySelector(`.bi-upload-file-${index}`).click();
    };




    const handleFileChange = async (files, index) => {
        if (!files.length) return;

        try {
            const uploadPromises = Array.from(files).map(async (file) => {
                // console.log('file---->',file);
                const formData = new FormData();
                formData.append("file", file);
                const extension = file.name.split('.').pop().toLowerCase();
                let End_Point
                if (extension === 'pdf' || extension === 'doc' || extension === 'docx') {
                    End_Point = '/uploadproductdoc';
                } else {
                    End_Point = '/productimageupload/';
                }
                setloading(true)
                const response = await axios.post(
                    `https://devextension.origa.market/api${End_Point}`,
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                setloading(false)
                return { name: file.name, imageUrl: response.data.url };
            });

            const uploadedFiles = await Promise.all(uploadPromises);

            setForm(prevState => {
                const newMachines = [...prevState.machines];
                const existingFiles = newMachines[index].files || [];

                // Merge the files: Replace if exists, append if new
                uploadedFiles.forEach(newFile => {
                    const fileIndex = existingFiles.findIndex(file => file.name === newFile.name);
                    if (fileIndex !== -1) {
                        // Replace existing file
                        existingFiles[fileIndex] = newFile;
                    } else {
                        // Append new file
                        existingFiles.push(newFile);
                    }
                });

                newMachines[index].files = existingFiles;
                return { ...prevState, machines: newMachines };
            });
        } catch (error) {
            setloading(false)
            console.error("Error uploading file:", error);
        }
    };

    const handleDeleteFile = (machineIndex, fileIndex) => {
        setForm(prevState => {
            const newMachines = [...prevState.machines];
            // Remove the file at fileIndex from the files array
            const updatedFiles = newMachines[machineIndex].files.filter((_, idx) => idx !== fileIndex);
            newMachines[machineIndex].files = updatedFiles;
            return { ...prevState, machines: newMachines };
        });
    };


    // console.log(uploadFiles)



    const onDropHandler = (index) => (e) => {
        e.preventDefault();
        console.log("I am drop", e.dataTransfer.files);
        handleFileChange(e.dataTransfer.files, index);
    };

    const onDragOverHandler = (e) => {
        e.preventDefault()
        // console.log("iam drag",e);
    }


    return (
        <>
            {loading && <Loader />}
            {showModel ? (
                <LoginModel onHide={onHidePortal} />
            ) : null}
            {showUserModel ? (
                <UserModal modalAction={setShowUserModel} setShowThanksModel={setShowThanksModel} hasThanksModel={true} />
            ) : null}
            {showThanksModel ? (
                <ThankModal modalAction={setShowThanksModel} />
            ) : null}
            {showSkipModel ? (
                <SkipModal modalAction={setShowSkipModel} />
            ) : null}

            <div className="container-fluid p-0">
                <div className="max-container mt-5">
                    <div className="top-wrap">
                        <button className="btn-back" onClick={() => navigate(-1)}>{leftArrowIcon({ width: 24, height: 24 })}</button>
                        <div className="center-wrap">
                            <div className="items-wrap">
                                <div className={`item ${((activeStep == 1) ? "active" : "completed")}`}>
                                    <span className="number heading-600-16-12">1</span>
                                    <span className={`text ${((activeStep == 1) ? "heading-600-16-12" : "heading-400-16-12")}`}>Machine Details</span>
                                </div>
                                <div className={`item ${((activeStep == 2 || activeStep == 3) ? "active" : "")}`}>
                                    <span className="number heading-600--12">2</span>
                                    <span className={`text ${((activeStep == 2 || activeStep == 3) ? "heading-600-16-12" : "heading-400-16-12")}`}>Schedule Evaluation</span>
                                </div>
                            </div>
                        </div>
                        {/* <button className="btn-upload heading-600-16-12" onClick={() => setShowUploadModel(true)}>{bulkUploadIcon({ width: 20, height: 20 })} Bulk Upload</button> */}
                        <button className="btn-upload heading-600-16-12"></button>
                    </div>
                    <div className="machine-details">
                        <div className="heading-600-24 heading-600-24-20 heading-600-24-16 heading-600-24-14 heading">{activeStep === 1 ? "Sell Your Machine Now" : "Schedule an Inspection Visit"}</div>
                        {(activeStep == 1) ? (
                            <div className="machine-content">
                                <div className="left-section">
                                    <div className="heading-600-20 heading">Let’s get started </div>
                                    <div className="heading-400-14 desc light-txt">Upload your machine details quickly and easily</div>
                                </div>
                                <div className="right-section">
                                    <div className="field-group-wrap">
                                        {form.machines.map((mObj, index) => (
                                            <>
                                                <div className="bi-form-group bi-has-right-icon" key={index}>
                                                    <input type="text" className={`bi-form-field ${errors.zipcode && mObj.machine === '' ? 'error-red' : ''} heading-600-14-12`} value={mObj.machine} onChange={(e) => onMachineChange(index, e.target.value)} placeholder="Which machine are you looking to sell?" autoCapitalize='off' />

                                                    <label className="bi-form-label light-txt">Which machine are you looking to sell? {<span style={{ color: '#CB1923' }}>*</span>}</label>
                                                </div>
                                                {/* <div className="upload-wrap" onClick={handleBrowse} onDragOver={onDragOverHandler} onDrop={onDropHandler(index)}>
                                                    {uploadIcon({ width: 40, height: 40 })}
                                                    <div className="desc heading-400-16">Drag & Drop or <span className="heading-600-18">Browse</span> file to Upload</div>
                                                </div> */}

                                                <div className="upload-wrap" onClick={() => handleBrowse(index)} onDragOver={onDragOverHandler} onDrop={onDropHandler(index)}>
                                                    {uploadIcon({ width: 40, height: 40 })}

                                                    <div className="desc heading-400-16">Drag & Drop or <span className="heading-600-18">Browse</span> file to Upload</div>

                                                </div>
                                                {/* <input
                                                    type="file"
                                                    name="file"
                                                    className="bi-upload-file"
                                                    data-index={index}
                                                    onChange={(e) => handleFileChange(e.target.files, index,)}
                                                    multiple
                                                /> */}
                                                <input
                                                    type="file"
                                                    name={`file-${index}`}
                                                    className={`bi-upload-file bi-upload-file-${index}`}
                                                    data-index={index}
                                                    onChange={(e) => handleFileChange(e.target.files, index)}
                                                    multiple
                                                />
                                                {mObj.files.length > 0 && (
                                                    <div className="uploading-wrap">
                                                        {mObj.files.map((uploadFile, fileIndex) => (
                                                            <div className="uploading-item" key={fileIndex}>
                                                                <div className="file-icon">{fileIcon({ width: 24, height: 30 })}</div>
                                                                <div className="file-data">
                                                                    <div className="name heading-600-14">{uploadFile.name}</div>
                                                                    <div className="process">
                                                                        <div className="process-inner"></div>
                                                                    </div>
                                                                    <div className="size-status-wrap">
                                                                        <div className="status heading-400-14">uploaded</div>
                                                                        {/*     <button onClick={() => handleDeleteFile(index, fileIndex)} className="delete-file-btn">X</button> */}

                                                                        <button onClick={() => handleDeleteFile(index, fileIndex)} className="delete-file-btn">
                                                                            {deleteIcon({ width: 10, height: 10 })}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ))}
                                        {form.machines.length > 1 && (
                                            <button className="add-machine heading-600-14-12" type="button" onClick={removeMachine} >{minusIcon({ width: 20, height: 20 })}Remove The Machine</button>
                                        )}
                                        <button className="add-machine heading-600-14-12" type="button" onClick={addMachine}>{plusIcon({ width: 20, height: 20 })}Add another Machine</button>
                                    </div>
                                    <div className="bi-form-group bi-has-right-icon">
                                        {/* <input type="text" name="location" className="bi-form-field heading-600-14-12" onChange={onChange} value={form.location} onBlur={handleLocationBlur} placeholder="Enter pincode of the machine location" autoCapitalize='off' />
                                        <label className="bi-form-label light-txt">Enter pincode of the machine location</label>
                                        {locationIcon({ width: 32, height: 32, className: "right-icon" })} */}
                                        {hasValidationError(errors, "zipcode") ? (<span className="has-cust-error">{validationError(errors, "zipcode")}</span>) : null}
                                    </div>
                                    <button className="btn-login" type="button" onClick={() => createSell()}>Next</button>
                                </div>
                            </div>
                        ) : null}
                        {(activeStep == 2 || activeStep == 3) ? (
                            <>
                                <div className="machine-content pb-5">
                                    <div className="left-section">
                                        <div className="heading-600-20 heading">Get an Accurate Valuation</div>
                                        <div className="heading-400-14 desc light-txt">We'll assist you in understanding the true value of your machine</div>
                                    </div>
                                    <div className="right-section">
                                        <div className="datePickerWraper">
                                            {selectedDates.length > 0 && <div className='show-date-title'>Select upto 3 dates</div>}
                                            <div className="datePickerWrap">
                                                {selectedDates.length > 0 ? selectedDates.map((selectedDate, index) => (
                                                    <div className="datePickerItem heading-600-12" key={index}>{selectedDate.day} {selectedDate.month.shortName}{closeIcon({ width: 12, height: 12, onClick: () => removeDate(index) })}</div>
                                                )) : <span className="placeholder light-txt">Select upto 3 dates</span>}
                                            </div>
                                            <DatePicker multiple disabled={selectedDates.length >= 3} className="datePickerCalender" onChange={handleDateChange} value={selectedDates} render={<Icon />} />
                                        </div>
                                        {hasValidationError(errors, "dates") ? (<span className="has-cust-error">{validationError(errors, "dates")}</span>) : null}
                                        {selectedDates.length > 0 ? (
                                            <div className="timePreferences">
                                                <label>Select Time Preference   <span style={{ color: 'red' }}>*</span></label>
                                                <div className="timePreference-wrap">
                                                    {timePreferences.map((timePreference, index) => (
                                                        <div className={`timePreference-item ${(form.times.includes(timePreference.time) ? "selected" : "")}`} onClick={() => handleTimeChange(timePreference.time)} key={index}>
                                                            <div className="icon">{getSVGIcons(timePreference.icon)}</div>
                                                            <div className="data">
                                                                <div className="name">{timePreference.name}</div>
                                                                <div className="time">{timePreference.time}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                {hasValidationError(errors, "times") ? (<span className="has-cust-error">{validationError(errors, "times")}</span>) : null}
                                            </div>
                                        ) : null}
                                        {activeStep == 2 ? (
                                            <div className="btn-wrap">
                                                <button className="btn-skip" type="button" onClick={() => { setShowSkipModel(true); setActiveStep(2); }}>Skip For Now</button>
                                                <button className="btn-submit" type="button" onClick={handleStep2Change}>Next</button>
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                {(activeStep == 3) ? (
                                    <>
                                        <div className="machine-content pb-5 pt-5">
                                            <div className="left-section">
                                                <div className="heading-600-20 heading">Point of Contact</div>
                                                <div className="heading-400-14 desc light-txt">We'd love to get in touch with you! Kindly share your contact details, and we'll reach out to discuss your machine</div>
                                            </div>
                                            <div className="right-section">
                                                <div className="bi-row-group">
                                                    <div className="bi-form-group">
                                                        <input type="text" name="first_name" id="first_name" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "first_name") ? "has-input-error" : "")}`} placeholder="First Name" autoCapitalize='off' onChange={onChange} value={form.first_name} />
                                                        <label htmlFor="first_name" className="bi-form-label light-txt">First Name <span style={{ color: 'red' }}>*</span> </label>
                                                        {hasValidationError(errors, "first_name") ? (<span className="has-cust-error">{validationError(errors, "first_name")}</span>) : null}
                                                    </div>
                                                    <div className="bi-form-group">
                                                        <input type="text" name="last_name" id="last_name" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "last_name") ? "has-input-error" : "")}`} placeholder="Last Name" autoCapitalize='off' onChange={onChange} value={form.last_name} />
                                                        <label htmlFor="last_name" className="bi-form-label light-txt">Last Name  <span style={{ color: 'red' }}>*</span></label>
                                                        {hasValidationError(errors, "last_name") ? (<span className="has-cust-error">{validationError(errors, "last_name")}</span>) : null}
                                                    </div>
                                                </div>
                                                <div className="bi-form-group">
                                                    <input type="text" name="email" id="email" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "email") ? "has-input-error" : "")}`} placeholder="Email Address" autoCapitalize='off' onChange={onChange} value={form.email} />
                                                    <label htmlFor="email" className="bi-form-label light-txt">Email Address   <span style={{ color: 'red' }}>*</span></label>
                                                    {hasValidationError(errors, "email") ? (<span className="has-cust-error">{validationError(errors, "email")}</span>) : null}
                                                </div>
                                                <div className="bi-row-group">
                                                    <div className="bi-form-group">
                                                        <input type="text" name="phone" id="phone" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "phone") ? "has-input-error" : "")}`} placeholder="Phone No" autoCapitalize='off' onChange={onChange} value={form.phone} />
                                                        <label htmlFor="phone" className="bi-form-label light-txt">Phone No  <span style={{ color: 'red' }}>*</span></label>
                                                        {hasValidationError(errors, "phone") ? (<span className="has-cust-error">{validationError(errors, "phone")}</span>) : null}
                                                    </div>
                                                    <div className="bi-form-group">
                                                        <input type="text" name="alter_phone" id="alter_phone" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "alter_phone") ? "has-input-error" : "")}`} placeholder="Alternative Phone No" autoCapitalize='off' onChange={onChange} value={form.alter_phone} />
                                                        <label htmlFor="alter_phone" className="bi-form-label light-txt bg-gray">Alternative Phone No</label>
                                                        {hasValidationError(errors, "alter_phone") ? (<span className="has-cust-error">{validationError(errors, "alter_phone")}</span>) : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="machine-content pb-5 pt-5">
                                            <div className="left-section">
                                                <div className="heading-600-20 heading">Machine Location</div>
                                                <div className="heading-400-14 desc light-txt">kindly provide us with the address of your machine's location</div>
                                            </div>
                                            <div className="right-section">
                                                <div className="bi-form-group">
                                                    <input type="text" name="address" id="address" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "address") ? "has-input-error" : "")}`} placeholder="Address Line 1" autoCapitalize='off' onChange={onChange} value={form.address} />
                                                    <label htmlFor="address" className="bi-form-label light-txt">Address Line 1    <span style={{ color: 'red' }}>*</span></label>
                                                    {hasValidationError(errors, "address") ? (<span className="has-cust-error">{validationError(errors, "address")}</span>) : null}
                                                </div>
                                                <div className="bi-form-group">
                                                    <input type="text" name="address1" id="address1" className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "address1") ? "has-input-error" : "")}`} placeholder="Address Line 2" autoCapitalize='off' onChange={onChange} value={form.address1} />
                                                    <label htmlFor="address1" className="bi-form-label light-txt">Address Line 2</label>
                                                    {hasValidationError(errors, "address1") ? (<span className="has-cust-error">{validationError(errors, "address1")}</span>) : null}
                                                </div>
                                                <div className="bi-form-group">
                                                    <input type="text" name="zipcode" id="zipcode" onBlur={handleZipcodeBlur} className={`bi-form-field heading-600-14-12 ${(hasValidationError(errors, "zipcode") ? "has-input-error" : "")}`} placeholder="Pin Code" autoCapitalize='off' onChange={onChange} value={form.zipcode} />
                                                    <label htmlFor="zipcode" className="bi-form-label light-txt bg-gray">Pin Code   <span style={{ color: 'red' }}>*</span></label>
                                                    {hasValidationError(errors, "zipcode") ? (<span className="has-cust-error">{validationError(errors, "zipcode")}</span>) : null}
                                                </div>
                                                <div className="btn-wrap">
                                                    <button className="btn-skip heading-600-16-14" type="button" onClick={() => setShowSkipModel(true)}>Skip For Now</button>
                                                    <button className="btn-submit heading-600-16-14" type="button" onClick={handleNextChange}>Next</button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <Footer />
        </>
    );
}
export default MachineDetail