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
    Radio,
    RadioGroup
} from "@nextui-org/react";
import Router, { useRouter } from "next/router";

import BuyFooter from "@/components/transfer/buyFooter";

import RadioCard from "@/components/transfer/card/radioCard";
import OrderState from "@/components/transfer/orderList/orderState";
import OrderInfo from "@/components/transfer/orderList/orderInfo";
import CustorChip from "@/components/common/custorChip";
import VideoList from "@/components/transfer/orderList/videoList";
import PaymentRadio from "@/components/common/paymentRadio";

import { orderDetail, userDurationList, cardList, orderJpPay, orderRgPay } from "@/api/api";

import styles from "./index.module.css";

export default function Order() {
    const modalRef = useRef();
    const [fileInfo, setDileInfo] = useState<any>({});

    // 支付类型
    const [payType, changePayType] = useState(0);

    const router = useRouter();
    const orderId = router.query.order;

    const submit = () => {
        Router.push({
            pathname: "/transfer/complete",
            query: { name: "Zeit" }
        });
    };

    useEffect(() => {
        if (!orderId) {
            return;
        }
        // cha
        orderDetail({ orderId: orderId }).then((res: any) => {
            res.data && setDileInfo(res.data);
        });
    }, [orderId]);

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-col w-full flex-1">
                {/* 订单状态 */}
                <OrderState></OrderState>

                <div className="mt-5 mb-4 text-base">订单信息</div>
                <OrderInfo {...fileInfo}></OrderInfo>

                <div className="mt-5 mb-4 text-base">音频列表</div>
                <div>
                    {fileInfo.zxFiles &&
                        !!fileInfo.zxFiles.length &&
                        fileInfo.zxFiles.map((item: any, index: number) => {
                            return <VideoList key={item.id} {...item}></VideoList>;
                        })}
                </div>

                {/* 内容状态是待支付时展示支付方式 */}
                {fileInfo.zxStatus == 2 && (
                    <div className="mt-5 mb-4 text-base">请选择支付方式</div>
                )}
                {fileInfo.zxStatus == 2 && (
                    <div className=" py-3 text-base mb-3 w-full">
                        <RadioGroup
                            orientation="horizontal"
                            value={payType as unknown as string}
                            onValueChange={changePayType as any}
                        >
                            <PaymentRadio value={1} type="weixin" text="微信支付">
                                微信支付
                            </PaymentRadio>
                            <PaymentRadio value={2} type="zhifubao" text="支付宝">
                                支付宝
                            </PaymentRadio>
                        </RadioGroup>
                    </div>
                )}
            </div>
            {fileInfo.zxStatus == 2 && <BuyFooter submit={submit} zxPrice={"0.00"}></BuyFooter>}
        </div>
    );
}
