import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";
import toast from "react-hot-toast";

import ActiveIcon from "@/components/icon/active";
import DeleteIcon from "@/components/icon/delete";
import LanguageSelect from "./../langSelect";

import { fyFileQuery } from "@/api/api";

interface footerType {
    uploadId: string;
    setUploadState: React.Dispatch<React.SetStateAction<string>>;
}

// 文件上传成功
export default function Loding(props: footerType) {
    const { uploadId, setUploadState } = props;

    const loopTimerRef = useRef<number>();

    const getOrderData = () => {
        fyFileQuery({ id: uploadId })
            .then((res: any) => {
                if (!res.data) {
                    toast.error("订单详情获取失败，请刷新重试");
                    return;
                }
                LoopGetFiles(res.data);
            })
            .catch(() => {
                setUploadState(""); //文件解析成功
            });
    };

    const LoopGetFiles = (data) => {
        clearTimeout(loopTimerRef.current);
        if (data.parseStatus == 1 || data.parseStatus == 0) {
            loopTimerRef.current = window.setTimeout(() => {
                getOrderData();
            }, 500);
        } else if (data.parseStatus == 2) {
            setUploadState("analysisSuccess"); //文件解析成功
        } else if (data.parseStatus == 3) {
            toast.error("文件解析失败");
            setUploadState(""); //文件解析成功
        }
    };

    useEffect(() => {
        getOrderData();
        return () => {
            clearTimeout(loopTimerRef.current);
        };
    }, [uploadId]);

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
                <div className="text-center text-[#333] mt-1">文档解析中,请稍等...</div>
                {/* <Button className=" bg-white text-[#333] mt-3">取消</Button> */}
            </div>
        </>
    );
}
