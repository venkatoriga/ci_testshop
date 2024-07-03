// import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { useState } from 'react';
import client from '../Services/ServicesPopup/apolloclient';

const WISHLIST_ADD_UPDATE = gql`
  mutation ($requestinput: CreateUpdateWishListItemInput!) {
    createOrUpdateWishlistItem(requestinput: $requestinput) {
      message
      success
    }
  }
`;

const useWishListAddOrUpdate = () => {
  const userId = localStorage.getItem('id');
  const [heartColor, setHeartColor] = useState({fill:"#fff",stroke:"#000"});

//   const [wishlistMutation] = useMutation(WISHLIST_ADD_UPDATE, {
//     onCompleted: (data) => {
//       if (data.createOrUpdateWishlistItem.success) {
//         setHeartColor((prev) => ({
//           ...prev,
//           fill: '#73509E',
//           stroke: '#73509E',
//         }));
//       }
//     },
//   });

  const onWishlistHandler = async (productid, imageurl, price,productName,productBrand,productCategory,productSubCategory,year,location) => {
    const {data}=await client.mutate({
        mutation:WISHLIST_ADD_UPDATE,
        variables:{
            "requestinput": {
                "userid":  userId,
                "addProductids": [productid],
                "names": ["My Wishlist"],
                "quantity": 1,
                "removeProductids": [],
                "category": "AMC",
                "productDetails": [{
                        "productid": productid,
                        "image":imageurl,
                        "price":price,
                        "product_name":productName,
                        "brand":productBrand,
                        "categories":productCategory,
                        "subcategories":productSubCategory
                        // "year":year,
                        // "location":location
                    }
                ]
            }
            }
            
    })
    if(data.createOrUpdateWishlistItem.success){

        console.log("Custom hook response==>>",data);
        setHeartColor(prev=>({
    ...prev,
fill:"#73509E",
stroke:"#73509E"
     } ) )
    }
  };
  return { onWishlistHandler, heartColor };
};

export default useWishListAddOrUpdate;
