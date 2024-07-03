import HomePage from "./component/HomePage/HomePage";
import "./App.css";
import {Route,Routes} from "react-router-dom";
import {lazy,Suspense,useEffect} from 'react';
import Header from "./component/Header/Header";
import Legal from "./component/Legal/Legal";
import ContactUs from "./component/Contactus/ContactUs";
import ServiceRequest from "./component/ServiceRequest/ServiceRequest";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Logistics from "./component/Services/ServicesPopup/Logistics/Logistics";
import CandD from "./component/Services/ServicesPopup/CandD/CandD";
import MyAccount from "./component/Account/MyAccount";
import MyAccAddAddress from "./component/Account/ManageAddress/MyAccAddAddress";
import YourOrder from "./component/Account/Order/YourOrder";
import NoAddressFound from "./component/Account/NoAddressFound";
import Logout from "./component/Account/Logout/Logout";
import ManageAddress from "./component/Account/ManageAddress/ManageAddress";
import MachineDetailPage2 from "./component/AddToCart/ManagePageDetails";
import Amc from "./component/AMC/Amc";
import FeedbackPageStar from "./component/Feedback/FeedbackPageStar";
//import Product from "./component/Product/index";

import OnetTimeRepairStepper from "./component/Services/ServicesPopup/OnetTimeRepairStepper";
// Analytics
import Hotjar from '@hotjar/browser';
import TagManager from 'react-gtm-module';
import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';
// Buying Pages
import ProductListing from "./component/Buying/ProductListing";
import ViewProduct from "./component/Buying/Product/ProductPage";
import ViewSpareProduct from "./component/Buying/Product/SparePage";
import Token from "./component/Buying/Product/Token";
import AdvancePayment from "./component/Buying/Product/AdvancePayment";
import ApplyLoan from "./component/Buying/Product/ApplyLoan";
import MyMachine from "./component/Buying/MyMachine/Machine/MyMachine";
import Address from "./component/Buying/MyMachine/Payment/Addres";
import AddAddress from "./component/Buying/MyMachine/Payment/AddAddress";
import Summary from "./component/Buying/MyMachine/Payment/Summary";
import SpareSummary from "./component/Buying/MyMachine/Payment/SpareSummary";
import AddMachine from "./component/Buying/MyMachine/Machine/AddMachine";
import MachineLocation from "./component/Buying/MyMachine/Machine/MachineLocation";
import MyMachineGridView from "./component/Buying/MyMachine/Machine/MyMachineGridView";
import MachinePage from "./component/Buying/MyMachine/Machine/MachinePage";
//Origa Apps

import OrigaApps from "./component/OrigaApps/OrigaApps";

// Selling Pages
import SellMachines from "./component/Selling/Home";
import MachineDetail from "./component/Selling/MachineDetail";
import ProductId from "./component/Product/ProductId";
import ViewMachineSale from "./component/Selling/MachineSale/ViewMachineSale";
import MachineSaleGrid from "./component/Selling/MachineSale/MachineSaleGrid";
import MachineSoldGrid from "./component/Selling/MachineSold/MachineSoldGrid";
import MachineSold1 from "./component/Selling/MachineSold/MachineSold1";

import AmcMaintainLandingPage from "./component/AMC/AmcMaintainLandingPage/AmcMaintainLandingPage";
import AmcMaintainLandingAnnual from "./component/AMC/AmcMaintainLandingPage/AmcMaintainLandingAnnual";
import ProductIdSecond from "./component/Product/ProductIdSecond/ProductIdSecond";
import MachineDetailPage1 from "./component/AddToCart/MachineDetailPage1";
import ReplaceOrder from "./component/Account/ReplaceOrder";
import Wishlist from "./component/Account/Wishlist";
import MyMachineAddToCart from "./component/Account/MyMachineAddToCart";
import OrderCancle from "./component/Account/OrderCancle";
import AMCPlans from "./component/Account/AMCPlans";
import AMCExpiredPlan from "./component/Account/AMCExpiredPlan";
import WishlistedMachines from "./component/Account/WishlistedMachines";
import Wishlist2 from "./component/Account/Wishlist2";
import Wishlist3 from "./component/Account/Wishlist3";
import ScheduledVisits from "./component/Account/ScheduledVisits";
import Addonservice from "./component/Addonservice/index";
import MyProfile from "./component/Account/MyProfile";
import OrigaNetwork from "./component/OrigaNetwork/OrigaNetwork";
import Finance from "./component/Finance/Finance";
import FinanceStepper from "./component/Finance/FinanceStepper/FinanceStepper";
import NewHomePage from "./component/NewHomePage/NewHomePage";
// import NewBuy from "./component/NewBuy/NewBuy";
// import NewSell from "./component/NewSell/NewSell";
// import NewService from "./component/NewService/NewService";
const Faq=lazy(()=>import('./component/Faq/Faq'));
const AboutUs=lazy(()=>import('./component/AboutUs/AboutUs'));
const Services =lazy(()=>import('./component/Services/Services'));
const Unfortunately =lazy(()=>import('./component/Services/Unfortunately/Unfortunately'));
const Annual =lazy(()=>import('./component/Annual/Annual'));
const BuyingFlow =lazy(()=>import('./component/BuyingFlow/BuyingFlow'));

/* const TRACKING_ID = "GTM-NVNQB4M4";
//google tag manager
const tagManagerArgs = {
    gtmId: 'GTM-NVNQB4M4'
}


const usePageTracking = () => {
    const location = useLocation();
  
    useEffect(() => {
      // Trigger a custom event with GTM on route change
      TagManager.dataLayer({
        dataLayer: {
          event: 'pageview',
          page: location.pathname + location.search,
        },
      });
    }, [location]);
  };

  function usePageViews() {
    let location = useLocation();
  
    useEffect(() => {
      ReactGA.initialize(TRACKING_ID);
      trackPage(location.pathname + location.search);
    }, [location]);
  
    const trackPage = (page) => {
      ReactGA.set({ page });
      ReactGA.pageview(page);
    };
  } */
//microsoft calrity const value
/* const setupClarity = () => {
    (function(c,l,a,r,i,t,y){
           c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
           t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
           y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
       })(window, document, "clarity", "script", "l1id3qo1ot");
   }; */
function App(){
//hotjar
/* const siteId = 3864301;
const hotjarVersion = 6; */

/* Hotjar.init(siteId, hotjarVersion); */
//microsoft clarity
/* useEffect(() => {
    setupClarity();
  }, []); */
//google tag manager
/* React.useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  usePageViews();
  usePageTracking(); */
    return (
        <>
         <Header />
            <Routes>
                <Route path="/" element={<NewHomePage />}/>
                {/* <Route path="/" element={<HomePage />}/> */}
                <Route path="/manageaddress" element={<ManageAddress />} />
                <Route path="/myaccount" element={<MyAccount />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/managepagedetails1" element={<MachineDetailPage1/>}/>
                <Route path="/managepagedetails2" element={<MachineDetailPage2 />}/>
                <Route path="/mymachineaddtocart" element={<MyMachineAddToCart/>}/>
                <Route path="/addaddress" element={<MyAccAddAddress />} />
               
                <Route path="/yourorder" element={<YourOrder />} />
                <Route path="/replaceorder" element={<ReplaceOrder/>}/>
                <Route path="/oredercancle" element={<OrderCancle/>}/>
                <Route path="/my-profile" element={<MyProfile/>}/>
                <Route path="/amc-plans" element={<AMCPlans/>}/>
                <Route path="/amc-expired-plan" element={<AMCExpiredPlan/>}/>
                <Route path="/wishlisted-machines" element={<WishlistedMachines/>}/>
                <Route path="/wishlist2" element={<Wishlist2/>}/>
                <Route path="/wishlist3" element={<Wishlist3/>}/>
                <Route path="/scheduled-visits" element={<ScheduledVisits/>}/>
                <Route path="/service" element={<Suspense><Services /></Suspense>} />
                <Route path="/service/Addonservice" element={<Addonservice />} />
                <Route path="/service/amc" element={<Amc />} />
                <Route path="/service/AmcMaintainLandingPage" element={<AmcMaintainLandingPage/>}/>
                <Route path="/service/amcmaintainlandingannual" element={<AmcMaintainLandingAnnual/>}/>
                {/*<Route path="/product/:id" element={<Product />} />*/}
                <Route path="/origanetwork" element={<OrigaNetwork/>}/>
                <Route path="/finance_stepper" element={<FinanceStepper/>}/>
                <Route path="/service/annual" element={<Suspense><Annual /></Suspense>} />
                <Route path="/onetimerepair" element={<OnetTimeRepairStepper/>} />
                <Route path="/logistics" element={<Logistics />} />
                <Route path="/CandD" element={<CandD />} />
                <Route path="/aboutus" element={<Suspense><AboutUs /></Suspense>} />
                <Route path="/noaddressfound" element={<NoAddressFound />} />
                <Route path="/wishlist" element={<Wishlist/>}/>
                <Route path="/productmain/:id" element={<ProductId/>}/>
                <Route path="/productidsecond/:id" element={<ProductIdSecond/>}/>
                <Route path="/legal" element={<Legal />}/>
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/ServiceRequest" element={<ServiceRequest />} />
                <Route path="/faqs" element={<Suspense><Faq /></Suspense>} />
                <Route path="/unfortunately" element={<Suspense><Unfortunately/></Suspense>}/>
                {/* <Route path="/newbuy" element={<NewBuy/>}/> */}
                <Route path="/buy">
                    <Route index element={<Suspense><BuyingFlow/></Suspense>}/>
                    <Route path="product-listing" element={<ProductListing/>}/>
                    <Route path="cnc-machine" element={<ViewProduct/>}/>
                    <Route path="sparetools" element={<ViewSpareProduct/>}/>
                    <Route path="add-machine" element={<AddMachine/>}/>
                    <Route path="pay-token" element={<Token/>}/>
                    <Route path="advance-payment" element={<AdvancePayment/>}/>
                    <Route path="apply-loan" element={<ApplyLoan/>}/>
                    <Route path="my-machine" element={<MyMachine/>}/>
                    <Route path="my-machine-grid-view" element={<MyMachineGridView/>}/>
                    <Route path="add-address" element={<Address/>}/>
                    <Route path="new-address" element={<AddAddress/>}/>
                    <Route path="order-summary" element={<Summary/>}/>
                    <Route path="spareorder-summary" element={<SpareSummary/>}/>
                    <Route path="machine-page" element={<MachinePage/>}/>
                    <Route path="machine-location" element={<MachineLocation/>}/>
                </Route>
                {/* <Route path="/newsell" element={<NewSell/>}/>
                <Route path="/newservice" element={<NewService/>}/> */}
                <Route path="/sell">
                    <Route index element={<Suspense><SellMachines/></Suspense>}/>
                    <Route path="machine-detail" element ={<MachineDetail/>}/>
                    <Route path="view-machine-sale" element={<ViewMachineSale/>}/>
                    <Route path="machine-sale-grid" element={<MachineSaleGrid/>}/>
                    <Route path="machine-sold-grid" element={<MachineSoldGrid/>}/>
                    <Route path="MachineSold1" element={<MachineSold1/>}/>
                </Route>
                
                <Route path="/finance" element={<Finance/>} />
                <Route path="/origaapps" element={<OrigaApps/>}/>
                <Route path="/*" element={<HomePage/>}/>
                <Route path="/servicefeedback" element={<FeedbackPageStar />} />
            </Routes>
        </>
    );
}

export default App;
