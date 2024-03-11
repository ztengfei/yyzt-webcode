// 人工精转订单状态
import { useRef, useState } from "react";
import { Image, Link } from "@nextui-org/react";

export default function OrderState() {
    return (
        <>
            <div className=" bg-white rounded-xl flex flex-col justify-center items-center py-5">
                <Image src="/images/pay/par_success.png" width={127} height={127}></Image>
                <span className="text-base mt-1">
                    订单支付完成
                </span>
                <Link className=" text-sm text-bc mt-1" href="/user/userCenter">
                    个人中心
                </Link>
            </div>
        </>
    );
}
