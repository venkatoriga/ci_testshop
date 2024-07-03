import React from 'react'
import './News.css'
import Slider6 from '../../SubComponent/AllSlider/Slider6'
import NewsBlock from '../../Block/NewsBlock'
import ChatBot from '../../SubComponent/ChatBot'
function News() {
    const newsBlock=<NewsBlock/>
    const listofdata=[{
        imageurl:"/asset/news1.webp",
        title:"ET Now LEADERS Of Tomorrow",
        message: "https://www.youtube.com/watch?v=yu7WbK0BUO0",
        date:"24 Sep, 2016"
    },{
      imageurl:"/asset/news2.webp",
      title:"Business Banking Dialogue",
      message: "https://www.youtube.com/live/KNp9EDC8bzE?si=za3SsHCjnftgs2jS",
      date:"09 Oct, 2020"
  }/* ,
    { imageurl:"/asset/image1.png",
    title:"Origa continues to be at the forefront of Equipment Financing",
    message:"In India, one of the industries that is witnessing massive growth in entrepreneurship is the healthcare industry. It is expected It is expected to become a USD 280",
    date:"15 May, 2023"
    },
    { imageurl:"/asset/image1.png",
    title:"Origa continues to be at the forefront of Equipment Financing",
    message:"In India, one of the industries that is witnessing massive growth in entrepreneurship is the healthcare industry. It is expected It is expected to become a USD 280",
    date:"15 May, 2023"
    } */]
    return (<>
        <div className="max-container my-5 pt-3 ">
            <div className="container-fluid p-0 pt-4 m-0 row">
                <div className="tablet-d-padding d-flex align-item--center f-wrap ">
                <div className="col-sm-12 col-md-8 col-lg-7  p-0 ">
                  
                  <h2 className="heading-600-44-20 pt-3">In the News</h2>
                  {/* <p className="heading-400-16-14  pt-3 op-80">
                  At Origa, we view events as more than mere occasions; they present remarkable opportunities to craft memories and establish profound, meaningful connections.
                  </p> */}
                </div>
              </div>
                
            </div>
            <div className='tablet-d-padding pb-5'>
            <Slider6 listofdata={listofdata} productCategory={newsBlock} />
            </div>
        </div>
        
        <div className='max-container'>
        <div className='p-r w-100'>
      {/*   <ChatBot/> */}
        </div>
         
        </div> 
        </>
    )
}

export default News