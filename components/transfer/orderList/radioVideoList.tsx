import React from "react";
import { Checkbox, Button, useRadio, VisuallyHidden, cn } from "@nextui-org/react";
import Router from "next/router";

import CustorChip from "@/components/common/custorChip";
import SearchIcon from "@/components/icon/search";
import Download from "@/components/icon/download";

interface radioVideo {
    value: string;
    state: string;
    openModal: (type: string, id: string) => void;
    // fileName: string;
    // fileTime: string;
}

const RadioVideo = ({ value, state, openModal }: radioVideo) => {
    return (
        <Checkbox
            classNames={{
                base: cn(
                    "items-center hover:opacity-90 active:opacity-50 tap-highlight-transparent",
                    "w-full max-w-full cursor-pointer border-0 border-default rounded-lg gap-4 p-0",
                    " bg-white rounded-lg py-3 pl-4 mb-4"
                ),
                label: "w-full"
            }}
            value={value}
        >
            <div className="text-base flex justify-between items-center">
                <div className="flex flex-row flex-1">
                    <span className="col-span-2 mr-10">新录音文件名称.mp3</span>
                    <span className="text-93 mr-10">时长: 00:08:12</span>
                    <span>
                        {state == "success" ? (
                            <CustorChip color="success">转写正常</CustorChip>
                        ) : (
                            <CustorChip color="error">转写失败</CustorChip>
                        )}
                    </span>
                </div>
                <div>
                    {/*  startContent={<UserIcon/>} */}
                    <Button
                        color="primary"
                        variant="bordered"
                        startContent={<SearchIcon size={16} />}
                        size={"md"}
                        className="mr-3"
                        onClick={() => {
                            Router.replace({
                                pathname: "/transfer/editor",
                                query: { name: "Zeit" }
                            });
                        }}
                    >
                        查看结果
                    </Button>
                    <Button
                        color="primary"
                        variant="bordered"
                        startContent={<Download size={16} />}
                        size={"md"}
                        className="mr-3"
                        onClick={() => {
                            openModal("one", "1");
                        }}
                    >
                        下载结果
                    </Button>
                </div>
            </div>
        </Checkbox>
    );
};
export default RadioVideo;
