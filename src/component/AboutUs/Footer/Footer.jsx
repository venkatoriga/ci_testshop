import React from 'react'
import logo from '../assets/logo.png'
const Footer = () => {
  return (
    <div className='container'>
      <div class="footer"> 
       <div class="left_content"> 
         <div> 
           <img src={logo} alt="logo" /> 
           <h2>origa.market</h2> 
         </div> 
         <div> 
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero cum 
           inventore eaque iure architecto, officiis minima adipisci ut facere 
           tore eaque iure architecto, officiis minima adipisci ut facere 
         </div> 
       </div> 
       <div class="right_content"> 
         <div class="origa"> 
           <h2>Origa</h2> 
           <ul> 
             <li> 
               <a href="#">About Us</a> 
             </li> 
             <li> 
               <a href="#">FAQs</a> 
             </li> 
             <li> 
               <a href="#">Origa Network</a> 
             </li> 
             <li> 
               <a href="#">Partner with Us</a> 
             </li> 
           </ul> 
         </div> 
  
         <div class="used_machinery"> 
           <h2>Used Machinery</h2> 
           <ul> 
             <li> 
               <a href="#">Buy</a> 
             </li> 
             <li> 
               <a href="#">Sell</a> 
             </li> 
             <li> 
               <a href="#">Service</a> 
             </li> 
             <li> 
               <a href="#">Store</a> 
             </li> 
           </ul> 
         </div> 
  
         <div class="contact"> 
           <h2>contact Us</h2> 
           <ul> 
             <li> 
               <a href="#">info@origa.com</a> 
             </li> 
             <li> 
               <a href="#">+91 854522255</a> 
             </li> 
             <li> 
               <a href="#">Andheri East , Mumbai</a> 
             </li> 
             <li> 
               <a href="#">Icons</a> 
             </li> 
           </ul> 
         </div> 
       </div> 
     </div> 

      
    </div>
  )
}

export default Footer
