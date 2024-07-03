import React from 'react'
import { Container } from 'react-bootstrap'
import './Listofservicewithoutdes.css'
const ListofServiceWithoutdes = ({ svgcode, para,title,onClick  }) => {
  const handleClick = () => {
    // Check if the onClick function is defined and the URL is not blank
    if (onClick && onClick !== '') {
      onClick();
    }
  }
  return (
    <Container fluid className="listofservicewithoutdes p-0 curser-pointer"  onClick={handleClick}>
    <div>{svgcode}</div>
      {title && <p className='heading-600-18 text-center'>{title}</p>}
      <p className="heading-400-14-12 text-center op-80">{para}</p>
    </Container>
  )
}

export default ListofServiceWithoutdes