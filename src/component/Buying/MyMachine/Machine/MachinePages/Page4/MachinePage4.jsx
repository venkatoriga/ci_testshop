import React from "react";
import MachineInfo from "./MachineInfo";
import ProductImages from "../ProductImages";
import MachineExtraData from "./MachineExtraData";
import MachineProgress from "./MachineProgress";
import Benefits from "../Benefits";
import Withdraw from "../Withdraw";
import Footer from "../../../../../Footer/Footer";
import CallToAction from "../CallToAction";
const MachinePage4 = () => {
    return (
        <>
            <MachineInfo/>
            <ProductImages/>
            <MachineProgress/>
            <MachineExtraData/>
            <Benefits/>
            <Withdraw/>
            <Footer/>
            <CallToAction/>
        </>
    );
}
export default MachinePage4;