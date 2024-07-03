import { connectHits } from "react-instantsearch-dom";
import { heartIcon, botIcon } from "../../../../helpers/Icons";
import { useNavigate, } from "react-router-dom";
// import CustomPagination from "../CustomPagination";
import React, { useState, useEffect } from "react";
import useWishListAddOrUpdate from "../../../SubComponent/useWishListAddOrUpdate";
import CustomPagination from "../CustomPagination";

//----------------------------------------Showing Information Of the Product Based On Result Hits-------------------------------------------------------

const CustomHits = ({ setLoading, hits, Sorting }) => {
    setLoading(false)
    const navigate = useNavigate();
    const [filteredHitsToRender, setFilteredHitsToRender] = useState(hits);
    const { onWishlistHandler, heartColor } = useWishListAddOrUpdate();

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
    console.log('filteredHitsToRender---->', filteredHitsToRender);
    useEffect(() => {
        let sortedHits = [...hits];

        if (Sorting !== null) {
            sortedHits = [...hits].sort((a, b) => {
                if (Sorting === "Pricelow_High") {
                    return a["grossPrice"] - b["grossPrice"];
                } else if (Sorting === "PriceHigh_low") {
                    return b["grossPrice"] - a["grossPrice"];
                } else if (Sorting === "AlphabeticallyAtoZ") {
                    return a["productName"].localeCompare(b["productName"]);
                }
                return 0; // Default case
            });
        }

        setFilteredHitsToRender(sortedHits);
    }, [Sorting, hits]);

    const handleFavorite = (index, value) => {
        const updatedHits = [...filteredHitsToRender];
        updatedHits[index]["favorite"] = value;
        setFilteredHitsToRender(updatedHits);
    };

    const onSubmitHandler = (props) => {
        console.log("whish list working", props?.categories.lvl2?.split('>')[2].trim());
        const loggedin = !!localStorage.getItem('userToken');
        if (loggedin) {
            onWishlistHandler(props?.productId, props?.thumbnail, props?.grossPrice, props?.productName, props?.attributes?.Brands, props?.categories?.lvl1?.split('>')[1].trim(), props?.categories.lvl2?.split('>')[2].trim())
        }
    }

    const handleAvailService = (product) => {
        //SetQuationModel(true)
        if(product?.group_id){
            navigate(`/buy/sparetools?group_id=${product.group_id}`);
        }
        else{
            navigate(`/buy/sparetools?id=${product.objectID}`);
        }
    };

    return (
        <>
     
            {filteredHitsToRender?.length > 0 ? (
                <div className="product-wrap">
                    <div className="products">
                        {filteredHitsToRender?.map((product, index) => (
                            <div className="product" key={index} >
                                <div className="product-inner">
                                    <img className="product-img" src={product.thumbnail} alt={product.name} />
                                    <div className="content">
                                        <div className="name">
                                            {product?.productName?.length > 18
                                                ? `${product?.productName?.substring(0, 18)}...`
                                                : product?.productName}
                                        </div>
                                        <div className="location">
                                            {product?.brands}
                                        </div>
                                        <div className="price-wrap">
                                            <div className="time">{product?.Phase}</div>
                                            <div className="price">₹{product["grossPrice"]}</div>
                                            {/* <div className="categorie"> {product.categories['lvl0']}</div> */}
                                        </div>
                                        <button className={`heart ${product?.favorite ? "favorite" : ""}`} type="button" onClick={() => onSubmitHandler(product)}>{heartIcon({ width: 25, onClick: () => handleFavorite(index, !product.favorite) })}</button>
                                        <button className="purchase" key={index} onClick={() => handleAvailService(product)} type="button">View Product</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <CustomPagination />
                </div>
            ) : (
                <p>No product found.</p>
            )}

        </>
    );
};

export default connectHits(CustomHits);
