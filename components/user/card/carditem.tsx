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

export default function CardList() {
    return (
        <Card className={styles["bg-purple"] + " h-[127px] w-[319px] rounded-2xl  relative mb-3"}>
            <CardHeader className="flex p-2 pl-4 z-0">
                <Image
                    alt="市场卡"
                    height={17}
                    radius="sm"
                    src="/images/transfer/diamond.png"
                    width={22}
                    className="z-0"
                />
                <div className="flex flex-col text-[#173A83] text-sm">
                    <p className="text-md">2小时 机器快转时长卡</p>
                </div>
            </CardHeader>
            <CardBody className="text-[#173A83] flex-row items-end p-0 pl-4 overflow-hidden">
                <span className=" text-4xl font-semibold">1:59:10</span>
                <span className="text-xs pl-1">剩余额度</span>
            </CardBody>
            <CardFooter className="flex justify-between pl-4 pb-2 pt-2">
                <span className="text-[#173A83] text-xs opacity-55">有效期2023/11/08</span>
                <Button className="bg-white rounded-2xl w-[68px] max-w-[68px] h-[30px] min-h-[30px]">
                    退卡
                </Button>
            </CardFooter>
            <div className="w-[121px] h-[80px] absolute right-0 bottom-10 bg-card-img bg-cover bg-no-repeat z-0"></div>
        </Card>
    );
}
