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
    fyOrderPay,
    buyCard,
    orderRgPay,
    payStateQuery,
    orderPay
} from "@/api/api";

import CloseIcon from "@/components/icon/close";
import toast from "react-hot-toast";

export default function Order(props: any) {
    const { orderId, setShowPay, paySuccess, payType } = props;

    const timerRef = useRef<number>();
    const payTimerRef = useRef<number>();
    // 二维码过期时间
    const countNum = useRef(60);

    // 支付成功等待跳转的时间
    const jumpNumRef = useRef(3);

    // const [fileInfo, setDileInfo] = useState({});
    const [payOrderNum, setPayOrderNum] = useState("");
    const canvasRef = useRef();

    const [payState, setPayState] = useState(0);

    const [GQTime, setGQTime] = useState(60);

    const router = useRouter();

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
                    paySuccess(payStatus);
                } else {
                    getPayState(payOrderNum);
                }
            });
        }, 1000);
    };

    const buyCardUrl = () => {
        // 购买时长卡， 支付宝支付返回表单
        fyOrderPay({ id: orderId as string, payType: 1 }).then((res: any) => {
            if (!res.data) {
                toast.error("订单不可支付！");
                return;
            }
            createQrCode(res.data.formUrl);
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

    const createQrCode = (url: string) => {
        //
        if (!canvasRef.current) {
            return;
        }
        // 'weixin://wxpay/bizpayurl?pr=Cb0rSoIzz'
        QRCode.toDataURL(
            canvasRef.current,
            url,
            { width: 148 },
            function (error: any, url: string) {
                if (error) console.error(error);
                // console.log("success!", url);
            }
        );
    };

    useEffect(() => {
        buyCardUrl();
    }, []);

    // 刷新url
    const refreshUrl = () => {
        clearTimeout(payTimerRef.current);
        setGQTime(60);
        countNum.current = 60;
        buyCardUrl();
    };

    return (
        <div className="w-full justify-center items-center flex flex-col min-h-full bg-[rgba(0,0,0,.68)]">
            <div className="flex flex-col flex-1 justify-center items-center">
                <Button
                    isIconOnly
                    radius="full"
                    className="w-[30px] h-[30px] min-w-[30px] bg-transparent mb-2"
                    onClick={() => {
                        setShowPay(false);
                    }}
                >
                    <CloseIcon size={30}></CloseIcon>
                </Button>
                <div className="w-[148px] h-[148px] relative bg-white mb-2">
                    <canvas width={148} height={148} ref={canvasRef as any}></canvas>
                    {!GQTime && (
                        <div className=" absolute left-0 top-0 w-full h-full bg-black4 text-xs flex justify-center items-center">
                            <span
                                className=" bg-[#f1f2f7] px-4 py-2 cursor-pointer"
                                onClick={refreshUrl}
                            >
                                点击重新获取二维码
                            </span>
                        </div>
                    )}
                </div>
                <div className="text-[#fff] text-sm">
                    使用手机{payType == 1 ? "微信" : "支付宝"}APP扫码支付，立即翻译
                </div>
            </div>
        </div>
    );
}
