import React, { forwardRef, useImperativeHandle } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Link
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import Router from "next/router";

function VideoTransfrom(props: any, ref: any) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    useImperativeHandle(ref, () => ({
        openModal: () => {
            onOpen();
        }
    }));
    const goTransferPage = (type: string) => {
        Router.push({ pathname: "/transfer", query: { type: type } });
    };
    return (
        <>
            {/* <Button onPress={onOpen} color="primary">
                Open Modal
            </Button> */}
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size="2xl"
                className="orange-drak"
                motionProps={{
                    variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                duration: 0.3,
                                ease: "easeOut"
                            }
                        },
                        exit: {
                            y: -20,
                            opacity: 0,
                            transition: {
                                duration: 0.2,
                                ease: "easeIn"
                            }
                        }
                    }
                }}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">音频转文字</ModalHeader>
                            <ModalBody>
                                <div className="flex flex-row px-[23px] pb-[22px]">
                                    <div className="text-center p-[16px] bg-gradient-to-b from-[#FFF2EA] to-[#FFFFFF] rounded-xl mr-auto border border-solid border-[rgba(229,216,209,0.6)]">
                                        <h3 className="text-600 text-xl mb-[8px]">机器快转</h3>
                                        <Image
                                            width={126}
                                            height={120}
                                            alt="机器快转"
                                            src="/images/index/video-mach.png"
                                            className="m-auto"
                                        />
                                        <div className="text-xs/[20px] text-left">
                                            <p>· 更快 更准确 更方便</p>
                                            <p>· 1小时音频最快5分钟出稿，准确率可达98%</p>
                                            <p>· 支持9国语言</p>
                                            <p>· 按照专业领域细分转译，快速甄别专属名词</p>
                                            <p>· 标注文稿，按多角色逐条展示</p>
                                        </div>
                                        <Button
                                            color="primary"
                                            className="w-[239px] h-[46px] mt-5"
                                            // onClick={() => {
                                            //     goTransferPage("1");
                                            // }}
                                            href="/transfer?zxType=machine"
                                            as={Link}
                                        >
                                            上传音频
                                        </Button>
                                    </div>
                                    <div className="text-center p-[16px] bg-gradient-to-b from-[#EAF2FF] to-[#FFFFFF] rounded-xl  border border-solid border-[rgba(229,216,209,0.6)">
                                        <h3 className="text-600 text-xl mb-[8px]">人工精转</h3>
                                        <Image
                                            width={126}
                                            height={120}
                                            alt="人工精转"
                                            src="/images/index/video-people.png"
                                            className="m-auto"
                                        />
                                        <div className="text-xs/[20px] text-left">
                                            <p>· 人工多轮校验转写</p>
                                            <p>· 专业速记团队，更精准的转写</p>
                                            <p>· 支持多国语言和地域方言</p>
                                            <p>· 按照专业领域细分转译，快速甄别专属名词</p>
                                            <p>· 标准场景时间码</p>
                                        </div>
                                        <Button
                                            color="primary"
                                            className="w-[239px] h-[46px] mt-5"
                                            href="/transfer?zxType=people"
                                            as={Link}
                                        >
                                            上传音频
                                        </Button>
                                    </div>
                                </div>
                            </ModalBody>
                            {/* <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter> */}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default forwardRef(VideoTransfrom);
