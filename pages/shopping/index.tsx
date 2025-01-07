// import Layout from "@/components/layout";
import { useEffect, useRef, useState } from "react";
import Router from "next/router";

import Footer from "@/components/footer";
import Monthly from "@/components/shopping/monthly";
import Time from "@/components/shopping/time";
import { cardList } from "@/api/api";

import styles from "./index.module.css";

export default function Index() {
    const allCardList = useRef([]);
    const [moonCardList, setmoonCardList] = useState<any[]>([]);
    const [yearCardList, setYearCardList] = useState<any[]>([]);

    const splitCard = (allList: any) => {
        let moonList: any[] = [];
        let yearList: any[] = [];
        allList.forEach((element: any) => {
            if (element.cardType == 1 || element.cardType == 13) {
                moonList.push(element);
            } else {
                yearList.push(element);
            }
        });
        allCardList.current = allList;
        return { moonList, yearList };
    };

    useEffect(() => {
        cardList().then((res: any) => {
            const AllList = res.data;
            if (!AllList) {
                return;
            }
            const { moonList, yearList } = splitCard(AllList);
            setmoonCardList(moonList);
            setYearCardList(yearList);
        });
    }, []);

    const goByCard = (cardInfo: any) => {
        Router.push({
            pathname: "/shopping/balance",
            query: {
                cardId: cardInfo.id,
                cardName: cardInfo.cardName,
                cardPrice: cardInfo.cardPrice,
                origPrice: cardInfo.origPrice
            }
        });
    };

    return (
        <div className="w-full absolute left-0 top-0 bg-[#F7F8FA]">
            <div
                className={
                    styles["bannerBg"] +
                    " w-full bg-shoppingBn h-[555px] mt-[50px] bg-cover bg-center"
                }
            ></div>
            {/* 购买月的时长卡 */}
            <Monthly moonCardList={moonCardList} goByCard={goByCard}></Monthly>
            {/* 购买时间时长卡 */}
            <Time yearCardList={yearCardList} goByCard={goByCard}></Time>

            <Footer></Footer>
        </div>
    );
}
