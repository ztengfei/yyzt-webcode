// 购买时长卡界面的footer
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";

interface footerType {
    submit: () => void;
    zxPrice: string;
}

export default function BuyFooter(props: footerType) {
    const { zxPrice = 0 } = props;
    return (
        <>
            <div className="h-[76px] w-full fixed bottom-0">
                <div className=" fixed bottom-0 bg-white w-full">
                    <div className="h-[76px] mx-auto max-w-[1200px] flex flex-row justify-end  items-center">
                        <span className="text-sm text-93 mr-9">已使用时长卡抵扣</span>
                        <span className=" text-base text-black">
                            应付金额：<span className="text-f602">￥{zxPrice}</span>
                        </span>
                        <Button
                            color="primary"
                            className="w-[150px] h-[46px] ml-9 min-h-[46px]"
                            onClick={() => {
                                props.submit && props.submit();
                            }}
                        >
                            确认支付
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
