import React, { useState } from 'react'
import axios from "axios";
import { uploadIcon, fileIcon } from '../../../helpers/Icons';
const FinanceDocumentUploder = ({ id, onetTimeRepairformData, setOnetTimeRepairFormData, setUploadedDocument }) => {

  const [uploadFiles, setUploadFiles] = useState([]);
  const handleBrowse = () => {
    document.querySelector(`.bi-upload-file-${id}`).value = '';
    document.querySelector(`.bi-upload-file-${id}`).click();
  };
  const handleFileChange = async (id, file) => {
    let Documenttype;
    if (id === 0) {
      Documenttype = 'Upload Quotation / Proforma Invoice of equipment';
    } else if (id === 1) {
      Documenttype = 'Upload Latest audited financial statements / ITRS';
    } else {
      Documenttype = 'Upload Company / Individual PAN';
    }

    try {
      // const formData = new FormData();
      // formData.append("file", file);

      // const response = await axios.post(
      //   "https://devextension.origa.market/api/uploadfinancedoc",
      //   formData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );

      // const uploadedFile = {
      //   name: file.name || "Unknown File",
      //   imageUrl: response.data.url,
      //   documentType: Documenttype,
      // };

      const uploadPromises = Array.from(file).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "http://3.109.71.129:8002/api/uploadfinancedoc",
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
          documentType: Documenttype
        };
      });
      const uploadedFiles = await Promise.all(uploadPromises);
      const updatedFormData = {
        ...onetTimeRepairformData,
        documentlist: [...onetTimeRepairformData.documentlist, ...uploadedFiles]
      };
      setOnetTimeRepairFormData(updatedFormData);
      setUploadedDocument(prevUploadedFiles => [...prevUploadedFiles, ...uploadedFiles]);
      // Update the state with only the uploaded file
      // setOnetTimeRepairFormData((prevData) => ({
      //   ...prevData,
      //   documentlist: [uploadedFile],
      // }));
      // setUploadedDocument([uploadedFile]);
      // Update the state with the uploaded file

      
      // const updatedFormData = {
      //   ...onetTimeRepairformData,
      //   documentlist: [...onetTimeRepairformData.documentlist, uploadedFile],
      // };
      // setOnetTimeRepairFormData(updatedFormData);
      // setUploadedDocument((prevUploadedFiles) => [
      //   ...prevUploadedFiles,
      //   uploadedFile,
      // ]);

      // Update the uploadFiles state with the uploaded file
      setUploadFiles([uploadedFiles]);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };



  console.log(uploadFiles)


  const onDropHandler = (e) => {
    e.preventDefault()
    console.log("iam drop", e.dataTransfer.files[0]);
    handleFileChange(id, e.dataTransfer.files[0])
  }
  const onDragOverHandler = (e) => {
    e.preventDefault()
    // console.log("iam drag",e);
  }
  return (<>
    <p className='heading-600-12 m-0' >Upload Quotation / Proforma Invoice of equipment</p>
    <div className="upload-wrap" key={id} style={{ marginTop: "8px", marginBottom: "24px", gap: "8px" }} onClick={handleBrowse} onDragOver={onDragOverHandler} onDrop={onDropHandler}>
      {uploadIcon({ width: 40, height: 40 })}
      <div className="desc heading-600-12">Upload the filled in template here</div>
      <div className='heading-400-12-10'>Drag and drop the file or click to select</div>
      {uploadFiles.length > 0 && (
        <div className="uploading-wrap">
          {uploadFiles.length > 0 && (
            <div className="uploading-wrap">
              <div className="uploading-item">
                <div className="file-icon">{fileIcon({ width: 24, height: 30 })}</div>
                <div className="file-data">
                  <div className="name heading-600-14">{uploadFiles[0].name}</div>
                  <div className="process">
                    <div className="process-inner"></div>
                  </div>
                  <div className="size-status-wrap">
                    <div className="status heading-400-14">uploaded...100%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
    <input type="file" name="file" key={id} className={`bi-upload-file bi-upload-file-${id}`} onChange={(e) => handleFileChange(id, e.target.files[0])} />

  </>
  )
}

export default FinanceDocumentUploder