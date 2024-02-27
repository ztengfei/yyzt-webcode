import React, { useEffect, useState, useCallback } from "react";
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
import Router from "next/router";

import CodeBtn from "@/components/from/codeBtn";
import { login, loginProp, autnLoginPage } from "@/api/api";
import { RASEncrypt, getTolocal, randomString, saveToWindow, setToLocal } from "@/components/tool";

import styles from "./index.module.css";
const initVal = {
    tel: "",
    code: "",
    telEmail: "",
    passWord: ""
};

//  登陆界面
function Login() {
    const [selected, setSelected] = useState("login-message");
    //表单数据的状态
    const [invalidInfo, setInvalidInfo] = useState(initVal);

    // 手机号码
    const [userName, setUserName] = React.useState<string>("");
    const [code, setCode] = React.useState<string>("");
    const [password, setPasword] = React.useState<string>("");
    const [disabled, setDisabled] = useState(false);
    // 校验手机号
    const validatePhon = (value: string) => value.match(/^1[3-9]\d{9}$/i);
    // 校验邮箱
    const validateEmail = (value: string) => value.match(/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/i);

    const getInvalidInfo = (type?: string) => {
        if (!userName) {
            setInvalidInfo({ tel: "", code: "", telEmail: "请输入手机号或邮箱", passWord: "" });
            return false;
        }
        if (!validatePhon(userName) && !validateEmail(userName)) {
            setInvalidInfo({
                tel: "",
                code: "",
                telEmail: "请输入正确的手机号或邮箱",
                passWord: ""
            });
            return false;
        }
        if (selected == "login-message") {
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

        if (!password) {
            setInvalidInfo({ tel: "", code: "", telEmail: "", passWord: "请输入密码" });
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
                invalidInfo.code &&
                    setInvalidInfo({ tel: "", code: "", telEmail: "", passWord: "" });
                if (value.length > 6) value = value.slice(0, 6);
                setCode(value);
                break;
            case "telEmail":
                invalidInfo.telEmail &&
                    setInvalidInfo({ tel: "", code: "", telEmail: "", passWord: "" });
                setUserName(value);
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

    const openOtherLogin = async (type: number) => {
        setToLocal("loginType", type);

        const res: any = await autnLoginPage({ loginType: type });
        const div = document.createElement("div");
        div.innerHTML = res.data;
        document.body.appendChild(div);
        let fromEl = div.querySelector("form");
        fromEl && fromEl.submit();
    };

    const showErrorMes = (errorCode: number, msg: string) => {
        switch (errorCode) {
            case 1002:
                setInvalidInfo({ ...initVal, code: "验证码错误" });
                break;
            case 1004:
                setInvalidInfo({ ...initVal, telEmail: "账号或密码错误" });
                break;
            default:
                setInvalidInfo({ ...initVal, telEmail: msg });
                break;
        }
    };

    const onLogin = async (type?: 1 | 2) => {
        console.log("onLogin");
        // 第三方平台登录不需要校验
        if (!getTolocal("loginType") && !getInvalidInfo()) {
            return;
        }
        setDisabled(true);
        setInvalidInfo(initVal);
        let param: loginProp = {
            userName: userName,
            loginType: selected == "login-message" ? 11 : 0
        };
        const userKey = randomString(32);
        const timeDate = new Date().getTime();
        if (type) {
            const routerQuery = Router.query;
            param.pwd = RASEncrypt().encrypt(`${routerQuery.code},<<<,${timeDate},<<<,${userKey}`);
            param.state = routerQuery.state as string;
            param.loginType = type;
        } else {
            if (selected == "login-message") {
                param.pwd = RASEncrypt().encrypt(`${code},<<<,${timeDate},<<<,${userKey}`);
            } else {
                console.log(`${password},<<<,${timeDate},<<<,${userKey}`);
                param.pwd = RASEncrypt().encrypt(`${password},<<<,${timeDate},<<<,${userKey}`);
            }
        }
        // {
        //     code: number;
        //     data: { accessToken: string; refreshToken: string; expiresTime: string };
        //     msg: string;
        //     errorCode:string;
        // }
        const res: any = await login(param);

        // 登录完成后删除 loginType
        localStorage.removeItem("loginType");
        setDisabled(true);
        if (res.code == 200) {
            const { accessToken, refreshToken, expiresTime } = res.data;
            setToLocal("accessToken", accessToken);
            setToLocal("refreshToken", refreshToken);
            setToLocal("expiresTime", expiresTime);
            setToLocal("userTime", timeDate);
            setToLocal("userKey", userKey);
            Router.push({
                pathname: "/",
                query: { code: "Zeit", state: "success" }
            });
            return;
        }
        showErrorMes(res.errorCode, res.msg);
    };

    useEffect(() => {
        const routerQuery = Router.query;
        const loginType = getTolocal("loginType");
        if (loginType && routerQuery.code) {
            onLogin(Number(loginType) as 1 | 2);
        }
    }, []);

    // 增加登录监听
    const handleKeyPress = useCallback(
        (event: any) => {
            if (event.code === "Enter") {
                event.preventDefault(); // 阻止默认行为，比如提交表单等
                onLogin();
            }
        },
        [userName, code, password, disabled]
    );

    useEffect(() => {
        // document.addEventListener("keydown", handleKeyPress);
        // return () => {
        //     document.removeEventListener("keydown", handleKeyPress);
        // };
    }, []);

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
                                        ? " bg-loginTableLeft"
                                        : " bg-loginTableRight"
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
                                        placeholder="请输入手机号或邮箱"
                                        size="sm"
                                        isInvalid={!!invalidInfo.telEmail}
                                        color={invalidInfo.telEmail ? "danger" : "default"}
                                        errorMessage={invalidInfo.telEmail}
                                        onValueChange={(value) => {
                                            inputChange("telEmail", value);
                                            setUserName(value);
                                        }}
                                        value={userName}
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
                                            disabled={disabled}
                                            onPress={() => {
                                                onLogin();
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
                                        isInvalid={!!invalidInfo.telEmail}
                                        color={invalidInfo.telEmail ? "danger" : "default"}
                                        errorMessage={invalidInfo.telEmail}
                                        onValueChange={(value) => {
                                            inputChange("telEmail", value);
                                            setUserName(value);
                                        }}
                                        value={userName}
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
                                            onPress={() => {
                                                onLogin();
                                            }}
                                            disabled={disabled}
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
                                onClick={() => {
                                    openOtherLogin(1);
                                }}
                            ></Link>
                            {/* <Link
                                className={"w-[53px] h-[53px] bg-no-repeat bg-cover bg-wb"}
                                href="#"
                            ></Link>
                            <Link
                                className={"w-[53px] h-[53px] bg-no-repeat bg-cover bg-qq"}
                                href="#"
                            ></Link> */}
                            <Link
                                className={"w-[53px] h-[53px] bg-no-repeat bg-cover bg-zfb"}
                                href="#"
                                onClick={() => {
                                    openOtherLogin(2);
                                }}
                            ></Link>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
export default Login;
