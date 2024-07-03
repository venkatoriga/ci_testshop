import React from 'react'
// import classes from './Vector.module.css'
import classes from '../../Vector/Vector.module.css'
// import Vector from './Vector'
import Vector from '../../Vector/Vector'
const VectorBlock = ({onMoveRight,onMoveLeft}) => {
  return (
    <div className={classes.vector}>
    {<Vector onMove={onMoveLeft} move={false}/>}
    {<Vector onMove={onMoveRight} move={true}/>}
    </div>
  )
}

export default VectorBlock