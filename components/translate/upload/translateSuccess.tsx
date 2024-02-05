import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";

import ActiveIcon from "@/components/icon/active";
import DeleteIcon from "@/components/icon/delete";
import LanguageSelect from "./../langSelect";

interface footerType {}

// 文件转写成功
export default function TranslateSuccess(props: footerType) {
    const { selectedFile, allTime } = props;

    return (
        <>
            <div className=" absolute left-0 top-0 w-full h-full flex items-center flex-col p-3">
                <div className="text-sm text-active text-right flex flex-row items-center justify-end w-full">
                    <ActiveIcon size={14} className="mr-1"></ActiveIcon>解析完成
                </div>
                <div className="w-[58px] h-[58px] relative mx-auto mt-[100px]">
                    <Image width={58} alt="xsl" src="/images/translate/xsl.png" />
                    <ActiveIcon
                        size={20}
                        className="absolute bottom-[-5px] right-[-7px]"
                    ></ActiveIcon>
                </div>
                <div className="flex flex-row w-full mt-4 justify-center items-center">
                    <div className="whitespace-nowrap overflow-ellipsis overflow-hidden text-[#333333]">
                        文件名称
                    </div>
                </div>

                <Button className="w-[274px] h-[44px] mt-8" color="primary">
                    下载文件
                </Button>
                <Button className="w-[274px] h-[44px] mt-4" color="primary" variant="bordered">
                    上传新文件
                </Button>
            </div>
        </>
    );
}
