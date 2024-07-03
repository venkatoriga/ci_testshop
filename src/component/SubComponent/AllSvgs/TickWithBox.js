import React,{useState} from 'react'

const TickWithBox = () => {
  const [isHover,setIshover]=useState(false)
  return (
    <div className='d-j-a' style={{height:"90px"}} onMouseEnter={()=>setIshover(true)} onMouseLeave={()=>setIshover(false)}> 
    <svg xmlns="http://www.w3.org/2000/svg" width={isHover ?"66":"56"} height={isHover ?"71":"61"} viewBox="0 0 56 61" fill="none">
    <g opacity="0.6">
  <path d="M55.4 41.6999L50.5 32.0999C50.2 31.4999 49.5 31.0999 48.8 31.0999H31.5C38.2 29.3999 43.2 23.3999 43.2 16.1999C43.2 7.6999 36.3 0.899902 27.9 0.899902C19.5 0.899902 12.6 7.7999 12.6 16.1999C12.6 23.3999 17.6 29.4999 24.3 31.0999H7.09998C6.39998 31.0999 5.69998 31.4999 5.39998 32.0999L0.499977 41.6999C0.199977 42.2999 0.199977 42.9999 0.599977 43.3999C0.999977 43.8999 1.59998 44.2999 2.19998 44.2999H5.59998V56.2999C5.59998 58.7999 7.59998 60.8999 10.2 60.8999H28.2H45.7C48.2 60.8999 50.3 58.8999 50.3 56.2999V44.3999H53.7C54.4 44.3999 55 44.0999 55.3 43.4999C55.6 42.8999 55.7 42.2999 55.4 41.6999ZM14.5 16.1999C14.5 8.7999 20.5 2.7999 27.9 2.7999C35.3 2.7999 41.3 8.7999 41.3 16.1999C41.3 23.5999 35.3 29.5999 27.9 29.5999C20.5 29.5999 14.5 23.5999 14.5 16.1999ZM7.19998 32.9999H26.7L22 42.4999H2.39998L7.19998 32.9999ZM7.59998 56.3999V44.3999H22C22.7 44.3999 23.4 43.9999 23.7 43.3999L27.4 36.0999L27.3 59.0999H10.3C8.79998 59.1999 7.59998 57.8999 7.59998 56.3999ZM48.4 56.3999C48.4 57.8999 47.2 58.9999 45.8 58.9999H29.3V37.2999L32.4 43.2999C32.7 43.8999 33.4 44.2999 34.1 44.2999H48.5C48.4 44.2999 48.4 56.3999 48.4 56.3999ZM34 42.4999L29.3 32.9999H48.8L53.6 42.3999H34V42.4999Z" fill="black"/>
  <path d="M34.3 12.5998C33.9 12.1998 33.3 12.1998 32.9 12.5998L27.0999 18.0998L24.4 15.3998C24 14.9998 23.4 14.9998 23 15.3998C22.6 15.7998 22.6 16.3998 23 16.7998L26.4 20.1998C26.6 20.3998 26.9 20.4998 27.0999 20.4998C27.2999 20.4998 27.6 20.3998 27.8 20.1998L34.4 13.9998C34.6 13.5998 34.7 12.9998 34.3 12.5998Z" fill="black"/>
  </g>
</svg>
</div>
  )
}

export default TickWithBox