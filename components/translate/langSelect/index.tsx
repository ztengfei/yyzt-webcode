import React, { forwardRef, useState, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";

import DisplaceIcon from "@/components/icon/displace";

interface uploadProps {
    modalType: string;
    languages: { value: string; label: string }[];
}

// Our app
const LanguageSelect = (props: uploadProps, ref) => {
    const boxName =
        props.modalType == "text"
            ? "flex flex-row w-full justify-between items-center"
            : "flex flex-row w-full mt-4 justify-between items-center";
    const { languages = [] } = props;
    const [lanFrom, setLanFrom] = useState([]);
    const [lanTo, setLanTo] = useState([]);

    useImperativeHandle(ref, () => ({
        getSelectedLan: () => {
            return {
                lanFrom: [...lanFrom].join(","),
                zxRemarks: [...lanTo].join(",")
            };
        }
    }));

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
                selectedKeys={lanFrom}
                disallowEmptySelection
                onSelectionChange={setLanFrom}
            >
                {languages.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
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
                selectedKeys={lanTo}
                disallowEmptySelection
                onSelectionChange={setLanTo}
            >
                {languages.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
        </div>
    );
};

export default forwardRef(LanguageSelect);
