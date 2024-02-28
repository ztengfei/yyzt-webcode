// import Layout from "@/components/layout";
import React, { useState, useEffect, useMemo } from "react";
import { Modal, useDisclosure, Image, Popover, PopoverContent } from "@nextui-org/react";
import Router, { useRouter } from "next/router";

import TransferDownload from "@/components/modal/transferDownload";
import EditorHeader from "@/components/transfer/editor/header";
import Editor, { MentionElement } from "@/components/common/editor";
import AudioControl from "@/components/transfer/audioControl";
import Link from "next/link";
import { getZXResultDetail, orderDetail } from "@/api/api";

import { toEditorData } from "@/components/common/editor/tool";

export default function Index() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [downloadInfo, setDownLoadInfo] = useState({ type: "all", id: [], fileName: "" });
    // 编辑器初始化的数据
    const [initEditorData, setEditorData] = useState();
    // 当前转写订单中对应的详情
    const [fileInfo, setDileInfo] = useState<any>({});

    const router = useRouter();
    // 当前音频对应的id
    const audioId = router.query.id;
    // 订单id
    const orderId = router.query.order;

    const getTransferResult = () => {
        if (!audioId) {
            return;
        }
        // audioId
        getZXResultDetail({ id: audioId as string }).then((res: any) => {
            if (res.data) {
                const data: any = toEditorData(res.data);
                setEditorData(data);
            }
        });
    };

    useEffect(() => {
        if (!orderId) {
            return;
        }
        // cha
        orderDetail({ orderId: orderId }).then((res: any) => {
            res.data && setDileInfo(res.data);
        });
    }, [orderId]);

    useEffect(() => {
        // 获取当前界面的内容详情
        getTransferResult();
    }, [audioId]);

    const audioInfo = useMemo(() => {
        if (!fileInfo.zxFiles || !fileInfo.zxFiles.length) {
            return { createTime: 0, fileTime: 0 };
        }
        const audioInfo = fileInfo.zxFiles.find((item) => {
            return item.id == audioId;
        });
        return audioInfo;
    }, [audioId, fileInfo]);

    // 打开下载弹框
    const openModal = (type: string, id: string[], fileName: string) => {
        setDownLoadInfo({ type, id, fileName });
        onOpen();
    };

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <EditorHeader
                openModal={openModal}
                fileInfo={fileInfo}
                orderId={orderId as string}
                audioId={audioId as string}
            ></EditorHeader>
            <div className=" mx-auto max-w-[1200px] flex flex-row justify-around w-full flex-1 bg-white rounded-lg mt-[80px] mb-[112px]">
                {initEditorData && (
                    <Editor
                        editorData={initEditorData}
                        audioId={audioId as string}
                        key={audioId as string}
                    ></Editor>
                )}
            </div>
            <div className="h-[112px] bg-white w-full shadow-topxl fixed left-0 bottom-0 ">
                <AudioControl audioTime={audioInfo.fileTime}></AudioControl>
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
                    fileName={downloadInfo.fileName}
                ></TransferDownload>
            </Modal>
        </div>
    );
}
