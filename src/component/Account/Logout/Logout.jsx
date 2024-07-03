import React from 'react'
import ReactDOM  from 'react-dom'
import Button from '../../Button/Button'
import { useNavigate } from 'react-router-dom'
const LogoutPage = () => {
  const navigate=useNavigate();
  const onlogout=()=>{
    localStorage.removeItem('userToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('id');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    // localStorage.clear();
    navigate('/')
    window.location.reload()
  }
  return (
    <div className='container-fluid p-fixed bg-blur hw-100 d-j-a'>
        <div className='container bg-white d-f-cc w-fit pl-5 pr-5  border-8p'>
            <div className='row justify-content-end pt-3'>
             <div className='col col-auto curser-pointer'>
               <img src="asset/close-fill.png" alt="close-tag" onClick={()=>navigate('/my')}/>
              
              </div>
              <div className='col col-12 heading-600-20 t-a-c'>You are attempting to log out of Origa</div>
             </div>
             <div className='row pt-3'>
              <img src="asset/logout.png" alt="logout.png" />
             </div>
             <div className='row pt-4'>
              <div className='col heading-400-14'>
              Are you sure?
              </div>
             </div>
             <div className='row pt-4 pb-5'>
              <div className='col'>
                <Button message={"Log out"} callFunction={onlogout}/>
              </div>
             </div>
        </div>
    </div>
  )
}

const Logout = () => {
  const portalAddress=document.getElementById('Overlay');
return (
  ReactDOM.createPortal(<LogoutPage/>,portalAddress)
)
}
export default Logout