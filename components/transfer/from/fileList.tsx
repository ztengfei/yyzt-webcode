// import Layout from "@/components/layout";
import { useRef, useState } from "react";
import {
    Tabs,
    Tab,
    Input,
    Link,
    Button,
    CheckboxGroup,
    Checkbox,
    CardHeader,
    Avatar,
    Select,
    cn,
    Image
} from "@nextui-org/react";
import DeleteIcon from "@/components/icon/delete";

export default function KeyWordAndList(props: { fileLists: [] }) {
    const [checked, setChecked] = useState(["buenos-aires", "sydney"]);
    if (!props.fileLists || !props.fileLists.length) {
        return (
            <>
                <div className="text-lg font-semibold mt-6 mb-4">上传文件（0）</div>
                <div className="w-full flex-1 flex justify-center mt-[10%]">
                    <Image src="/images/transfer/nodata.png"></Image>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="text-lg font-semibold mt-6 mb-4">上传文件（3）</div>
            <div>
                <CheckboxGroup
                    // label="Select cities"
                    color="primary"
                    value={checked}
                    onValueChange={setChecked}
                >
                    <Checkbox
                        aria-label={"label"}
                        radius="full"
                        classNames={{
                            base: cn(
                                "inline-flex max-w-full w-full bg-content1 m-0",
                                "hover:bg-content2 items-center justify-start",
                                "cursor-pointer rounded-lg gap-2 p-3.5 border-2 border-transparent mb-2.5"
                            ),
                            label: "w-full"
                        }}
                        value={"文件id"}
                    >
                        <div className="flex flex-row justify-between items-center">
                            <div className="felx-1">
                                <span>文件名称</span>
                                <span className="text-[#939393] ml-11">时长: 3分钟</span>
                            </div>
                            <Button
                                isIconOnly
                                radius="full"
                                variant="light"
                                className="w-[23px] h-[23px] min-w-[23px]"
                            >
                                <DeleteIcon></DeleteIcon>
                            </Button>
                        </div>
                    </Checkbox>
                    <Checkbox
                        aria-label={"label"}
                        radius="full"
                        classNames={{
                            base: cn(
                                "inline-flex max-w-full w-full bg-content1 m-0",
                                "hover:bg-content2 items-center justify-start",
                                "cursor-pointer rounded-lg gap-2 p-3.5 border-2 border-transparent mb-2.5"
                            ),
                            label: "w-full"
                        }}
                        value={"文件id1"}
                    >
                        <div className="flex flex-row justify-between items-center">
                            <div className="felx-1">
                                <span>文件名称</span>
                                <span className="text-[#939393] ml-11">时长: 3分钟</span>
                            </div>
                            <Button
                                isIconOnly
                                radius="full"
                                variant="light"
                                className="w-[23px] h-[23px] min-w-[23px]"
                            >
                                <DeleteIcon></DeleteIcon>
                            </Button>
                        </div>
                    </Checkbox>
                </CheckboxGroup>
            </div>
        </>
    );
}
