import React from 'react'
import ReactDOM from 'react-dom'
import LoginPage from '../Login/LoginPage';
import LoginModelPage from './LoginModelPage';
const LoginModel = ({onHide}) => {
    const portalAddress=document.getElementById('Overlay');
  return (
    ReactDOM.createPortal(<LoginModelPage onHide={onHide}/>,portalAddress)
  )
}

export default LoginModel