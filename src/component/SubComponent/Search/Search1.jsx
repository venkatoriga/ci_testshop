import React from 'react'
import './Search1.css'
const Search1 = ({message,onInputChange,left,onEnterHandler}) => {
  if(window.innerWidth<=992 )
  {left = false}
  console.log("value of left",left);
  return (
    <div className="search1-box">
      <div className={`${left ? "search1-icon-left":'search1-icon'}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="#211E24">
          <path d="M0.941748 9.58334C0.941748 14.3469 4.81985 18.225 9.58342 18.225C14.347 18.225 18.2251 14.3469 18.2251 9.58334C18.2251 4.81978 14.347 0.941672 9.58342 0.941672C4.81985 0.941672 0.941748 4.81978 0.941748 9.58334ZM2.39175 9.58334C2.39175 5.62183 5.61372 2.39167 9.58342 2.39167C13.5531 2.39167 16.7751 5.62183 16.7751 9.58334C16.7751 13.5449 13.5531 16.775 9.58342 16.775C5.61372 16.775 2.39175 13.5449 2.39175 9.58334Z" fill="#211E24" stroke="#211E24" strokeWidth="0.2" />
          <path d="M17.8209 18.8457C17.9657 18.9905 18.1499 19.0583 18.3333 19.0583C18.5167 19.0583 18.7009 18.9905 18.8457 18.8457C19.1264 18.565 19.1264 18.1017 18.8457 17.821L17.179 16.1543C16.8983 15.8736 16.435 15.8736 16.1542 16.1543C15.8735 16.435 15.8735 16.8983 16.1542 17.1791L17.8209 18.8457Z" fill="#211E24" stroke="#211E24" strokeWidth="0.2" />
        </svg>
      </div>
      <input style={{border:'1px solid #3C3C4366'}} className='heading-400-16-12' type="text" placeholder={message} onKeyPress={onEnterHandler} onChange={onInputChange} />
    </div>
  )
}

export default Search1