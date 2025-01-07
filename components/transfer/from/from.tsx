// import Layout from "@/components/layout";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import { Select, SelectItem, Textarea } from "@nextui-org/react";

function KeyWordAndList(props, ref) {
    const [lanuage, setLanuage] = useState(["cn"]);
    const [major, setMajor] = useState(["common"]);
    const { language = [] } = props;
    const area = [
        { label: "通用", value: "common", description: "" },
        { label: "医药", value: "medicine", description: "" },
        { label: "计算机", value: "computer", description: "" }
    ];

    useImperativeHandle(ref, () => ({
        getSelectedData: () => {
            return { lanFrom: [...lanuage].join(","), zxMajor: [...major].join(",") };
        }
    }));
    return (
        <>
            <div className="text-lg font-semibold">
                <span className="text-f602">*</span>
                <span>选择需要转化的音频语言</span>
            </div>
            <div className="relative w-full h-[80px]  rounded-2xl mt-[10px]">
                <Select
                    items={language}
                    size="sm"
                    // label="Favorite Animal"
                    // placeholder="Select an animal"
                    className="h-[38px]"
                    classNames={{
                        trigger: "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]"
                    }}
                    disallowEmptySelection
                    selectedKeys={lanuage}
                    onSelectionChange={setLanuage as any}
                >
                    {(animal: any) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
                </Select>
            </div>
            {/* <div className="text-lg font-semibold">
                <span className="text-f602">*</span>
                <span>选择专业领域</span>
            </div>
            <div className="relative w-full h-[80px]  rounded-2xl mt-[10px]">
                <Select
                    items={area}
                    size="sm"
                    // label="Favorite Animal"
                    // placeholder="Select an animal"
                    className="h-[38px]"
                    classNames={{
                        trigger: "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]"
                    }}
                    defaultSelectedKeys={["english"]}
                    disallowEmptySelection
                    selectedKeys={major}
                    onSelectionChange={setMajor as any}
                >
                    {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
                </Select>
            </div> */}
        </>
    );
}
export default forwardRef(KeyWordAndList);
