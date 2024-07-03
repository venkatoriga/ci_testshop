import React, { useEffect } from "react";
import { ALGOLIA_ID, ALGOLIA_KEY, ALGOLIA_SELLER_INDEX } from '../../../../../constants'
import {
  RelatedProducts,
} from '@algolia/recommend-react';
import recommend from '@algolia/recommend';



const recommendClient = recommend(ALGOLIA_ID, ALGOLIA_KEY);
const indexName = ALGOLIA_SELLER_INDEX;


const SimilarProducts = ({setSimilarProductsItem }) => {
  const storedObjectID = localStorage.getItem('objectID');
  console.log('working........', storedObjectID);
  const currentObjectID = storedObjectID;
  function RelatedItem(item) {
    console.log('item--->', item?.items)
    setSimilarProductsItem(item?.items)
  

  }

  return (
    <>
      <RelatedProducts
        recommendClient={recommendClient}
        indexName={indexName}
        objectIDs={[currentObjectID]}
        view={RelatedItem}

      />
    </>
  );

}

export default SimilarProducts;