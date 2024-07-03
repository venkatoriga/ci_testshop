import React,{useEffect, useState} from 'react';

import { Container } from 'react-bootstrap';
import Slider7 from '../../SubComponent/AllSlider/Slider7';
import ImageWithTitle from '../../SubComponent/AllBlock/ImageWithTitle';
import client from './apolloclient'
import { gql } from 'graphql-tag';
const GET_UPCOMING_LOCATIONS = gql`
query GetUpcomingLocations($first: Int, $pageTypes: [ID!]) {
  pages(first: $first, filter: { pageTypes: $pageTypes }) {
    edges {
      node {
        title
        content
        attributes {
          attribute {
            id
            name
          }
          values {
            id
            name
            value
            file {
              url
              contentType
            }
          }
        }
      }
    }
  }
}
`;
const UnfortunatelyThirdSection = () => {
  const [locationData,setLocationData]=useState([]);
 const productCategory=<ImageWithTitle/>
  //   const listOfData=[{title:"Chandighar",imageUrl:'asset/Chandighar.png'},
  //   {title:"Nashik",imageUrl:'asset/Nashik.png'},
  //   {title:"Kolkata",imageUrl:'asset/Kolkata.png'},
  //   {title:"Kochi",imageUrl:'asset/Kochi.png'},
  //   {title:"Nashik",imageUrl:'asset/Nashik.png'},
  //   {title:"Kolkata",imageUrl:'asset/Kolkata.png'},
  //   {title:"Kochi",imageUrl:'asset/Kochi.png'},
  // ]

  // let listdata=locationData.map((location)=>{
  //  return { 
  //   title:location.node.title,
  //   // name:location.node.attributes[0].values[0].name,
  //   // description:location.node.attributes[1].values[0].name,
  //   imageUrl:location.node.attributes[2].values[0].file.url,
  // }})

  const listOfData=locationData.map((location)=>{
   return { 
    title:location.node.title,
    imageUrl:location.node.attributes[2].values[0].file.url,
  }})
  console.log("list data=>",listOfData);
  const breakpoints={
    a:3.5,
    b:3.2,
    c:2.5,
    d:1.5,
    e:1.2
  }

 useEffect(() => {
  const onGetLocation=async()=>{
    try {
      const { data } = await client.mutate({
        mutation:GET_UPCOMING_LOCATIONS ,
        variables: {
          "first": 100,
          "pageTypes": ["UGFnZVR5cGU6Mw=="]
        }
        
      });
      if(data.pages.edges){
        setLocationData(data.pages.edges);
      }
      
    } catch (error) {
      console.log("unfortunately Error===>>>",error);
    }
  }
  onGetLocation();
 }, [])
//  console.log("unfortunately data===>>>",locationData);
  return (
    <Container fluid className="pt-5 pb-5">
    <div className='max-container pt-5'>
        <h1 className='heading-600-44-20'>Coming Soon!</h1>
       <p className='heading-400-20-14 op-80'>Origa is adding locations to its serviceable area list!</p>      
       
    </div>
    <div className='xmax-container'>
    <div className='r-max-container'>
    {listOfData.length>0 && <Slider7 listofdata={listOfData} productCategory={productCategory} breakpoints={breakpoints} />}
    </div>
    </div>
</Container>
  )
}

export default UnfortunatelyThirdSection