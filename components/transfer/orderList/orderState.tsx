// 人工精转订单状态
import { useRef, useState } from "react";
import { Image } from "@nextui-org/react";

export default function OrderState() {
    return (
        <>
            <div className=" bg-white rounded-xl flex flex-col justify-center items-center py-5">
                <Image
                    src="/images/transfer/examine-success.png"
                    width={67}
                    height={65}
                    alt="审核"
                ></Image>
                <span className="text-base mt-1">
                    人工精转订单<span className="text-[#09C438]">审核成功</span>-待支付
                </span>
                <span className=" text-sm text-bc mt-1">
                    订单音频审核通过，支持人工精转，请在
                    <span className="text-[#222222]">1天</span>内完成支付
                </span>
            </div>
        </>
    );
}
