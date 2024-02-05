import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";

import ActiveIcon from "@/components/icon/active";
import DeleteIcon from "@/components/icon/delete";
import LanguageSelect from "./../langSelect";

interface footerType {}

// 文件上传成功
export default function Loding(props: footerType) {
    const { selectedFile, allTime } = props;

    return (
        <>
            <div className=" absolute left-0 top-0 w-full h-full flex items-center flex-col">
                <CircularProgress
                    aria-label="Loading..."
                    size="lg"
                    value={80}
                    color="primary"
                    showValueLabel={true}
                    className="mt-[195px]"
                    classNames={{
                        svg: "w-[60px] h-[60px] drop-shadow-md"
                        // indicator: "stroke-white",
                        // track: "stroke-white/10",
                        // value: "text-3xl font-semibold text-white",
                    }}
                />
                <div className="text-center text-[#333] mt-1">文档解析中,请稍等</div>
                {/* <Button className=" bg-white text-[#333] mt-3">取消</Button> */}
            </div>
        </>
    );
}
