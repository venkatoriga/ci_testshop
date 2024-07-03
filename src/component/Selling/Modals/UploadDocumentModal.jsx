import React,{useState} from "react";
import {closeIcon,uploadIcon,fileIcon} from "../../../helpers/Icons";
import "./UploadDocumentModal.css";
import axios from "axios";
const UploadDocumentModal = ({ modalAction, machineDetail, handleCustomChange }) => {
  const [uploadFiles, setUploadFiles] = useState(machineDetail?.documents || []);

  const handleBrowse = () => {
    document.querySelector(".bi-upload-file").value = "";
    document.querySelector(".bi-upload-file").click();
  };

  const handleFileChange = async (files) => {
    if (!files.length) {
      return;
    }

    try {
      // Use Promise.all to upload multiple files concurrently
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "https://devextension.origa.market/api/productimageupload/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        return {
          name: file.name || "Unknown File",
          imageUrl: response.data.url,
        };
      });

      // Wait for all uploads to complete
      const uploadedFiles = await Promise.all(uploadPromises);

      // Update the state with the uploaded files
      setUploadFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  console.log(uploadFiles)

  const handleSave = () => {
    if (handleCustomChange) {
      handleCustomChange(uploadFiles);
    }
    modalAction(false);
  };

  const onDropHandler=(e)=>{
    e.preventDefault()
    console.log("iam drop",e.dataTransfer.files);
    handleFileChange(e.dataTransfer.files)
  }
  const onDragOverHandler=(e)=>{
    e.preventDefault()
    // console.log("iam drag",e);
  }
    return (
        <div className="bi-popup-wrap">
            <div className="back" onClick={() => modalAction(false)}></div>
            <div className="inner">
                <button onClick={() => modalAction(false)} className="close">{closeIcon({width:16,height:16})}</button>
                <div className="heading-wrap">
                    <div className="heading-600-20 heading-600-20-16">Upload Document</div>
                    <div className="heading-400-14-12 text">Please select a  Suitable Date and Time</div>
                </div>
                <div className="upload-wrap" onClick={handleBrowse} onDragOver={onDragOverHandler} onDrop={onDropHandler}>
                    {uploadIcon({width:40,height:40})}
                    <div className="desc heading-400-16">Drag & Drop or <span className="heading-600-18">Browse</span> file to Upload</div>
                </div>
                <input type="file" name="file" className="bi-upload-file" onChange={(e) => handleFileChange(e.target.files)} multiple/>
                {uploadFiles.length > 0 && (
                    <div className="uploading-wrap">
                        {uploadFiles.map((uploadFile,index) => (
                            <div className="uploading-item" key={index}>
                                <div className="file-icon">{fileIcon({width:24,height:30})}</div>
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
                    <button type="button" className="btn-cancel heading-600-16" onClick={() => modalAction(false)}>Cancel</button>
                    <button type="button" className="btn-submit heading-600-16" onClick={() => handleSave()}>Submit</button>
                </div>
            </div>
        </div>
    );
}
export default UploadDocumentModal;