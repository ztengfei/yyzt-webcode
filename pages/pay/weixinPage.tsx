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
import QRCode from "qrcode";

import {
    orderDetail,
    userDurationList,
    cardList,
    orderJpPay,
    buyCard,
    orderRgPay,
    payStateQuery
} from "@/api/api";

export default function Order() {
    const timerRef = useRef<number>();
    const payTimerRef = useRef<number>();
    // 二维码过期时间
    const countNum = useRef(60);

    // 支付成功等待跳转的时间
    const jumpNumRef = useRef(3);
    const [jumpNum, setJumpMum] = useState(3);
    const jumpTime = useRef<number>();

    // const [fileInfo, setDileInfo] = useState({});
    const [payOrderNum, setPayOrderNum] = useState("");
    const canvasRef = useRef();

    const [payState, setPayState] = useState(0);

    const [GQTime, setGQTime] = useState(60);

    const router = useRouter();
    // 订单id
    const orderId = router.query.order;
    // 市场卡Id
    const cardId = router.query.cardId;
    // 市场卡价格
    const cardPrice = router.query.cardPrice;

    // 跳转到支付订单信息界面
    const jumpToTargetPage = () => {
        if (orderId) {
            // 如果是转写订单则跳转到订单详情
            // 当前页面类型
            Router.push({
                pathname: "/transfer/complete",
                query: { order: orderId }
            });
        }
    };

    // 剩余多长时间跳转页面
    const changeJumpTime = () => {
        setJumpMum(jumpNumRef.current);
        jumpTime.current = window.setTimeout(() => {
            jumpNumRef.current--;
            if (jumpNumRef.current <= 0) {
                setJumpMum(0);
                clearTimeout(jumpNumRef.current);
                // router.back();
                jumpToTargetPage();
                // 直接跳转页面
                return;
            }
            setJumpMum(jumpNumRef.current);
            changeJumpTime();
        }, 1000);
    };

    // 距离二维码过期还剩56秒，过期后请刷新页面重新获取二维码。
    const setGQText = () => {
        setGQTime(countNum.current);
        timerRef.current = window.setTimeout(() => {
            countNum.current--;
            if (countNum.current <= 0) {
                setGQTime(0);
                countNum.current = 0;
                clearTimeout(timerRef.current);
                return;
            }
            setGQText();
        }, 1000);
    };

    // 定时请求订单支付状态  payOrderNum  0未支付 1支付中 2成功 3失败
    const getPayState = (payOrderNum: string) => {
        clearTimeout(payTimerRef.current);
        payTimerRef.current = window.setTimeout(() => {
            payStateQuery({ payOrderNum }).then((res: any) => {
                const { payStatus } = res.data || {};
                if (payStatus == 2) {
                    // 支付成功
                    setPayState(payStatus);
                    changeJumpTime();
                } else {
                    getPayState(payOrderNum);
                }
            });
        }, 1000);
    };

    const buyCardUrl = () => {
        // 获取微信支付链接
        if (!cardId) {
            return;
        }
        // 购买时长卡， 支付宝支付返回表单
        buyCard({ cardId: cardId as string, payType: 1 }).then((res: any) => {
            createQrCode(res.data.formUrl);
            setPayOrderNum(res.data.payOrderNum);
            getPayState(res.data.payOrderNum);
            setGQText();
        });
    };
    useEffect(() => {
        return () => {
            clearTimeout(payTimerRef.current);
            clearTimeout(timerRef.current);
            clearTimeout(jumpNumRef.current);
        };
    }, []);

    useEffect(() => {
        buyCardUrl();
    }, [cardId]);

    const createQrCode = (url: string) => {
        //
        if (!canvasRef.current) {
            return;
        }
        // 'weixin://wxpay/bizpayurl?pr=Cb0rSoIzz'
        QRCode.toDataURL(
            canvasRef.current,
            url,
            { width: 300 },
            function (error: any, url: string) {
                if (error) console.error(error);
                // console.log("success!", url);
            }
        );
    };

    const buyTransfereUrl = () => {
        // 获取微信支付链接
        if (!orderId) {
            return;
        }
        // 购买时长卡， 支付宝支付返回表单
        orderRgPay({ id: orderId as string, payType: 1 }).then((res: any) => {
            console.log("res.code+++", res.code);
            if (res.code == 201) {
                setPayState(201); // 订单已经支付完成
                changeJumpTime();
                return;
            }
            createQrCode(res.data.formUrl);
            setPayOrderNum(res.data.payOrderNum);
            getPayState(res.data.payOrderNum);
            setGQText();
        });
    };

    useEffect(() => {
        if (!orderId) {
            return;
        }
        buyTransfereUrl();
        // cha
        // orderDetail({ orderId: orderId }).then((res) => {
        //     res.data && setDileInfo(res.data);
        // });
    }, [orderId]);

    // 刷新url
    const refreshUrl = () => {
        setGQTime(60);
        countNum.current = 60;
        buyCardUrl();
    };

    if (payState == 201) {
        return (
            <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
                <div className=" mx-auto max-w-[900px] flex flex-col w-full flex-1 justify-center items-center">
                    <Image src="/images/pay/par_success.png" width={127} height={127}></Image>
                    <span className=" text-xl">订单不可支付!</span>
                    <span className=" text-base text-[#9d9d9d]">
                        页面将在<span className=" text-f602">{jumpNum}秒</span>后跳转
                    </span>
                </div>
            </div>
        );
    }

    if (payState == 2) {
        return (
            <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
                <div className=" mx-auto max-w-[900px] flex flex-col w-full flex-1 justify-center items-center">
                    <Image src="/images/pay/par_success.png" width={127} height={127}></Image>
                    <span className=" text-xl">恭喜您,订单支付成功!</span>
                    <span className=" text-base text-[#9d9d9d]">
                        页面将在<span className=" text-f602">{jumpNum}秒</span>后跳转
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[900px] flex flex-col w-full flex-1">
                <div className=" text-sm text-[#333] flex flex-row justify-between mb-9">
                    {orderId && <div>订单提交成功，请尽快付款！订单号：{payOrderNum}</div>}
                    {Number(cardPrice) && (
                        <div>
                            应付金额<span className="text-[#e31613] text-lg">{cardPrice}</span>元
                        </div>
                    )}
                </div>
                <div className=" px-8 py-3 bg-white shadow-topx2 flex flex-row">
                    <div className="flex flex-row">
                        <div className=" text-66 text-lg">微信支付</div>
                    </div>
                    <div className="flex flex-row flex-1 justify-center">
                        <div>
                            {GQTime != 0 && (
                                <div className="text-xs mt-2">
                                    距离二维码过期还剩
                                    <span className="text-[#e31613] ">{GQTime}</span>
                                    秒，过期后请刷新页面重新获取二维码。
                                </div>
                            )}
                            {!GQTime && (
                                <div className="text-[#e31613] text-xs mt-2">
                                    二维码已过期，
                                    <span
                                        className="text-[#67a4ff]  cursor-pointer"
                                        onClick={refreshUrl}
                                    >
                                        刷新
                                    </span>
                                    页面重新获取二维码。
                                </div>
                            )}
                            {payState == 1 && (
                                <span className="text-xs mt-2 ml-2">订单支付中...</span>
                            )}
                            {payState == 3 && (
                                <span className="text-xs mt-2 ml-2">订单支付失败</span>
                            )}
                            <div className="w-[300px] h-[300px] relative">
                                <canvas width={300} height={300} ref={canvasRef as any}></canvas>
                                {!GQTime && (
                                    <div className=" absolute left-0 top-0 w-full h-full bg-black4 text-xs flex justify-center items-center">
                                        <span
                                            className=" bg-[#f1f2f7] px-4 py-2 cursor-pointer"
                                            onClick={refreshUrl}
                                        >
                                            获取失败 点击重新获取二维码
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="bg-[#ff7674] flex flex-row items-center justify-center py-1">
                                <Image
                                    src="/images/pay/pc_icon_icon-red.png"
                                    width={48}
                                    height={48}
                                ></Image>
                                <div className="ml-3 text-white">
                                    <p>请使用微信扫一扫</p>
                                    <p>扫描二维码支付</p>
                                </div>
                            </div>
                        </div>
                        <div className=" w-[329px] h-[421px] bg-weixin m-l-[50px] bg-no-repeat bg-cover mt-5"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
