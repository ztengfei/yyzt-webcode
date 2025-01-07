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
import { secondsToHMS, formatDate } from "@/components/tool";

import styles from "./index.module.css";

interface cardListType {
    changeState?: () => void; // 点击切换时长卡
    isSelected?: boolean;
    isShowCheck: boolean;
    bgType?: string; // 月卡或者年卡
    cardTime?: any;
    cardName?: string;
}

export default function CardList(props: cardListType) {
    const { changeState, isSelected, isShowCheck, bgType, cardTime, cardName } = props;
    // const [isSelected, setIsSelected] = useState(false);

    // 组件背景颜色
    const bgClass = "bg-" + bgType;
    const textColor = bgType == "purple" ? "text-[#173A83]" : "text-[#994712]";

    return (
        <div
            className="h-[127px] w-[272px] rounded-2xl mr-2"
            onClick={() => {
                changeState && changeState();
            }}
        >
            <Card className={styles[bgClass] + " h-[127px] w-[272px] rounded-2xl  relative"}>
                <div className="w-[121px] h-[80px] absolute right-0 bottom-10 bg-card-img bg-cover bg-no-repeat z-0"></div>
                <CardHeader className="flex p-2 pl-4 z-0">
                    <Image
                        alt="时长卡"
                        height={17}
                        radius="sm"
                        src="/images/transfer/diamond.png"
                        width={22}
                        className="z-0"
                    />
                    <div className={`flex flex-col ${textColor} text-sm`}>
                        {bgType == "moon" && <p className="text-md">{cardName}</p>}
                        {/* 2小时 机器快转时长卡 */}
                        {bgType == "year" && <p className="text-md">{cardTime.hours}小时·全年</p>}
                    </div>
                </CardHeader>
                <CardBody className={`${textColor} flex-row items-end p-0 pl-4 overflow-hidden`}>
                    {/* 1:59:10 */}
                    <span className="text-4xl font-semibold">
                        {secondsToHMS(cardTime.usableTime)}
                    </span>
                    <span className="text-xs pl-1">剩余额度</span>
                </CardBody>
                <CardFooter className="flex justify-between pl-4 pb-2 pt-2">
                    <span className={`${textColor}  text-xs opacity-55`}>
                        有效期：{formatDate(cardTime.endDate)}
                    </span>
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
