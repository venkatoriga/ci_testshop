import React from 'react'

const HalfGoldenStar = () => {
  const isSmallScreen=(window.innerWidth<=576);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${isSmallScreen ? "16" :"19"}`} height={`${isSmallScreen ? "16" :"20"}`} viewBox="0 0 19 20"  fill="none">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.91651 18.0808L9.50014 14.9553L15.0838 18.0808L13.8369 11.8044L18.5354 7.45976L12.1807 6.7061L9.50014 0.895264L6.81955 6.7061L0.464844 7.45976L5.16339 11.8044L3.91651 18.0808ZM12.8624 15.0229L9.5002 13.1411V4.67578L11.1136 8.17416L14.9397 8.62778L12.1111 11.2442L12.8624 15.0229Z" fill="#F4C51D"/>
  </svg>
  )
}

export default HalfGoldenStar