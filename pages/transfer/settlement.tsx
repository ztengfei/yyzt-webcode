// 上传音频后的订单结算界面
import { useRef, useState } from "react";
import {
    Tabs,
    Tab,
    Input,
    Link,
    Button,
    Card,
    CardBody,
    CardHeader,
    Avatar,
    Select,
    SelectItem,
    Image,
    Textarea,
    CheckboxGroup,
    cn,
    RadioGroup
} from "@nextui-org/react";

import BuyFooter from "@/components/transfer/buyFooter";
import CardItem from "@/components/transfer/card/card";

import RadioCard from "@/components/transfer/card/radioCard";

import styles from "./index.module.css";

export default function Index() {
    const modalRef = useRef();
    const [selected, setSelected] = useState("people");

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-col w-full flex-1">
                <div className="text-base my-4">订单信息</div>
                <div className=" bg-white rounded-xl leading-[52px] pl-4">
                    <span className="mr-10 text-sm font-medium">
                        共<span className=" text-f602"> 1 </span>条音频进行转换
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        音频总时长: <span className="text-black">00:00:10</span>
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        转文字单价: <span className="text-black">0.33元/分钟</span>
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        交稿时间: <span className="text-black">预计提交后10分钟转写完成</span>
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        总价: <span className="text-f602">0.33元</span>
                    </span>
                </div>
                <div className="mt-5 mb-4">
                    <span>我的时长卡</span>
                    <span className=" text-f602">（已选）</span>
                    <span className="text-bc">（暂无）</span>
                </div>
                <div>
                    <CardItem></CardItem>
                </div>
                <div className="mt-5 mb-4">
                    <span>畅想套餐</span>
                </div>
                <div>
                    <RadioGroup
                        orientation="horizontal"
                        classNames={{
                            base: cn("flex-row flex-nowrap"),
                            wrapper: cn("flex-row flex-nowrap")
                        }}
                    >
                        <div>
                            <RadioCard value="1" bgType="moon"></RadioCard>
                            <RadioCard value="2" bgType="moon"></RadioCard>
                            <RadioCard value="3" bgType="moon"></RadioCard>
                            <RadioCard value="4" bgType="moon"></RadioCard>
                        </div>
                        <div>
                            <RadioCard value="5" bgType="year"></RadioCard>
                            <RadioCard value="6" bgType="year"></RadioCard>
                            <RadioCard value="7" bgType="year"></RadioCard>
                            <RadioCard value="8" bgType="year"></RadioCard>
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <BuyFooter></BuyFooter>
        </div>
    );
}
