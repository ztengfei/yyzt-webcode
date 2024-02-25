import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem, Textarea } from "@nextui-org/react";

import LanguageSelect from "./../langSelect";

import styles from "./index.module.css";
import { txtTranslate } from "@/api/api";
interface uploadProps {
    language: { value: string; label: string }[];
    setTranslateText: (text: string) => void;
}

// Our app
function TabContent(props: uploadProps) {
    const [Inputvalue, setValue] = useState("");
    const [result, setResult] = useState("");
    const langRef = useRef<any>();
    const { language, setTranslateText } = props;
    // 当前翻译是否完成
    const isEndRef = useRef<boolean>(true);

    let timeRef = useRef(0);

    const onChange = (event: any) => {
        // console.log("event.nativeEvent+++", event.nativeEvent);
        // if (event.nativeEvent.isComposing) {
        //     return;
        // }
        setValue(event.target.value);
        debounce(event.target.value);
    };

    const debounce = (src_text?: string) => {
        clearTimeout(timeRef.current); // 清除之前设置的计时器

        timeRef.current = window.setTimeout(() => {
            translateText(src_text);
        }, 500);
    };

    const translateText = (src_text?: string) => {
        if (!langRef.current) {
            return;
        }
        const { lanFrom: from, zxRemarks: to } = langRef.current.getSelectedLan();
        if (!from || !to) {
            return;
        }
        isEndRef.current = false;
        // 请求开始翻译
        txtTranslate({ from, to, src_text: src_text || Inputvalue })
            .then((res: any) => {
                isEndRef.current = true;
                setTranslateText(res.data || "");
            })
            .catch(() => {
                isEndRef.current = true;
            });
    };

    return (
        <div className={styles["translate"]}>
            <LanguageSelect
                modalType="text"
                languages={language}
                ref={langRef}
                languageChange={debounce}
            ></LanguageSelect>
            <div className=" relative flex-1 mb-4 overflow-hidden">
                <Textarea
                    placeholder="请输入要翻译的文字"
                    className="max-w-xs"
                    maxLength={5000}
                    value={Inputvalue}
                    maxRows={1000}
                    classNames={{
                        base: "mt-4 h-full overflow-hidden",
                        inputWrapper:
                            "!h-[100%]  bg-[#F7F8FA] border-2 border-[#edeef1]  pb-8 max-h-[600px]",
                        input: "!h-[100%]",
                        innerWrapper: "h-full overflow-auto"
                    }}
                    onChange={onChange}
                />
                {Inputvalue && (
                    <span
                        className=" absolute left-3 bottom-3 bg-transparent text-[#333] text-sm cursor-pointer"
                        onClick={() => {
                            setValue("");
                        }}
                    >
                        清除
                    </span>
                )}
                <span className=" absolute right-3 bottom-3 text-[#BCBCBC] text-sm">
                    {Inputvalue.length}/5000
                </span>
            </div>
        </div>
    );
}

export default TabContent;
