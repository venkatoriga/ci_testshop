import React, { useState, useEffect } from "react";
import "./ProductListing.css";
import LoginModel from '../../Authentication/LoginModel/LoginModel';
// import LoginModal from "../Modals/import LoginModal from "./Modals/LoginModal";";
// import Breadcrumbs from "../Breadcrumbs";
import Breadcrumbs from "../../SubComponent/Breadcrumbs";
import DeliveryLocation from "../Modals/DeliveryLocation";
import Footer from '../../Footer/Footer';
import { shortIcon, heartIcon, leftArrowIcon, rightArrowIcon, filterIcon, filterArrowIcon, botIcon } from "../../../helpers/Icons";
import { useNavigate, useLocation } from "react-router-dom";
import { ALGOLIA_ID, ALGOLIA_KEY, ALGOLIA_SELLER_INDEX, ALGOLIA_BUYER_INDEX } from '../../../constants'
import algoliasearch from "algoliasearch/lite";
import {
    InstantSearch,
    Configure,
    connectRange,
    RangeInput,
    connectHits,
    connectStateResults,
    connectRefinementList,
    connectPagination,
    connectToggleRefinement,
    createConnector
} from "react-instantsearch-dom";
import FilterSection from "./FilterSection";
import useWishListAddOrUpdate from "../../SubComponent/useWishListAddOrUpdate";
import Loader from "../../SubComponent/Loader";
import CategoryPopup from "../../Account/Popup/CategoryPopup";

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

const findYearDifference = (targetYear) => {
    const currentYear = new Date().getFullYear();
    const yearDifference = currentYear - targetYear;
    return yearDifference;
}

const ProductListing = () => {

    const [facetCounts, setFacetCounts] = useState({});
    const [isMobCategory, setIsMobCategory] = useState(false)
    const [loading, setLoading] = useState(true);
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY);
    const Seller_index = client.initIndex(ALGOLIA_SELLER_INDEX);
    const [filteredHits, setFilteredHits] = useState([]);
    const location = useLocation();
    const [isMobCategoryShow, setIsMobCategoryShow] = useState(window.innerWidth <= 767)
    const [activeTab, setActiveTab] = useState("machines");
    const [products, setProducts] = useState([]);
    const [pagiDisable, setPagiDisable] = useState(false);
    const { onWishlistHandler, heartColor } = useWishListAddOrUpdate();
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
    const [showModel, setShowModel] = useState(false);
    //const [filters, setFilters] = useState({ category: [], brand: [], orderBy: "", page: 1 });
    const [FacetCount, setFacetCount] = useState([]);
    const [Industry, setIndustry] = useState([]);
    console.log('Industry', Industry);
    const [categories, setCategories] = useState([]);
    const [Subcategories, setsubCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [Model, setModel] = useState([]);
    const [Price, setPrice] = useState([]);
    const [Year, setYear] = useState([]);
    const [Controller, setController] = useState([]);
    const [XAXIS, setXAXIS] = useState([]);
    const [YAXIS, setYAXIS] = useState([]);
    const [ZAXIS, setZAXIS] = useState([]);
    const [spindlespeed, setspindlespeed] = useState([]);
    const [spindletaper, setspindletaper] = useState([]);
    const [tailstock, settailstock] = useState([]);
    const [barcapacity, setbarcapacity] = useState([]);
    const [chucksize, setchucksize] = useState([]);
    const [maxturninglength, setmaxturninglength] = useState([]);
    const [swingoverbed, setswingoverbed] = useState([]);
    const [swingovercrossslide, setswingovercrossslide] = useState([]);
    const [subSpindle, setsubSpindle] = useState([]);
    const [liveTooling, setliveTooling] = useState([]);
    const [showShortList, setShowShortList] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        industry: true, category: false, brand: false, model: false, price: false, year: false, Controller: false,
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

    // pagination login start
    console.log("product==<<<>>>>===", products);
    const ITEMS_PER_PAGE = 12;
    const BUTTONS_VISIBLE = 7;

    const [pagiCount, setPagiCount] = useState(1);

    console.log("active page==>>", pagiCount);

    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

    const onPrevHandler = () => {
        if (pagiCount > 1) {
            setPagiCount(pagiCount - 1);
        }
    };

    const onNextHandler = () => {

        if (pagiCount < totalPages && pagiCount * 12 < products.length) {
            console.log("pagiCount next button===>>>", pagiCount);
            setPagiCount(pagiCount + 1);
        }
    };
    const renderPageButtons = () => {
        const buttons = [];
        const middleButton = Math.ceil(BUTTONS_VISIBLE / 1);
        const startButton = Math.max(1, pagiCount - middleButton + 1);
        const endButton = Math.min(startButton + BUTTONS_VISIBLE - 1, totalPages);
        for (let i = startButton; i <= endButton; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`pagination-btn ${pagiCount === i ? 'active' : ''}`}
                    onClick={() => setPagiCount(i)}
                    disabled={i * 12 < products.length ? false : true}
                >
                    {i}
                </button>
            );
        }
        if (!token && !showModel) {
            setShowModel(true)
        }
        return buttons;
    };


    // pagination logic end


    const filterConfigurations = [
        { title: "Industry", filterType: "industry", items: Industry },
        { title: "Category", filterType: "category", items: categories },
        { title: "Brands", filterType: "brand", items: brands },
        { title: "Model", filterType: "Model", items: Model },
        { title: "Price", filterType: "Price", items: Price },
        { title: "Year", filterType: "Year", items: Year },
    ];

    if (filters.category.some(category => category.includes("HealthCare >"))) {
        filterConfigurations.splice(2, 0, {
            title: "SUB CATEGORY",
            filterType: "subcategory",
            items: Subcategories
        });
    }
    // This Logic is Incorrect We need to make the user to check any one option for Category Filter 
    if (filters.category.includes("MSME > CNC VMC")) {
        filterConfigurations.push(
            { title: "Controller", filterType: "Controller", items: Controller },
            { title: "X AXIS (mm)", filterType: "XAXIS", items: XAXIS },
            { title: "Y AXIS (mm)", filterType: "YAXIS", items: YAXIS },
            { title: "Z AXIS (mm)", filterType: "ZAXIS", items: ZAXIS },
            { title: "Max Spindle Speed (RPM)", filterType: "spindlespeed", items: spindlespeed },
            { title: "Spindle Taper", filterType: "spindletaper", items: spindletaper },
        );
    }
    if (filters.category.includes("MSME > CNC Turning Centre")) {
        filterConfigurations.push(
            { title: "Controller", filterType: "Controller", items: Controller },
            { title: "Tailstock", filterType: "tailstock", items: tailstock },
        );
    }
    if (filters.category.includes("MSME > CNC Lathe")) {
        filterConfigurations.push(
            { title: "Controller", filterType: "Controller", items: Controller },
            { title: "Bar Capacity", filterType: "barcapacity", items: barcapacity },
            { title: "Chuck Size", filterType: "chucksize", items: chucksize },
            { title: "Max Turning Length", filterType: "maxturninglength", items: maxturninglength },
            { title: "Swing Over Bed", filterType: "swingoverbed", items: swingoverbed },
            { title: "Swing Over Cross-Slide", filterType: "swingovercrossslide", items: swingovercrossslide },
            { title: "Sub Spindle", filterType: "subSpindle", items: subSpindle },
            { title: "Live Tooling", filterType: "liveTooling", items: liveTooling },
            { title: "Tailstock", filterType: "tailstock", items: tailstock },
        );
    }

    useEffect(() => {

        if (location?.state?.redirectPage) {
            setActiveTab("store")
        }
        const industryfacet = filters.industry
        const categoryfacet = filters.category
        const Subcategoryfacet = filters.subcategory
        const Brandsfacet = filters.brand
        const Modelfacet = filters.Model
        const Pricefacet = filters.Price
        const Yearfacet = filters.Year
        const Controllerfacet = filters.Controller
        const XAXISfacet = filters.XAXIS
        const YAXISfacet = filters.YAXIS
        const ZAXISfacet = filters.ZAXIS

        const IndustryFacetFilter = industryfacet.map(industry => `categories.lvl0:${industry}`);
        const categoryFacetFilter = categoryfacet.map(category => `categories.lvl1:${category}`);
        const SubcategoryFacetFilter = Subcategoryfacet.map(subcategory => `categories.lvl2:${subcategory}`);
        const BrandsFacetFilter = Brandsfacet.map(Brands => `attributes.Brands:${Brands}`);
        const ModelFacetFilter = Modelfacet.map(Model => `attributes.Model:${Model}`);
        const PriceFacetFilter = Pricefacet.map(Price => `grossPrice>=${Price}`);
        const YearFacetFilter = Yearfacet.map(Year => `mfgYear>=${Year}`);
        const ControllerFilter = Controllerfacet.map(Controller => `attributes.Controller:${Controller}`);
        const XAXISfacetFilter = XAXISfacet.map(XAXIS => `xAxis>=${XAXIS}`);
        const YAXISFacetFilter = YAXISfacet.map(YAXIS => `yAxis>=${YAXIS}`);
        const ZAXISFacetFilter = ZAXISfacet.map(ZAXIS => `zAxis>=${ZAXIS}`);
        const MainFilters = "_tags:Seller AND _tags:Active"
        let facetFilters = [IndustryFacetFilter];

        let numericFilterAttributte = [];
        if (categoryFacetFilter.length > 0) {
            facetFilters.push(categoryFacetFilter);
        }
        if (BrandsFacetFilter.length > 0) {
            facetFilters.push(BrandsFacetFilter);
        }
        if (SubcategoryFacetFilter.length > 0) {
            facetFilters.push(SubcategoryFacetFilter);
        }
        if (ModelFacetFilter.length > 0) {
            facetFilters.push(ModelFacetFilter);
        }
        if (ControllerFilter.length > 0) {
            facetFilters.push(ControllerFilter);
        }

        // Numeric Filters
        if (YearFacetFilter.length > 0) {
            numericFilterAttributte.push(...YearFacetFilter);
        }
        if (PriceFacetFilter.length > 0) {
            numericFilterAttributte.push(...PriceFacetFilter);
        }
        if (XAXISfacetFilter.length > 0) {
            numericFilterAttributte.push(...XAXISfacetFilter);
        }
        if (YAXISFacetFilter.length > 0) {
            numericFilterAttributte.push(...YAXISFacetFilter);
        }
        if (ZAXISFacetFilter.length > 0) {
            numericFilterAttributte.push(...ZAXISFacetFilter);
        }

        if (!searchInput) {
            Seller_index.search("", {
                filters: MainFilters,
                facetFilters: facetFilters,
                clickAnalytics: true,
                numericFilters: numericFilterAttributte,
                facets: ['*'],
            }).then(({ hits: filteredHits, queryID, facets }) => {
                setFacetCount(facets)
                if (Sorting !== null) {
                    const sortedHits = [...filteredHits].sort((a, b) => {
                        if (Sorting === "Price (Lowest to Highest)") {
                            return a["grossPrice"] - b["grossPrice"];
                        } else if (Sorting === "Price (Highest to Lowest)") {
                            return b["grossPrice"] - a["grossPrice"];
                        } else if (Sorting === "Alphabetically (A - Z)") {
                            //return b["productName"] - a["productName"];
                            return a["productName"].localeCompare(b["productName"]);
                        }
                    });
                    //console.log('sortedHits=========>',sortedHits);
                    setFilteredHits(sortedHits);
                    setPagiCount(1)
                    setLoading(false)
                }
                else {
                    setFilteredHits(filteredHits);
                    setPagiCount(1)
                    setLoading(false)
                }
            });
        }
        if (searchInput) {
            Seller_index.search("", {
                query: searchInput,
                clickAnalytics: true,
                filters: MainFilters,
                facetFilters: facetFilters,
                numericFilters: numericFilterAttributte,
                facets: ['*'],
            }).then(({ hits: filteredHits, queryID, facets }) => {
                setFacetCount(facets)
                if (Sorting !== null) {
                    const sortedHits = [...filteredHits].sort((a, b) => {
                        if (Sorting === "Price (Lowest to Highest)") {
                            return a["grossPrice"] - b["grossPrice"];
                        } else if (Sorting === "Price (Highest to Lowest)") {
                            return b["grossPrice"] - a["grossPrice"];
                        } else if (Sorting === "Alphabetically (A - Z)") {
                            return a["productName"].localeCompare(b["productName"]);
                        }
                    });
                    //console.log('sortedHits=========>',sortedHits);
                    setFilteredHits(sortedHits);
                    setPagiCount(1)
                    setLoading(false)
                }
                else {
                    setFilteredHits(filteredHits);
                    setPagiCount(1)
                    setLoading(false)
                }

            });
        }

    }, [searchInput, filters, Sorting, activeTab]);
    //console.log('filters---->', filters);
    //console.log('filteredHits------->', filteredHits);

    useEffect(() => {
        window.scrollTo(0, 0);
        getProducts();
        getAllFiltersAttribute()

    }, [filteredHits, searchInput, Sorting, activeTab]);


    const getAllFiltersAttribute = () => {
        // console.log('facets======>**********___())(())(()', facets);
        const IndustryFacets = FacetCount['categories.lvl0'];
        const categoryFacets = FacetCount['categories.lvl1'];
        const SubcategoryFacets = FacetCount['categories.lvl2'];
        const BrandsFacets = FacetCount['attributes.Brands'];
        const ModelFacets = FacetCount['attributes.Model'];
        const grossPriceFacets = FacetCount['grossPrice'];
        const mfgYearFacets = FacetCount['mfgYear'];
        const ControllerFacets = FacetCount['attributes.Controller'];
        const xAxisFacets = FacetCount['xAxis'];
        const yAxisFacets = FacetCount['yAxis'];
        const zAxisFacets = FacetCount['zAxis'];
        const spindlespeedFacets = FacetCount['spindlespeed'];
        const spindletaperFacets = FacetCount['spindletaper'];
        const tailstockFacets = FacetCount['tailstock'];
        const barcapacityFacets = FacetCount['barcapacity'];
        const chucksizeFacets = FacetCount['chucksize'];
        const maxturninglengthFacets = FacetCount['maxturninglength'];
        const swingoverbedFacets = FacetCount['swingoverbed'];
        const swingovercrossslideFacets = FacetCount['swingovercrossslide'];
        const subSpindleFacets = FacetCount['subSpindle'];
        const liveToolingFacets = FacetCount['liveTooling'];
        //console.log('swingovercrossslideFacets====>', swingovercrossslideFacets);
        const uniqueIndustry = [...new Set(filteredHits.flatMap(hit => hit.categories.lvl0))];
        const IndustryObjects = uniqueIndustry.map((Industry, index) => {
            const trimmedName = Industry.replace("HealthCare >", "").replace("MSME >", "");
            const facetCount = IndustryFacets?.[Industry] || 0;
            return {
                id: index + 1,
                name: trimmedName,
                value: Industry,
                facetCount: facetCount,
            };
        });
        //const selectedIndustry = filters.industry.length > 0 ? filters.industry[0] : null;
        const uniqueCategories = [...new Set(filteredHits.flatMap(hit => hit.categories.lvl1))];
        const categoryObjects = uniqueCategories.map((category, index) => {
            const trimmedName = category.replace("HealthCare >", "").replace("MSME >", "");
            const facetCount = categoryFacets?.[category] || 0;
            return {
                id: index + 1,
                name: trimmedName,
                value: category,
                facetCount: facetCount,
            };
        });

        const uniqueSubCategories = [...new Set(filteredHits.flatMap(hit => hit.categories.lvl2))];
        const SubcategoryObjects = uniqueSubCategories.map((subcategory, index) => {
            const regex = /.*?>\s*/g;
            const trimmedName = subcategory?.replace(regex, "");
            const facetCount = SubcategoryFacets?.[subcategory] || 0;
            return {
                id: index + 1,
                name: trimmedName,
                value: subcategory,
                facetCount: facetCount,
            };
        });
        const uniqueBrands = [...new Set(filteredHits.flatMap(hit => hit.attributes.Brands))];
        const BrandsObjects = uniqueBrands
        .filter(Brands => Brands && Brands.trim() !== '')
        .map((Brands, index) => {
            const facetCount = BrandsFacets?.[Brands] || 0;
            return {
                id: index + 1,
                name: Brands,
                value: Brands,
                facetCount: facetCount,
            };
        });
        console.log('BrandsObjects========>', BrandsObjects);
        const uniqueModel = [...new Set(filteredHits.flatMap(hit => hit.attributes.Model))];
        const ModelObjects = uniqueModel
        .filter(Model => Model && Model.trim() !== '')
        .map((Model, index) => {
            const facetCount = ModelFacets?.[Model] || 0;
            return {
                id: index + 1,
                name: Model,
                value: Model,
                facetCount: facetCount,
            };
        });
        const uniquePrice = [...new Set(filteredHits.flatMap(hit => hit.grossPrice))];
        const priceObjects = uniquePrice.map((price, index) => {
            const facetCount = grossPriceFacets?.[price] || 0;
            return {
                id: index + 1,
                name: price,
                value: price,
                facetCount: facetCount,
            };
        });
        const uniquemfgYear = [...new Set(filteredHits.flatMap(hit => hit.mfgYear))];
        //console.log('uniquemfgYear---->', uniquemfgYear);
        // Exclude '1900' from the list of unique manufacturing years
        const filteredmfgYear = uniquemfgYear.filter(year => year !== 1900);

        const mfgYearObjects = filteredmfgYear.map((mfgYear, index) => {
            const facetCount = mfgYearFacets?.[mfgYear] || 0;
            return {
                id: index + 1,
                name: mfgYear,
                value: mfgYear,
                facetCount: facetCount,
            };
        });
        const uniqueController = [...new Set(filteredHits.flatMap(hit => hit.attributes.Controller))];
        const ControllerObjects = uniqueController
            .filter(Controller => Controller && Controller.trim() !== '') // Filter out empty or undefined values
            .map((Controller, index) => {
                const facetCount = ControllerFacets?.[Controller] || 0;
                return {
                    id: index + 1,
                    name: Controller,
                    value: Controller,
                    facetCount: facetCount,
                };
            });
        //console.log('ControllerObjects--->', ControllerObjects);
        //console.log('ControllerObjects--->', ControllerObjects);
        const uniquemxAxis = [...new Set(filteredHits.flatMap(hit => hit.xAxis))];
        const xAxisObjects = uniquemxAxis
            .filter(xAxis => xAxis !== undefined && xAxis !== null && xAxis.toString().trim() !== '' && xAxis !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((xAxis, index) => {
                const facetCount = xAxisFacets?.[xAxis] || 0;
                return {
                    id: index + 1,
                    name: xAxis,
                    value: xAxis,
                    facetCount: facetCount,
                };
            });


        const uniquemyAxis = [...new Set(filteredHits.flatMap(hit => hit.yAxis))];
        const yAxisObjects = uniquemyAxis
            .filter(yAxis => yAxis !== undefined && yAxis !== null && yAxis.toString().trim() !== '' && yAxis !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((yAxis, index) => {
                const facetCount = yAxisFacets?.[yAxis] || 0;
                return {
                    id: index + 1,
                    name: yAxis,
                    value: yAxis,
                    facetCount: facetCount,
                };
            });

        const uniquemzAxis = [...new Set(filteredHits.flatMap(hit => hit.zAxis))];
        const zAxisObjects = uniquemzAxis
            .filter(zAxis => zAxis !== undefined && zAxis !== null && zAxis.toString().trim() !== '' && zAxis !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((zAxis, index) => {
                const facetCount = zAxisFacets?.[zAxis] || 0;
                return {
                    id: index + 1,
                    name: zAxis,
                    value: zAxis,
                    facetCount: facetCount,
                };
            });

        const uniqueSpindleSpeed = [...new Set(filteredHits.flatMap(hit => hit.spindlespeed))];
        const spindleSpeedObjects = uniqueSpindleSpeed
            .filter(speed => speed !== undefined && speed !== null && speed.toString().trim() !== '' && speed !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((speed, index) => {
                const facetCount = spindlespeedFacets?.[speed] || 0;
                return {
                    id: index + 1,
                    name: speed,
                    value: speed,
                    facetCount: facetCount,
                };
            });


        const uniqueSpindleTaper = [...new Set(filteredHits.flatMap(hit => hit.spindletaper))];
        const spindleTaperObjects = uniqueSpindleTaper
            .filter(taper => taper !== undefined && taper !== null && taper.toString().trim() !== '' && taper !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((taper, index) => {
                const facetCount = spindletaperFacets?.[taper] || 0;
                return {
                    id: index + 1,
                    name: taper,
                    value: taper,
                    facetCount: facetCount,
                };
            });

        const uniqueTailstock = [...new Set(filteredHits.flatMap(hit => hit.tailstock))];
        const tailstockObjects = uniqueTailstock
            .filter(tailstock => tailstock !== undefined && tailstock !== null && tailstock.toString().trim() !== '' && tailstock !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((tailstock, index) => {
                const facetCount = tailstockFacets?.[tailstock] || 0;
                return {
                    id: index + 1,
                    name: tailstock,
                    value: tailstock,
                    facetCount: facetCount,
                };
            });


        const uniqueBarCapacity = [...new Set(filteredHits.flatMap(hit => hit.barcapacity))];
        const barCapacityObjects = uniqueBarCapacity
            .filter(barCapacity => barCapacity !== undefined && barCapacity !== null && barCapacity.toString().trim() !== '' && barCapacity !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((barCapacity, index) => {
                const facetCount = barcapacityFacets?.[barCapacity] || 0;
                return {
                    id: index + 1,
                    name: barCapacity,
                    value: barCapacity,
                    facetCount: facetCount,
                };
            });


        const uniqueChuckSize = [...new Set(filteredHits.flatMap(hit => hit.chucksize))];
        const chuckSizeObjects = uniqueChuckSize
            .filter(chuckSize => chuckSize !== undefined && chuckSize !== null && chuckSize.toString().trim() !== '' && chuckSize !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((chuckSize, index) => {
                const facetCount = chucksizeFacets?.[chuckSize] || 0;
                return {
                    id: index + 1,
                    name: chuckSize,
                    value: chuckSize,
                    facetCount: facetCount,
                };
            });


        const uniqueMaxTurningLength = [...new Set(filteredHits.flatMap(hit => hit.maxturninglength))];
        const maxTurningLengthObjects = uniqueMaxTurningLength
            .filter(maxTurningLength => maxTurningLength !== undefined && maxTurningLength !== null && maxTurningLength.toString().trim() !== '' && maxTurningLength !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((maxTurningLength, index) => {
                const facetCount = maxturninglengthFacets?.[maxTurningLength] || 0;
                return {
                    id: index + 1,
                    name: maxTurningLength,
                    value: maxTurningLength,
                    facetCount: facetCount,
                };
            });


        const uniqueSwingOverBed = [...new Set(filteredHits.flatMap(hit => hit.swingoverbed))];
        const swingOverBedObjects = uniqueSwingOverBed
            .filter(swingOverBed => swingOverBed !== undefined && swingOverBed !== null && swingOverBed.toString().trim() !== '' && swingOverBed !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((swingOverBed, index) => {
                const facetCount = swingoverbedFacets?.[swingOverBed] || 0;
                return {
                    id: index + 1,
                    name: swingOverBed,
                    value: swingOverBed,
                    facetCount: facetCount,
                };
            });


        const uniqueSwingOverCrossSlide = [...new Set(filteredHits.flatMap(hit => hit.swingovercrossslide))];
        const swingOverCrossSlideObjects = uniqueSwingOverCrossSlide
            .filter(swingOverCrossSlide => swingOverCrossSlide !== undefined && swingOverCrossSlide !== null && swingOverCrossSlide.toString().trim() !== '' && swingOverCrossSlide !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((swingOverCrossSlide, index) => {
                const facetCount = swingovercrossslideFacets?.[swingOverCrossSlide] || 0;
                return {
                    id: index + 1,
                    name: swingOverCrossSlide,
                    value: swingOverCrossSlide,
                    facetCount: facetCount,
                };
            });


        const uniqueSubSpindle = [...new Set(filteredHits.flatMap(hit => hit.subSpindle))];
        const subSpindleObjects = uniqueSubSpindle
            .filter(subSpindle => subSpindle !== undefined && subSpindle !== null && subSpindle.toString().trim() !== '' && subSpindle !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((subSpindle, index) => {
                const facetCount = subSpindleFacets?.[subSpindle] || 0;
                return {
                    id: index + 1,
                    name: subSpindle,
                    value: subSpindle,
                    facetCount: facetCount,
                };
            });


        const uniqueLiveTooling = [...new Set(filteredHits.flatMap(hit => hit.liveTooling))];
        const liveToolingObjects = uniqueLiveTooling
            .filter(liveTooling => liveTooling !== undefined && liveTooling !== null && liveTooling.toString().trim() !== '' && liveTooling !== 0) // Filter out undefined, null, empty strings, whitespace, and 0
            .map((liveTooling, index) => {
                const facetCount = liveToolingFacets?.[liveTooling] || 0;
                return {
                    id: index + 1,
                    name: liveTooling,
                    value: liveTooling,
                    facetCount: facetCount,
                };
            });


        // Set filter states with if conditions
        if (filters.spindlespeed.length === 0) setspindlespeed(spindleSpeedObjects);
        if (filters.spindletaper.length === 0) setspindletaper(spindleTaperObjects);
        if (filters.tailstock.length === 0) settailstock(tailstockObjects);
        if (filters.barcapacity.length === 0) setbarcapacity(barCapacityObjects);
        if (filters.chucksize.length === 0) setchucksize(chuckSizeObjects);
        if (filters.maxturninglength.length === 0) setmaxturninglength(maxTurningLengthObjects);
        if (filters.swingoverbed.length === 0) setswingoverbed(swingOverBedObjects);
        if (filters.swingovercrossslide.length === 0) setswingovercrossslide(swingOverCrossSlideObjects);
        if (filters.subSpindle.length === 0) setsubSpindle(subSpindleObjects);
        if (filters.liveTooling.length === 0) setliveTooling(liveToolingObjects);

        // Set filter states based on conditions
        if (filters.industry.length === 0) setIndustry(IndustryObjects);
        if (filters.category.length === 0) setCategories(categoryObjects);
        if (filters.subcategory.length === 0) setsubCategories(SubcategoryObjects)
        if (filters.brand.length === 0) setBrands(BrandsObjects);
        if (filters.Model.length === 0) setModel(ModelObjects);
        if (filters.Price.length === 0) setPrice(priceObjects);
        if (filters.Year.length === 0) setYear(mfgYearObjects);
        if (filters.Controller.length === 0) setController(ControllerObjects);
        if (filters.XAXIS.length === 0) setXAXIS(xAxisObjects);
        if (filters.YAXIS.length === 0) setYAXIS(yAxisObjects);
        if (filters.ZAXIS.length === 0) setZAXIS(zAxisObjects);


    };

    if (filteredHits.length > 0) {

        if (!products.length > 0) {
            setProducts(filteredHits);
        }
    }
    const getAllProds = () => {

        return filteredHits

    }
    const getProducts = () => {
        let prds = getAllProds();
        setProducts(prds);
    }

    const handleFilters = (name, value) => {
        setActiveFilters((prevState) => ({ ...prevState, [name]: value }));
    }
    const toggleMultiFilterOptions = (name, value) => {
        //console.log('name===============================================================>', name);
        const selectedFilters = Object.assign({}, filters);
        if (!selectedFilters[name].includes(value)) {
            if(name === 'category'){
                selectedFilters[name] = [value]
            }
            else{
                selectedFilters[name].push(value);
            }
        } else {
            selectedFilters[name] = selectedFilters[name].filter(function (item) {
                return item !== value;
            });
        }
        selectedFilters.page = 1;
        setFilters(selectedFilters);
        filterProducts(selectedFilters);
    }
    const clearFilters = () => {
        const selectedFilters = Object.assign({}, filters);
        selectedFilters.industry = [];
        selectedFilters.category = [];
        selectedFilters.subcategory = [];
        selectedFilters.brand = [];
        selectedFilters.Model = [];
        selectedFilters.Price = [];
        selectedFilters.Year = [];
        selectedFilters.Controller = [];
        selectedFilters.XAXIS = [];
        selectedFilters.YAXIS = [];
        selectedFilters.ZAXIS = [];
        selectedFilters.spindlespeed = [];
        selectedFilters.spindletaper = [];
        selectedFilters.tailstock = [];
        selectedFilters.barcapacity = [];
        selectedFilters.chucksize = [];
        selectedFilters.maxturninglength = [];
        selectedFilters.swingoverbed = [];
        selectedFilters.swingovercrossslide = [];
        selectedFilters.subSpindle = [];
        selectedFilters.liveTooling = [];
        selectedFilters.page = 1;
        setFilters(selectedFilters);
        filterProducts(selectedFilters);
    }
    const hasShowClear = () => {
        let shown = false;
        if (filters.industry.length > 0) {
            shown = true;
        }
        if (filters.category.length > 0) {
            shown = true;
        }
        if (filters.brand.length > 0) {
            shown = true;
        }
        if (filters.Model.length > 0) {
            shown = true;
        }
        if (filters.Price.length > 0) {
            shown = true;
        }
        if (filters.Year.length > 0) {
            shown = true;
        }
        if (filters.Controller.length > 0) {
            shown = true;
        }
        if (filters.XAXIS.length > 0) {
            shown = true;
        }
        if (filters.YAXIS.length > 0) {
            shown = true;
        }
        if (filters.ZAXIS.length > 0) {
            shown = true;
        }
        if (filters.spindlespeed.length > 0) {
            shown = true;
        }
        if (filters.spindletaper.length > 0) {
            shown = true;
        }
        if (filters.tailstock.length > 0) {
            shown = true;
        }
        if (filters.barcapacity.length > 0) {
            shown = true;
        }
        if (filters.chucksize.length > 0) {
            shown = true;
        }
        if (filters.maxturninglength.length > 0) {
            shown = true;
        }
        if (filters.swingoverbed.length > 0) {
            shown = true;
        }
        if (filters.swingovercrossslide.length > 0) {
            shown = true;
        }
        if (filters.subSpindle.length > 0) {
            shown = true;
        }
        if (filters.liveTooling.length > 0) {
            shown = true;
        }
        return shown;
    }
    const filterProducts = (selectedFilters) => {
        let { category, brand } = selectedFilters;
        let filterPrds = getAllProds();
        if (category.length > 0 || brand.length > 0) {
            filterPrds = filterPrds.filter((product) => {
                if (category.length > 0 && brand.length > 0) {
                    if (category.includes(product.category) && brand.includes(product.brand)) {
                        return product;
                    }
                } else if (category.length > 0 && category.includes(product.category)) {
                    return product;
                } else if (brand.length > 0 && brand.includes(product.brand)) {
                    return product;
                }
            });
        }
        setProducts(filterPrds);
    }
    const handleFavorite = (index, value) => {
        const prds = Object.assign([], products);
        prds[index]["favorite"] = value;
        setProducts(prds);
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
    const modalAction = (status) => {
        setShowModel(status);
    }
    const onGetPinCodeHandler = (pin) => {
        console.log("updatedPincode===>>>", pin);
        setDeliveryLocation(pin)
    }
    const onSubmitHandler = (props) => {
        console.log("whish list working", props?.categories.lvl2?.split('>')[2].trim());
        const loggedin = !!localStorage.getItem('userToken');
        if (loggedin) {
            onWishlistHandler(props?.productId, props?.thumbnail, props?.grossPrice, props?.productName, props?.attributes?.Brands, props?.categories?.lvl1?.split('>')[1].trim(), props?.categories.lvl2?.split('>')[2].trim())
        }
    }




    const handlepinChange = (event) => {
        const value = event.target.value;

        // If the input length is less than 6, set the value to empty
        const formattedValue = value.length < 6 ? "" : value;

        // Limit to 6 characters
        const truncatedValue = formattedValue.substring(0, 6);

        setDeliveryLocation(truncatedValue);

        // Save deliveryLocation to local storage
        localStorage.setItem("deliveryLocation", truncatedValue);
    };

    const handleAvailService = (product) => {
        const UserId = localStorage.getItem('id');
        console.log('UserId---->', UserId);
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
        navigate(`/buy/cnc-machine?id=${product.productId}`);
    };

    return (
        <>
            {isMobCategory && <CategoryPopup filterConfigurations={filterConfigurations} filters={filters} onHide={() => setIsMobCategory(false)} toggleMultiFilterOptions={toggleMultiFilterOptions} clearFilters={clearFilters} />}
            {loading && <Loader />}
            {/*showModel ? (
                <LoginModel onHide={modalAction}   type="phone"/>
            ) : null*/}
            {seeMore && (
                <DeliveryLocation modalAction={handleSeeMore} pinvalue={onGetPinCodeHandler} />
            )}
            <div className="container-fluid col-cust">
                <div className="max-container my-5">
                    {/*<Breadcrumbs items={breadcrumbsItems} />*/}
                    <Breadcrumbs backnavi={() => navigate('/buy')} boldtitle={"Machine Listing"} items={breadcrumbsItems} />
                    <div className="tab-wrap">
                        <button onClick={() => setActiveTab("machines")} className={activeTab === "machines" ? "active btn" : "btn"} type="button">Machines</button>
                        {/*<button onClick={() => setActiveTab("store")} className={activeTab === "store" ? "active btn" : "btn"} type="button">Store</button>*/}
                    </div>
                    {activeTab == "machines" && (
                        <>
                            <div className="head-wrap">
                                <div className="heading-wrap">
                                    <div className="sub-heading heading-400-16">Search Results for</div>
                                    <div className="heading heading-600-20">{searchInput}</div>
                                </div>
                                <div className="btn-wrap">
                                    <button onClick={() => { setShowShortList(false); handleSeeMore(true) }} className="btn location">{deliveryLocation ? `Delivery Location : ${deliveryLocation}` : 'Set Delivery Location'} </button>
                                    {isMobCategoryShow && <div className="short-wrap">
                                        <button className="btn short-btn" onClick={() => setIsMobCategory(true)}>{filterIcon({ width: 22, height: 22, fill: "#73509E" })}</button>
                                    </div>}
                                    <div className="short-wrap">
                                        <button className="btn short-btn" onClick={() => setShowShortList(!showShortList)}>
                                            {shortIcon({ width: 22, height: 22 })}
                                            <span>{filters.orderBy ? filters.orderBy : "Sort Result"}</span>
                                        </button>
                                        {showShortList && (
                                            <div className="shorts">
                                                <span className="item" onClick={() => handleChangeSort("Alphabetically (A - Z)")}>Sort Alphabetically (A - Z)</span>
                                                <span className="item" onClick={() => handleChangeSort("Price (Highest to Lowest)")}>Sort by Price (Highest to Lowest)</span>
                                                <span className="item" onClick={() => handleChangeSort("Price (Lowest to Highest)")}>Sort by Price (Lowest to Highest)</span>
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
                                            {hasShowClear() ? (
                                                <div className="clear heading-600-14" onClick={clearFilters}>Reset</div>
                                            ) : null}
                                        </div>
                                        {filterConfigurations.map((config, index) => (
                                            <FilterSection
                                                key={config.filterType}
                                                title={config.title}
                                                filterType={config.filterType}
                                                activeFilters={activeFilters}
                                                filters={filters}
                                                toggleMultiFilterOptions={toggleMultiFilterOptions}
                                                items={config.items}
                                                handleFilters={handleFilters}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className='col col-lg-9 col-md-9 col-12'>
                                    {products.length > 0 ? (
                                        <div className="product-wrap">
                                            <div className="products">
                                                {products.slice((pagiCount - 1) * 12, pagiCount * 12).map((product, index) => (

                                                    <div className="product" key={index} >
                                                        <div className="product-inner">
                                                            <img className="product-img" src={product.thumbnail} alt={product.name} />
                                                            <div className="content">
                                                                <div className="name">
                                                                    {product.productName.length > 18
                                                                        ? `${product.productName.substring(0, 18)}...`
                                                                        : product.productName}
                                                                </div>

                                                                {/* <div className="name">{product.productName} </div> */}
                                                                {product.attributes && (<div className="location">{product.attributes["Brands"]} | {product.attributes["Machine Location"]}</div>)}
                                                                <div className="price-wrap">
                                                                    <div className="time">{product.mfgYear === 1900 ? "N/A" : `${findYearDifference(product.mfgYear)} Year Old`}</div>
                                                                    <div className="price">₹{priceConvert(product.grossPrice)}</div>
                                                                    {/* <div className="categorie"> {product.categories['lvl0']}</div> */}
                                                                </div>
                                                                <button className={`heart ${product.favorite ? "favorite" : ""}`} type="button" onClick={() => onSubmitHandler(product)}>{heartIcon({ width: 25, onClick: () => handleFavorite(index, !product.favorite) })}</button>
                                                                <button className="purchase" key={index} onClick={() => handleAvailService(product)} type="button">Avail Service</button>
                                                                {/* <button className="purchase" key={index} onClick={() => navigate(`/buy/cnc-machine?id=${product.productId}`)} type="button">Avail Service</button> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            {/* <div className="bi-pagination-wrap">
                                                <div className="inner">
                                                    <button className="outer-btn">{leftArrowIcon({ width: 24, height: 24 })}</button>
                                                    <div className="inner-btns">
                                                        <button className="pagination-btn active">1</button>
                                                        <button className="pagination-btn">2</button>
                                                        <button className="pagination-btn">3</button>
                                                        <button className="pagination-btn">4</button>
                                                        <button className="pagination-btn">5</button>
                                                        <button className="pagination-btn">6</button>
                                                        <button className="pagination-btn">7</button>
                                                    </div>
                                                    <button className="outer-btn">{rightArrowIcon({ width: 24, height: 24 })}</button>
                                                </div>
                                                </div>*/}

                                            {products.length > 9 && <div className="bi-pagination-wrap">
                                                <div className="inner">
                                                    <button className="outer-btn" onClick={onPrevHandler}>
                                                        {leftArrowIcon({ width: 24, height: 24 })}
                                                    </button>
                                                    <div className="inner-btns">{renderPageButtons()}</div>
                                                    <button className="outer-btn" onClick={onNextHandler} disabled={pagiDisable}>
                                                        {rightArrowIcon({ width: 24, height: 24 })}
                                                    </button>
                                                </div>

                                            </div>}

                                            {/* <div className="bot-icon-wrap">
                                                <div className="bot-icon">{botIcon({ width: 37, height: 37 })}</div>
                                            </div> */}
                                        </div>
                                    ) : (
                                        <p>No product found.</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    {activeTab == "store" && (<p><br />Loading...</p>)}
                </div>
            </div>
            <Footer />
        </>
    );
}
export default ProductListing;
