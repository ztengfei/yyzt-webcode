// 人工精转订单状态
import { useRef, useState, useMemo } from "react";
import { Button, Image, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";

import DateIcon from "@/components/icon/date";
import ClockIcon from "@/components/icon/clock";
import SelectedIcon from "@/components/icon/selected";
import DownloadIcon from "@/components/icon/download";
import Xiaoyu from "@/components/icon/xiaoyu";
import { timestampToDateTime2, secondsToHMS } from "@/components/tool";
import Router from "next/router";

interface headerProps {
    openModal: (type: string, id: string[], fileName: string) => void;
    fileInfo: any;
    orderId: string;
    audioId: string;
}

export default function OrderState({ openModal, fileInfo, orderId, audioId }: headerProps) {
    const audioInfo = useMemo(() => {
        if (!fileInfo.zxFiles || !fileInfo.zxFiles.length) {
            return { createTime: 0, fileTime: 0 };
        }
        const audioInfo = fileInfo.zxFiles.find((item) => {
            return item.id == audioId;
        });
        return audioInfo || {};
    }, [audioId, fileInfo]);

    const allFileId = useMemo(() => {
        if (!fileInfo.zxFiles || !fileInfo.zxFiles.length) {
            return [];
        }
        const fileIds = fileInfo.zxFiles.map((item) => {
            return item.id;
        });
        return fileIds;
    }, [fileInfo]);

    const tabClick = (key: string) => {
        const href = `/transfer/editor?id=${key}&order=${orderId}`;
        const as = href;
        Router.push(href, as, { shallow: true });
    };

    console.log("fileInfo", fileInfo.zxFiles);

    return (
        <div className="h-[70px] bg-white w-full fixed left-0 top-0 z-10">
            <div className="h-[70px] mx-auto max-w-[1200px] flex flex-row justify-between  items-center">
                <div className="flex flex-row items-center">
                    <div className="flex flex-row items-center text-lg mr-5 cursor-pointer ">
                        <Link
                            href={`/user?page=transferFile`}
                            replace
                            className=" text-black flex flex-row items-center hover:text-f602"
                        >
                            <Xiaoyu></Xiaoyu>
                            文件列表
                        </Link>
                    </div>
                    {fileInfo.zxFiles && fileInfo.zxFiles.length && (
                        <Select
                            // label="文件格式："
                            className="h-[44px] w-[204px]"
                            classNames={{
                                trigger: "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                                label: "text-93 mb-2"
                            }}
                            // labelPlacement="outside"
                            // placeholder="Select a user"
                            selectedKeys={[audioId]}
                            onSelectionChange={(val: any) => {
                                // console.log(val);
                                tabClick([...val][0]);
                                // setFileType(val as unknown as string[]);
                            }}
                        >
                            {fileInfo.zxFiles.map((item: any, index: number) => {
                                return (
                                    <SelectItem key={item.id} value={item.id}>
                                        {item.fileName}
                                    </SelectItem>
                                );
                            })}
                        </Select>
                    )}
                    <span className="flex flex-row items-center text-93 ml-5">
                        <DateIcon size={18}></DateIcon>
                        <span className="ml-1">{timestampToDateTime2(audioInfo.createTime)}</span>
                    </span>
                    <span className="flex flex-row items-center text-93 ml-5">
                        <ClockIcon size={18}></ClockIcon>{" "}
                        <span className="ml-1">{secondsToHMS(audioInfo.fileTime)}</span>
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
                            openModal("one", [audioId], audioInfo.fileName);
                        }}
                    >
                        下载本文件结果
                    </Button>
                    <Button
                        color="primary"
                        startContent={<DownloadIcon size={18} fill="#ffffff" />}
                        onClick={() => {
                            openModal("all", allFileId, audioInfo.fileName);
                        }}
                    >
                        下载全部结果
                    </Button>
                </div>
            </div>
        </div>
    );
}
