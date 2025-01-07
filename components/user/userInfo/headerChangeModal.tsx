// import Layout from "@/components/layout";
import { useState } from "react";
import {
    Input,
    Button,
    ModalContent,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    RadioGroup
} from "@nextui-org/react";

import CustomRadio from "./customRadio";
import { headerImages } from "@/components/config";

interface modalType {
    headerImage: string | undefined;
    isOpen: boolean;
    changeState: (state: boolean) => void;
    saveHeaderImage: (id: string) => void;
}

export default function ChangeModal(props: modalType) {
    const { headerImage } = props;
    const [header, setHeader] = useState<string>(headerImage);
    // 关闭弹框
    const onClose = () => {
        props.changeState(false);
    };

    // 保存更改
    const saveChange = () => {
        // 请求接口查看是否更改成功
        props.saveHeaderImage(header);
        // props.changeState(false);
    };

    return (
        <Modal size={"2xl"} isOpen={props.isOpen} onClose={onClose} className="orange-drak">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 border-b border-[#eaeaea]">
                            更换头像
                        </ModalHeader>
                        <ModalBody>
                            <RadioGroup
                                orientation="horizontal"
                                value={header}
                                onValueChange={setHeader as any}
                            >
                                {headerImages.map((item) => {
                                    return <CustomRadio key={item} value={item}></CustomRadio>;
                                })}
                            </RadioGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onPress={saveChange}
                                className="w-full"
                                radius={"sm"}
                            >
                                保存头像
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
