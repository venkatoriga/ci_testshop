import { ApolloClient,InMemoryCache } from "@apollo/client";
const client=new ApolloClient({
    uri:"https://dev.origa.market/graphql/",
    cache: new InMemoryCache(),
})
export default client;