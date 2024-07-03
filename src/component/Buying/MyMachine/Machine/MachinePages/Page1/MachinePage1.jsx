import React ,{useState,useEffect   } from "react";
import MachineInfo from "../MachineInfo";
import ProductImages from "../ProductImages";
import MachineExtraData from "../MachineExtraData";
import MachineProgress from "../MachineProgress";
import Benefits from "../Benefits";
import Withdraw from "../Withdraw";
import SpeakToExpert from "../SpeakToExpert";
import Footer from "../../../../../Footer/Footer";
import CallToAction from "../CallToAction";
import { useLocation } from 'react-router-dom';
import gql from 'graphql-tag';
import { ApolloClient, InMemoryCache } from '@apollo/client';
const clientMachine = new ApolloClient({
  uri: 'https://devextension.origa.market/graphql/',
  cache: new InMemoryCache(),
});     

const GET_MACHINE_DETAILS = gql`

query fetchMachineDetailsForBuy($productId:String!,$customerId:String!) {
  fetchMachineDetailsForBuy(productId: $productId,customerId:$customerId) {
    message
    code
    response
  }
}



`;

const MachinePage1 = () => {

 const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
     const loggedin = localStorage.getItem('userToken');
     const [productDETAILS,setProductDETAILS] = useState({}); 
  const productId = queryParams.get('id');


      useEffect(() => {
    const fetchData = async () => {
      try {
     
  const id = localStorage.getItem('id');
        const { data } =  await clientMachine.mutate({
      mutation:GET_MACHINE_DETAILS ,
      variables: { productId: productId,"customerId":id},
    });
    setProductDETAILS(data?.fetchMachineDetailsForBuy?.response)
    console.log("API Response==>",data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchData();
  }, []);

    return (
        <>
      {productDETAILS.machine_details?.data && productDETAILS.blocked_details && (
  <MachineInfo machine={productDETAILS.machine_details.data} blocked_details={productDETAILS.blocked_details}  product_status={productDETAILS.product_status} />
)}

           {productDETAILS.machine_details?.data?.product?.media && (
        <ProductImages media={productDETAILS.machine_details.data?.product?.media} />
      )}
            {/* <ProductImages/> */}
            <MachineProgress process={productDETAILS?.process_details}/>
                 {productDETAILS && (
        <MachineExtraData productDETAILS={productDETAILS} />
      )}           {productDETAILS.buymachine_id && (
            <Benefits buymachine_id={productDETAILS.buymachine_id}/>  )}
             {productDETAILS.product_status!='Owned'&&  (     <Withdraw/>)}
            <SpeakToExpert/>
            <Footer/>


                 {productDETAILS && (
  <CallToAction productDETAILS={productDETAILS} />
)}
            
        </>
    );
}
export default MachinePage1;