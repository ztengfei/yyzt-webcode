// 时长卡片
import { useRef, useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image
} from "@nextui-org/react";

import styles from "./index.module.css";

interface cardListType {
    changeState?: (type: string) => void; // 点击切换时长卡
    cardType?: string; // 时长卡类型
    isSelected?: boolean;
    isShowCheck: boolean;
}

export default function CardList(props: cardListType) {
    const { changeState, cardType, isSelected, isShowCheck } = props;
    // const [isSelected, setIsSelected] = useState(false);
    return (
        <div
            className="h-[127px] w-[272px] rounded-2xl"
            onClick={() => {
                console.log("12312312312332");
                changeState && changeState(cardType || "");
            }}
        >
            <Card className={styles["bg-moon"] + " h-[127px] w-[272px] rounded-2xl  relative"}>
                <div className="w-[121px] h-[80px] absolute right-0 bottom-10 bg-card-img bg-cover bg-no-repeat z-0"></div>
                <CardHeader className="flex p-2 pl-4">
                    <Image
                        alt="时长卡"
                        height={17}
                        radius="sm"
                        src="/images/transfer/diamond.png"
                        width={22}
                    />
                    <div className="flex flex-col text-[#994712] text-sm">
                        <p className="text-md">2小时 机器快转时长卡</p>
                    </div>
                </CardHeader>
                <CardBody className="text-[#994712] flex-row items-end p-0 pl-4 overflow-hidden">
                    <span className="text-4xl font-semibold">1:59:10</span>
                    <span className="text-xs pl-1">剩余额度</span>
                </CardBody>
                <CardFooter className="flex justify-between pl-4 pb-2 pt-2">
                    <span className="text-[#994712] text-xs opacity-55">有效期2023/11/08</span>
                    {/* <Button className=" text-f602 bg-white rounded-2xl w-[78px] max-w-[78px] h-[32px]">
                    兑换中心
                </Button> */}
                    {isShowCheck && (
                        <div
                            className={
                                (isSelected ? "bg-radio-active" : "bg-radio") +
                                " w-[22px] h-[22px] rounded-full cursor-pointer"
                            }
                        ></div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
