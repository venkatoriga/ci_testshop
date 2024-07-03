import React from 'react'

const Congratulations = ({onHide}) => {
  return (
    <>
    
    {/*for desktop*/}
  <div className='hide-992 hw-100 p-0 m-0'>
  <div className='container-fluid hw-100  p-fixed d-j-a'>
        <div className='container bg-white d-f-cc w-50  border-8p' style={{maxWidth:"588px"}}>
        <div className='w-100 text-end curser-pointer pt-2'>
               <img src="/asset/close-fill.png" alt="close-tag" onClick={()=>onHide()}/>
              </div>
            <div className='row pt-3'>
              <div className='col col-12 t-a-c'>
              <p className='heading-600-20 p-0'>Congratulations</p>
              <div className='pt-3'>
              <img src="/asset/Congratulation.png" alt="Congratulation.png" />
             </div>
              </div>
              
             </div>
             
             <div className='row pt-3 pb-5'>
              <div className='col heading-400-14'>
              Your account has been successfully created
              </div>
             </div>
            
        </div>
    </div>
  </div>
    {/*for mobile*/}
    <div className='show-992 p-0  m-0 hw-100 '>
   <div className='container-fluid p-fixed p-0 hw-100 d-j-a-end'>
   <div className='container bg-white border-8p'>
   <div className='w-100 text-end pt-2 curser-pointer'>
          <img src="/asset/close-fill.png" alt="close-tag" onClick={()=>onHide()}/>
         </div>
       <div className='row pt-3'>
         <div className='col col-12 t-a-c'>
         <p className='heading-600-20 p-0'>Congratulations</p>
         <div className='pt-3'>
         <img src="/asset/Congratulation.png" alt="Congratulation.png" />
        </div>
         </div>
         
        </div>
        
        <div className='row pt-3 pb-5'>
         <div className='col col-12 text-center heading-400-14'>
         Your account has been successfully created
         </div>
        </div>
       
   </div>
</div>
   </div>
   
    </>
   
  )
}

export default Congratulations