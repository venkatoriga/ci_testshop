import React ,{useState,useEffect   } from "react";
import MachineInfo from "./MachineInfo";
import ProductImages from "../ProductImages";
import MachineExtraData from "../MachineExtraData";
import MachineProgress from "./MachineProgress";
import Benefits from "./Benefits";
import Withdraw from "../Withdraw";
import Footer from "../../../../../Footer/Footer";
import CallToAction from "../CallToAction";
import { useNavigate } from "react-router-dom";
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
const MachinePage3 = () => {
    const navigate=useNavigate();
    const onNavigateHandler=()=>{
        navigate('/add-address')
    }

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
        <>    {productDETAILS.machine_details?.data && productDETAILS.blocked_details && (
  <MachineInfo machine={productDETAILS.machine_details.data} blocked_details={productDETAILS.blocked_details} />
)}
                 {productDETAILS.machine_details?.data?.product?.media && (
        <ProductImages media={productDETAILS.machine_details.data?.product?.media} />
      )}
            {/* <ProductImages/> */}
            <MachineProgress/>
                      {productDETAILS && (
        <MachineExtraData productDETAILS={productDETAILS} />
      )}
            <Benefits/>
            <Withdraw/>
            <Footer/>
            <CallToAction productDETAILS={productDETAILS}  onCallfun={onNavigateHandler}/>
        </>
    );
}
export default MachinePage3;