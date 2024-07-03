import React from 'react'

const Wrong = ({fill,inner}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
    <g >
      <circle cx="8" cy="8.5" r="8" fill={fill ? fill:"black"}/>
      <path d="M8.00104 7.9973L9.76104 6.2373L10.2638 6.74006L8.50379 8.50006L10.2638 10.2601L9.76104 10.7628L8.00104 9.00282L6.24104 10.7628L5.73828 10.2601L7.49828 8.50006L5.73828 6.74006L6.24104 6.2373L8.00104 7.9973Z" fill={fill ? inner:"#FFFFFF"}/>
    </g>
  </svg>
  )
}

export default Wrong