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
import DeleteIcon from "@/components/icon/delete";
import { Button, Chip } from "@nextui-org/react";
import CopyIcon from "@/components/icon/copy";

export default function KeyWordAndList(props: any) {
    return (
        <>
            <div className="mt-5 mb-4 flex flex-row justify-between">
                <div className="text-lg font-semibold ">翻译内容</div>
                <Button
                    color="danger"
                    variant="bordered"
                    startContent={<CopyIcon size={18} />}
                    className=" bg-white border-0 h-[34px] max-h-[34px]"
                >
                    复制
                </Button>
            </div>
            <div className="text-[#474747] w-full h-full bg-white rounded-lg px-5 py-4">
                翻译结果
            </div>
        </>
    );
}
