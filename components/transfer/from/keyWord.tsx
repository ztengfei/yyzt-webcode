// import Layout from "@/components/layout";
import { useRef, useState } from "react";
import { Textarea } from "@nextui-org/react";

export default function KeyWordAndList() {
    return (
        <>
            <div className="text-lg font-semibold">关键词（选填）</div>
            <div className="relative w-full h-[80px] bg-white rounded-2xl mt-[10px]">
                <Textarea
                    variant={"bordered"}
                    // label="Description"
                    // labelPlacement="outside"
                    placeholder="输入关键词可以提高准确率，多个关键词以逗号分隔"
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                    maxLength={2000}
                />
                <div className="absolute bottom-0 right-[5px] text-[#bcbcbc] text-sm">0/2000</div>
            </div>
        </>
    );
}
