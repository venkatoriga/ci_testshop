import React from 'react'
import classes from './Vector.module.css'
import Vector from './Vector'
const VectorBlock = ({onMoveRight,onMoveLeft}) => {
  return (
    <div className={classes.vector}>
    {<Vector onMove={onMoveLeft} move={false}/>}
    {<Vector onMove={onMoveRight} move={true}/>}
    </div>
  )
}

export default VectorBlock