import React from 'react'
import './NewBanner.css'
import { useNavigate, useLocation } from 'react-router-dom'
// import '../../../public/asset/'
const NewBanner = ({ items, bannerTopSection }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  let btnName
  if (pathname === '/buy') {
    btnName = 'Buy Now';
  }
  else if (pathname === '/sell') {
    btnName = 'Sell Now';
  }
  else if (pathname === '/finance') {
    btnName = 'Apply Now';
  }
  else if (pathname === '/service') {
    btnName = 'Book Now';
  }
  else {
    btnName = 'Buy Now';
  }

  return (
    <div className='newbanner'>
      <div className='max-container newbanner-main'>
        <div className={`newbanner-text ${bannerTopSection.mw}`}>
          <h2 className='heading-600-28 text-white'>{bannerTopSection.title}</h2>
          <p className='heading-400-16-14 op-80' style={{ color: "#F5F5F5" }}>{bannerTopSection.para}</p>
        </div>

        <div className='banner-items'>
          <div className='banner-items-wrap'>
            {
              items.map((item) => (
                <div className='banner-item'>
                  <div className='banner-item-wrap'>
                    <div>{item.imagesrc}</div>
                    <div className='heading-500-16-14 banner-item-title'>{item.title}</div>
                    <div className='heading-400-14-12 banner-item-para op-80' style={{ paddingTop: "8px" }}>{item.para}</div>
                    <button className='f-btn mt-12' onClick={() => {
                      if (pathname === '/service') {
                        item.navi()
                      } else {
                        navigate(item.navi);
                      }
                    }}>{btnName}</button>

                    {/* <button className='f-btn mt-12' onClick={()=>navigate(item.navi)}>{btnName}</button> */}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewBanner