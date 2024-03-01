// import Layout from "@/components/layout";
import { useMemo, useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { Image, RadioGroup, Radio, cn } from "@nextui-org/react";

import RadioCard from "@/components/transfer/card/radioCard";
import RadioIcon from "@/components/icon/radio";
import RadioActiveIcon from "@/components/icon/radio_active";

export default function Index(props: any) {
    const { yearCardList = [], goByCard } = props;
    const [cardType, changeCardType] = useState("");
    const [autoPay, setAutopay] = useState(false);

    const cardInfo = useMemo(() => {
        if (!cardType || !yearCardList) {
            return {};
        }
        return yearCardList.find((item: any) => {
            return item.id == cardType;
        });
    }, [yearCardList, cardType]);

    const goPay = () => {
        // qujiaoyi
        goByCard(cardInfo);
    };

    return (
        <div className="w-[1200px] bg-white rounded-xl px-[22px] py-[26px] mx-auto my-5">
            <div className=" text-xl font-semibold mb-5">机器快转卡 -1h音频最快5分钟出稿</div>
            <RadioGroup
                orientation="horizontal"
                classNames={{
                    base: cn("flex-row flex-nowrap"),
                    wrapper: cn("flex-row flex-nowrap")
                }}
                value={cardType}
                onValueChange={changeCardType}
            >
                {yearCardList.map((item: any) => {
                    return (
                        <RadioCard
                            key={item.id}
                            value={item.id}
                            cardType={item.cardType}
                            hours={item.hours}
                            usableTime={item.usableTime}
                            cardName={item.cardName}
                            origPrice={item.origPrice}
                            cardPrice={item.cardPrice}
                            bgType="purple"
                        ></RadioCard>
                    );
                })}
            </RadioGroup>
            <div className="flex flex-row justify-end items-center mt-5">
                {/* <div
                    className="flex flex-row items-center cursor-pointer"
                    onClick={() => {
                        setAutopay(!autoPay);
                    }}
                >
                    {!autoPay && <RadioIcon></RadioIcon>}
                    {autoPay && <RadioActiveIcon></RadioActiveIcon>}
                    <span className="text-93 mr-8 text-sm ml-1">
                        同意 自动续费服务协议 可随时关闭
                    </span>
                </div> */}
                <div>
                    <span className="mr-1 font-normal">应付金额：</span>
                    <span className=" text-f602 mr-8">￥{cardInfo.cardPrice || "0.00"}</span>
                </div>
                <Button color="primary" className="w-[150px] h-[46px]" onClick={goPay}>
                    立即购买
                </Button>
            </div>
        </div>
    );
}
