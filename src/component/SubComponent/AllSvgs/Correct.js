import React from 'react'

const Correct = ({fill}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
    <circle cx="8" cy="8.5" r="8" fill={fill ? fill:"#000000"}/>
    <path d="M7.28912 9.628L10.5574 6.35938L11.0605 6.86213L7.28912 10.6335L5.02637 8.37075L5.52912 7.868L7.28912 9.628Z" fill={fill ? "#000000":"#FFFFFF"}/>
  </svg>
  )
}

export default Correct