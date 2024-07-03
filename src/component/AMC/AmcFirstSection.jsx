import React, { useEffect, useState } from 'react'
import './style.css'
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import LeftArrow from '../SubComponent/LeftArrow';
import Slash from '../SubComponent/Slash';
import Button from '../Button/Button';
import Breadcrumbs from '../SubComponent/Breadcrumbs';
const AmcFirstSection = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [pincode, setPincode] = useState('');
    const [message, setMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [show, setShow] = useState(false);
    const [code,setCode]=useState()
    const navigate = useNavigate()

  const onClickehandle = () => {
        console.log('selectedCategory---->', selectedCategory);
        if(selectedCategory === null || selectedCategory === ''){
            setMessage('Please Select Category Type..!')
        } 
        else if(pincode.length < 6 ){
            setMessage('Please Enter Valid Pincode..!')
        }
        if (!isButtonDisabled) {
            navigate('/service/annual', { state: { selectedCategory } });
            console.log('Selected Category')
        }

        // if (!isButtonDisabled) {

        //     // Fetch data from the API
        //     axios.post('https://contacts.origaleasing.com/fetchAMCbasedontype', {
        //         type:selectedCategory
        //     })
        //     .then(response => {
        //         const products = response.data.jsondata;
        // //    console.log("amc product code",products);

        //         if(code===1000){
        //             navigate('/service/annual', { state: { products } });
        //         }else{
        //             navigate('/unfortunately',{state:{naviurl:"/service/amc"}})
        //         }

        //     })
        //     .catch(error => {
        //         console.error('Error fetching data:', error);
        //     });
        // }
    };


    const handlePincodeChange = (e) => {
        const newInputString = e.target.value;
  const sanitizedInput = newInputString.replace(/[^0-9]/g, '');

  // Update the state only if the input is empty or contains valid characters
  if ((newInputString === '' || sanitizedInput === newInputString) && sanitizedInput.length<=6) {
    setPincode(sanitizedInput);
  }

        
       
    };

    const fetchServiceArea = () => {
        // Define your GraphQL query
        const graphqlQuery = {
            query: `
                query ServiceArea($pincode: Int!) {
                    nearestServicearea(userPincode: $pincode) {
                        message
                        code
                    }
                }
            `,
            variables: {
                pincode: parseInt(pincode, 10)
            }
        };
        axios.post('https://devextension.origa.market/graphql/', graphqlQuery)
            .then(response => {
                const data = response.data.data.nearestServicearea;
                console.log("nearestServicearea==>>",data.message);
            
                setCode(data.code)
                if (data.code===1000) {
                    //setMessage(data.message);
                    setIsButtonDisabled(false);
                } else {
                    setMessage('Sorry! we are not Serve in this area');
                    setIsButtonDisabled(true)
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setMessage("Please Enter Vailed Pincode!!!")
            });
    };


    // Selector Code
    useEffect(() => {
        // Define your GraphQL query and variables
        // const query = `
        //   query GetCategory($categoryId: ID!) {
        //     category(id: $categoryId) {
        //       id
        //       name
        //       children(first: 100) {
        //         edges {
        //           node {
        //             id
        //             name
        //             slug
        //           }
        //         }
        //       }
        //     }
        //   }
        // `;
        // const variables = {
        //     "categoryId": "Q2F0ZWdvcnk6MQ=="
        // };

        // // Make an Axios request to your GraphQL API
        // axios.post('https://dev.origa.market/graphql/', {
        //     query,
        //     variables,
        // })
        //     .then((response) => {
        //         const data = response.data.data;
        //         if (data.category) {
        //             setCategories(data.category.children.edges);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching data:', error);
        //     });
        if (pincode.length === 6) {
            fetchServiceArea()
            setShow(true);
        }
    }, [pincode, show]);

    const breadcrumbsItems = [ { name: "Home Page", link: "/" }, { name: "Maintain Page", link: "/service" }];
    
    const boldtitle="AMC Page";

  return (
    <>
 <section className="container-fluid liner-background-50">
            <div className='max-container'>
                {/*start*/}
               <div className='pt-3'>
               <Breadcrumbs boldtitle={boldtitle} items={breadcrumbsItems} backnavi={()=>navigate('/service')}/>
               </div>
        
                        {/*end*/}
            </div>
                <div className='max-container pt-5'>
                 
                    <div className='container-fluid p-0 m-0 row pt-5'>
                        <div className='col col-lg-6 col-12 p-0 '>
            
                          
                          <h1 className='anual_heading'>Annual Maintenance Contact</h1>
                          
                            <p className='anual-para'>Origa offers a comprehensive Annual Maintenance Contract (AMC) to safeguard your machine against potential issues. By opting it, you not only receive regular maintenance and free service from well-trained experts but also gain access to a wide range of exclusive advantages.</p>
                           
                          
                             <Link to="/" className='explore_txt'>Explore Service</Link>
                        </div>
                        <div className='col col-lg-6 col-12 p-0'>
                            <div className='form_lyt'>
                                <h2 className='form_heading hide-992'>Which Machine are you <br /> searching for an AMC for?</h2>
                            <div className='show-992 p-r mt-5'>
                            <img className='w-100 h-100' src='/asset/image555a.png' alt='image555a.png'/>
                            </div>
                                

                                <div className={`bi-form-group `}>
                                          
                                <select className={`bi-form-field  bi-select-dropdown ${selectedCategory ? "" : "empty"} r-4`} value={selectedCategory} placeholder="Model/Categories Types" onChange={(event) => setSelectedCategory(event.target.value)} autoCapitalize='off' >
                                        <option value=""></option>
                                        <option value="">Select Category</option>
                                        <option value="EDM WIRE CUT">EDM WIRE CUT</option>
                                        <option value="HMC">HMC</option>
                                        <option value="VMC">CNC VMC</option>
                                        <option value="CNC LATHE">CNC LATHE</option>
                                    </select>
                                            <label className="heading-400-14-12 bi-form-label bg-white c-drop-color">Model/Categories Types</label>
                                          
                                            </div>
                                {/*  */}
                                <div className='location_icon mt-4'>
                                    <Form.Control className='form__control'
                                        type="text"
                                        id="inputText"
                                        aria-describedby="passwordHelpBlock"
                                        placeholder='Please Enter the valid Pincode'
                                        value={pincode}
                                        onChange={handlePincodeChange}
                                    
                                    />
                                    <div onClick={fetchServiceArea}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                            <path d="M17.4863 12.757C17.4863 13.0625 17.3649 13.3555 17.1489 13.5715C16.9329 13.7875 16.6399 13.9089 16.3344 13.9089C16.029 13.9089 15.736 13.7875 15.52 13.5715C15.304 13.3555 15.1826 13.0625 15.1826 12.757C15.1826 12.4516 15.304 12.1586 15.52 11.9426C15.736 11.7266 16.029 11.6052 16.3344 11.6052C16.6399 11.6052 16.9329 11.7266 17.1489 11.9426C17.3649 12.1586 17.4863 12.4516 17.4863 12.757Z" stroke="#211E24" stroke-width="1.5" stroke-linejoin="round" />
                                            <path d="M22.67 13.335C22.67 16.8342 20.3664 20.8218 16.335 25.4291C12.3036 20.8218 10 16.8342 10 13.335C10 11.6549 10.6674 10.0435 11.8555 8.85548C13.0435 7.66744 14.6549 7 16.335 7C18.0151 7 19.6265 7.66744 20.8145 8.85548C22.0026 10.0435 22.67 11.6549 22.67 13.335Z" stroke="#211E24" stroke-width="1.5" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <br></br>
                                <p className="text-danger">{message}</p>
                                <div className='typ-button-flexes'>
                                    <Button message={"Search"} callFunction={onClickehandle} disabled={isButtonDisabled} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

export default AmcFirstSection