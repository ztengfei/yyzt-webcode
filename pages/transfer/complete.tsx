// 转写完成界面
import { useRef, useState } from "react";
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

import BuyFooter from "@/components/transfer/buyFooter";

import OrderState from "@/components/transfer/orderList/orderState";
import OrderEndInfo from "@/components/transfer/orderList/orderEndInfo";
import RadioVideoList from "@/components/transfer/orderList/radioVideoList";
import TransferDownload from "@/components/modal/transferDownload";

export default function Order() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [downloadInfo, setDownLoadInfo] = useState({ type: "all", id: "all" });

    // 打开下载弹框
    const openModal = (type: string, id: string) => {
        setDownLoadInfo({ type, id });
        onOpen();
    };

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-col w-full flex-1">
                <div className="mt-5 mb-4 text-base">订单信息</div>
                <OrderEndInfo></OrderEndInfo>

                <div className="mt-5 mb-4 text-base">音视频列表</div>
                <div>
                    <CheckboxGroup className="flex flex-col gap-1 w-full">
                        <RadioVideoList
                            value="1"
                            state="success"
                            openModal={openModal}
                        ></RadioVideoList>
                        <RadioVideoList
                            value="2"
                            state="error"
                            openModal={openModal}
                        ></RadioVideoList>
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
                            openModal("all", "all");
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
                ></TransferDownload>
            </Modal>
        </div>
    );
}
