// import Layout from "@/components/layout";
import { useRef, useState, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
} from "@nextui-org/table";
import toast from "react-hot-toast";

import { Button, Chip } from "@nextui-org/react";
import CopyIcon from "@/components/icon/copy";

export default function KeyWordAndList(props: any) {
    const { translateText } = props;

    const copyText = () => {
        const text = translateText;
        //
        let textarea = document.createElement("textarea"); // 创建临时的textarea元素
        textarea.value = text; // 将要复制的内容赋值给textarea
        document.body.appendChild(textarea); // 将textarea添加到页面上
        textarea.select(); // 选中textarea中的内容
        try {
            let successful = document.execCommand("copy"); // 执行复制命令
            if (successful) {
                toast.success("复制成功！");
            } else {
                toast.error("无法复制！");
            }
        } catch (err) {
            toast.error("无法复制！");
        } finally {
            document.body.removeChild(textarea); // 移除临时的textarea元素
        }
    };

    return (
        <>
            <div className="mt-5 mb-4 flex flex-row justify-between">
                <div className="text-lg font-semibold ">翻译内容</div>
                <Button
                    color="danger"
                    variant="bordered"
                    startContent={<CopyIcon size={18} />}
                    className=" bg-white border-0 h-[34px] max-h-[34px]"
                    onClick={copyText}
                >
                    复制
                </Button>
            </div>

            <div className="text-[#474747] w-full h-full bg-white rounded-lg px-5 py-4">
                {translateText}
            </div>
        </>
    );
}
