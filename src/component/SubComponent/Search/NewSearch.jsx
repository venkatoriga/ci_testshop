
import React,{useEffect, useState} from 'react'
import './Search.css'
import Form from 'react-bootstrap/Form';
import SpeechRecognition,{useSpeechRecognition} from 'react-speech-recognition';
import { closeIcon } from '../../../helpers/Icons';
const NewSearch = ({ message, microphone,onInputChange,onEnterHandler,onNaviHandler,onMicro,onInputValue ,onCloseHandler}) => {
const {transcript}=useSpeechRecognition();
const [showInput,setShowInput]=useState(false);
const startListening = () => {
  SpeechRecognition.startListening();
};

const stopListening = () => {
  SpeechRecognition.stopListening();
};
useEffect(()=>{ 
  onMicro(transcript.replace(/\./g, ''));
   return()=>{stopListening()}},[transcript])

  const onSvgHandler=()=>{
  onNaviHandler()
}
const onMobInputHandler=()=>{
  setShowInput(!showInput)
}
const onEnterHandlerMob=(e)=>{
  if (e.key === 'Enter') {
   onEnterHandler(e)
   setShowInput(!showInput)
  }
}
  return (
      
    <Form className="d-flex inputcutom">
      <div className="search-icon-f">
     
        <svg xmlns="http://www.w3.org/2000/svg" onClick={onSvgHandler} width="20" height="20" viewBox="0 0 20 20" fill="#211E24">
          <path d="M0.941748 9.58334C0.941748 14.3469 4.81985 18.225 9.58342 18.225C14.347 18.225 18.2251 14.3469 18.2251 9.58334C18.2251 4.81978 14.347 0.941672 9.58342 0.941672C4.81985 0.941672 0.941748 4.81978 0.941748 9.58334ZM2.39175 9.58334C2.39175 5.62183 5.61372 2.39167 9.58342 2.39167C13.5531 2.39167 16.7751 5.62183 16.7751 9.58334C16.7751 13.5449 13.5531 16.775 9.58342 16.775C5.61372 16.775 2.39175 13.5449 2.39175 9.58334Z" fill="#211E24" stroke="#211E24" strokeWidth="0.2" />
          <path d="M17.8209 18.8457C17.9657 18.9905 18.1499 19.0583 18.3333 19.0583C18.5167 19.0583 18.7009 18.9905 18.8457 18.8457C19.1264 18.565 19.1264 18.1017 18.8457 17.821L17.179 16.1543C16.8983 15.8736 16.435 15.8736 16.1542 16.1543C15.8735 16.435 15.8735 16.8983 16.1542 17.1791L17.8209 18.8457Z" fill="#211E24" stroke="#211E24" strokeWidth="0.2" />
        </svg>
        
      </div>
      <Form.Control
        type="input"
        placeholder={message}
       className='c-black'
       style={{display:"flex"}}
       onKeyPress={onEnterHandler} 
       value={onInputValue}
        onChange={onInputChange}
       
      />
      {microphone && <div className="new-microphone-icon" >
        <svg xmlns="http://www.w3.org/2000/svg" onClick={ startListening}  width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 16.25C9.38 16.25 7.25 14.12 7.25 11.5V6C7.25 3.38 9.38 1.25 12 1.25C14.62 1.25 16.75 3.38 16.75 6V11.5C16.75 14.12 14.62 16.25 12 16.25ZM12 2.75C10.21 2.75 8.75 4.21 8.75 6V11.5C8.75 13.29 10.21 14.75 12 14.75C13.79 14.75 15.25 13.29 15.25 11.5V6C15.25 4.21 13.79 2.75 12 2.75Z" fill="#211E24" />
          <path d="M12.0001 19.75C7.3701 19.75 3.6001 15.98 3.6001 11.35V9.64999C3.6001 9.23999 3.9401 8.89999 4.3501 8.89999C4.7601 8.89999 5.1001 9.23999 5.1001 9.64999V11.35C5.1001 15.15 8.2001 18.25 12.0001 18.25C15.8001 18.25 18.9001 15.15 18.9001 11.35V9.64999C18.9001 9.23999 19.2401 8.89999 19.6501 8.89999C20.0601 8.89999 20.4001 9.23999 20.4001 9.64999V11.35C20.4001 15.98 16.6301 19.75 12.0001 19.75Z" fill="#211E24" />
          <path d="M13.3901 7.18001C13.3101 7.18001 13.2201 7.17001 13.1301 7.14001C12.4001 6.87001 11.6001 6.87001 10.8701 7.14001C10.4801 7.28001 10.0501 7.08001 9.91012 6.69001C9.77012 6.30001 9.97012 5.87001 10.3601 5.73001C11.4201 5.35001 12.5901 5.35001 13.6501 5.73001C14.0401 5.87001 14.2401 6.30001 14.1001 6.69001C13.9801 6.99001 13.6901 7.18001 13.3901 7.18001Z" fill="#211E24" />
          <path d="M12.8001 9.30001C12.7301 9.30001 12.6701 9.29001 12.6001 9.27001C12.2001 9.16001 11.7901 9.16001 11.3901 9.27001C10.9901 9.38001 10.5801 9.14001 10.4701 8.74001C10.3601 8.35001 10.6001 7.94001 11.0001 7.83001C11.6501 7.65001 12.3501 7.65001 13.0001 7.83001C13.4001 7.94001 13.6401 8.35001 13.5301 8.75001C13.4401 9.08001 13.1301 9.30001 12.8001 9.30001Z" fill="#211E24" />
          <path d="M12 22.75C11.59 22.75 11.25 22.41 11.25 22V19C11.25 18.59 11.59 18.25 12 18.25C12.41 18.25 12.75 18.59 12.75 19V22C12.75 22.41 12.41 22.75 12 22.75Z" fill="#211E24" />
        </svg>

        <div onClick={onCloseHandler}> {closeIcon({width:21,height:21})}</div>
      </div>}

      <Form.Control
        type="input"
        placeholder={message}
        className="me-2 mob-search"
        aria-label="Search"
      />
      
    </Form>
  )
}

export default NewSearch