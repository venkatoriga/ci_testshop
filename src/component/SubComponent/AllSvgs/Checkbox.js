import React from 'react'

const Checkbox = ({fill}) => {
  console.log("fill=>>>",fill);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <g clip-path="url(#clip0_1547_4399)">
    <path d="M6.75047 12.1277L4.14797 9.52523C3.85547 9.23273 3.38297 9.23273 3.09047 9.52523C2.79797 9.81773 2.79797 10.2902 3.09047 10.5827L6.22547 13.7177C6.51797 14.0102 6.99047 14.0102 7.28297 13.7177L15.218 5.78273C15.5105 5.49023 15.5105 5.01773 15.218 4.72523C14.9255 4.43273 14.453 4.43273 14.1605 4.72523L6.75047 12.1277Z" fill={fill}/>
  </g>
  <defs>
    <clipPath id="clip0_1547_4399">
      <rect width="18" height="18" fill="none"/>
    </clipPath>
  </defs>
</svg>
  )
}

export default Checkbox