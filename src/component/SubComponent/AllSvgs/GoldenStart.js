import React from 'react'

const GoldenStart = () => {
  const isSmallScreen=(window.innerWidth<=576);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={`${isSmallScreen ? "18" :"24"}`} height={`${isSmallScreen ? "18" :"24"}`} viewBox="0 0 24 24" fill="none">
  <path d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z" fill="#F4C51D"/>
</svg>
  )
}

export default GoldenStart