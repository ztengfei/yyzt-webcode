import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";

import DisplaceIcon from "@/components/icon/displace";

interface uploadProps {
    modalType: string;
}

const languages = [
    { value: "中文", id: "cn" },
    { value: "英文", id: "en" },
    { value: "法语", id: "pll" },
    { value: "俄语", id: "pe" },
    { value: "格鲁吉亚", id: "1cn" },
    { value: "塞尔维亚", id: "e1n" },
    { value: "安保部你家二", id: "1pll" },
    { value: "俄语", id: "p3e" }
];

// Our app
function languageSelect(props: uploadProps) {
    const boxName =
        props.modalType == "text"
            ? "flex flex-row w-full justify-between items-center"
            : "flex flex-row w-full mt-4 justify-between items-center";
    return (
        <div className={boxName}>
            <Select
                // className="max-w-xs"
                // selectionMode={"single"}
                size="sm"
                classNames={{
                    base: "w-[120px] h-[34px]",
                    trigger: "h-[34px] min-h-[34px]"
                }}
            >
                {languages.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        {item.value}
                    </SelectItem>
                ))}
            </Select>
            <Button isIconOnly color="primary" className=" bg-transparent">
                <DisplaceIcon width={13} height={11} />
            </Button>
            <Select
                size="sm"
                classNames={{
                    base: "w-[120px] h-[34px]",
                    trigger: "h-[34px] min-h-[34px]"
                }}
            >
                {languages.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                        {item.value}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
}

export default languageSelect;
