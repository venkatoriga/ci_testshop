import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { gql } from '@apollo/client';


const httpLink = createHttpLink({
  // uri: "http://3.109.71.129:8001/graphql/",
  uri: "https://devextension.origa.market/graphql/",
  //uri:"https://origatest.shop/graphql/"
});

export const secondClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
  

export const CreateAmc = gql`
mutation CreateAmc($amcPlanData: AMCPlanInput!) {
  createAmc(amcPlanData: $amcPlanData) {
    message
    success
    paymenturl
    referenceid
  }
}
`;

export const ServiceArea = gql`
query ServiceArea($pincode: Int!) {
  nearestServicearea(userPincode: $pincode) {
    message
    code
  }
}
`;