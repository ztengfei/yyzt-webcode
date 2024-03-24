import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";
import toast from "react-hot-toast";

// import ActiveIcon from "@/components/icon/active";
// import DeleteIcon from "@/components/icon/delete";
// import LanguageSelect from "./../langSelect";

import { fyOrderInfo } from "@/api/api";

interface footerType {
    orderId: string;
    setUploadState: React.Dispatch<React.SetStateAction<string>>;
}

// 文件上传成功
export default function Loding(props: footerType) {
    const { orderId, setUploadState } = props;

    const loopTimer1Ref = useRef<number>();

    const getOrderData = () => {
        fyOrderInfo({ id: orderId }).then((res: any) => {
            if (!res.data) {
                toast.error("订单详情获取失败，请刷新重试");
                return;
            }
            LoopGetFiles(res.data);
        });
    };

    const LoopGetFiles = (data) => {
        clearTimeout(loopTimer1Ref.current);
        if (data.fyStatus == 3) {
            loopTimer1Ref.current = window.setTimeout(() => {
                getOrderData();
            }, 1000);
        } else if (data.fyStatus == 4) {
            setUploadState("translateSuccess"); //文件解析成功
        } else if (data.fyStatus == 5) {
            toast.error("文件解析失败");
            setUploadState(""); //文件解析成功
        }
    };

    useEffect(() => {
        getOrderData();
        return () => {
            clearTimeout(loopTimer1Ref.current);
        };
    }, [orderId]);

    return (
        <>
            <div className=" absolute left-0 top-0 w-full h-full flex items-center flex-col justify-center">
                <CircularProgress
                    aria-label="Loading..."
                    size="lg"
                    // value={80}
                    color="primary"
                    // showValueLabel={true}
                    // className="mt-[95px]"
                    classNames={{
                        svg: "w-[60px] h-[60px] drop-shadow-md"
                        // indicator: "stroke-white",
                        // track: "stroke-white/10",
                        // value: "text-3xl font-semibold text-white",
                    }}
                />
                <div className="text-center text-[#333] mt-1">正在翻译中,请稍等...</div>
                {/* <Button className=" bg-white text-[#333] mt-3">取消</Button> */}
            </div>
        </>
    );
}
