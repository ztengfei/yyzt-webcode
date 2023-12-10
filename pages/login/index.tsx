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
    Avatar
} from "@nextui-org/react";

import styles from "./index.module.css";
import CodeBtn from "@/components/from/codeBtn";

//  登陆界面
function Login() {
    const [selected, setSelected] = useState("login-message");
    //表单数据的状态
    const [invalidInfo, setInvalidInfo] = useState({
        tel: "",
        code: "",
        telEmail: "",
        passWord: ""
    });

    // 手机号码
    const [phone, setPhone] = React.useState<string>("");
    const [code, setCode] = React.useState<string>("");
    const [telEmail, setEmail] = React.useState<string>("");
    const [password, setPasword] = React.useState<string>("");
    // 校验手机号
    const validatePhon = (value: string) => value.match(/^1[3-9]\d{9}$/i);
    // 校验邮箱
    const validateEmail = (value: string) => value.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/i);

    const getInvalidInfo = (type?: string) => {
        if (selected == "login-message") {
            if (!phone) {
                setInvalidInfo({ tel: "请输入手机号", code: "", telEmail: "", passWord: "" });
                return false;
            }
            if (!validatePhon(phone)) {
                setInvalidInfo({ tel: "请输入正确的手机号", code: "", telEmail: "", passWord: "" });
                return false;
            }
            if (type == "hasPhone") {
                // 验证码校验手机号是否正确
                return true;
            }
            if (!code) {
                setInvalidInfo({ tel: "", code: "请输入验证码", telEmail: "", passWord: "" });
                return false;
            }
            return true;
        }
        if (!telEmail) {
            setInvalidInfo({ tel: "", code: "", telEmail: "请输入手机号或邮箱", passWord: "" });
            return false;
        }
        if (!validatePhon(telEmail) && !validateEmail(telEmail)) {
            setInvalidInfo({
                tel: "",
                code: "",
                telEmail: "请输入正确的手机号或邮箱",
                passWord: ""
            });
            return false;
        }
        if (!password) {
            setInvalidInfo({ tel: "", code: "", telEmail: "", passWord: "请输入密码" });
            return false;
        }
        return true;
    };

    const getPhone = (type?: string) => {
        if (getInvalidInfo("hasPhone")) {
            return phone;
        }

        return "";
    };

    const inputChange = (type: string, value: string) => {
        switch (type) {
            case "phone":
                invalidInfo.tel &&
                    setInvalidInfo({ tel: "", code: "", telEmail: "", passWord: "" });
                setPhone(value);
                break;
            case "code":
                invalidInfo.code &&
                    setInvalidInfo({ tel: "", code: "", telEmail: "", passWord: "" });
                if (value.length > 6) value = value.slice(0, 6);
                setCode(value);
                break;
            case "telEmail":
                invalidInfo.telEmail &&
                    setInvalidInfo({ tel: "", code: "", telEmail: "", passWord: "" });
                setEmail(value);
                break;
            case "passWord":
                invalidInfo.passWord &&
                    setInvalidInfo({ tel: "", code: "", telEmail: "", passWord: "" });
                setPasword(value);
                break;
            default:
                break;
        }
    };

    const onLogin = (type: string) => {
        if (getInvalidInfo()) {
            console.log("校验成功");
        }
        if ((type = "login-message")) {
            // 验证码登录
        }
    };

    return (
        <div className="w-full h-full bg-login-bg  bg-no-repeat bg-cover absolute left-0 top-0">
            <div className="h-full max-w-[1200px] mx-auto flex justify-end items-center min-h-[580px]">
                <Card className="max-w-full w-[424px] h-[457px] bg-transparent">
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
                                    selected == "login-message"
                                        ? styles.activeLeft
                                        : styles.activeRight
                                ],
                                cursor: "hidden",
                                tab: "text-66 px-0 h-12 text-[20px]",
                                tabContent: "text-66 group-data-[selected=true]:text-f602",
                                panel: "bg-white px-[33px]"
                            }}
                        >
                            <Tab key="login-message" title="验证码登录">
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
                                    <div className="flex gap-2 justify-end mt-[16px]">
                                        <Button
                                            fullWidth
                                            color="primary"
                                            className="h-[50px]"
                                            onClick={() => {
                                                onLogin("login-message");
                                            }}
                                        >
                                            登录
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                            <Tab key="login-passWord" title="密码登录">
                                <form className="flex flex-col gap-4">
                                    <Input
                                        isRequired
                                        placeholder="请输入手机号或邮箱"
                                        size="sm"
                                        type="email"
                                        isInvalid={!!invalidInfo.telEmail}
                                        color={invalidInfo.telEmail ? "danger" : "default"}
                                        errorMessage={invalidInfo.telEmail}
                                        onValueChange={(value) => {
                                            inputChange("telEmail", value);
                                        }}
                                        value={code}
                                        classNames={{
                                            description: "text-f602",
                                            errorMessage: "h-0"
                                        }}
                                    />
                                    <Input
                                        isRequired
                                        placeholder="请输入密码"
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
                                            errorMessage: "h-0"
                                        }}
                                    />

                                    <div className="flex gap-2 justify-end">
                                        <Button
                                            fullWidth
                                            color="primary"
                                            className="h-[50px]"
                                            onClick={() => {
                                                onLogin("login-passWord");
                                            }}
                                        >
                                            登录
                                        </Button>
                                    </div>
                                </form>
                            </Tab>
                        </Tabs>
                    </CardBody>
                    <div className="max-w-full bg-white  px-[33px] flex-auto">
                        <div className="flex gap-2 justify-between">
                            <Link className="text-black	" href="/login/findPassword">
                                找回密码
                            </Link>
                            <Link href="/login/register">注册</Link>
                        </div>
                        <div className="flex flex-row justify-center items-center text-d1d1 my-[20px]">
                            <div className="bg-d1d1 w-[92px] h-[1px]"></div>
                            <div className="mx-[10px] text-[12px]">快捷登录</div>
                            <div className="bg-d1d1 w-[92px] h-[1px]"></div>
                        </div>
                        <div className="flex justify-around">
                            <Link
                                className={"w-[53px] h-[53px] bg-no-repeat bg-cover bg-wx"}
                                href="#"
                            ></Link>
                            <Link
                                className={"w-[53px] h-[53px] bg-no-repeat bg-cover bg-wb"}
                                href="#"
                            ></Link>
                            <Link
                                className={"w-[53px] h-[53px] bg-no-repeat bg-cover bg-qq"}
                                href="#"
                            ></Link>
                            <Link
                                className={"w-[53px] h-[53px] bg-no-repeat bg-cover bg-zfb"}
                                href="#"
                            ></Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
export default Login;
