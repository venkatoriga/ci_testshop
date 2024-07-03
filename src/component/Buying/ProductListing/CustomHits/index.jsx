import { connectHits } from "react-instantsearch-dom";
import { heartIcon, botIcon } from "../../../../helpers/Icons";
import { useNavigate, } from "react-router-dom";
// import CustomPagination from "../CustomPagination";
import React, { useState, useEffect } from "react";
import useWishListAddOrUpdate from "../../../SubComponent/useWishListAddOrUpdate";
import useWishListRemover from "../../../SubComponent/useWishListRemover";
import CustomPagination from "../CustomPagination";
import LoginModel from '../../../Authentication/LoginModel/LoginModel';
import { gql } from '@apollo/client';
import client from '../../../Services/ServicesPopup/apolloclient';
import CustomerInfo from '../CustomerInformation/CustomerInfoModel';
//----------------------------------------Showing Information Of the Product Based On Result Hits-------------------------------------------------------

const GET_WISHLIST_DATA = gql`
query userWishlists($userid:String!) {
    userWishlists(userId: $userid) {
      message
      code
      response
    }
  }
  
`

const CustomHits = ({ setLoading, loading, hits, Sorting }) => {

    const navigate = useNavigate();
    const [filteredHitsToRender, setFilteredHitsToRender] = useState(hits);
    const [loginPortal, setLoginPortal] = useState(false);
    const [WishListData, setWishListData] = useState([]);
    const { onWishlistHandler, heartColor } = useWishListAddOrUpdate();
    const { removewishlist, heartColor1 } = useWishListRemover();
    const [CustomerInfoForm, setCustomerInfoForm] = useState(false);
    const userId = localStorage.getItem('id');
    //console.log('WishListData---->',WishListData);
    useEffect(() => {
        const fetchWishListData = async () => {
            try {
                const { data } = await client.mutate({
                    mutation: GET_WISHLIST_DATA,
                    variables: {
                        "userid": userId
                    }
                });
                if (data) {
                    const wishlistItems = data.userWishlists.response[0]?.items;
                    //console.log('wishlistdata---->', wishlistItems);
                    if (wishlistItems) {
                        const productIds = wishlistItems.map(item => item.product_id);
                        setWishListData(productIds);

                    }
                }
            } catch (error) {
                console.error('Error fetching wishlist data:', error);
            }
        };

        fetchWishListData();
    }, [userId]);

    const findYearDifference = (targetYear) => {
        const currentYear = new Date().getFullYear();
        const yearDifference = currentYear - targetYear;
        return yearDifference;
    }
    const priceConvert = (price) => {
        price = typeof price === 'string' ? price : String(price);


        let count = 1;
        let comma = 3;
        let formatedPrice = ""
        for (let i = price.length - 1; i >= 0; i--) {
            formatedPrice = price[i] + formatedPrice
            if (count === comma) {
                formatedPrice = "," + formatedPrice
                comma = 2;
                count = 0;
            } count++;

        }
        //console.log("==>>", formatedPrice)
        if (formatedPrice[0] === ",") {
            formatedPrice = formatedPrice.slice(1, formatedPrice.length)
        }
        return formatedPrice;



    };
    //console.log('filteredHitsToRender---->', filteredHitsToRender);
    useEffect(() => {
        if (hits.length > 0) {
            let sortedHits = [...hits];

            if (Sorting !== null) {
                sortedHits = [...hits].sort((a, b) => {
                    if (Sorting === "Sort by Price (Lowest to Highest)") {
                        setLoading(false)
                        return a["grossPrice"] - b["grossPrice"];
                    } else if (Sorting === "Sort by Price (Highest to Lowest)") {
                        setLoading(false)
                        return b["grossPrice"] - a["grossPrice"];
                    } else if (Sorting === "Sort Alphabetically (A - Z)") {
                        setLoading(false)
                        return a["productName"].localeCompare(b["productName"]);
                    }
                    setLoading(false)
                    return 0; // Default case
                })
            }
            setFilteredHitsToRender(sortedHits);
            setLoading(false)
            if (filteredHitsToRender.length === 0) {
                setCustomerInfoForm(true)
            }

        }
        else {
            setLoading(false)
            // if (filteredHitsToRender.length === 0) {
            //     setCustomerInfoForm(true)
            // }
        }

    }, [Sorting, hits, loading]);

    const handleFavorite = (index, value) => {
        const updatedHits = [...filteredHitsToRender];
        updatedHits[index]["favorite"] = value;
        setFilteredHitsToRender(updatedHits);
    };

    const onSubmitHandler = (props, wishlisted, index) => {
        if (wishlisted === true || props?.favorite === false) {
            const heartButtons = document.querySelectorAll('.heart');
            if (heartButtons && heartButtons.length > index) {
                const button = heartButtons[index];
                if (button && button.classList.contains('favorite')) {
                    button.classList.remove('favorite');
                }
            }
            removewishlist(props?.productId, props?.thumbnail, props?.grossPrice, props?.productName, props?.attributes?.Brands, props?.categories?.lvl1?.split('>')[1].trim(), props?.categories.lvl2?.split('>')[2].trim())
        }
        else {
            const loggedin = !!localStorage.getItem('userToken');
            if (loggedin) {
                onWishlistHandler(props?.productId, props?.thumbnail, props?.grossPrice, props?.productName, props?.attributes?.Brands, props?.categories?.lvl1?.split('>')[1].trim(), props?.categories.lvl2?.split('>')[2].trim())
            }
            else {
                localStorage.setItem('wishlistPayload', JSON.stringify({
                    productId: props?.productId,
                    thumbnail: props?.thumbnail,
                    productName: props?.productName,
                    pricing: props?.grossPrice,
                    Brands: props?.Brands,
                    category: props?.categories?.lvl1?.split('>')[1].trim(),
                    subcategory: props?.categories.lvl2?.split('>')[2].trim()
                }));

                setLoginPortal(true);
            }

        }

    }

    const handleAvailService = (product) => {
        const UserId = localStorage.getItem('id');
        //console.log('UserId---->', UserId);
        if (UserId === null) {
            const existingProducts = JSON.parse(localStorage.getItem("SelectedProducts")) || [];
            const isProductInList = existingProducts.some((existingProduct) => existingProduct.productId === product.productId);

            if (!isProductInList) {
                existingProducts.push(product);
                localStorage.setItem("SelectedProducts", JSON.stringify(existingProducts));
            }
        } else if (UserId !== null) {
            const existingProducts = JSON.parse(localStorage.getItem("SelectedProductsWithUser")) || [];
            const isProductInList = existingProducts.some((existingProduct) => existingProduct.productId === product.productId);

            const productWithUserId = { ...product, userId: UserId };

            if (!isProductInList) {
                existingProducts.push(productWithUserId);
                localStorage.setItem("SelectedProductsWithUser", JSON.stringify(existingProducts));
            }
        }



        localStorage.setItem("objectID", product.objectID);
        // Navigate to the service page
        navigate(`/buy/cnc-machine?slug=${product.slug}&id=${product.productId}`);
    };

    const onHidePortal = () => {
        //setPricebtn(!!localStorage.getItem('id'))
        setLoginPortal(false);
        window.location.reload();
    }
    return (
        <>
            {loginPortal && <LoginModel onHide={onHidePortal} />}

            {filteredHitsToRender.length > 0 && (
                <div className="product-wrap">
                    <div className="products">
                        {filteredHitsToRender.map((product, index) => (
                            <div className="product" key={index} >
                                <div className="product-inner">
                                    <img className="product-img" src={product.thumbnail} alt={product.name} />
                                    <div className="content">
                                        <div className="name">
                                            {product.productName.length > 18
                                                ? `${product.productName.substring(0, 18)}...`
                                                : product.productName}
                                        </div>
                                        {product.attributes && (product.attributes["Brands"] || product.attributes["Machine Location"]) && (
                                            <div className="location">
                                                {product.attributes["Brands"]} | {product.attributes["Machine Location"]}
                                            </div>
                                        )}
                                        <div className="price-wrap">
                                            <div className="time">{product.mfgYear === 1900 ? "N/A" : `${findYearDifference(product.mfgYear)} Year Old`}</div>
                                            <div className="price">₹{priceConvert(product.grossPrice)}</div>
                                            {/* <div className="categorie"> {product.categories['lvl0']}</div> */}
                                        </div>
                                        <button
                                            className={`heart ${WishListData.includes(product.productId) || product.favorite ? "favorite" : ""}`}
                                            type="button"
                                            onClick={() => onSubmitHandler(product, WishListData.includes(product.productId), index)}
                                        >
                                            {heartIcon({ width: 25, onClick: () => handleFavorite(index, !product.favorite) })}
                                        </button>
                                        {/* <button className={`heart ${product.favorite ? "favorite" : ""}`} type="button" onClick={() => onSubmitHandler(product,WishListData.includes(product.productId))}>{heartIcon({ width: 25, onClick: () => handleFavorite(index, !product.favorite) })}</button> */}
                                        <button className="purchase" key={index} onClick={() => handleAvailService(product)} type="button">Buy Machine</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <CustomPagination />
                </div>
            )}
        </>
    );
};

export default connectHits(CustomHits);
