//  找回密码
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
import Router, { useRouter } from "next/router";

import styles from "./index.module.css";
import CodeBtn from "@/components/from/codeBtn";
import { forgotPwd } from "@/api/api";
import { RASEncrypt, getTolocal, randomString, saveToWindow, setToLocal } from "@/components/tool";
import toast from "react-hot-toast";
import { useEventListener } from "ahooks";

const initInvalidInfo = {
    tel: "",
    code: "",
    telEmail: "",
    passWord: "",
    againPassWord: ""
};

function FindPassword() {
    const [selected, setSelected] = useState("register-message");
    //表单数据的状态
    const [invalidInfo, setInvalidInfo] = useState(initInvalidInfo);

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
        if (!telEmail) {
            setInvalidInfo({ ...initInvalidInfo, telEmail: "请输入手机号或邮箱" });
            return false;
        }
        if (!validatePhon(telEmail) && !validateEmail(telEmail)) {
            setInvalidInfo({ ...initInvalidInfo, telEmail: "请输入正确的手机号或邮箱" });
            return false;
        }
        if (type == "phoneAndEmail") {
            // 验证码校验邮箱是否正确
            return true;
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

    const getPhone = () => {
        if (getInvalidInfo("phoneAndEmail")) {
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

    const onLogin = async () => {
        if (!getInvalidInfo()) {
            return;
        }
        // 校验通过
        setInvalidInfo({ ...initInvalidInfo });
        console.log("校验成功");
        // const timeDate = new Date().getTime();
        // const userKey = randomString(32);
        // password RASEncrypt().encrypt(`${password},<<<,${timeDate},<<<,${userKey}`)
        try {
            const res: any = await forgotPwd({
                userName: telEmail,
                pwd: RASEncrypt().encrypt(`${password}`),
                smsCode: code,
                loginType: 11 // 0账号密码  1微信 2支付宝 11验证码
            });
            if (res.errorCode == 0) {
                toast.success("密码设置成功，请登录");
                setTimeout(() => {
                    Router.push("/login");
                }, 800);
                return;
            }
            toast.error("密码设置失败");
        } catch (error) {
            // 接口异常
            toast.error("服务异常");
        }
    };

    // 增加修改密码监听
    const handleKeyPress = (event: any) => {
        if (event.code === "Enter") {
            event.preventDefault(); // 阻止默认行为，比如提交表单等
            onLogin();
        }
    };
    useEventListener("keydown", handleKeyPress);

    return (
        <div className="w-full h-full min-h-[600px] bg-login-bg  bg-no-repeat bg-cover absolute left-0 top-0">
            <div className="h-full max-w-[1200px] mx-auto flex justify-end items-center min-h-[600px]">
                <Card className="max-w-full w-[424px] h-[455px] bg-white px-[33px]">
                    <div className="text-black text-[28px] mt-[34px] mb-[25px] font-semibold">
                        找回密码
                    </div>
                    <div className="overflow-hidden p-0 bg-transparent relative flex-none">
                        <form className="flex flex-col">
                            <Input
                                isRequired
                                placeholder="请输入手机号/邮箱"
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
                            <div className={"mt-[14px] flex flex-row"}>
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
                                placeholder="请输入新登录密码（6-12位字母+数字）"
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
                                    base: "mt-[14px]"
                                }}
                            />
                            <Input
                                isRequired
                                placeholder="请再次输入新密码"
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
                                    base: "mt-[14px]"
                                }}
                            />
                        </form>
                    </div>
                    <div className="max-w-full flex-auto">
                        <div className="flex gap-2 justify-end mt-[14px]">
                            <Button
                                fullWidth
                                color="primary"
                                className="h-[50px]"
                                onClick={onLogin}
                            >
                                确认找回
                            </Button>
                        </div>
                        <div className="flex flex-row justify-center my-[19px]">
                            <div className="mx-[10px] text-[12px]">
                                <span className="text-97 text-[14px]">想起密码？返回</span>
                                <Link className="text-f602 text-[14px]" href="/login/">
                                    登录
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
export default FindPassword;
