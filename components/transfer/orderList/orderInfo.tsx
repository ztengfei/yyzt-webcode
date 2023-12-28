// 人工精转订单状态
import { useRef, useState } from "react";
import { Image } from "@nextui-org/react";

export default function OrderState() {
    return (
        <>
            <div className="bg-white rounded-xl py-5 pl-4">
                <div className="text-base font-medium mb-4">
                    订单编号：PWmz23111016389CDDF3FE00008
                </div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                    <span className="text-bc">
                        提交时间：<span className="text-black">2023/11/10 16:38:22</span>
                    </span>
                    <span className="text-bc">
                        流畅度：<span className="text-black">过滤语气词，流程出稿</span>
                    </span>
                    <span className="text-bc">
                        订单类型：<span className="text-black">人工精转-中文</span>
                    </span>
                    <span className="text-bc">
                        音视频总时长：<span className="text-black">00:00:10</span>
                    </span>
                    <span className="text-bc">
                        时效：<span className="text-black">正常出稿</span>
                    </span>
                    <span className="text-bc">
                        审核状态：<span className="text-[#09C438]">已通过</span>
                    </span>
                    <span className="text-bc">
                        音视频数量：<span className="text-black">1</span>
                    </span>
                    <span className="text-bc">
                        标记：<span className="text-black">标记发音人角色，标记时间码</span>
                    </span>
                    <span className="text-bc">
                        订单金额：<span className="text-black">￥88</span>
                    </span>
                </div>
            </div>
        </>
    );
}
