import React, { forwardRef, useState, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem, Selection } from "@nextui-org/react";

import DisplaceIcon from "@/components/icon/displace";

interface uploadProps {
    modalType: string;
    languages: { value: string; label: string }[];
    languageChange: () => void;
}

// Our app
const LanguageSelect = (props: uploadProps, ref: any) => {
    const boxName =
        props.modalType == "text"
            ? "flex flex-row w-full justify-between items-center"
            : "flex flex-row w-full mt-4 justify-between items-center";
    const { languages = [], languageChange } = props;
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

    const lanFromChange = (data: Selection) => {
        setLanFrom(data as any);
        languageChange && languageChange();
    };

    const lanToChange = (data: Selection) => {
        setLanTo(data as any);
        languageChange && languageChange();
    };

    const displaceLang = () => {
        let to = lanTo;
        let from = lanFrom;
        setLanTo(from);
        setLanFrom(to);
        languageChange && languageChange();
    };

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
                onSelectionChange={lanFromChange}
            >
                {languages.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                        {item.label}
                    </SelectItem>
                ))}
            </Select>
            <Button isIconOnly color="primary" className=" bg-transparent" onClick={displaceLang}>
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
                onSelectionChange={lanToChange}
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
