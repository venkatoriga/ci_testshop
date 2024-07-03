import React from 'react'
import Card from 'react-bootstrap/Card';
const UserCard = ({ imageurl,userName,userImage,userPosition,message,bottomDes}) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageurl} />
      <Card.Body>
       <div className='row'>
        <div className='col col-1'>
            <img src={userImage} alt={userImage}/>
        </div>
        <div className='col col-11'>
            <div className='row'>
                <div className='col col-12'>
                    <p>{userName}</p>
                </div>
                <div className='col col-12'>
                    <p>{userPosition}</p>
                </div>
            </div>
        </div>
       </div>

       <div className='row pt-3'>
        <p>{message}</p>
       </div>

       <div className='row pt-3'>
        <p>{bottomDes}</p>
       </div>
      </Card.Body>
    </Card>
  )
}

export default UserCard



