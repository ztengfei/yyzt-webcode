// import Layout from "@/components/layout";
import { useRef } from "react";
import { Button } from "@nextui-org/button";
import { Image, RadioGroup, Radio, cn } from "@nextui-org/react";
import Banner from "@/components/banner";
import Footer from "@/components/footer";

import RadioCard from "@/components/transfer/card/radioCard";
import Monthly from "@/components/shopping/monthly";

import Time from "@/components/shopping/time";

import styles from "./index.module.css";

export default function Index() {
    return (
        <div className="w-full absolute left-0 top-0 bg-[#F7F8FA]">
            <div
                className={
                    styles["bannerBg"] +
                    " w-full bg-shoppingBn h-[555px] mt-[50px] bg-cover bg-center"
                }
            ></div>
            {/* 购买月的时长卡 */}
            <Monthly></Monthly>
            {/* 购买时间时长卡 */}
            <Time></Time>

            <Footer></Footer>
        </div>
    );
}
