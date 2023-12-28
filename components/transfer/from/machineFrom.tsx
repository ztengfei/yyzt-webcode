// import Layout from "@/components/layout";
import { useRef, useState } from "react";
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
    SelectItem,
    Image
} from "@nextui-org/react";

export default function Index() {
    const modalRef = useRef();
    const language = [
        { label: "英语", value: "english", description: "" },
        { label: "中文", value: "china", description: "" },
        { label: "法语", value: "fy", description: "" }
    ];
    const area = [
        { label: "通用", value: "english", description: "" },
        { label: "医药", value: "china", description: "" },
        { label: "计算机", value: "fy", description: "" }
    ];

    return (
        <div className="">
            <div className="text-sm mb-[4px]">
                <span className="text-f602">*</span>
                <span>选择需要转化的音频语言</span>
            </div>
            <Select
                items={language}
                size="sm"
                // label="Favorite Animal"
                // placeholder="Select an animal"
                className="h-[38px]"
                classNames={{
                    trigger: "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]"
                }}
                defaultSelectedKeys={["china"]}
            >
                {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
            </Select>
            <div className="text-sm  mt-4 mb-[4px]">
                <span className="text-f602">*</span>
                <span>选择专业领域</span>
            </div>
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
            >
                {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
            </Select>
        </div>
    );
}
