// import Layout from "@/components/layout";
import { useRef, useState } from "react";
import { Button } from "@nextui-org/react";

import { secondsToHMS } from "@/components/tool";

interface footerType {
    submit: () => void;
    selectedFile: string[];
    allTime: number;
    userCardInfo?: { count: number; usableTime: number };
}

export default function Footer(props: footerType) {
    const { selectedFile, allTime, userCardInfo = { count: 0, usableTime: 0 } } = props;

    return (
        <>
            <div className="h-[76px] bg-white w-full fixed bottom-0 z-50">
                <div className="h-[76px] mx-auto max-w-[1200px] flex flex-row justify-end  items-center">
                    <span className="text-sm text-93">
                        我的时长卡：<span className="text-f602">{userCardInfo.count}张</span>
                    </span>
                    <span className="text-sm text-93 ml-9">
                        剩余可用时长：{secondsToHMS(userCardInfo.usableTime)}
                    </span>
                    <span className="text-base text-block ml-9">
                        共{selectedFile ? selectedFile.length : 0}条音频 ｜ 总时长{" "}
                        {secondsToHMS(allTime)}
                    </span>
                    <Button
                        color="primary"
                        className="w-[150px] h-[46px] ml-9 min-h-[46px]"
                        onClick={() => {
                            props.submit && props.submit();
                        }}
                        isDisabled={!selectedFile.length}
                    >
                        提交转文字
                    </Button>
                </div>
            </div>
        </>
    );
}
