import React,{useState} from 'react'

const ThumbsUpWithThreeCircle = () => {
  
  const [isHover,setIshover]=useState(false)
  return (
    <div style={{height:"90px"}} onMouseEnter={()=>setIshover(true)} onMouseLeave={()=>setIshover(false)}>
    <svg xmlns="http://www.w3.org/2000/svg"  width={isHover ?"100":"90"} height={isHover ?"100":"90"} viewBox="0 0 90 90" fill="none">
    <g opacity="0.6">
      <path d="M15.0254 75.9619H74.9064" stroke="black" stroke-width="2.23099" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M20.1801 67.4965C22.5697 67.4965 24.5068 65.5594 24.5068 63.1699C24.5068 60.7804 22.5697 58.8433 20.1801 58.8433C17.7906 58.8433 15.8535 60.7804 15.8535 63.1699C15.8535 65.5594 17.7906 67.4965 20.1801 67.4965Z" stroke="black" stroke-width="2.23099" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M44.966 67.4965C47.3556 67.4965 49.2927 65.5594 49.2927 63.1699C49.2927 60.7804 47.3556 58.8433 44.966 58.8433C42.5765 58.8433 40.6394 60.7804 40.6394 63.1699C40.6394 65.5594 42.5765 67.4965 44.966 67.4965Z" stroke="black" stroke-width="2.23099" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M70.3247 67.4965C72.7142 67.4965 74.6513 65.5594 74.6513 63.1699C74.6513 60.7804 72.7142 58.8433 70.3247 58.8433C67.9351 58.8433 65.998 60.7804 65.998 63.1699C65.998 65.5594 67.9351 67.4965 70.3247 67.4965Z" stroke="black" stroke-width="2.23099" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M24.5068 63.1699H40.6394" stroke="black" stroke-width="2.23099" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M49.511 63.1699H65.6435" stroke="black" stroke-width="2.23099" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M32.8575 25.6782H32.8575C35.6573 25.6782 37.9271 27.948 37.9271 30.7478V40.4262C37.9271 43.2261 35.6573 45.4958 32.8575 45.4958H32.8575C30.0576 45.4958 27.7878 43.2261 27.7878 40.4262V30.7478C27.7878 27.948 30.0576 25.6782 32.8575 25.6782Z" stroke="black" stroke-width="1.93774" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M38.541 43.3704L42.5966 44.6548C43.4477 44.9243 44.3351 45.0615 45.2279 45.0615H55.9844C57.1548 44.963 58.0198 43.9417 57.9423 42.8365C57.8709 41.8186 57.0166 40.9698 55.941 40.9058C54.8282 40.8901 53.7152 40.8742 52.6024 40.8584" stroke="black" stroke-width="1.93774" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M55.9409 40.9063C57.3427 41.1558 58.6885 40.3328 59.0746 39.0726C59.4092 37.9803 58.9665 36.7429 57.9652 36.0522H53.7737" stroke="black" stroke-width="1.93774" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M57.3586 36.0981C58.7604 36.3477 60.1062 35.5247 60.4923 34.2644C60.8269 33.1722 60.3842 31.9348 59.3829 31.2441H55.1914" stroke="black" stroke-width="1.93774" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M58.906 31.2759C60.3078 31.5255 61.6536 30.7024 62.0397 29.4422C62.0636 29.3642 62.0836 29.2854 62.0996 29.2062C62.3937 27.7542 61.1905 26.4219 59.709 26.4219H50.1521" stroke="black" stroke-width="1.93774" stroke-miterlimit="10" stroke-linecap="round"/>
      <path d="M37.9321 28.5321L44.5722 24.8981C46.1745 24.0211 47.4112 22.6012 48.0597 20.8937L50.0751 15.5877C50.3852 14.4945 51.4261 13.8267 52.4175 13.9851C52.6148 14.0166 52.8042 14.08 52.9806 14.1704C53.7303 14.5547 54.1074 15.4167 53.982 16.2498C53.44 19.8508 52.8979 22.4638 52.3559 26.0647" stroke="black" stroke-width="1.93774" stroke-miterlimit="10" stroke-linecap="round"/>
    </g>
  </svg>
  </div>
  )
}

export default ThumbsUpWithThreeCircle