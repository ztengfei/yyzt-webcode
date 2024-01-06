// 人工精转订单完成界面订单详情
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
                        订单类型：<span className="text-black">人工精转-中文</span>
                    </span>
                    <span className="text-bc">
                        实付金额：<span className="text-black">￥0.00</span>
                    </span>
                    <span className="text-bc">
                        音视频总时长：<span className="text-black">00:00:10</span>
                    </span>

                    <span className="text-bc">
                        订单状态：<span className="text-[#09C438]">已完成</span>
                    </span>

                    <span className="text-bc">
                        支付方式：<span className="text-black">时长卡抵扣/包月时长抵扣</span>
                    </span>
                    <span className="text-bc">
                        音频数量：<span className="text-black">1</span>
                    </span>
                    <span className="text-bc">
                        订单金额：<span className="text-black">￥88</span>
                    </span>
                </div>
            </div>
        </>
    );
}
