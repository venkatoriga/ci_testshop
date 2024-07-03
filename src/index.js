import React from 'react';
import ReactDOM from 'react-dom/client';
import "@fontsource/poppins";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {ApolloClient,InMemoryCache,ApolloProvider,gql} from '@apollo/client';
import {Provider} from 'react-redux';
import Store from './Store/Store';
const client = new ApolloClient({uri: 'https://flyby-router-demo.herokuapp.com/',cache: new InMemoryCache()});
// const client = ...    https://flyby-router-demo.herokuapp.com/
client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log("index js==>>",result));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
  <Provider store={Store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
