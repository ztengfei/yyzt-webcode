// 人工精转订单状态
import { useRef, useMemo } from "react";
import { Image } from "@nextui-org/react";

import { secondsToHMS } from "@/components/tool";

export default function OrderState(props: any) {
    const {
        orderNum,
        createTime,
        zxSpeed,
        zxRemarks,
        zxFiles,
        zxFlow,
        lanFrom,
        zxPrice,
        zxStatus
    } = props;

    const getMarkText = () => {
        let text = []; //
        if (zxRemarks.indexOf("buenos-aires") > -1) {
            text.push("标记发音人角色");
        }
        if (zxRemarks.indexOf("sydney") > -1) {
            text.push("标记时间码");
        }
        return text.join("，");
    };

    const allTime = useMemo(() => {
        if (!zxFiles || !zxFiles.length) {
            return 0;
        }
        let time = 0;
        zxFiles.forEach((item) => {
            time += item.fileTime;
        });
        return secondsToHMS(time);
    }, [zxFiles]);

    const getState = () => {
        const stateMap = {
            0: "取消",
            1: "审核中",
            2: "待支付",
            3: "待转写",
            4: "已完成",
            5: "转写失败"
        };
        return stateMap[zxStatus] || "";
        // 0取消 1新建  2待支付 3待转写 4完成 5转写失败
    };

    return (
        <>
            <div className="bg-white rounded-xl py-5 pl-4">
                <div className="text-base font-medium mb-4">订单编号：{orderNum}</div>
                <div className="grid grid-cols-3 gap-3 text-sm">
                    <span className="text-bc">
                        {/* 2023/11/10 16:38:22 */}
                        提交时间：<span className="text-black">{createTime}</span>
                    </span>
                    <span className="text-bc">
                        流畅度：
                        <span className="text-black">
                            {zxFlow == "noSrgent"
                                ? "过滤语气词，流畅出稿"
                                : "内容不做修改,逐字逐句"}
                        </span>
                    </span>

                    <span className="text-bc">
                        订单类型：<span className="text-black">人工精转-{lanFrom}</span>
                    </span>
                    <span className="text-bc">
                        音视频总时长：<span className="text-black">{allTime}</span>
                    </span>
                    <span className="text-bc">
                        时效：
                        <span className="text-black">
                            {zxSpeed == "normal" ? "正常出稿" : "加急出稿"}
                        </span>
                    </span>
                    <span className="text-bc">
                        审核状态：<span className="text-[#09C438]">{getState()}</span>
                    </span>
                    <span className="text-bc">
                        音视频数量：<span className="text-black">1</span>
                    </span>
                    <span className="text-bc">
                        标记：<span className="text-black">{getMarkText()}</span>
                    </span>
                    <span className="text-bc">
                        订单金额：<span className="text-black">￥{zxPrice}</span>
                    </span>
                </div>
            </div>
        </>
    );
}
