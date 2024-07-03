import React, { useState } from 'react';

const NewsBlock = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnterHandler = () => {
    setIsHovered(true);
  };

  const onMouseLeaveHandler = () => {
    setIsHovered(false);
  };

  // Function to determine if the message is a URL
  const isUrl = (message) => /^https?:\/\//.test(message);

  return (
    <div className={`h-320 ishoverd ${isHovered ? "hovered" : ""}`} key={index} onMouseEnter={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
      <div>
        <img className='w-100' src={product.imageurl} alt={product.title} />
      </div>
      <div className='p-2'>
        <p className={`heading-600-16 ${isHovered ? "bottom-halfline1" : "bottom-halfline"}`}>{product.title}</p>
        {isUrl(product.message) ? (
          <a href={product.message} target="_blank" rel="noopener noreferrer" className="heading-400-14-12"></a>
        ) : (
          <p className={`heading-400-14-12`}>{product.message}</p>
        )}
        <div className='row d-flex justify-content-between'>
          <div className='col col-4'>{product.date}</div>
          <div className='col col-4'>
            {/* Conditional rendering for link text based on URL */}
            {isUrl(product.message) ? (
              <a href={product.message} target="_blank" rel="noopener noreferrer">Watch Video</a>
            ) : (
              <a href={`#${product.title}`} rel="noopener noreferrer">Read More</a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsBlock;