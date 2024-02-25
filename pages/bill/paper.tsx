import React, { useEffect, useState } from "react";
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
    Select,
    SelectItem
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

    return (
        <form className="flex flex-col">
            <Select label="发票类型" selectedKeys={["pager"]} labelPlacement="outside" isRequired>
                <SelectItem value="pager" key={"pager"}>
                    纸质发票 (预计10个工作日寄出)
                </SelectItem>
            </Select>
            <Select label="抬头类型" selectedKeys={["pager"]} labelPlacement="outside" isRequired>
                <SelectItem value="pager" key={"pager"}>
                    个人普通发票
                </SelectItem>
            </Select>
            <Input
                isRequired
                label="发票抬头"
                placeholder="请输入公司抬头"
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
            />
            <Input
                isRequired
                label="发票抬头"
                placeholder="请输入公司抬头"
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
            />
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
    );
}
export default Login;
