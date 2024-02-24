// 人工精转订单完成界面订单详情
import { useEffect, useMemo, useRef, useState } from "react";
import { Image } from "@nextui-org/react";
import { secondsToHMS, timestampToDateTime } from "@/components/tool";
import { langZx } from "@/api/api";

const pyMap = {
    0: "时长卡抵扣",
    1: "微信支付",
    2: "支付宝支付"
};

export default function OrderState(props: any) {
    const {
        orderNum,
        createTime = 0,
        zxSpeed,
        zxRemarks,
        zxFiles = [],
        zxFlow,
        lanFrom,
        zxPrice,
        zxStatus,
        zxType,
        payType
    } = props;

    const [lanuage, setLanuage] = useState("");

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

    useEffect(() => {
        // 获取可以转写的语言
        langZx().then((res) => {
            if (!res.data) {
                setLanuage([]);
            }
            for (let i = 0; i < res.data.length; i++) {
                const item = res.data[i];
                if (item.dicId == lanFrom) {
                    setLanuage(item.dicName);
                    return;
                }
            }
        });
    }, [lanFrom]);

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
                        提交时间：
                        <span className="text-black">{timestampToDateTime(createTime)}</span>
                    </span>

                    <span className="text-bc">
                        订单类型：
                        <span className="text-black">
                            {zxType == "1" ? "机器转写" : "人工精转"}-中文
                        </span>
                    </span>
                    <span className="text-bc">
                        实付金额：<span className="text-black">￥{payType == 0 ? 0 : zxPrice}</span>
                    </span>
                    <span className="text-bc">
                        音视频总时长：<span className="text-black">{allTime}</span>
                    </span>

                    <span className="text-bc">
                        订单状态：<span className="text-[#09C438]">{getState()}</span>
                    </span>

                    <span className="text-bc">
                        支付方式：<span className="text-black">{pyMap[payType]}</span>
                    </span>
                    <span className="text-bc">
                        音频数量：<span className="text-black">{zxFiles.length}</span>
                    </span>
                    <span className="text-bc">
                        订单金额：<span className="text-black">￥{zxPrice}</span>
                    </span>
                </div>
            </div>
        </>
    );
}
