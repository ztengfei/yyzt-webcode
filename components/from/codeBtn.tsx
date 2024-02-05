import React, { useRef, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { sendCode } from "@/api/api";

interface codeInputType {
    className?: string;
    getPhone: (type: string) => string;
    type: string;
}
const isSend = false;

// 头部导航，和头部相关功能 重新发送（60）
function CodeBtn(props: codeInputType) {
    // 是否禁用
    const [disable, setDisable] = useState(false);
    const [text, setText] = useState("发送验证码");
    const countNum = useRef(60);
    const timerRef = useRef(0);
    const getText = () => {
        setText(`重新发送（${countNum.current}）`);
        timerRef.current = window.setTimeout(() => {
            countNum.current--;
            if (countNum.current <= 0) {
                setText("重新发送");
                setDisable(false);
                clearTimeout(timerRef.current);
                return;
            }
            getText();
        }, 1000);
    };

    const onclick = async () => {
        const phone = props.getPhone(props.type);
        if (!phone) {
            return;
        }
        try {
            setDisable(true);
            getText();
            await sendCode({ userName: phone });
            countNum.current = 60;
        } catch (error) {
            console.error("验证码获取错误");
        }
    };
    return (
        <Button
            color="primary"
            variant="bordered"
            isDisabled={disable}
            className={props.className}
            onClick={onclick}
        >
            {text}
        </Button>
    );
}

export default CodeBtn;
