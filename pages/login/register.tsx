import React, { useState } from "react";
import {
    Tabs,
    Tab,
    Input,
    Link,
    Button,
    Card,
    CardBody,
    CardHeader,
    Avatar,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";

import styles from "./index.module.css";
import CodeBtn from "@/components/from/codeBtn";

const initInvalidInfo = {
    tel: "",
    code: "",
    telEmail: "",
    passWord: "",
    againPassWord: ""
};

function Register() {
    const [selected, setSelected] = useState("register-message");
    //表单数据的状态
    const [invalidInfo, setInvalidInfo] = useState(initInvalidInfo);
    // modal 控制器
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // 手机号码
    const [phone, setPhone] = React.useState<string>("");
    const [code, setCode] = React.useState<string>("");
    const [telEmail, setEmail] = React.useState<string>("");
    const [password, setPasword] = React.useState<string>("");
    const [againPassWord, setAgainPassWord] = React.useState<string>("");

    // 校验手机号
    const validatePhon = (value: string) => value.match(/^1[3-9]\d{9}$/i);
    // 校验邮箱
    const validateEmail = (value: string) => value.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/i);
    // 密码校验
    const validateEmailPassword = (value: string) => value.match(/^[A-Za-z0-9]{6,12}$/i);

    const getInvalidInfo = (type?: string) => {
        if (selected == "register-message") {
            if (!phone) {
                setInvalidInfo({ ...initInvalidInfo, tel: "请输入手机号" });
                return false;
            }
            if (!validatePhon(phone)) {
                setInvalidInfo({ ...initInvalidInfo, tel: "请输入正确的手机号" });
                return false;
            }
            if (type == "hasPhone") {
                // 验证码校验手机号是否正确
                return true;
            }
        } else {
            if (!telEmail) {
                setInvalidInfo({ ...initInvalidInfo, telEmail: "请输入邮箱" });
                return false;
            }
            if (!validateEmail(telEmail)) {
                setInvalidInfo({ ...initInvalidInfo, telEmail: "请输入正确的邮箱" });
                return false;
            }
            if (type == "hasEmail") {
                // 验证码校验邮箱是否正确
                return true;
            }
        }

        if (!code) {
            setInvalidInfo({ ...initInvalidInfo, code: "请输入验证码" });
            return false;
        }

        if (!password) {
            setInvalidInfo({ ...initInvalidInfo, passWord: "请输入密码" });
            return false;
        }
        if (!validateEmailPassword(password)) {
            setInvalidInfo({ ...initInvalidInfo, passWord: "密码应是6-12位数字+字母的组合" });
            return false;
        }

        if (!againPassWord) {
            setInvalidInfo({ ...initInvalidInfo, againPassWord: "请再次输入密码" });
            return false;
        }
        if (password != againPassWord) {
            setInvalidInfo({ ...initInvalidInfo, againPassWord: "两次输入密码不一致" });
            return false;
        }

        return true;
    };

    const getPhone = (type?: string) => {
        if (type == "phone" && getInvalidInfo("hasPhone")) {
            return phone;
        }
        if (type == "email" && getInvalidInfo("hasEmail")) {
            return telEmail;
        }
        return "";
    };

    const inputChange = (type: string, value: string) => {
        switch (type) {
            case "phone":
                invalidInfo.tel && setInvalidInfo({ ...initInvalidInfo });
                setPhone(value);
                break;
            case "code":
                invalidInfo.code && setInvalidInfo({ ...initInvalidInfo });
                if (value.length > 6) value = value.slice(0, 6);
                setCode(value);
                break;
            case "telEmail":
                invalidInfo.telEmail && setInvalidInfo({ ...initInvalidInfo });
                setEmail(value);
                break;
            case "passWord":
                invalidInfo.passWord && setInvalidInfo({ ...initInvalidInfo });
                setPasword(value);
                break;
            case "againPassWord":
                invalidInfo.againPassWord && setInvalidInfo({ ...initInvalidInfo });
                setAgainPassWord(value);
                break;
            default:
                break;
        }
    };

    const onLogin = () => {
        if (getInvalidInfo()) {
            setInvalidInfo({ ...initInvalidInfo });
            console.log("校验成功");
        }
    };

    return (
        <div className="w-full h-full bg-login-bg  bg-no-repeat bg-cover absolute left-0 top-0">
            <div className="h-full max-w-[1200px] mx-auto flex justify-end items-center min-h-[650px]">
                <Card className="max-w-full w-[424px] h-[528px] bg-transparent">
                    <CardBody className="overflow-hidden p-0 bg-transparent relative flex-none">
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={(key) => {
                                setSelected(key as string);
                            }}
                            classNames={{
                                base: "min-h-[90px] mt-[4px] bg-[#F5F5F5]",
                                tabList: [
                                    "gap-6 w-full relative rounded-none p-0 border-b border-divider justify-around  h-[94px] absolute left-0 top-0 bg-no-repeat bg-cover bg-tab-left border-0",
                                    selected == "register-message"
                                        ? styles.activeLeft
                                        : styles.activeRight
                                ],
                                cursor: "hidden",
                                tab: "text-66 px-0 h-12 text-[20px]",
                                tabContent: "text-66 group-data-[selected=true]:text-f602",
                                panel: "bg-white px-[28px]"
                            }}
                        >
                            <Tab key="register-message" title="手机号注册">
                                <form className="flex flex-col">
                                    <Input
                                        isRequired
                                        placeholder="请输入手机号"
                                        size="sm"
                                        type="number"
                                        isInvalid={!!invalidInfo.tel}
                                        color={invalidInfo.tel ? "danger" : "default"}
                                        errorMessage={invalidInfo.tel}
                                        onValueChange={(value) => {
                                            inputChange("phone", value);
                                        }}
                                        classNames={{
                                            description: "text-f602",
                                            errorMessage: "h-0"
                                        }}
                                    />
                                    <div className={"mt-[16px] flex flex-row"}>
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
                                            }}
                                            value={code}
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
                                    <Input
                                        isRequired
                                        placeholder="请输入密码（6-12位字母+数字）"
                                        size="sm"
                                        type="password"
                                        isInvalid={!!invalidInfo.passWord}
                                        color={invalidInfo.passWord ? "danger" : "default"}
                                        errorMessage={invalidInfo.passWord}
                                        onValueChange={(value) => {
                                            inputChange("passWord", value);
                                        }}
                                        classNames={{
                                            description: "text-f602",
                                            errorMessage: "h-0",
                                            base: "mt-[16px]"
                                        }}
                                    />
                                    <Input
                                        isRequired
                                        placeholder="请再次输入密码"
                                        size="sm"
                                        type="password"
                                        isInvalid={!!invalidInfo.againPassWord}
                                        color={invalidInfo.againPassWord ? "danger" : "default"}
                                        errorMessage={invalidInfo.againPassWord}
                                        onValueChange={(value) => {
                                            inputChange("againPassWord", value);
                                        }}
                                        classNames={{
                                            description: "text-f602",
                                            errorMessage: "h-0",
                                            base: "mt-[16px]"
                                        }}
                                    />
                                </form>
                            </Tab>
                            <Tab key="register-passWord" title="邮箱注册">
                                <form className="flex flex-col">
                                    <Input
                                        isRequired
                                        placeholder="请输入邮箱"
                                        size="sm"
                                        type="email"
                                        isInvalid={!!invalidInfo.telEmail}
                                        color={invalidInfo.telEmail ? "danger" : "default"}
                                        errorMessage={invalidInfo.telEmail}
                                        onValueChange={(value) => {
                                            inputChange("telEmail", value);
                                        }}
                                        classNames={{
                                            description: "text-f602",
                                            errorMessage: "h-0"
                                        }}
                                    />
                                    <div className={"mt-[16px] flex flex-row"}>
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
                                            }}
                                            value={code}
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
                                            type="email"
                                        ></CodeBtn>
                                    </div>
                                    <Input
                                        isRequired
                                        placeholder="请输入密码（6-12位字母+数字）"
                                        size="sm"
                                        type="password"
                                        isInvalid={!!invalidInfo.passWord}
                                        color={invalidInfo.passWord ? "danger" : "default"}
                                        errorMessage={invalidInfo.passWord}
                                        onValueChange={(value) => {
                                            inputChange("passWord", value);
                                        }}
                                        classNames={{
                                            description: "text-f602",
                                            errorMessage: "h-0",
                                            base: "mt-[16px]"
                                        }}
                                    />
                                    <Input
                                        isRequired
                                        placeholder="请再次输入密码"
                                        size="sm"
                                        type="password"
                                        isInvalid={!!invalidInfo.againPassWord}
                                        color={invalidInfo.againPassWord ? "danger" : "default"}
                                        errorMessage={invalidInfo.againPassWord}
                                        onValueChange={(value) => {
                                            inputChange("againPassWord", value);
                                        }}
                                        classNames={{
                                            description: "text-f602",
                                            errorMessage: "h-0",
                                            base: "mt-[16px]"
                                        }}
                                    />
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                    <div className="max-w-full bg-white  px-[28px] flex-auto">
                        <div className="flex gap-2 justify-end mt-[16px]">
                            <Button
                                fullWidth
                                color="primary"
                                className="h-[50px]"
                                onClick={onLogin}
                            >
                                立即注册
                            </Button>
                        </div>
                        <div className="flex flex-clo justify-center mt-[19px]">
                            <span className="text-97 text-[14px]">点击注册代表您已阅读并同意</span>
                            <span
                                className="text-black text-[14px] cursor-pointer"
                                onClick={onOpen}
                            >
                                《平台用户使用协议》
                            </span>
                        </div>
                        <div className="flex flex-row justify-center my-[20px]">
                            <div className="mx-[10px] text-[12px]">
                                <span className="text-97 text-[14px]">已有账号 去</span>
                                <Link className="text-f602 text-[14px]" href="/login/">
                                    登录
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center text-[22px]">
                                平台用户协议
                            </ModalHeader>
                            <ModalBody className="text-[#939393] text-[14px]">
                                <p>感谢您信任并使用</p>
                                <p>我们根据最新的法律法规、监管政策要求</p>
                                <p>
                                    如果您是未满14周岁的未成年人，请您通知您的父母或其他监护人共同阅读上述协议，并在您使用我们的服务前，取得您的父母或其他监护人的同意。
                                </p>
                                <p>如您同意，请点击“同意并继续”，开始接受我们的产品与服务。</p>
                            </ModalBody>
                            <ModalFooter>
                                {/* <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button> */}
                                <Button
                                    color="primary"
                                    className="m-auto w-[300px] h-[46px] bg-f602"
                                    onPress={onClose}
                                >
                                    我同意
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
export default Register;
