// 人工精转订单状态
import { useRef, useState } from "react";
import { Button, Image, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";

import DateIcon from "@/components/icon/date";
import ClockIcon from "@/components/icon/clock";
import SelectedIcon from "@/components/icon/selected";
import DownloadIcon from "@/components/icon/download";

interface headerProps {
    openModal: (type: string, id: string) => void;
}

export default function OrderState({ openModal }: headerProps) {
    return (
        <div className="h-[70px] bg-white w-full fixed left-0 top-0 z-10">
            <div className="h-[70px] mx-auto max-w-[1200px] flex flex-row justify-between  items-center">
                <div className="flex flex-row items-center">
                    <div className="flex flex-row items-center text-lg text-black mr-5 cursor-pointer">
                        {"<"}{" "}
                        <Link href="/transfer/complete" replace className=" text-black ">
                            文件列表
                        </Link>
                    </div>
                    <Select
                        // label="文件格式："
                        className="h-[44px] w-[204px]"
                        classNames={{
                            trigger: "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                            label: "text-93 mb-2"
                        }}
                        // labelPlacement="outside"
                        // placeholder="Select a user"
                        selectedKeys={["123"]}
                        onSelectionChange={(val) => {
                            // setFileType(val as unknown as string[]);
                        }}
                    >
                        <SelectItem key={"123"} value={"123"}>
                            新录音文件名称1.mp3
                        </SelectItem>
                        <SelectItem key={"223"} value={"223"}>
                            新录音文件名称2
                        </SelectItem>
                    </Select>
                    <span className="flex flex-row items-center text-93 ml-5">
                        <DateIcon size={18}></DateIcon>
                        <span className="ml-1">2023-11-10 16:38</span>
                    </span>
                    <span className="flex flex-row items-center text-93 ml-5">
                        <ClockIcon size={18}></ClockIcon> <span className="ml-1">00:08:12</span>
                    </span>
                </div>
                <div className="flex flex-row items-center">
                    <span className="flex flex-row items-center  text-93 mr-6">
                        <SelectedIcon size={15}></SelectedIcon>
                        <span className="ml-1">编辑结果将自动保存</span>
                    </span>
                    <Button
                        color="default"
                        variant="bordered"
                        startContent={<DownloadIcon size={18} fill="#FF6002" />}
                        className="mr-3"
                        onClick={() => {
                            openModal("one", "123");
                        }}
                    >
                        下载本文件结果
                    </Button>
                    <Button
                        color="primary"
                        startContent={<DownloadIcon size={18} fill="#ffffff" />}
                        onClick={() => {
                            openModal("all", "123");
                        }}
                    >
                        下载全部结果
                    </Button>
                </div>
            </div>
        </div>
    );
}
