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

const useWishListRemover = () => {
    const userId = localStorage.getItem('id');
    const [heartColor1, setHeartColor] = useState({ fill: "#fff", stroke: "#000" });


    const removewishlist = async (productid, imageurl, price, productName, productBrand, productCategory, productSubCategory, year, location) => {
        const { data } = await client.mutate({
            mutation: WISHLIST_ADD_UPDATE,
            variables: {
                "requestinput": {
                    "userid": userId,
                    "addProductids": [],
                    "names": ["My Wishlist"],
                    "quantity": 1,
                    "removeProductids": [productid],
                    "category": "MACHINE",
                    "productDetails": [{
                        "productid": productid,
                        "image": imageurl,
                        "price": price,
                        "product_name": productName,
                        "brand": productBrand,
                        "categories": productCategory,
                        "subcategories": productSubCategory
                        // "year":year,
                        // "location":location
                    }
                    ]
                }
            }

        })
        if (data.createOrUpdateWishlistItem.success) {

            console.log("Custom hook response==>>", data);
            setHeartColor(prev => ({
                ...prev,
                fill: "#73509E",
                stroke: "#73509E"
            }))
        }
    };
    return { removewishlist, heartColor1 };
};

export default useWishListRemover;
