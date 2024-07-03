import React, { useState } from 'react'
import LoginPage from '../Login/LoginPage'
import Success from '../Success-Login/Success'
import LoginNameEmail from '../LoginNameEmail/LoginNameEmail';
import { Container } from 'react-bootstrap'; 
import Congratulations from '../Success-Login/Congratulations';
const LoginModelPage = ({onHide}) => {
    const [Authentication,setAuthentication]=useState(0);
    const onSuccessPage=(active)=>{
       
            setAuthentication(active+1)
        
    } 
    const onLoginData=(active)=>{
        if(active){
            setAuthentication(Authentication+1)
        }
    }
  return (
    <Container fluid className="p-fixed bg-blur hw-100 p-0 m-0 d-j-a">
    {Authentication===0 ? <LoginPage onSuccessPage={onSuccessPage} onHide={onHide}/>:null}
    {Authentication===1 ? <Success onLoginData={onLoginData} onHide={onHide}/>:null}
    {Authentication===2 ? <LoginNameEmail onLoginData={onLoginData} onHide={onHide}/>:null}
    {Authentication===3 ?<Congratulations onHide={onHide}/>:null}
    </Container>
         
  )
}

export default LoginModelPage