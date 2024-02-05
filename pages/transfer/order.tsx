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
    Radio,
    RadioGroup
} from "@nextui-org/react";
import Router from "next/router";

import BuyFooter from "@/components/transfer/buyFooter";
import CardItem from "@/components/transfer/card/card";

import RadioCard from "@/components/transfer/card/radioCard";
import OrderState from "@/components/transfer/orderList/orderState";
import OrderInfo from "@/components/transfer/orderList/orderInfo";
import CustorChip from "@/components/common/custorChip";
import VideoList from "@/components/transfer/orderList/videoList";
import PaymentRadio from "@/components/common/paymentRadio";
import styles from "./index.module.css";

export default function Order() {
    const modalRef = useRef();
    const [selected, setSelected] = useState("people");

    const submit = () => {
        Router.push({
            pathname: "/transfer/complete",
            query: { name: "Zeit" }
        });
    };

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-col w-full flex-1">
                {/* 订单状态 */}
                <OrderState></OrderState>

                <div className="mt-5 mb-4 text-base">订单信息</div>
                <OrderInfo></OrderInfo>

                <div className="mt-5 mb-4 text-base">音频列表</div>
                <div>
                    <VideoList state="error"></VideoList>
                    <VideoList state="success"></VideoList>
                    {/* <div className="bg-white rounded-lg py-3 pl-4 text-base grid grid-cols-8 mb-3">
                        <span className="col-span-2">新录音文件名称.mp3</span>
                        <span className="text-93">时长: 00:08:12</span>
                        <span>
                            <CustorChip color="error">未通过</CustorChip>
                        </span>
                        <span className="col-span-3">
                            <span className=" text-93">原因: </span>
                            <span className="text-[#FF2828]">上传内容违反台规则，请重新上传</span>
                        </span>
                    </div> */}
                    {/* <div className="bg-white rounded-xl py-5 pl-4 text-base grid grid-cols-8">
                        <span className="col-span-2">新录音文件名称.mp3</span>
                        <span className="text-93">时长: 00:08:12</span>
                        <div>
                            <CustorChip color="success">已通过</CustorChip>
                        </div>
                        <span className="col-span-3">
                            <span className=" text-93">原因: </span>
                            <span className="text-[#FF2828]">上传内容违反台规则，请重新上传</span>
                        </span>
                    </div> */}
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
