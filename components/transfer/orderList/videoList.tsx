// 人工精转订单状态
import { useRef, useState } from "react";
import { Image } from "@nextui-org/react";
import CustorChip from "@/components/common/custorChip";
import { secondsToHMS } from "@/components/tool";

export default function VideoList(props: any) {
    const { fileName, fileTime = 0, auditStatus, zxStatus } = props;

    const getStateChip = () => {
        if (auditStatus == "0") {
            return <CustorChip color="waring">待审批</CustorChip>;
        }
        if (auditStatus == "1") {
            return <CustorChip color="waring">已通过</CustorChip>;
        }
        if (auditStatus == "2") {
            return <CustorChip color="waring">未通过</CustorChip>;
        }
    };

    return (
        <>
            <div className="bg-white rounded-lg py-3 pl-4 text-base grid grid-cols-8 mb-3">
                <span className="col-span-2">{fileName}</span>
                <span className="text-93">时长: {secondsToHMS(fileTime)}</span>
                <span>{getStateChip()}</span>
                {auditStatus == "2" && (
                    <span className="col-span-3">
                        <span className=" text-93">原因: </span>
                        <span className="text-[#FF2828]">上传内容违反台规则，请重新上传</span>
                    </span>
                )}
            </div>
        </>
    );
}
