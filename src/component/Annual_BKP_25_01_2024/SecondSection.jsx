import React, { useState } from 'react'
import { TextField } from '@mui/material';
import Button from '../Button/Button';
import './style.css'
import { Container} from 'react-bootstrap';
import axios from 'axios';

const SecondSection = () => {
    const [firstname, setfirstname] = useState('');

    const onFirstnameChange = (e) => {
        setfirstname(e.target.value);
    };

    const serialNumberCalling = (e) => {
        setSerialNo(e.target.value);
    }

    const [serialNo, setSerialNo] = useState('');


    const fetchSerialNumber = () => {
        // Define your GraphQL query
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
                "modelno": "AL4CTIDG3",
                "serialno": "12345"
                  
            }
        };
        axios.post('https://devextension.origa.market/graphql/', graphqlQuery)
            .then(response => {
                console.log('Seriesno',response.data)
                // if (data && data.message) {
                //     setMessage(data.message);
                // } else {
                //     setMessage('Sorry! we are not Serve in this area');

                // }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };
    return (
        <>
            <div className='border-line'>
                <Container>
                    <div className='form-flexs'>
                        <div>
                            <h2 className='form__heading'>Search Machines</h2>
                            <p className='small_para'>Enjoy the flexibility of selecting from our diverse range of plans</p>
                        </div>
                        <div className='d-flex'>
                            <TextField className='form-width' fullWidth label="Model" id="First-Name" size='small' value={firstname} onChange={onFirstnameChange} />
                            <TextField className='form-width' fullWidth placeholder='serial number/machine number' id="First-Name" size='small'  value={serialNo} onChange={serialNumberCalling} />
                        </div>
                        <Button message="Submit" callFunction={fetchSerialNumber}/>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default SecondSection