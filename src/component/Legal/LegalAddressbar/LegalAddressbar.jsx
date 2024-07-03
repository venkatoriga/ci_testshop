import React from 'react'
import { Container } from 'react-bootstrap'
import "./LegalAddressbar.css";
const LegalAddressbar = () => {
  return (
    <Container className="legaltopcontainer">
    <Container><svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
<path d="M12.6667 8.5H3.33337M3.33337 8.5L8.00004 13.1667M3.33337 8.5L8.00004 3.83334" stroke="#66718C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg></Container>
    <Container><p className="legalhome">Home</p><svg xmlns="http://www.w3.org/2000/svg" width="6" height="12" viewBox="0 0 6 12" fill="none">
<path d="M5.5 1L1 11" stroke="#66718C" stroke-linecap="round"/>
</svg></Container>
    <Container><p className='legalourpolicy'>Our Policies</p></Container>

  </Container>
  )
}

export default LegalAddressbar