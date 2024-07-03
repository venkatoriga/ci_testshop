import React,{useEffect ,useState} from 'react'

const LeftArrow = ({callFun}) => {
  // const [rWidth,setRwidth]=useState(24);
   const onCallFun=()=>{
    if(callFun){
        callFun();
    }else return
    
   }
//    useEffect(()=>{
//     const onHandleResize=()=>{
//         if(window.innerWidth<576){
//             setRwidth(16);
//         }
//     }
//     window.addEventListener('resize', onHandleResize);

//     onHandleResize();
//     return () => {
//       window.removeEventListener('resize', onHandleResize);
//     };
// },[])
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{cursor:"pointer"}} width="24" height="24" viewBox={`0 0 24 24`} fill="none" onClick={onCallFun}>
    <path d="M19 12H7.14L10.77 16.36C10.854 16.4611 10.9174 16.5778 10.9563 16.7034C10.9953 16.829 11.0091 16.961 10.997 17.0919C10.9726 17.3564 10.8442 17.6003 10.64 17.77C10.4358 17.9397 10.1725 18.0214 9.90808 17.997C9.64365 17.9726 9.39974 17.8442 9.23 17.64L4.23 11.64C4.19636 11.5923 4.16628 11.5421 4.14 11.49C4.14 11.44 4.09 11.41 4.07 11.36C4.02467 11.2453 4.00094 11.1233 4 11C4.00094 10.8767 4.02467 10.7547 4.07 10.64C4.07 10.59 4.12 10.56 4.14 10.51C4.16628 10.4579 4.19636 10.4077 4.23 10.36L9.23 4.36C9.32402 4.24712 9.44176 4.15634 9.57485 4.09412C9.70793 4.0319 9.85309 3.99976 10 4C10.2337 3.99955 10.4601 4.08092 10.64 4.23C10.7413 4.31395 10.825 4.41705 10.8863 4.5334C10.9477 4.64975 10.9855 4.77705 10.9975 4.90803C11.0096 5.03901 10.9957 5.17108 10.9567 5.29668C10.9176 5.42229 10.8542 5.53895 10.77 5.64L7.14 10H19C19.2652 10 19.5196 10.1054 19.7071 10.2929C19.8946 10.4804 20 10.7348 20 11C20 11.2652 19.8946 11.5196 19.7071 11.7071C19.5196 11.8946 19.2652 12 19 12Z" fill="#211E24"/>
  </svg>)
}

export default LeftArrow