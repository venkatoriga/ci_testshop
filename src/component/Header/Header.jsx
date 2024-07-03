import React,{useState,useEffect} from 'react'
import Menu from './Menu/Menu'
import Nav from './Nav/Nav'
import '../../component/Header/Nav/Nav.css'
import NewMenu from './Menu/NewMenu'

const Header = () => {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;

      // You can adjust this value based on when you want the navbar to become sticky
      const isStickyNow = offset > 0;

      setSticky(isStickyNow);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // without-sticky-header ${isSticky ? "sticky-header":""} 
  return (
    
    <div className={`container-fluid bg-white z-100 `}  style={{ position: "sticky",top: 0,boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.1)",minHeight:"56px"}} >
      <div class="top-banner">
      <a href="tel:+918828099099" class="phone-link">Call Us: +91-8828099099</a>
      </div>
     <div className="max-container p-0" >
        <Nav/>
  {/*<Menu/>*/}
  <NewMenu/>
    </div>
    </div>
   
  )
}

export default Header