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
import Router, { useRouter } from "next/router";

import CodeBtn from "@/components/from/codeBtn";
import { login, loginProp, autnLoginPage } from "@/api/api";
import { RASEncrypt, getTolocal, randomString, saveToWindow, setToLocal } from "@/components/tool";

import styles from "./index.module.css";
import { useEventListener } from "ahooks";
import CloseIcon from "@/components/icon/close";
import toast from "react-hot-toast";
const initVal = {
    tel: "",
    code: "",
    telEmail: "",
    passWord: ""
};

//  第三方登录时如果没有绑定手机号需要绑定手机号才额能登录
function AddPhone() {
    const [wxSrc, setWxSrc] = useState("");
    const [selected, setSelected] = useState("login-message");
    //表单数据的状态
    const [invalidInfo, setInvalidInfo] = useState(initVal);

    // 手机号码
    const [userName, setUserName] = React.useState<string>("");
    const [code, setCode] = React.useState<string>("");
    const [password, setPasword] = React.useState<string>("");
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();
    const parouter = router.query;
    const { code: routerCode } = parouter;

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

    // const openOtherLogin = async (type: number) => {
    //     setToLocal("loginType", type);

    //     const res: any = await autnLoginPage({ loginType: type });
    //     if (res.code != 200) {
    //         toast.error("登录失败");
    //         return;
    //     }
    //     if (type == 1) {
    //         setWxSrc(res.data);
    //         return;
    //     }

    //     const div = document.createElement("div");
    //     // div.style.display = "none";
    //     div.innerHTML = res.data;
    //     document.body.appendChild(div);
    //     let fromEl = div.querySelector("form");
    //     fromEl && fromEl.submit();
    // };

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
        let param: any = {
            userName: userName,
            smsCode: code,
            openid: router.query.openid
        };

        // userName openid  smsCode
        const res: any = await login(param);

        // 登录完成后删除 loginType
        localStorage.removeItem("loginType");
        setDisabled(true);
        if (res.code == 200) {
            const { accessToken, refreshToken, expiresTime } = res.data;
            setToLocal("accessToken", accessToken);
            setToLocal("refreshToken", refreshToken);
            setToLocal("expiresTime", expiresTime);
            Router.push({
                pathname: "/",
                query: { code: "Zeit", state: "success" }
            });
            return;
        }
        showErrorMes(res.errorCode, res.msg);
    };

    // useEffect(() => {
    //     const loginType = getTolocal("loginType");
    //     console.log(routerCode);
    //     if (loginType && routerCode) {
    //         onLogin(Number(loginType) as 1 | 2);
    //     }
    // }, [routerCode]);

    // 增加登录监听  code=031aZM0w3kckw23e0g2w30pou52aZM0t&state=1q6bw7iap7gir4bfaaw24vhcq26xvgx6
    const handleKeyPress = (event: any) => {
        if (event.code === "Enter") {
            event.preventDefault(); // 阻止默认行为，比如提交表单等
            onLogin();
        }
    };
    useEventListener("keydown", handleKeyPress);

    // useEffect(() => {
    //     document.addEventListener("keydown", handleKeyPress);
    //     return () => {
    //         document.removeEventListener("keydown", handleKeyPress);
    //     };
    // }, []);

    return (
        <div className="w-full h-full min-h-[545px] bg-login-bg  bg-no-repeat bg-cover absolute left-0 top-0">
            <div className="h-full max-w-[1200px] mx-auto flex justify-end items-center min-h-[545px]">
                <Card className="max-w-full w-[424px] h-[290px] bg-transparent">
                    <CardBody className="overflow-hidden relative flex-none bg-white p-5">
                        <div className="flex flex-col">
                            <div className=" text-f602 text-lg pb-5 text-center">
                                绑定手机号或邮箱
                            </div>
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
                            <div className="flex gap-2 justify-end mt-[16px] mb-6">
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
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
export default AddPhone;
