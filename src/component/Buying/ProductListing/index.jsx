import React, { useState, useEffect } from "react";
import "./ProductListing.css";
import LoginModel from '../../Authentication/LoginModel/LoginModel';
import Breadcrumbs from "../../SubComponent/Breadcrumbs";
import DeliveryLocation from "../Modals/DeliveryLocation";
import Footer from '../../Footer/Footer';
import { shortIcon, filterIcon} from "../../../helpers/Icons";
import { useNavigate, useLocation } from "react-router-dom";
import { ALGOLIA_ID, ALGOLIA_KEY, ALGOLIA_SELLER_INDEX, ALGOLIA_SPARE_INDEX } from '../../../constants'
import algoliasearch from "algoliasearch/lite";
import {
    InstantSearch,
    Configure,
    connectRange,
    connectStateResults
} from "react-instantsearch-dom";
import FilterSection from "./FilterSection";
import Loader from "../../SubComponent/Loader";
import CategoryPopup from "../../Account/Popup/CategoryPopup";
import CustomHits from "./CustomHits"
import SpareHits from "./SpareHits"
import { filterAttribute } from './FilterAttribute';
import Slider from '@mui/material/Slider';
import CustomerInfo from './CustomerInformation/CustomerInfoModel';

const client = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY);

const ProductListing = () => {
    const [loading, setLoading] = useState(true);
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY);
    const Seller_index = client.initIndex(ALGOLIA_SELLER_INDEX);
    const [filteredHits, setFilteredHits] = useState([]);
    const location = useLocation();
    const [isMobCategoryShow, setIsMobCategoryShow] = useState(window.innerWidth <= 767)
    const [activeTab, setActiveTab] = useState("machines");
    const [MainFilters, setMainFilters] = useState("");
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        industry: [],
        category: [],
        subcategory: [],
        brand: [],
        Model: [],
        Price: [],
        Year: [],
        Controller: [],
        XAXIS: [],
        YAXIS: [],
        ZAXIS: [],
        spindlespeed: [],
        spindletaper: [],
        tailstock: [],
        barcapacity: [],
        chucksize: [],
        maxturninglength: [],
        swingoverbed: [],
        swingovercrossslide: [],
        subSpindle: [],
        liveTooling: [],
        orderBy: "",
        page: 1,
    });
    const token = localStorage.getItem('userToken');
    const [IndustryCheckBoxValue, setIndustryCheckBoxValue] = useState([]);
    const [CategoryCheckBoxValue, setCategoryCheckBoxValue] = useState([]);
    const [showShortList, setShowShortList] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        industry: true, category: false, brand: false, model: false, Price: false, year: false, Controller: false,
        XAXIS: false, YAXIS: false, ZAXIS: false, spindlespeed: false, spindletaper: false, tailstock: false, barcapacity: false, chucksize: false, maxturninglength: false,
        swingoverbed: false, swingovercrossslide: false, subSpindle: false, liveTooling: false
    });
    const searchParams = new URLSearchParams(location.search);
    const searchInput = searchParams.get('searchInput');
    const [deliveryLocation, setDeliveryLocation] = useState("");
    const [Sorting, setSorting] = useState(null);
    const storedLocation = localStorage.getItem("deliveryLocation");
    if (storedLocation && !deliveryLocation) {
        setDeliveryLocation(storedLocation);
    }
    // const searchInput = location.state?.searchInput;
    // //console.log('searchInput------>',searchInput);
    // console.log(searchInput)
    const [seeMore, setSeeMore] = useState(false);
    const navigate = useNavigate();
    const breadcrumbsItems = [
        { name: "Buy Machines", link: "/buy" },
    ];

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { SparefilterConfigurations, filterConfigurations } = filterAttribute(IndustryCheckBoxValue, CategoryCheckBoxValue);

    const handleFilters = (name, value) => {
        setActiveFilters((prevState) => ({ ...prevState, [name]: value }));
    }


    const handleChangeSort = (sort) => {
        setSorting(sort)
        const selectedFilters = Object.assign({}, filters);
        selectedFilters.orderBy = sort;
        selectedFilters.page = 1;
        setFilters(selectedFilters);
        setShowShortList(false);
    }
    const handleSeeMore = (status) => {
        if (status) {
            setSeeMore(status);
            document.body.classList.add('no-overflow');
        } else {
            setSeeMore(false);
            document.body.classList.remove('no-overflow');
        }
    }

    const onGetPinCodeHandler = (pin) => {
        setDeliveryLocation(pin)
    }


    const toggleDropdown = () => {
        const dropdownElement = document.querySelector('.p-fixed');
        const dropdownElement1 = document.querySelector('.fixed-category-bottom');
        if (dropdownElement) {
            dropdownElement.classList.remove('dropdownHidden');
            dropdownElement1.classList.remove('dropdownHidden');
        }
    };

    const RangeSlider = ({ min, max, currentRefinement, refine }) => {
        const handleChange = (event, newValue) => {
            const currentYear = new Date().getFullYear();
            const minAllowedYear = currentYear - 25;
            // console.log('newValue---->',newValue);
            if (minAllowedYear === newValue[0]) {
                refine({ min: 1900, max: newValue[1] });
            }
            else {
                refine({ min: newValue[0], max: newValue[1] });
            }
        };
        const [minYear, setMinYear] = useState(1940); // Default min year

        useEffect(() => {
            const currentYear = new Date().getFullYear();
            const minAllowedYear = currentYear - 25;
            setMinYear(minAllowedYear);
        }, []);
        const defaultValue = [currentRefinement.min || min, currentRefinement.max || max];
        return (
            <div>
                <Slider
                    min={minYear}
                    max={max}
                    //step={1000}
                    value={defaultValue}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    color="secondary"
                    aria-labelledby="range-slider"
                    getAriaValueText={(value) => `$${value}`}
                />
            </div>
        );
    };

    const CustomRangeInput = connectRange(RangeSlider);

    return (
        <>
            {loading && <Loader />}
            {seeMore && (
                <DeliveryLocation modalAction={handleSeeMore} pinvalue={onGetPinCodeHandler} />
            )}
            <div className="container-fluid col-cust">
                <div className="max-container my-5">
                    {activeTab == "machines" && (
                        <>
                            <InstantSearch searchClient={client} indexName={ALGOLIA_SELLER_INDEX} insights={true}>
                                <Configure
                                    maxValuesPerFacet={50}
                                    query={searchInput}
                                    filters={MainFilters}
                                    facetFilters={[`categories.lvl0:${searchInput === 'MSME' || searchInput === 'HealthCare' ? searchInput : ''}`]}
                                    hitsPerPage={12}
                                />
                                {isMobCategoryShow &&
                                    <CategoryPopup filterConfigurations={filterConfigurations}
                                        activeFilters={activeFilters}
                                        setIndustryCheckBoxValue={setIndustryCheckBoxValue}
                                        CategoryCheckBoxValue={CategoryCheckBoxValue}
                                        setCategoryCheckBoxValue={setCategoryCheckBoxValue}
                                        MainFilters={MainFilters}
                                        setMainFilters={setMainFilters}

                                    />}
                                <Breadcrumbs backnavi={() => navigate('/buy')} boldtitle={"Machine Listing"} items={breadcrumbsItems} />
                                <div className="tab-wrap">
                                    <button onClick={() => setActiveTab("machines")} className={activeTab === "machines" ? "active btn" : "btn"} type="button">Machines</button>
                                    <button onClick={() => setActiveTab("store")} className={activeTab === "store" ? "active btn" : "btn"} type="button">Store</button>
                                </div>

                                <div className="head-wrap">
                                    <div className="heading-wrap">
                                        <div className="sub-heading heading-400-16">Search Result for</div>
                                        <div className="heading heading-600-20">{searchInput}</div>
                                    </div>
                                    <div className="btn-wrap">
                                        <button onClick={() => { setShowShortList(false); handleSeeMore(true) }} className="btn location">{deliveryLocation ? `Delivery Location : ${deliveryLocation}` : 'Set Delivery Location'} </button>
                                        {isMobCategoryShow && <div className="short-wrap">
                                            <button className="btn short-btn" onClick={toggleDropdown}>{filterIcon({ width: 22, height: 22, fill: "#73509E" })}</button>
                                        </div>}
                                        <div className="short-wrap">
                                            <button className="btn short-btn" onClick={() => setShowShortList(!showShortList)}>
                                                {shortIcon({ width: 22, height: 22 })}
                                                <span>{filters.orderBy ? filters.orderBy : "Sort Result"}</span>
                                            </button>
                                            {showShortList && (
                                                <div className="shorts">
                                                    <span className="item" onClick={() => handleChangeSort("Sort Alphabetically (A - Z)")}>Sort Alphabetically (A - Z)</span>
                                                    <span className="item" onClick={() => handleChangeSort("Sort by Price (Highest to Lowest)")}>Sort by Price (Highest to Lowest)</span>
                                                    <span className="item" onClick={() => handleChangeSort("Sort by Price (Lowest to Highest)")}>Sort by Price (Lowest to Highest)</span>
                                                    {/* <span className="item" onClick={() => handleChangeSort("Location (Nearest to Furthest)")}>Sort by Location (Nearest to Furthest)</span>
                                                <span className="item" onClick={() => handleChangeSort("Location (Furthest to Nearest)")}>Sort by Location (Furthest to Nearest)</span> */}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className='row layout-wrap'>
                                    <div className='col col-lg-3 col-md-3 col-12'>
                                        <div className="filter-wrap">
                                            <div className="head">
                                                <div className="heading heading-600-20">
                                                    {filterIcon({ width: 18, height: 12 })}
                                                    Filters
                                                </div>
                                                <div id='ResetBtn' className='heading-600-14 curser-pointer'>Reset</div>
                                            </div>

                                            {filterConfigurations.map((config, index) => {
                                                if (config.filterType === 'Year') {
                                                    return (
                                                        <div key={config.filterType}>
                                                            <span className="heading-600-16">{config.title}</span>
                                                            <CustomRangeInput attribute={config.attribute} />
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <FilterSection
                                                            key={config.filterType}
                                                            title={config.title}
                                                            attribute={config.attribute}
                                                            filterType={config.filterType}
                                                            activeFilters={activeFilters}
                                                            setIndustryCheckBoxValue={setIndustryCheckBoxValue}
                                                            CategoryCheckBoxValue={CategoryCheckBoxValue}
                                                            setCategoryCheckBoxValue={setCategoryCheckBoxValue}
                                                            handleFilters={handleFilters}
                                                            MainFilters={MainFilters}
                                                            setMainFilters={setMainFilters}
                                                        />
                                                    );
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <NoResultsFound />
                                    <div className='col col-lg-9 col-md-9 col-12'>
                                        <CustomHits setLoading={setLoading} loading={loading} Sorting={Sorting} query={searchInput} />
                                    </div>


                                </div>
                            </InstantSearch>
                        </>
                    )}
                    {activeTab == "store" &&
                        <>
                            <InstantSearch searchClient={client} indexName={ALGOLIA_SPARE_INDEX} insights={true}>

                                <Configure
                                    maxValuesPerFacet={50}
                                    query={''}
                                    filters={MainFilters}
                                    hitsPerPage={12}
                                />
                                <Breadcrumbs backnavi={() => navigate('/buy')} boldtitle={"Machine Listing"} items={breadcrumbsItems} />
                                <div className="tab-wrap">
                                    <button onClick={() => setActiveTab("machines")} className={activeTab === "machines" ? "active btn" : "btn"} type="button">Machines</button>
                                    <button onClick={() => setActiveTab("store")} className={activeTab === "store" ? "active btn" : "btn"} type="button">Store</button>
                                </div>

                                <div className="head-wrap">
                                    <div className="heading-wrap">
                                        {/* <div className="sub-heading heading-400-16">Search Result for</div>
                                        <div className="heading heading-600-20">{searchInput}</div> */}
                                    </div>
                                    <div className="btn-wrap">

                                    </div>
                                </div>

                                <div className='row layout-wrap'>
                                    <div className='col col-lg-3 col-md-3 col-12'>
                                        <div className="filter-wrap">
                                            <div className="head">
                                                <div className="heading heading-600-20">
                                                    {filterIcon({ width: 18, height: 12 })}
                                                    Filters
                                                </div>
                                            </div>
                                            {SparefilterConfigurations?.map((config, index) => (
                                                <FilterSection
                                                    key={config.filterType}
                                                    title={config.title}
                                                    attribute={config.attribute}
                                                    filterType={config.filterType}
                                                    activeFilters={activeFilters}
                                                    setIndustryCheckBoxValue={setIndustryCheckBoxValue}
                                                    CategoryCheckBoxValue={CategoryCheckBoxValue}
                                                    setCategoryCheckBoxValue={setCategoryCheckBoxValue}
                                                    handleFilters={handleFilters}
                                                />
                                            ))}
                                
                                        </div>
                                    </div>
                                    <div className='col col-lg-9 col-md-9 col-12'>
                                        <SpareHits setLoading={setLoading} Sorting={Sorting} hitComponent={filteredHits} query={searchInput} />
                                    </div>
                                </div>
                            </InstantSearch>
                        </>
                    }
                </div>
            </div>
            <Footer />
        </>
    );
}
export default ProductListing;


const NoResultsFound = connectStateResults(({ searchResults }) => {
    const [CustomerInfoForm, setCustomerInfoForm] = useState(false);
    useEffect(() => {
        if (searchResults && searchResults.nbHits === 0) {
            setCustomerInfoForm(true);
        } else {
            setCustomerInfoForm(false);
        }
    }, [searchResults]);
    if (CustomerInfoForm) {
        return (
            <div className='col col-lg-9 col-md-9 col-12'>
                <CustomerInfo setCustomerInfoForm={setCustomerInfoForm} />
                <p>No product found.</p>
            </div>
        );
    }
    return null;
});