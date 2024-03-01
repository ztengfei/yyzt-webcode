// 转写完成界面
import { useEffect, useRef, useState, useMemo } from "react";
import {
    CheckboxGroup,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Select,
    SelectItem,
    Switch
} from "@nextui-org/react";
import toast from "react-hot-toast";

import BuyFooter from "@/components/transfer/buyFooter";

import OrderState from "@/components/transfer/orderList/orderState";
import OrderEndInfo from "@/components/transfer/orderList/orderEndInfo";
import RadioVideoList from "@/components/transfer/orderList/radioVideoList";
import TransferDownload from "@/components/modal/transferDownload";
import Router, { useRouter } from "next/router";
import { orderDetail, zxFIleDown } from "@/api/api";

export default function Order() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [downloadInfo, setDownLoadInfo] = useState({ type: "all", id: [], fileName: "" });

    // 打开下载弹框
    const openModal = (type: string, id: string[], fileName: string) => {
        setDownLoadInfo({ type, id, fileName });
        onOpen();
    };

    const [fileInfo, setDileInfo] = useState<any>({});
    const loopTimerRef = useRef<number>(0)

    // 支付类型
    const [payType, changePayType] = useState(0);

    const router = useRouter();
    const orderId = router.query.order;


    const LoopGetFiles = (data) => {
        clearTimeout(loopTimerRef.current);
        if (!data.zxFiles || !data.zxFiles.length) {
            return ;
        }
        // 存在没有转写的则循环请求数据
        const isNoTrans = data.zxFiles.find((item) => {
            return item.zxStatus == 3;
        });
        if (!isNoTrans) {
            return;
        }
        loopTimerRef.current = window.setTimeout(() => {
            getOrderData();
        }, 2000);
    }

    const getOrderData = () => {
        orderDetail({ orderId: orderId }).then((res: any) => {
            if (!res.data) {
                toast.error("订单详情获取失败，请刷新重试");
                return;
            }
            setDileInfo(res.data);
            LoopGetFiles(res.data)
        });
    }

    useEffect(() => {
        if (!orderId) {
            return;
        }
        // cha
        getOrderData();
        return () => {
            clearTimeout(loopTimerRef.current);
        }
    }, [orderId]);

    

    const allFileId = useMemo(() => {
        if (!fileInfo.zxFiles || !fileInfo.zxFiles.length) {
            return [];
        }
        const fileIds = fileInfo.zxFiles.map((item) => {
            return item.id;
        });
        return fileIds;
    }, [fileInfo]);

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-col w-full flex-1">
                <div className="mt-5 mb-4 text-base">订单信息</div>
                <OrderEndInfo {...fileInfo}></OrderEndInfo>

                <div className="mt-5 mb-4 text-base">音视频列表</div>
                <div>
                    <CheckboxGroup className="flex flex-col gap-1 w-full">
                        {fileInfo.zxFiles &&
                            fileInfo.zxFiles.length &&
                            fileInfo.zxFiles.map((item: any, index: number) => {
                                return (
                                    <RadioVideoList
                                        key={item.id}
                                        value={item.id}
                                        state="success"
                                        openModal={openModal}
                                        orderId={orderId}
                                        {...item}
                                    ></RadioVideoList>
                                );
                            })}
                        {/* <RadioVideoList
                            value="1"
                            state="success"
                            openModal={openModal}
                        ></RadioVideoList> */}
                    </CheckboxGroup>
                </div>
            </div>
            <div className="h-[76px] bg-white w-full">
                <div className="h-[76px] mx-auto max-w-[1200px] flex flex-row justify-end  items-center">
                    <Button
                        color="primary"
                        variant="bordered"
                        className="w-[150px] h-[46px] mr-5 min-h-[46px]"
                    >
                        转人工
                    </Button>
                    <Button
                        color="primary"
                        className="w-[150px] h-[46px] min-h-[46px]"
                        onClick={() => {
                            openModal("all", allFileId, fileInfo.orderNum);
                        }}
                    >
                        下载全部结果
                    </Button>
                </div>
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
