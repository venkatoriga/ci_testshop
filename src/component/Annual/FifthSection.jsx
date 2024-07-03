import React,{useState,useEffect} from 'react'

const FifthSection = () => {

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 992);
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 992);
        };

        window.addEventListener("resize", handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [window.innerWidth])
    
    return (
        <>
    
        <section className='container-fluid pt-5'>
        <div className='max-container'>
        <div className='show-992 pt-5'></div>
            <div className='container-fluid p-0 m-0 d-flex justify-content-between row'>
                <div className={`col col-lg-6 col-12 ${isSmallScreen ? "":"pl-0"}  pt-3`}>
                    <div className='img_box'>
                        <img src="/asset/amc-machine-img.png" alt="amc" className='img-fluid' />
                        <p className='img_text'>Annual Maintenance Contracts (AMC):  Proactive Care for a Seamless Operation</p>
                    </div>
                </div>
                <div className={`col col-lg-6 col-12 ${isSmallScreen ? "":"pr-0"}  pt-3`}>
                    <div className='img_box'>
                        <img src="/asset/safeguard-img.png" alt="amc" className='img-fluid' />
                        <p className='img_text'>Safeguard Your Systems, Secure Your Future: AMC Offerings</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
        </>
    )
}

export default FifthSection