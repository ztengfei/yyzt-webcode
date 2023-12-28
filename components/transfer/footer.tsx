// import Layout from "@/components/layout";
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";

export default function Footer() {
    return (
        <>
            <div className="h-[76px] bg-white w-full">
                <div className="h-[76px] mx-auto max-w-[1200px] flex flex-row justify-end  items-center">
                    <span className="text-sm text-93">
                        我的时长卡：<span className="text-f602">2张</span>
                    </span>
                    <span className="text-sm text-93 ml-9">剩余可用时长：2:59:00</span>
                    <span className="text-base text-block ml-9">共4条音频 ｜ 总时长 18:01:00</span>
                    <Button color="primary" className="w-[150px] h-[46px] ml-9 min-h-[46px]">
                        提交转文字
                    </Button>
                </div>
            </div>
        </>
    );
}
