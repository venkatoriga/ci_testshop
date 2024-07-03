import React, { useState } from "react";
import { closeIcon, uploadIcon, fileIcon } from "../../../helpers/Icons";

const UploadRecieptsModal = ({modalAction,product,handleCustomChange,setShowThanksModel ,hasThanksModal= false}) => {
    const [uploadFiles, setUploadFiles] = useState(product?.documents || []);

    const handleBrowse = () => {
        document.querySelector(".bi-upload-file").value = "";
        document.querySelector(".bi-upload-file").click();
    };

    const handleFileChange = async (files) => {
        if (!files.length) {
            return;
        }

        const formData = new FormData();
        formData.append("file", files[0]);

        const uploadedFile = {
            imageName: files[0].name || "Unknown File", // Add a default value if 'name' is undefined
        };
        setUploadFiles((prevFiles) => [...prevFiles, uploadedFile]);
    }
    console.log(uploadFiles)

    const handleSave = () => {
        if (handleCustomChange) {
            handleCustomChange("documents", uploadFiles);
        }
        modalAction(false);
        if(hasThanksModal){
            setShowThanksModel(true);
        }
    };
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({ width: 16, height: 16 })}</button>
                <div className="heading-wrap">
                    <div className="heading-600-20 heading-600-20-16">Upload Document</div>
                    <div className="heading-400-14-12 text">Please select a  Suitable Date and Time</div>
                </div>
                <div className="upload-wrap" onClick={handleBrowse}>
                    {uploadIcon({ width: 40, height: 40 })}
                    <div className="desc heading-400-16"> <span className="heading-600-18">Browse</span> file to Upload</div>
                </div>
                <input type="file" name="file" className="bi-upload-file" onChange={(e) => handleFileChange(e.target.files)} />
                {uploadFiles.length > 0 && (
                    <div className="uploading-wrap">
                        {uploadFiles.map((uploadFile, index) => (
                            <div className="uploading-item" key={index}>
                                <div className="file-icon">{fileIcon({ width: 24, height: 30 })}</div>
                                <div className="file-data">
                                    <div className="name heading-600-14">{uploadFile.name}</div>
                                    <div className="process">
                                        <div className="process-inner"></div>
                                    </div>
                                    <div className="size-status-wrap">
                                        <div className="status heading-400-14">uploaded...100%</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="bi-btn-wrap">
                    <button type="button" className="btn-submit heading-600-16" onClick={() => handleSave()}>Submit Receipt</button>
                </div>
            </div>
        </div>
    );
}
export default UploadRecieptsModal;