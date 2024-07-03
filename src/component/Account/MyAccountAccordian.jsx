import React, { useState } from 'react';
import '../../App.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIconArrow from '../SubComponent/EditIconArrow';
import PhoneIcon from '../SubComponent/PhoneIcon';
import EmailIcon from '../SubComponent/EmailIcon';
import { useNavigate } from 'react-router-dom';

const MyAccountAccordian = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const fname=localStorage.getItem('firstName');
  const lname=localStorage.getItem('lastName');
  const emailid=localStorage.getItem('emailId');
  const number=localStorage.getItem('number')
  const listdata = [
    {
      title:`${fname} ${lname}` ,
      message1: number,
      message2: emailid,
      navi:()=>navigate('/my-profile',{state:{fname:fname,lname:lname,emailid:emailid,number:number}})
    },
    {
      title: "Manage Address",
      message1: number,
      message2: emailid,
      navi: () => navigate('/manageaddress'),
    },
    {
      title: "Your Orders",
      message1: number,
      message2: emailid,
      navi:()=>navigate('/yourorder')
    },
    {
      title: "Your Machines",
      message1: number,
      message2: emailid,
      navi:()=>navigate('/buy/my-machine')
    },
    {
      title: "Schedule Visits",
      message1: number,
      message2: emailid,
      navi:()=>navigate('/scheduled-visits')
    },
    {
      title: "Wishlist",
      message1: number,
      message2: emailid,
      navi: () => navigate('/wishlist')
    },
  ];

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(true);
  };

  return (
    <div className="mb-3">
      {listdata.map((data, index) => (
        <Accordion
          className='mb-4'
          key={index}
          expanded={expanded === index}
          onChange={handleChange(data)}
        >
          <AccordionSummary
            expandIcon={
            
                <EditIconArrow funCall={data.navi} />
              
            }
            aria-controls={`panel${index}a-content`}
            id={`panel${index}a-header`}
          >
            <Typography style={{ fontWeight: 'bold' }}>{data.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="row">
              <div className="col col-md-auto col-12">
                <div className="row">
                  {/* <div className="col col- pr-0"> */}
                   
                  {/* </div> */}
                  {/* <div className="col col-10 pl-2"> */}
                    
                  {/* </div> */}
                  <div className='d-flex'>
                  <PhoneIcon />
                  <p className='pl-2 '>{data.message1}</p>
                  </div>
                </div>
              </div>
              <div className="col col-md-auto col-12">
                <div className="row">
                  {/* <div className="col col-2 pr-0"> */}
                   <div className='d-flex'><EmailIcon /> <p className="pl-2">{data.message2}</p></div> 
                  {/* </div> */}
                  {/* <div className="col col-10 pl-2"> */}
                    {/* Truncate long email addresses only on smaller screens */}
                   
                  {/* </div> */}
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default MyAccountAccordian;
