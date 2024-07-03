import { configureStore } from "@reduxjs/toolkit";
// import AuthSlice from "./AuthSlice";
import ScheduledData from "./ScheduledData";


const Store=configureStore({
    reducer:{
      schedule:ScheduledData,
        
    }
})
export default Store