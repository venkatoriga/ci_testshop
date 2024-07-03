import React from 'react'
import './Finance.css'
const FinanceThirdSection = ({topSectionData,advantageData}) => {
  

  return (
    <div className="container-fluid sectionfour">
                <div className="max-container text-center">
                <img src={topSectionData.imgurl} alt={topSectionData.imgurl} />
                <div className='text-center heading-600-24-20 c-green'>{topSectionData.title}</div>
                <div className='heading-400-16-14 op-80 text-center pt-12'>{topSectionData.para}</div>
                    <div className="row mt-32">
                        {advantageData.map((advantage,index) => (
                            <div key={index} className="col-lg-4 col-6 mx-auto">
                                <div className="cust-box-card">
                                    <div className="svg-icon mb-2" >{advantage.icon}</div>
                                    <div className="title heading-600-16-14">{advantage.title}</div>
                                    <div className="desc heading-400-14-12 op-80">{advantage.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
    </div>
  )
}

export default FinanceThirdSection