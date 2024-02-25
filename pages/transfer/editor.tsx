// import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import { Modal, useDisclosure, Image, Popover, PopoverContent } from "@nextui-org/react";
import Router, { useRouter } from "next/router";

import TransferDownload from "@/components/modal/transferDownload";
import EditorHeader from "@/components/transfer/editor/header";
import Editor, { MentionElement } from "@/components/common/editor";
import AudioControl from "@/components/transfer/audioControl";
import Link from "next/link";
import { getZXResultDetail } from "@/api/api";

export default function Index() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [downloadInfo, setDownLoadInfo] = useState({ type: "all", id: "all" });

    const router = useRouter();
    // 订单id
    const audioId = router.query.id;

    const getTransferResult = () => {
        if (!audioId) {
            return;
        }
        // audioId
        getZXResultDetail({ id: audioId as string });
    };

    useEffect(() => {
        // 获取当前界面的内容详情
        getTransferResult();
    }, [audioId]);

    // 打开下载弹框
    const openModal = (type: string, id: string) => {
        setDownLoadInfo({ type, id });
        onOpen();
    };

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <EditorHeader openModal={openModal}></EditorHeader>
            <div className=" mx-auto max-w-[1200px] flex flex-row justify-around w-full flex-1 bg-white rounded-lg mt-[80px] mb-[112px]">
                <Editor></Editor>
            </div>
            <div className="h-[112px] bg-white w-full shadow-topxl fixed left-0 bottom-0 ">
                <AudioControl audioTime={18000000}></AudioControl>
            </div>

            <div className="w-[166px] h-[54px] flex justify-center items-center fixed bottom-[160px] right-[25px] bg-white rounded-[27px] shadow-topx2">
                <Image src="/images/transfer/people.png" alt="人工校对"></Image>
                <Link href={"/transfer"} className="text-f602 text-sm ml-1">
                    需要人工矫准?
                </Link>
            </div>
            <Modal size={"3xl"} isOpen={isOpen} onClose={onClose} className="orange-drak">
                <TransferDownload
                    downloadType={downloadInfo.type}
                    downliadId={downloadInfo.id}
                ></TransferDownload>
            </Modal>
        </div>
    );
}
