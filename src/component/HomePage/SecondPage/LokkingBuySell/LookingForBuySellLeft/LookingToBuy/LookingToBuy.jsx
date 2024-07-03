import React, { useState }  from 'react'
import './LookingToBuy.css';
import Button from '../../../../../Button/Button';
import { Container } from 'react-bootstrap';
import Search1 from '../../../../../SubComponent/Search/Search1';
import { useNavigate } from "react-router-dom";

const LookingToBuy = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };


  const onNavigate=()=>{
    // navigate('/buy/product-listing',{ state: { searchInput }})

    navigate(`/buy/product-listing?searchInput=${searchInput}`);
    //navigate('/buy/product-listing')
  }
  const onEnterHandler=(e)=>{
    if (e.key === 'Enter') {
      onNavigate();
    }
  }
  return (
    <div className='p-0 pt-3'>
    <p className="heading-600-24-20">Explore, Connect & Book your ideal equipment
</p>
    <div>
      <p className="heading-400-16-14 op-80">
Your requirement, our network. Perfect match awaits!
</p>
    </div>
    <div>
 <Search1 message={"Search your equipment"} onInputChange={handleInputChange}  onEnterHandler={onEnterHandler}/>
    </div>

    <div className="container-fluid p-0 m-0 row pt-5 pb-4">

     <div className='col col-12 p-0 btn-left-to-right'><Button message='Search' callFunction={onNavigate}/></div>
    {/* <div className='col col-auto align-self-center'></div> */}
    </div>
    </div>
  )
}

export default LookingToBuy