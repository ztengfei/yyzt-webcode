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
    orderRgPay,
    buyCardToPay,
    getMoney,
    orderPay
} from "@/api/api";
import { secondsToHMS } from "@/components/tool";

import styles from "./index.module.css";
import toast from "react-hot-toast";

export default function Index() {
    const allCardList = useRef([]);
    // 时长卡类型
    const [cardId, setCardId] = useState("");
    // 选择了自己的时长卡
    const [selectUserCard, setSelectUserCard] = useState<string[]>([]);

    // 是否展示 购买时长卡和支付按钮
    const [isShowPay, setIsShowPay] = useState<boolean>(true);

    const router = useRouter();
    const [userCard, setUserCard] = useState<any[]>([]);
    const [fileInfo, setDileInfo] = useState<any>({});
    const [moonCardList, setmoonCardList] = useState<any[]>([]);
    const [yearCardList, setYearCardList] = useState<any[]>([]);
    const [payType, changePayType] = useState(1);
    // 支付金额
    const [payAmount, setPayAmount] = useState("0.00");
    const orderId = router.query.order;
    const splitCard = (allList: any, time) => {
        let moonList: any[] = [];
        let yearList: any[] = [];
        allList.forEach((element: any) => {
            // 如果时长卡时间小于转写的音频总时长，则不展示对应的时长卡
            if (element.usableTime < time) {
                return;
            }
            if (element.cardType == 1 || element.cardType == 13) {
                moonList.push(element);
            } else {
                yearList.push(element);
            }
        });
        allCardList.current = allList;
        return { moonList, yearList };
    };

    const getCardList = (data) => {
        cardList().then((res: any) => {
            const AllList = res.data;
            if (!AllList) {
                return;
            }

            const fileAllTIme = getAllTime(data);
            const { moonList, yearList } = splitCard(AllList, fileAllTIme);
            setmoonCardList(moonList);
            setYearCardList(yearList);
            console.log(res);
        });
    };

    useEffect(() => {
        if (!orderId) {
            return;
        }
        // cha fileInfo.zxPrice
        orderDetail({ orderId: orderId }).then((res: any) => {
            res.data && setDileInfo(res.data);
            // res.data && setPayPrice(res.data.zxPrice);
            getCardList(res.data);
        });
    }, [orderId]);

    const getAllTime = (fileData) => {
        if (!fileData || !fileData.zxFiles || !fileData.zxFiles.length) {
            return 0;
        }
        let time = 0;
        fileData.zxFiles.forEach((item: any) => {
            time += item.fileTime;
        });
        return time;
    };

    useEffect(() => {
        // 当前选中的界面，如果没有默认个人信息

        userDurationList().then((res: any) => {
            if (res.data) {
                setUserCard(res.data);
            }
        });
    }, []);

    const getCardItem = (id: string): any => {
        return allCardList.current.find((item: any) => {
            return item.id == id;
        });
    };

    // 购买时长卡
    const goByCard_back = () => {
        // 购买时长卡
        if (!payType) {
            return;
        }
        if (payType == 1) {
            // 购买时长卡使用微信支付，需要跳转到微信支付界面，微信支付返回链接
            let cardInfo = getCardItem(cardId);
            Router.push({
                pathname: "/pay/weixinPage",
                query: {
                    cardId: cardId,
                    cardPrice: cardInfo ? cardInfo.cardPrice : 0,
                    order: orderId,
                    p: "tlem"
                }
            });

            return;
        }
        // 购买时长卡， 支付宝支付返回表单
        buyCard({ cardId: cardId, payType: payType }).then((res: any) => {
            // 使用市场卡支付
            // 跳转到支付列表
            const div = document.createElement("div");
            div.innerHTML = res.data;
            document.body.appendChild(div);
            let fromEl = div.querySelector("form");
            fromEl && fromEl.submit();
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
            let cardInfo = getCardItem(cardId);
            Router.push({
                pathname: "/pay/weixinPage",
                query: {
                    cardId: cardId,
                    cardPrice: cardInfo ? cardInfo.cardPrice : 0,
                    order: orderId,
                    chooseCards: selectUserCard.join(","),
                    p: "DM"
                }
            });

            return;
        }
        // 购买时长卡， 支付宝支付返回表单
        buyCardToPay({
            cardId: cardId,
            payType: payType,
            zxOrderId: orderId as string,
            chooseCards: selectUserCard
        }).then((res: any) => {
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
                query: { order: orderId, p: "m" }
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
        orderPay({
            id: orderId as string,
            cardIds: selectUserCard,
            buyCardId: cardId,
            payType
        }).then((res: any) => {
            if (res.code != 200) {
                toast.error(res.msg);
                return;
            }
            if (res.data.payStatus == 1) {
                // 使用市场卡支付
                // 跳转到详情列表
                Router.push({
                    pathname: "/transfer/complete",
                    query: { order: orderId }
                });
            }

            if (payType == 1) {
                // 购买时长卡使用微信支付，需要跳转到微信支付界面，微信支付返回链接
                Router.push({
                    pathname: "/pay/weixinPage",
                    query: {
                        cardId: cardId,
                        cardPrice: payAmount,
                        order: orderId, // 订单id
                        chooseCards: selectUserCard.join(","), // 选择的时长卡
                        p: "DM"
                        // payOrderNum: res.data.payOrderNum // 订单号
                    }
                });

                return;
            }
        });
    };

    const submit_back = () => {
        // 纯现金支付
        if (!selectUserCard && !cardId && payType) {
            payOrder();
        }

        // 选中我的时长卡时长卡的总时长
        let cardAllTime = 0;
        userCard.forEach((item) => {
            if (selectUserCard.includes(item.id)) {
                cardAllTime += item.cardTime.usableTime;
            }
        });
        // 选择了自己的时长卡 已经购买的时长卡足够使用
        if (cardAllTime >= allTime) {
            // 时长足够使用时长卡支付
            orderJpPay({ id: fileInfo.id, cardIds: selectUserCard }).then((res: any) => {
                // 使用市场卡支付
                // 跳转到详情列表
                Router.push({
                    pathname: "/transfer/complete",
                    query: { order: orderId }
                });
                return;
            });
            return "0.00";
        }

        // 购买时长卡的时长
        let payCardTime = 0;
        let payCardPrice = 0; // 购买时长卡的价钱
        if (cardId) {
            const cardInfo = getCardItem(cardId);
            payCardPrice += cardInfo.cardPrice;
            payCardTime += cardInfo.usableTime;
        }

        // 剩余时长
        const surplus = allTime - cardAllTime - payCardTime;
        // 新购买的时长卡足够支付，则只需要支付时长卡的费用
        if (surplus <= 0) {
            // 如果以购买时长卡的方式支付
            goByCard();
            return;
        }
    };

    // 修改时长卡类型
    const changeCardType = (key: string, type?: string) => {
        if (!key) {
            setCardId("");
            return;
        }
        setCardId(key);
    };

    // 上传的全部音频时间
    const allTime = useMemo(() => {
        return getAllTime(fileInfo);
        // if (!fileInfo || !fileInfo.zxFiles || !fileInfo.zxFiles.length) {
        //     return 0;
        // }
        // let time = 0;
        // fileInfo.zxFiles.forEach((item: any) => {
        //     time += item.fileTime;
        // });
        // return time;
        // return 60000;
    }, [fileInfo]);

    const changeUserCard = (id) => {
        const cardIds = [...selectUserCard];
        const index = cardIds.indexOf(id);
        if (index == -1) {
            cardIds.push(id);
        } else {
            cardIds.splice(index, 1);
        }
        // 获取选中时长卡的总时长
        // setIsShowPay(false)
        let cardAllTime = 0;
        userCard.forEach((item) => {
            if (cardIds.includes(item.id)) {
                cardAllTime += item.cardTime.usableTime;
            }
        });
        console.log("已选择时长卡时间+++", cardAllTime, allTime);
        if (cardAllTime > (allTime as number)) {
            setIsShowPay(false);
            changeCardType("");
        } else {
            setIsShowPay(true);
        }

        setSelectUserCard([...cardIds]);
    };

    const getSelectedRend = () => {
        if (userCard && userCard.length) {
            if (selectUserCard.length) {
                return <span className=" text-f602">（已选）</span>;
            }
            return "";
        } else {
            return <span className="text-bc">（暂无）</span>;
        }
    };

    const payPrice = useMemo(() => {
        // 选中我的时长卡时长卡的总时长
        let cardAllTime = 0;
        userCard.forEach((item) => {
            if (selectUserCard.includes(item.id)) {
                cardAllTime += item.cardTime.usableTime;
            }
        });
        // 已经购买的时长卡足够使用
        if (cardAllTime >= allTime) {
            return "0.00";
        }

        // 购买时长卡的时长
        let payCardTime = 0;
        let payCardPrice = 0; // 购买时长卡的价钱
        if (cardId) {
            const cardInfo = getCardItem(cardId);
            payCardPrice += cardInfo.cardPrice;
            payCardTime += cardInfo.usableTime;
        }

        // 剩余时长
        const surplus = allTime - cardAllTime - payCardTime;
        // 新购买的时长卡足够支付，则只需要支付时长卡的费用
        if (surplus <= 0) {
            return payCardPrice.toString();
        }
        // 旧时长卡时间 + 新购买时长卡时间，不够支付转写时间，则按照单价计费
        const payNum = Math.ceil(surplus / 60) * fileInfo.unitPrice;
        console.log(
            "Math.ceil(surplus/60), surplus",
            Math.ceil(surplus / 60),
            surplus,
            allTime,
            cardAllTime,
            payCardTime
        );
        return (payCardPrice + payNum).toString();
        // 单价 unitPrice
        // console.log('allTime, payCardTime, payCardPrice, cardAllTime, fileInfo', allTime, payCardTime, payCardPrice, cardAllTime, fileInfo);
    }, [fileInfo, userCard, cardId, selectUserCard]);

    // 获取支付金额

    useEffect(() => {
        getMoney({
            id: orderId as string,
            cardIds: selectUserCard,
            buyCardId: cardId
        }).then((res: any) => {
            if (res.code == 200) {
                setPayAmount(res.data.payAmount);
            }
            console.log("res++++", res);
        });
        // return (payCardPrice + payNum).toString();
    }, [fileInfo, userCard, cardId, selectUserCard, orderId]);

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-col w-full flex-1">
                <div className="text-base my-4">订单信息</div>
                <div className=" bg-white rounded-xl leading-[52px] pl-4">
                    <span className="mr-10 text-sm font-medium">
                        共<span className=" text-f602"> {fileInfo.fileCount} </span>条音频进行转换
                    </span>
                    <span className="mr-10 text-bc text-xs">
                        音频总时长: <span className="text-black">{secondsToHMS(allTime)}</span>
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
                    {getSelectedRend()}
                </div>
                <div className="flex flex-row">
                    {userCard &&
                        userCard.map((item) => {
                            return (
                                <CardItem
                                    key={item.id}
                                    isShowCheck
                                    changeState={() => {
                                        changeUserCard(item.id);
                                    }}
                                    isSelected={selectUserCard.includes(item.id)}
                                    bgType={item.cardName.indexOf("月") > -1 ? "moon" : "year"}
                                    {...item}
                                ></CardItem>
                            );
                        })}
                </div>
                {isShowPay && (
                    <div>
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
                                value={cardId}
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
                                </div>
                            </RadioGroup>
                            {cardId && (
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
                    </div>
                )}

                {isShowPay && (
                    <div>
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
                )}
            </div>
            <BuyFooter submit={submit} zxPrice={payAmount}></BuyFooter>
        </div>
    );
}
