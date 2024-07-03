import React,{useState} from 'react'

const CircleArrow = () => {
  
  const [isHover,setIshover]=useState(false)
  return (
    <div style={{height:"90px"}} onMouseEnter={()=>setIshover(true)} onMouseLeave={()=>setIshover(false)}>
    <svg xmlns="http://www.w3.org/2000/svg" width={isHover ?"100":"90"} height={isHover ?"100":"90"} viewBox="0 0 90 90" fill="none">
    <g opacity="0.6">
      <path d="M59.7468 36.6986C65.2977 37.2441 76 40.1837 76 44.9617C76 49.7396 62.1209 53.6128 45 53.6128C27.8793 53.6128 14 49.7396 14 44.9617C14 40.1837 27.8793 36.3105 45 36.3105" stroke="black" stroke-width="2.0615" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M36.3489 44.9619C36.3489 27.841 40.222 13.9619 45 13.9619C49.778 13.9619 53.6511 27.841 53.6511 44.9619C53.6511 59.556 49.305 75.9668 45 75.9619C43.1229 75.9598 40.6266 72.8357 37.6806 60.0678" stroke="black" stroke-width="2.0615" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M67.6079 32.2876L58.4602 36.6699C61.0627 38.8711 63.665 41.0724 66.2675 43.2736" stroke="black" stroke-width="2.0615" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M33.7834 67.8792L37.4296 58.4141C39.8295 60.8346 42.2294 63.2549 44.6293 65.6754" stroke="black" stroke-width="2.0615" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>
  </div>
  )
}

export default CircleArrow