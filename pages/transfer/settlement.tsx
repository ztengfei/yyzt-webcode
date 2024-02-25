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
import {
    orderDetail,
    userDurationList,
    cardList,
    orderJpPay,
    buyCard,
    orderRgPay
} from "@/api/api";
import { secondsToHMS } from "@/components/tool";

import styles from "./index.module.css";

export default function Index() {
    const allCardList = useRef([]);
    // 时长卡类型
    const [cardType, setCardType] = useState({ id: "", type: "" });
    const router = useRouter();
    const [userCard, setUserCard] = useState<any[]>([]);
    const [fileInfo, setDileInfo] = useState<any>({});
    const [moonCardList, setmoonCardList] = useState<any[]>([]);
    const [yearCardList, setYearCardList] = useState<any[]>([]);
    const [payType, changePayType] = useState(0);
    // 支付金额
    const [payPrice, setPayPrice] = useState("0.00");
    const orderId = router.query.order;
    console.log(" router.query.order++++", router.query.order);
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
        if (!orderId) {
            return;
        }
        // cha fileInfo.zxPrice
        orderDetail({ orderId: orderId }).then((res: any) => {
            res.data && setDileInfo(res.data);
            res.data && setPayPrice(res.data.zxPrice);
        });
    }, [orderId]);

    useEffect(() => {
        // 当前选中的界面，如果没有默认个人信息

        userDurationList().then((res: any) => {
            if (res.data) {
                setUserCard(res.data);
            }
        });
        cardList().then((res: any) => {
            const AllList = res.data;
            if (!AllList) {
                return;
            }
            const { moonList, yearList } = splitCard(AllList);
            setmoonCardList(moonList);
            setYearCardList(yearList);
            console.log(res);
        });
    }, []);

    const getCardItem = (id: string): any => {
        return allCardList.current.find((item: any) => {
            return item.id == id;
        });
    };

    // 购买时长卡
    const goByCard = () => {
        // 购买时长卡
        if (!payType) {
            return;
        }
        if (payType == 1) {
            // 购买时长卡使用微信支付，需要跳转到微信支付界面，微信支付返回链接
            let cardInfo = getCardItem(cardType.id);
            Router.push({
                pathname: "/pay/weixinPage",
                query: { cardId: cardType.id, cardPrice: cardInfo ? cardInfo.cardPrice : 0 }
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

    // 使用现金支付订单
    const payOrder = () => {
        if (payType == 1) {
            // 跳转到使用微信支付界面
            Router.push({
                pathname: "/pay/weixinPage",
                query: { order: orderId }
            });
            return;
        }
        // 直接使用支付宝支付
        orderRgPay({ id: orderId as string, payType: 2 }).then((res: any) => {
            // 使用市场卡支付
            // 跳转到支付列表
            const div = document.createElement("div");
            div.innerHTML = res.data.formUrl;
            document.body.appendChild(div);
            let fromEl = div.querySelector("form");
            fromEl && fromEl.submit();
        });
    };

    const submit = () => {
        // 支付方式都没有选择
        if (!cardType.type && !payType) {
            return;
        }
        // 没有选择时长卡支付或者购买时长卡支付
        if (!cardType.type && payType) {
            payOrder();

            return;
        }
        // 当前是机器转写，并且使用市场卡支付
        if (cardType.type == "user") {
            orderJpPay({ id: fileInfo.id, cardIds: [cardType.id] }).then((res: any) => {
                // 使用市场卡支付
                // 跳转到详情列表
                Router.push({
                    pathname: "/transfer/complete",
                    query: { order: orderId }
                });
            });
            return;
        } else {
            goByCard();
            return;
        }

        // 当前是人工转写，没有时长卡
        // if (fileInfo.zxFiles[0].zxType == 2) {
        //     orderRgPay({ id: fileInfo.id, payType: payType });
        // }

        // orderJpPay({});
        // Router.push({
        //     pathname: "/transfer/complete",
        //     query: { name: "Zeit" }
        // });
    };

    // 修改时长卡类型
    const changeCardType = (key: string, type?: string) => {
        if (!key) {
            setCardType({ id: "", type: "" });
            setPayPrice(fileInfo.zxPrice);
            return;
        }
        if (type == "user") {
            setPayPrice("0.00");
        } else {
            // 购买时长卡使用微信支付，需要跳转到微信支付界面，微信支付返回链接
            const cardInfo1 = getCardItem(cardType.id) || { cardPrice: "0.00" };
            setPayPrice(cardInfo1.cardPrice);
        }

        setCardType({ id: key, type: type || "newCard" });
    };

    const allTime = useMemo(() => {
        if (!fileInfo || !fileInfo.zxFiles || !fileInfo.zxFiles.length) {
            return 0;
        }
        let time = 0;
        fileInfo.zxFiles.forEach((item: any) => {
            time += item.fileTime;
        });
        return secondsToHMS(time);
    }, [fileInfo]);

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
                        共<span className=" text-f602"> {fileInfo.fileCount} </span>条音频进行转换
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        音频总时长: <span className="text-black">{allTime}</span>
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        转文字单价: <span className="text-black">{fileInfo.unitPrice}元/分钟</span>
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        交稿时间: <span className="text-black">预计提交后10分钟转写完成</span>
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        总价: <span className="text-f602">{fileInfo.zxPrice}元</span>
                    </span>
                </div>
                <div className="mt-5 mb-4">
                    <span>我的时长卡</span>
                    {userCard && userCard.length ? (
                        <span className=" text-f602">（已选）</span>
                    ) : (
                        <span className="text-bc">（暂无）</span>
                    )}
                </div>
                <div className="flex flex-row">
                    {userCard &&
                        userCard.map((item) => {
                            return (
                                <CardItem
                                    key={item.id}
                                    isShowCheck
                                    changeState={() => {
                                        changeCardType(item.id, "user");
                                    }}
                                    isSelected={cardType.id == item.id && cardType.type == "user"}
                                    bgType={item.cardName.indexOf("月") > -1 ? "moon" : "year"}
                                    // endDate={item.endDate}
                                    // cardName={item.cardName}
                                    // cardTime={item.cardTime}
                                    {...item}
                                ></CardItem>
                            );
                        })}
                </div>
                <div className="mt-5 mb-4">
                    <span>畅想套餐</span>
                </div>
                <div>
                    <RadioGroup
                        orientation="horizontal"
                        classNames={{
                            base: cn("flex-row flex-nowrap flex-1"),
                            wrapper: cn("flex-row flex-nowrap flex-1")
                        }}
                        value={cardType.type == "newCard" ? cardType.id : ""}
                        onValueChange={changeCardType}
                    >
                        <div className=" bg-white rounded-xl p-2 flex-1">
                            <div className=" text-lg font-semibold  p-2 mb-1">包月畅想</div>
                            {moonCardList.map((item: any) => {
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
                                        bgType="moon"
                                    ></RadioCard>
                                );
                            })}

                            {/* <RadioCard value="2" bgType="moon"></RadioCard>
                            <RadioCard value="3" bgType="moon"></RadioCard>
                            <RadioCard value="4" bgType="moon"></RadioCard> */}
                        </div>
                        <div className=" bg-white rounded-xl p-2 flex-1">
                            <div className=" text-lg font-semibold  p-2 mb-1">年度时长</div>

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
                                        bgType="year"
                                    ></RadioCard>
                                );
                            })}

                            {/* <RadioCard value="5" bgType="year"></RadioCard>
                            <RadioCard value="6" bgType="year"></RadioCard>
                            <RadioCard value="7" bgType="year"></RadioCard>
                            <RadioCard value="8" bgType="year"></RadioCard> */}
                        </div>
                    </RadioGroup>
                    {cardType.type == "newCard" && (
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
                    <RadioGroup
                        orientation="horizontal"
                        value={payType as any}
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
            <BuyFooter submit={submit} zxPrice={payPrice}></BuyFooter>
        </div>
    );
}
