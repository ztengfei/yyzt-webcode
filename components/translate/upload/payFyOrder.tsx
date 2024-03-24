import React, { useImperativeHandle, forwardRef, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    RadioGroup
} from "@nextui-org/react";
import toast from "react-hot-toast";

import PaymentRadio from "@/components/common/paymentRadio";
import { fyOrderInfo, fyOrderPay } from "@/api/api";

import PayModal from "./payModal";

//  翻译订单
const FyOrder = (props: any, ref: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    // 支付类型
    const [payType, changePayType] = useState(1);
    const [orderInfo, setOrderInfo] = useState<any>({});
    const [showPay, setShowPay] = useState(false);

    // 获取翻译订单详情  5
    const getFyOrderInfo = (id) => {
        fyOrderInfo({ id: id }).then((res: any) => {
            if (res.errorCode != 0 || !res.data) {
                toast.error("订单信息获取失败");
                return;
            }
            setOrderInfo(res.data);
            onOpen();
        });
    };

    const fyCommit = (callback: () => void) => {
        if (!orderInfo.payAmount) {
            fyOrderPay({ id: orderInfo.id }).then((res: any) => {
                if (res.errorCode !== 0 || !res.data) {
                    toast.error("订单支付失败");
                    console.log(res.data);
                    return;
                }
                if (res.data.payStatus == 1) {
                    props.setUploadState("translateLoding");
                }
            });
            return;
        }
        setShowPay(true); // orderInfo.id
        // fyOrderPay({ id: orderInfo.id, payType: payType }).then((res: any) => {
        //     if (res.errorCode == 0) {
        //         console.log(res.data);
        //     }
        // });
    };

    const paySuccess = () => {
        props.setUploadState("translateLoding");
    };

    useImperativeHandle(ref, () => ({
        openModal: getFyOrderInfo
    }));
    return (
        <>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                classNames={{
                    backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
                }}
                size={"3xl"}
                className="orange-drak"
                isDismissable={false}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-left text-[22px]">
                                结算信息
                            </ModalHeader>
                            <ModalBody className="text-[#939393] text-[14px]">
                                <div className="grid grid-cols-3 gap-3 text-sm">
                                    <span className="text-bc">
                                        {/* 2023/11/10 16:38:22 */}
                                        文档名称：
                                        <span className="text-black">
                                            {orderInfo.fileName || ""}
                                        </span>
                                    </span>
                                    <span className="text-bc">
                                        翻译方向：
                                        <span className="text-black">
                                            {orderInfo.fyLanguage.replace("&", "转") || ""}
                                        </span>
                                    </span>

                                    <span className="text-bc">
                                        页数：
                                        <span className="text-black">
                                            {orderInfo.pageSize || 0}
                                        </span>
                                    </span>
                                    <span className="text-bc">
                                        文档单价：
                                        <span className="text-black">
                                            ￥{orderInfo.unitPrice || ""}元/页
                                        </span>
                                    </span>
                                    <span className="text-bc">
                                        当前抵扣：
                                        <span className="text-black">
                                            {orderInfo.freeSize || 0}
                                        </span>
                                    </span>
                                    <span className="text-bc">
                                        总计：
                                        <span className="text-black">
                                            ￥{orderInfo.fyPrice || 0}
                                        </span>
                                    </span>
                                </div>

                                {orderInfo.payAmount ? (
                                    <>
                                        <div className="mt-5 mb-1 text-base text-black">
                                            请选择支付方式
                                        </div>

                                        <div className=" text-base mb-3 w-full">
                                            <RadioGroup
                                                orientation="horizontal"
                                                value={payType as unknown as string}
                                                onValueChange={changePayType as any}
                                            >
                                                <PaymentRadio
                                                    value={1}
                                                    type="weixin"
                                                    text="微信支付"
                                                >
                                                    微信支付
                                                </PaymentRadio>
                                                <PaymentRadio
                                                    value={2}
                                                    type="zhifubao"
                                                    text="支付宝"
                                                >
                                                    支付宝
                                                </PaymentRadio>
                                            </RadioGroup>
                                        </div>
                                    </>
                                ) : (
                                    <div></div>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <div className="flex flex-row mb-2 w-full justify-end items-center">
                                    <div className=" mr-4">
                                        <span className="text-base text-black mr-3">
                                            应付金额
                                            <span className="text-f602">
                                                ￥{orderInfo.payAmount}
                                            </span>
                                        </span>
                                        <span className="text-sm text-93 mr-9">
                                            已减免：
                                            <span className="text-bc">
                                                -￥{orderInfo.fyPrice - orderInfo.payAmount}
                                            </span>
                                        </span>
                                    </div>
                                    <Button
                                        color="primary"
                                        className=" w-[200px] h-[46px] bg-f602"
                                        onPress={() => {
                                            fyCommit(onClose);
                                        }}
                                    >
                                        {orderInfo.payAmount ? "确认支付" : "立即翻译"}
                                    </Button>
                                </div>
                            </ModalFooter>
                            {showPay && (
                                <div className=" absolute left-0 top-0 w-full h-full">
                                    <PayModal
                                        orderId={orderInfo.id}
                                        setShowPay={setShowPay}
                                        paySuccess={paySuccess}
                                        payType={payType}
                                    ></PayModal>
                                </div>
                            )}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default forwardRef(FyOrder);
