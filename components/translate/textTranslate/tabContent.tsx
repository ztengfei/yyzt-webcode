import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem, Textarea } from "@nextui-org/react";

import LanguageSelect from "./../langSelect";

import styles from "./index.module.css";
interface uploadProps {}

// Our app
function TabContent(props: uploadProps) {
    const [Inputvalue, setValue] = useState("");
    const onChange = (event: any) => {
        // console.log("event.nativeEvent+++", event.nativeEvent);
        // if (event.nativeEvent.isComposing) {
        //     return;
        // }
        setValue(event.target.value);
    };
    return (
        <div className={styles["translate"]}>
            <LanguageSelect modalType="text"></LanguageSelect>
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
