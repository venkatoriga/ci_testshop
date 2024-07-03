import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../SubComponent/Breadcrumbs';
import WishlistPage from '../HomePage/WishlistPage/WishlistPage';
import Slider7 from '../SubComponent/AllSlider/Slider7';
import RightArrow from '../SubComponent/RightArrow';
import ImageWithHP from '../SubComponent/ImageWithHP';
import WishListBlock from '../SubComponent/AllBlock/WishListBlock';

import AccountFooter from './AccountFooter';
import { gql } from '@apollo/client';
import client from '../Services/ServicesPopup/apolloclient';
import { useNavigate } from 'react-router-dom';
import WishlistRatingBlock from '../SubComponent/AllBlock/WishlistRatingBlock';
import Loader from '../SubComponent/Loader';
const GET_WISHLIST_DATA = gql`
query userWishlists($userid:String!) {
    userWishlists(userId: $userid) {
      message
      code
      response
    }
  }

`

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
    console.log("==>>", formatedPrice)
    if (formatedPrice[0] === ",") {
        formatedPrice = formatedPrice.slice(1, formatedPrice.length)
    }
    return formatedPrice;



};

const Wishlist = () => {
    const [wishlistData, setWishListData] = useState();
    const navigate = useNavigate();
    const productCategory = <WishListBlock />
    const isSmallScreen = window.innerWidth <= 576
    const breadcrumbsItems = [{ name: "Home Page", link: "/" }, { name: "My Account", link: "/myaccount" }];
    const boldtitle = "Wishlists";
    const breakpoints = {
        a: 2.8,
        b: 2.4,
        c: 2.1,
        d: 1.5,
        e: 1.1
    };
    //   let containerData=wishlistData

    //const containerData = []

    const userId = localStorage.getItem('id');
    useEffect(() => {
        const fetchWishListData = async () => {
            const { data } = await client.mutate({
                mutation: GET_WISHLIST_DATA,
                variables: {
                    "userid": userId
                }
            })
            if (data) {
                setWishListData(data.userWishlists.response)
            }
        }

        fetchWishListData();

    }, [userId])

    if (!wishlistData) {
        return <Loader />;
    }
    const Wishlisted_Machines = wishlistData.find((wishlist) => wishlist.category === "MACHINE")?.items;
    const Wishlisted_AMC = wishlistData.find((wishlist) => wishlist.category === "AMC")?.items;
    const Wishlisted_Store = wishlistData.find((wishlist) => wishlist.category === "INSTORE")?.items;
    //console.log("Wishlisted_Machines==>", Wishlisted_Machines);


    const Wishlisted_Machines_Data =
        (Wishlisted_Machines && Wishlisted_Machines?.length > 0) ? Wishlisted_Machines.map((productData) => {
            return {
                productid: productData.product_details.productid,
                imageurl: productData.product_details.image,
                title: productData.product_details.product_name,
                para: productData?.product_details?.brand,
                time: productData?.product_details?.year,
                location: productData?.product_details?.location,
                price: `₹${priceConvert(productData.product_details.price)}`,
                status: productData.status,
                quantity: productData.quantity,
                isWishlistBlock: true

            }
        }) : [];

    const containerData =
        (Wishlisted_AMC && Wishlisted_AMC?.length > 0) ? Wishlisted_AMC.map((productData) => {
            return {
                productid: productData.product_details.productid,
                imageurl: productData.product_details.image,
                title: productData.product_details.product_name,
                para: "",
                time: "",
                price: `₹${productData.product_details.price}`,
                status: productData.status,
                quantity: productData.quantity
            }
        }) : [];

    const Wishlisted_Machines_Store = (Wishlisted_Store && Wishlisted_Store?.length > 0) ?
        Wishlisted_Store.map((productData) => {
            return {
                productid: productData.product_details.productid,
                imageurl: productData.product_details.image,
                title: productData.product_details.product_name,
                para: "",
                time: "",
                price: `₹${productData.product_details.price}`,
                status: productData.status,
                quantity: productData.quantity
            }
        }) : [];
    console.log("Wishlisted_Machines_data===>>>", Wishlisted_Machines_Data);
    const WishlistedMachines = { heading: `Wishlisted Machines (${Wishlisted_Machines_Data.length})`, message: 'From Machines to tools to finance everything you need in one place', buttonName: "View All", navi: `${Wishlisted_Machines_Data.length > 0 ? "/wishlisted-machines" : "/buy/product-listing"}` }

    const WishlistedStore = { heading: `Wishlisted Products in Store(${Wishlisted_Machines_Store.length})`, message: 'From Machines to tools to finance everything you need in one place', buttonName: "View All", navi: `${Wishlisted_Machines_Store.length > 0 ? "/wishlist2" : "/buy/product-listing"}` }

    const storeBlock = <WishlistRatingBlock />
    return (
        <>

            <div className='max-container pt-3'>
                <Breadcrumbs items={breadcrumbsItems} boldtitle={boldtitle} backnavi={() => navigate('/myaccount')} />
            </div>
            <WishlistPage topsectionData={WishlistedMachines} sliderData={Wishlisted_Machines_Data} />
            <AccountFooter />
        </>
    )
}

export default Wishlist