import { useState } from 'react';

const useAddAddress = (boldtitle) => {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
  
    const createCustomerAddress = async (requestData) => {
      var Endpoint;
      if(boldtitle === "Edit Address"){
        Endpoint = 'updatecustomeraddress'
      } else {
        Endpoint = 'createcustomeraddress'
      }

      const apiUrl = `https://devextension.origa.market/api/${Endpoint}`;
  
      try {
        setLoading(true);
  
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
  
        const data = await response.json();
        setResponse(JSON.stringify(data, null, 2));
        setError('');
      } catch (error) {
        console.error('Error:', error);
        setError('Error occurred. Check console for details.');
      } finally {
        setLoading(false);
      }
    };
  
    return { createCustomerAddress, response, loading, error };
  };

export default useAddAddress;
