import React from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../SubComponent/Breadcrumbs'
const ProductIdFirstSection = ({ pincodeHandle, pincode }) => {
    const navigate = useNavigate();
    const breadcrumbsItems = [{ name: "Account", link: "/myaccount" }, { name: "My Machines", link: "/service" }];

    const boldtitle = "Up for Sale";
    return (
        <>
            <div className='max-container pt-3 tablet-d-padding'>
                <div className='container-fluid p-0 m-0 row justify-content-between'>
                    <div className='col col-lg-6 col-12 p-0'>
                        <div className="row pt-3">
                            <Breadcrumbs backnavi={() => navigate('/service/amcmaintainlandingannual')} boldtitle={boldtitle} items={breadcrumbsItems} />
                        </div>
                    </div>
                    <div className='col col-md-2 col-4 p-0 ml-auto'>

                        {/* <div className='location_icon '>
                            <Form.Control className='form__control'
                                type="text"
                                id="inputText"
                                aria-describedby="passwordHelpBlock"
                                value={pincode}
                                onChange={(e) => pincodeHandle(e)}
                            />
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                    <path d="M17.4863 12.757C17.4863 13.0625 17.3649 13.3555 17.1489 13.5715C16.9329 13.7875 16.6399 13.9089 16.3344 13.9089C16.029 13.9089 15.736 13.7875 15.52 13.5715C15.304 13.3555 15.1826 13.0625 15.1826 12.757C15.1826 12.4516 15.304 12.1586 15.52 11.9426C15.736 11.7266 16.029 11.6052 16.3344 11.6052C16.6399 11.6052 16.9329 11.7266 17.1489 11.9426C17.3649 12.1586 17.4863 12.4516 17.4863 12.757Z" stroke="#211E24" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M22.67 13.335C22.67 16.8342 20.3664 20.8218 16.335 25.4291C12.3036 20.8218 10 16.8342 10 13.335C10 11.6549 10.6674 10.0435 11.8555 8.85548C13.0435 7.66744 14.6549 7 16.335 7C18.0151 7 19.6265 7.66744 20.8145 8.85548C22.0026 10.0435 22.67 11.6549 22.67 13.335Z" stroke="#211E24" stroke-width="1.5" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductIdFirstSection