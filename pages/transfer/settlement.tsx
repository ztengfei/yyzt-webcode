// 上传音频后的订单结算界面
import { useEffect, useRef, useState } from "react";
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
import Router, { useRouter } from "next/router";

import BuyFooter from "@/components/transfer/buyFooter";
import CardItem from "@/components/transfer/card/card";
import RadioCard from "@/components/transfer/card/radioCard";
import PaymentRadio from "@/components/common/paymentRadio";
import { orderDetail, userDurationList, cardList } from "@/api/api";

import styles from "./index.module.css";

export default function Index() {
    const modalRef = useRef();
    // 时长卡类型
    const [cardType, setCardType] = useState("");

    useEffect(() => {
        // cha
        orderDetail({ id: 5 }).then((res) => {
            console.log(res);
        });
        userDurationList().then((res) => {
            console.log(res);
        });
        cardList().then((res) => {
            console.log(res);
        });
    }, []);

    const submit = () => {
        Router.push({
            pathname: "/transfer/order",
            query: { name: "Zeit" }
        });
    };

    // 修改时长卡类型
    const changeCardType = (key: string) => {
        setCardType(key);
    };

    // changeState?:(type:string)=>void; // 点击切换时长卡
    // cardType?:string; // 时长卡类型
    // isSelected?:boolean;
    // isShowCheck:boolean;

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
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
                    <CardItem
                        isShowCheck
                        changeState={() => {
                            changeCardType("user");
                        }}
                        isSelected={cardType == "user"}
                    ></CardItem>
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
                        value={cardType}
                        onValueChange={changeCardType}
                    >
                        <div className=" bg-white rounded-xl p-2">
                            <div className=" text-lg font-semibold  p-2 mb-1">包月畅想</div>
                            <RadioCard value="1" bgType="moon"></RadioCard>
                            <RadioCard value="2" bgType="moon"></RadioCard>
                            <RadioCard value="3" bgType="moon"></RadioCard>
                            <RadioCard value="4" bgType="moon"></RadioCard>
                        </div>
                        <div className=" bg-white rounded-xl p-2 ">
                            <div className=" text-lg font-semibold  p-2 mb-1">年度时长</div>
                            <RadioCard value="5" bgType="year"></RadioCard>
                            <RadioCard value="6" bgType="year"></RadioCard>
                            <RadioCard value="7" bgType="year"></RadioCard>
                            <RadioCard value="8" bgType="year"></RadioCard>
                        </div>
                    </RadioGroup>
                    {cardType && cardType != "user" && (
                        <div
                            className="text-93 text-xs cursor-pointer py-3"
                            onClick={() => {
                                changeCardType("");
                            }}
                        >
                            放弃优惠
                        </div>
                    )}
                </div>

                <div className="mt-5 mb-4 text-base">请选择支付方式</div>
                <div className=" py-3 text-base mb-3 w-full">
                    <RadioGroup orientation="horizontal">
                        <PaymentRadio value="weixin" type="weixin" text="微信支付">
                            微信支付
                        </PaymentRadio>
                        <PaymentRadio value="zhifubao" type="zhifubao" text="支付宝">
                            支付宝
                        </PaymentRadio>
                        <PaymentRadio value="yinlian" type="yinlian" text="银联">
                            银联
                        </PaymentRadio>
                    </RadioGroup>
                </div>
            </div>
            <BuyFooter submit={submit}></BuyFooter>
        </div>
    );
}
