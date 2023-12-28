// 人工精转订单状态
import { useRef, useState } from "react";
import { Image } from "@nextui-org/react";
import CustorChip from "@/components/common/custorChip";

export default function VideoList(props: { state: "success" | "error" }) {
    return (
        <>
            <div className="bg-white rounded-lg py-3 pl-4 text-base grid grid-cols-8 mb-3">
                <span className="col-span-2">新录音文件名称.mp3</span>
                <span className="text-93">时长: 00:08:12</span>
                <span>
                    {props.state == "success" ? (
                        <CustorChip color="success">已通过</CustorChip>
                    ) : (
                        <CustorChip color="error">未通过</CustorChip>
                    )}
                </span>
                <span className="col-span-3">
                    <span className=" text-93">原因: </span>
                    <span className="text-[#FF2828]">上传内容违反台规则，请重新上传</span>
                </span>
            </div>
        </>
    );
}
