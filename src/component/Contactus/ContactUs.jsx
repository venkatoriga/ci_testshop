import React, { useState, useEffect } from 'react'
import Form from './ContactForm'
import Footer from '../Footer/Footer'
import ChatBot from '../SubComponent/ChatBot';
const ContactUs = () => {
  const [isSmallScreen] = useState(window.innerWidth <= 992);
  const heading = "Contact Us"
  const para = "Don’t settle for Ordinary, Elevate your Equipment Experience with ORIGA."

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <div className='container-fluid p-0 pb-5 mb-5 m-0 flex-column'>
        <div className="container-fluid tablet-d-padding m-0 bg-gray">
          <div className="max-container p-0">
            <div className="container-fluid p-0 m-0 row">
              <div className={`col-lg-5 col-12 p-0 ${isSmallScreen ? "" : "py-5"}`}>
                <div className={`${isSmallScreen ? "pt-2" : "pt-5"}`}>

                  <h1 className='heading-600-44-24 pt-2'>{heading}</h1>
                  <p className='heading-400-16-14 pd-0 mg-0 op-80'>{para}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container-fluid m-0 tablet-d-padding'>
          <div className="max-container p-0">
            <div className="container-fluid p-0 m-0 row position-relative">
              <div className="col-lg-5 col-md-12 col-12 p-0">
                <div className='py-5'>
                  <div className='d-f pt-4'>
                    <div className='op-60'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_1_90734)">
                          <path d="M19.4405 5H4.1596C2.86746 5 1.80005 6.06742 1.80005 7.35955V17.2472C1.80005 18.5393 2.86746 19.6067 4.1596 19.6067H19.4405C20.7326 19.6067 21.8 18.5393 21.8 17.2472V7.35955C21.8 6.06742 20.7326 5 19.4405 5ZM19.4405 6.1236L12.4742 11.8539C11.9686 12.2472 11.2944 12.2472 10.7888 11.8539L4.10342 6.1236H4.1596H19.4405ZM20.6765 17.2472C20.6765 17.9213 20.1147 18.4831 19.4405 18.4831H4.1596C3.48544 18.4831 2.92364 17.9213 2.92364 17.2472V7.35955C2.92364 7.13483 2.97982 6.96629 3.09218 6.79775L10.0585 12.7528C10.5079 13.1461 11.0697 13.3146 11.6315 13.3146C12.1933 13.3146 12.6989 13.1461 13.1484 12.7528L20.4517 6.74157C20.5641 6.91011 20.6203 7.13483 20.6203 7.35955V17.2472H20.6765Z" fill="#211E24" />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_90734">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className='ml-2'>
                      <p className=' pl-3 m-0 p-12 op-60'>Email Us</p>
                      <p className='pl-3 m-0'>info@origa.market</p>
                    </div>
                  </div>
                  <div className='d-f mt-4'>
                    <div className='op-60'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g opacity="0.6">
                          <path d="M17.2871 22.3009C16.5852 22.3009 15.8052 22.1449 14.9473 21.8329C13.5434 21.3649 12.2954 20.663 10.8135 19.571C8.70763 18.0891 6.91373 16.2952 5.27582 14.2673C3.94989 12.5514 3.01394 10.9135 2.46797 9.27561C2.15599 8.33966 2 7.48171 2 6.70175C2.078 5.7658 2.38998 4.90785 3.01394 4.36188C3.48192 3.9719 3.8719 3.50393 4.26187 3.11395C4.65185 2.72397 5.19782 2.178 6.05577 2.10001H6.13377H6.67974C7.06972 2.178 7.61569 2.33399 8.00567 2.72397C8.08366 2.80197 8.16166 2.80197 8.16166 2.87996L8.78562 3.50393C9.40959 4.12789 10.0336 4.75186 10.6575 5.37582C11.5155 6.23378 11.6715 7.48171 11.0475 8.57365C10.7355 9.04162 10.3455 9.3536 9.79957 9.58759C9.40959 9.74358 9.2536 9.89957 9.0976 10.2116C9.01961 10.3675 9.01961 10.5235 9.0976 10.7575C9.2536 11.4595 9.64357 12.1614 10.3455 12.8634C11.1255 13.7214 11.9054 14.3453 12.7634 14.8133C13.1534 14.9693 13.4654 15.1253 13.6993 15.0473C14.2453 14.9693 14.4013 14.7353 14.4793 14.5013C14.7133 14.0333 14.9473 13.4874 15.5712 13.0974C16.5072 12.5514 17.7551 12.6294 18.5351 13.4094C18.9251 13.7994 19.393 14.1893 19.783 14.5793L20.095 14.8913C20.251 15.0473 20.329 15.1253 20.485 15.2813C20.797 15.5933 21.1089 15.9052 21.4209 16.2952C22.1229 17.1532 22.2009 18.4791 21.5769 19.415C21.4209 19.571 21.3429 19.727 21.1869 19.883L20.797 20.195C20.407 20.585 20.017 20.975 19.705 21.2869C19.081 21.9109 18.3011 22.3009 17.2871 22.3789C17.4431 22.3009 17.3651 22.3009 17.2871 22.3009ZM6.28976 3.58192C6.05577 3.65992 5.82179 3.81591 5.43181 4.12789C4.96383 4.59587 4.57386 5.06384 4.10588 5.45382C3.7159 5.7658 3.55991 6.23378 3.55991 6.77975C3.55991 7.40371 3.63791 8.02768 3.8719 8.80763C4.41786 10.2896 5.19782 11.7715 6.44575 13.3314C7.92767 15.2813 9.72157 16.9192 11.6715 18.3231C12.9974 19.2591 14.2453 19.961 15.4153 20.351C16.1952 20.585 16.8192 20.741 17.3651 20.663C17.9111 20.663 18.3791 20.429 18.6911 20.117C19.081 19.727 19.471 19.337 19.861 18.9471L20.173 18.6351C20.251 18.5571 20.329 18.4791 20.407 18.3231C20.641 17.9331 20.641 17.3872 20.407 17.0752C20.173 16.7632 19.861 16.4512 19.549 16.2172C19.393 16.0612 19.237 15.9052 19.159 15.8272L18.8471 15.5153C18.4571 15.1253 18.0671 14.7353 17.6771 14.3453C17.3651 14.1113 16.8972 14.0333 16.5852 14.2673C16.4292 14.3453 16.2732 14.5793 16.1172 14.8913C15.7272 15.7492 15.0253 16.2952 14.0893 16.4512C13.3874 16.5292 12.7634 16.2952 12.2954 16.0612C11.2035 15.5153 10.2675 14.8133 9.40959 13.7994C8.62963 12.8634 8.08366 12.0055 7.84967 11.0695C7.69368 10.5235 7.77168 9.97757 7.92767 9.50959C8.23965 8.80763 8.78562 8.33966 9.48758 8.10567C9.64357 8.02768 9.79957 7.94968 9.87756 7.71569C10.1115 7.32571 10.0336 6.85774 9.72157 6.46776C9.0976 5.8438 8.47364 5.21983 7.84967 4.59587L7.14771 3.89391C6.99172 3.81591 6.83573 3.73791 6.52375 3.65992H6.28976V3.58192Z" fill="#211E24" />
                        </g>
                      </svg>
                    </div>
                    <div className='ml-2'>
                      <p className='pl-3 m-0 p-12 op-60'>Contact us</p>
                      <p className='pl-3 m-0'>+918828099099</p>
                    </div>
                  </div>
                  <div className='d-f mt-4'>
                    <div className='op-60'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g opacity="0.6">
                          <path d="M3.73196 4.36859H20.547C20.9876 4.36859 21.2813 4.07488 21.2813 3.63431C21.2813 3.19374 20.9876 2.90002 20.547 2.90002H3.73196C3.29139 2.90002 2.99768 3.19374 2.99768 3.63431C2.99768 4.07488 3.36482 4.36859 3.73196 4.36859Z" fill="#211E24" />
                          <path d="M22.1625 11.4911L21.2813 6.27774C21.2079 5.83717 20.8408 5.47003 20.3268 5.47003H4.02572C3.58515 5.47003 3.14458 5.83717 3.07115 6.27774L2.19001 11.4911C2.11658 11.7849 2.19001 12.0786 2.4103 12.2254C2.55715 12.4457 2.85086 12.5926 3.14458 12.5926H3.58515V20.7431C3.58515 21.4039 4.17257 21.9914 4.83343 21.9914H19.5191C20.1799 21.9914 20.7673 21.4039 20.7673 20.7431V12.5926H21.2079C21.5016 12.5926 21.7219 12.4457 21.9422 12.2254C22.1625 12.0051 22.1625 11.7849 22.1625 11.4911ZM4.46628 6.9386H19.8862L20.5471 11.124H19.5191H4.83343H3.80543L4.46628 6.9386ZM19.2988 20.5228H5.05371V12.5926H19.2988V20.5228Z" fill="#211E24" />
                          <path d="M7.62377 17.806H14.8932C15.554 17.806 16.1414 17.2185 16.1414 16.5577V14.722C16.1414 14.0611 15.554 13.4737 14.8932 13.4737H7.62377C6.96291 13.4737 6.37549 14.0611 6.37549 14.722V16.5577C6.37549 17.2185 6.88949 17.806 7.62377 17.806ZM7.84405 14.9423H14.6729V16.3374H7.84405V14.9423Z" fill="#211E24" />
                        </g>
                      </svg>
                    </div>
                    <div className='ml-2'>
                      <p className='pl-3 m-0 p-12 op-60'>Head Office</p>
                      <p className='pl-3 pr-3 heading-400-14 m-0'><b>Mumbai:</b></p>
                      <p className='pl-3 pr-3 heading-400-14 m-0'>212, Building No-2, Solitaire Corporate Park, Andheri East, Mumbai</p>
                    </div>
                    <div className='ml-2'>
                      <p className='pl-3 m-0 p-12 op-60'>Service Centers</p>
                      <p className='pl-3 pr-3 heading-400-14 m-0'><b>Vasai:</b></p>
                      <p className='pl-3 pr-3 heading-400-14 m-0'>1st Floor, Pelhar Industrial Estate, Vasai Phata, Behind Hotel Suvidha Suits,On Mum - Ahm
                        Highway,Vasai (E)</p>
                      <p></p>
                      <p className='pl-3 pr-3 heading-400-14 m-0'><b>Pune:</b></p>
                      <p className='pl-3 pr-3 heading-400-14 m-0'>Plot no. BG 102/103, Shree Yash Bhavani Complex, Bhosari Telco Rd, MIDC, Pimpri-
                        Chinchwad</p>
                      <p></p>
                      <p className='pl-3 pr-3 heading-400-14 m-0'><b>Bengaluru:</b></p>
                      <p className='pl-3 pr-3 heading-400-14 m-0'>3B, Site No. 36, 1st floor, 3rd Shop, 2nd Phase, KIADB Main Road, Opp. BWSSB, Peenya 1st Stage, Peenya Industrial Area, Bengaluru, 560058</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-12 p-0 ">
                <div className={`${isSmallScreen ? "d-flex justify-content-center" : "contactusForm"} my-5`} >
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className='container-fluid p-r p-0 pt-5 m-0'>
        {isSmallScreen && <div className='p-a right-0 top-0'>
          <img src='/asset/Frame1000004018.png' alt='Frame1000004018.png' />
        </div>}
        <Footer />
      </div>
    </>
  )
}

export default ContactUs