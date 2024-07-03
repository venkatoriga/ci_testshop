import { Container } from 'react-bootstrap'
import { TextField } from '@mui/material';
import React, { useEffect, useState, useRef } from "react";
import ProductBlock from "./Block/ProductBlock";
import VectorBlock from "./Vector/VectorBlock";
import "./slider/slider.css";
import axios from 'axios';
import Button from '../Button/Button';

const ThirdSection = ({products,onProductBlockNavigate}) => {
    const [box, setBox] = useState(0);
    const sliderRef = useRef(null);
    const [error, setError] = useState('');
    console.log(products, 'Products List')

    const btnpressprev = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width;
        console.log(width)
    }

    const btnpressnext = () => {
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft + width;
        console.log(width)
    }

    const heading = "Our AMC plans";
    const para =
        "Enjoy the flexibility of selecting from our diverse range of plans";
    useEffect(() => {

        setBox(sliderRef.current);
    }, [])

    // const list = products;

    // Second Section Code
    const [firstname, setfirstname] = useState('');

    const onFirstnameChange = (e) => {
        setfirstname(e.target.value);
    };

    const serialNumberCalling = (e) => {
        setSerialNo(e.target.value);
    }

    const [serialNo, setSerialNo] = useState('');
    const [list, setList] = useState(products);

    const fetchSerialNumber = () => {
        setError('');

        if (!firstname || !serialNo) {
            setError("Fill the data")
        } else {
            const graphqlQuery = {
                query: `
                query GetOwnedMachines($first: Int!, $modelno: String!,, $serialno: String!) {
                    getOwnedmachies(
                      first: $first
                      modelName: $modelno
                      serialNo: $serialno
                    ) {
                      edges {
                        node {
                          id
                          firstName
                          lastName
                          mobileNo
                          email
                          modelName
                          machineName
                          serialNo
                          customerId
                          machineType
                          requestJson
                        }
                      }
                    }
                  }
                  
                `,
                variables: {
                    "first": 100,
                    "modelno": firstname,
                    "serialno": serialNo

                }
            };
            axios.post('https://devextension.origa.market/graphql/', graphqlQuery)
                .then(response => {
                    console.log('Seriesno annual thirdSection==>>', response.data.data.getOwnedmachies.edges)
                    if (response.data.data.getOwnedmachies.edges) {
                        products = response.data.data.getOwnedmachies.edges
                        setList(products);
                        console.log("check==>>",products);
                    } else {

                    }
                    // if (data && data.message) {
                    //     setMessage(data.message);
                    // } else {
                    //     setMessage('Sorry! we are not Serve in this area');

                    // }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
        // Define your GraphQL query  ...border-line
    };
    return (
        <>
        <div className='container-fluid border hide-992'></div>
            <div className='max-container pb-3 tablet-d-padding'>
                    <div className='form-flexs '>
                        <div className='hide-992 '>
                            <h2 className='form__heading'>Search Machines</h2>
                            <p className='small_para'>Enjoy the flexibility of selecting from our diverse range of plans</p>
                        </div>
                        <div className='row d-flex g-3 align-items-center'>
                            <div className='col col-lg-4 col-12 '>
                            <TextField className='form-width ' fullWidth label="Model" id="First-Name" size='small' value={firstname} onChange={onFirstnameChange} />
                            </div>
                           <div className='col col-lg-4 col-12 '>
                           <TextField className='form-width' fullWidth placeholder='serial number/machine number' id="First-Name" size='small' value={serialNo} onChange={serialNumberCalling} />
                           </div>

                           <div className='col col-lg-4 col-12 d-flex justify-content-end'>
                           <Button message="Submit" callFunction={fetchSerialNumber} />
                           </div>
                        </div>
                        
                    </div>
                    <div className="text-center">
                        {error && <p className="error-message">{error}</p>}
                    </div>
              
            </div>
            <div className='container-fluid border hide-992 '></div>

            {/* Our AMC Plans Start */}

            {list.length>0 &&  <Container fluid className="pt-5">
                <div className='max-container pt-5'>
                  
                <div className='container-fluid p-0 m-0 row'>
                   <div className='col col-lg-8 col-12 p-0'>
                   <h1 className='heading-600-44-20 pt-3'>{heading}</h1>
                   <p className='heading-400-20-14 op-80'>{para}</p>
                   </div>

                   <div className='col col-lg-4 d-flex justify-content-end'>
                   <div className="hide-992 p-0"> <VectorBlock onMoveLeft={btnpressprev} onMoveRight={btnpressnext} /></div>
                   </div>
                    
                   
                   </div>
                   
                </div>

                <Container className="sixthSectionSlider " ref={sliderRef}>
                    {
                        list.map((product, index) => (
                            <ProductBlock
                                id={product.id}
                                key={index}
                                title={product.name}
                                price={product.price}
                                plan={product.plan}
                                imageUrl={product.plan_image}
                                product={product}
                                onProductBlockNavigate={onProductBlockNavigate}
                            />
                        ))
                    }
                </Container>
                <div className='show-992 h-center w-fit'><VectorBlock onMoveLeft={btnpressprev} onMoveRight={btnpressnext} /></div>
            </Container>}
        </>
    );
};

export default ThirdSection