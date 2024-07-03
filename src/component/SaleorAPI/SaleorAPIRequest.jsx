import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { gql } from '@apollo/client';

const httpLink = createHttpLink({
    // uri:"https://devextension.origa.market/graphql/",
    uri:"https://dev.origa.market/graphql/",
    // uri: "https://devextension.origa.market/graphql/",
    //uri:"https://origatest.shop/graphql/"
  });
  
  
  export const SaleorAPI = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });


export const GetALLCategories = gql`
query GetALLCategories {
    level0Categories: categories(
      level: 0
      first: 10
      sortBy: {field: NAME, direction: ASC}
    ) {
      edges {
        node {
          id
          name
          metadata {
            key
            value
          }
        }
      }
    }
    level1Categories: categories(
      level: 1
      first: 10
      sortBy: {field: NAME, direction: ASC}
    ) {
      edges {
        node {
          id
          name
          metadata {
            key
            value
          }
        }
      }
    }
  }
`;
