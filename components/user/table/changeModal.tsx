// import Layout from "@/components/layout";
import { useMemo, useState } from "react";
import {
    Input,
    Button,
    ModalContent,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from "@nextui-org/react";

import CodeBtn from "@/components/from/codeBtn";

interface modalType {
    isOpen: boolean;
    changeState: (state: boolean) => void;
    type: "email" | "phone" | "";
    target: string;
}

const initVal = {
    userName: "",
    code: ""
};

export default function ChangeModal(props: modalType) {
    //表单数据的状态
    const [invalidInfo, setInvalidInfo] = useState(initVal);
    const [userName, setUserName] = useState<string>("");
    const [code, setCode] = useState<string>("");

    // 校验手机号
    const validatePhon = (value: string) => value.match(/^1[3-9]\d{9}$/i);
    // 校验邮箱
    const validateEmail = (value: string) => value.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/i);

    const typeName = useMemo(() => {
        if (props.type == "email") {
            return "邮箱";
        }
        if (props.type == "phone") {
            return "手机号";
        }
        return "";
    }, [props.type]);

    const getInvalidInfo = (type?: string) => {
        if (!userName) {
            setInvalidInfo({ userName: `请输入${typeName}`, code: "" });
            return false;
        }
        if (!validatePhon(userName) && !validateEmail(userName)) {
            setInvalidInfo({
                code: "",
                userName: `请输入正确的${typeName}`
            });
            return false;
        }
        // 当前只需要验证手机号
        if (type == "hasPhone") {
            return true;
        }
        if (!code) {
            setInvalidInfo({ userName: "", code: "请输入验证码" });
            return false;
        }
        return true;
    };

    const getPhone = (type?: string) => {
        if (getInvalidInfo("hasPhone")) {
            return userName;
        }

        return "";
    };
    const inputChange = (type: string, value: string) => {
        switch (type) {
            case "code":
                invalidInfo.code && setInvalidInfo({ userName: "", code: "" });
                if (value.length > 6) value = value.slice(0, 6);
                setCode(value);
                break;
            case "userName":
                invalidInfo.userName && setInvalidInfo({ userName: "", code: "" });
                setUserName(value);
                break;

            default:
                break;
        }
    };

    // 关闭弹框
    const onClose = () => {
        props.changeState(false);
    };

    // 保存更改
    const saveChange = () => {
        // 请求接口查看是否更改成功
        props.changeState(false);
    };

    return (
        <Modal size={"xs"} isOpen={props.isOpen} onClose={onClose} className="orange-drak">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 border-b border-[#eaeaea]">
                            变更{typeName}
                        </ModalHeader>
                        <ModalBody>
                            <div>
                                <div className="text-[#666666] text-sm mt-1 mb-1 flex justify-between">
                                    <span>{typeName}</span>
                                </div>
                                <Input
                                    type="Email"
                                    placeholder={"请输入" + typeName}
                                    size="sm"
                                    isInvalid={!!invalidInfo.userName}
                                    color={invalidInfo.userName ? "danger" : "default"}
                                    errorMessage={invalidInfo.userName}
                                    onValueChange={(value) => {
                                        inputChange("userName", value);
                                        setUserName(value);
                                    }}
                                    value={userName}
                                />
                            </div>

                            <div>
                                <div className="text-[#666666] text-sm mt-3 mb-1 flex justify-between">
                                    <span>验证码</span>
                                </div>
                                <div className={"flex flex-row"}>
                                    <Input
                                        isRequired
                                        placeholder="请输入验证码"
                                        size="sm"
                                        type="number"
                                        isInvalid={!!invalidInfo.code}
                                        color={invalidInfo.code ? "danger" : "default"}
                                        errorMessage={invalidInfo.code}
                                        onValueChange={(value) => {
                                            inputChange("code", value);
                                            setCode(value);
                                        }}
                                        classNames={{
                                            description: "text-f602",
                                            base: "rounded-e-none",
                                            inputWrapper: "rounded-e-none",
                                            errorMessage: "h-0"
                                        }}
                                        maxLength={6}
                                    />
                                    <CodeBtn
                                        className="min-w-[130px] h-[48px] rounded-s-none"
                                        getPhone={getPhone}
                                        type="phone"
                                    ></CodeBtn>
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onPress={saveChange}
                                className="w-full"
                                radius={"sm"}
                            >
                                保存变更
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
