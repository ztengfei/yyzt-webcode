import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";
import toast from "react-hot-toast";

import ActiveIcon from "@/components/icon/active";

import { fyOrderInfo, fyOrderDownload } from "@/api/api";

interface footerType {
    orderId: string;
    setUploadState: React.Dispatch<React.SetStateAction<string>>;
}

// 文件转写成功
export default function TranslateSuccess(props: footerType) {
    const { orderId, setUploadState } = props;

    const [orderInfo, setOrderInfo] = useState<any>({});

    const getOrderData = () => {
        fyOrderInfo({ id: orderId }).then((res: any) => {
            if (!res.data) {
                toast.error("订单详情获取失败，请刷新重试");
                return;
            }
            setOrderInfo(res.data);
        });
    };

    useEffect(() => {
        getOrderData();
    }, [orderId]);

    const downloadFile = () => {
        fyOrderDownload({ id: orderId }).then((res: any) => {
            if (!res.data) {
                toast.error("获取下载地址失败");
            }
            // 创建一个新的a元素
            var a = document.createElement("a");
            // 设置a元素的href属性为文件的URL
            a.href = res.data;
            // 将a元素添加到文档中，但不需要真的添加到DOM中
            document.body.appendChild(a);
            // 模拟点击a元素以触发下载
            a.click();
            // 下载完成后，从文档中移除a元素
            document.body.removeChild(a);
        });
    };

    return (
        <>
            <div className=" absolute left-0 top-0 w-full h-full flex items-center flex-col p-3">
                <div className="text-sm text-active text-right flex flex-row items-center justify-end w-full">
                    <ActiveIcon size={14} className="mr-1"></ActiveIcon>翻译完成
                </div>
                <div className="w-[58px] h-[58px] relative mx-auto mt-[100px]">
                    <Image width={58} alt="xsl" className="z-0" src="/images/translate/xsl.png" />
                    <ActiveIcon
                        size={20}
                        className="absolute bottom-[-5px] right-[-7px]"
                    ></ActiveIcon>
                </div>
                <div className="flex flex-row w-full mt-4 justify-center items-center">
                    <div className="whitespace-nowrap overflow-ellipsis overflow-hidden text-[#333333]">
                        {orderInfo.fileName || ""}
                    </div>
                </div>

                <Button className="w-[274px] h-[44px] mt-8" color="primary" onClick={downloadFile}>
                    下载文件
                </Button>
                <Button
                    className="w-[274px] h-[44px] mt-4"
                    color="primary"
                    variant="bordered"
                    onClick={() => {
                        setUploadState && setUploadState("");
                    }}
                >
                    上传新文件
                </Button>
            </div>
        </>
    );
}
