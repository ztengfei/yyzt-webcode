// 上传音频后的订单结算界面
import { useEffect, useMemo, useRef, useState } from "react";
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
import { buyCard } from "@/api/api";

export default function Index() {
    // 时长卡类型
    const [cardType, setCardType] = useState({ id: "", type: "" });
    const router = useRouter();

    const [payType, changePayType] = useState(0);

    const { cardId, cardName, cardPrice, origPrice } = router.query;

    useEffect(() => {
        // 当前选中的界面，如果没有默认个人信息
        // userDurationList().then((res: any) => {
        //     if (res.data) {
        //         setUserCard(res.data);
        //     }
        // });
    }, []);

    const submit = () => {
        // 购买时长卡
        if (!payType) {
            return;
        }
        if (payType == 1) {
            Router.push({
                pathname: "/pay/weixinPage",
                query: { cardId: cardType.id, cardPrice: cardPrice }
            });

            return;
        }
        // 购买时长卡， 支付宝支付返回表单
        buyCard({ cardId: cardType.id, payType: payType }).then((res: any) => {
            // 使用市场卡支付
            // 跳转到支付列表
            const div = document.createElement("div");
            div.innerHTML = res.data;
            document.body.appendChild(div);
            let fromEl = div.querySelector("form");
            fromEl && fromEl.submit();
        });
    };

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-col w-full flex-1">
                <div className="text-base my-4">订单信息</div>
                <div className=" bg-white rounded-xl leading-[52px] pl-4 text-base">
                    <div className="mr-10 text-sm mt-5 font-semibold">{cardName}</div>
                    <span className="mr-10 text-bc text-xs">
                        购买数量: <span className="text-black">1</span>
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        有效期至: <span className="text-black">2024年1月12日</span>
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        原价: <span className="text-black">￥{origPrice}</span>
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        现价: <span className="text-black">{cardPrice}</span>
                    </span>
                </div>

                <div className="mt-5 mb-4 text-base">请选择支付方式</div>
                <div className=" py-3 text-base mb-3 w-full">
                    <RadioGroup
                        orientation="horizontal"
                        value={payType.toString()}
                        onValueChange={changePayType as any}
                    >
                        <PaymentRadio value={1} type="weixin" text="微信支付">
                            微信支付
                        </PaymentRadio>
                        <PaymentRadio value={2} type="zhifubao" text="支付宝">
                            支付宝
                        </PaymentRadio>
                        {/* <PaymentRadio value="yinlian" type="yinlian" text="银联">
                            银联
                        </PaymentRadio> */}
                    </RadioGroup>
                </div>
            </div>
            {/* 也页脚 */}
            <div className="h-[76px] bg-white w-full">
                <div className="h-[76px] mx-auto max-w-[1200px] flex flex-row justify-end  items-center">
                    <span className="text-sm text-93 mr-9">
                        活动折扣已减免:¥{Number(origPrice) - Number(cardPrice)}
                    </span>
                    <span className=" text-base text-black">
                        应付金额：<span className="text-f602">￥{cardPrice}</span>
                    </span>
                    <Button
                        color="primary"
                        className="w-[150px] h-[46px] ml-9 min-h-[46px]"
                        onClick={() => {
                            submit();
                        }}
                    >
                        确认支付
                    </Button>
                </div>
            </div>
        </div>
    );
}
