// import Layout from "@/components/layout";
import { useRef, useState, forwardRef, useImperativeHandle } from "react";
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
import CustorChip from "@/components/common/custorChip";
import { convertSecondsToHMS } from "@/components/tool";
import { zxFiledel } from "@/api/api";

interface keyWordListProp {
    deleteFile: (fileId: string) => void;
    fileLists: FileList[];
    selectedFile: string[];
    setSelectedFile: (fileids: string[]) => void;
}

function KeyWordAndList(props: keyWordListProp, ref: any) {
    const { fileLists, selectedFile, setSelectedFile } = props;

    const [checked, setChecked] = useState([""]);

    useImperativeHandle(ref, () => ({
        getCheckedList: () => {
            return checked;
        }
    }));

    const deleteFile = (id: string) => {
        zxFiledel({ id });
    };

    if (!fileLists || !fileLists.length) {
        return (
            <>
                <div className="text-lg font-semibold mt-6 mb-4 ml-[23px]">上传文件（0）</div>
                <div className="w-full flex-1 flex justify-center mt-[30px]  ml-[23px]">
                    <Image src="/images/transfer/nodata.png" width={250} height={150}></Image>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="text-lg font-semibold mt-6 mb-4  ml-[23px]">
                文件列表（{fileLists.length}）
            </div>
            <div className="max-h-[570px] overflow-auto  ml-[23px]">
                <CheckboxGroup
                    // label="Select cities"
                    color="primary"
                    value={selectedFile}
                    onValueChange={(item) => {
                        setSelectedFile(item);
                    }}
                >
                    {fileLists.map((item: any) => {
                        if (!item) {
                            return "";
                        }
                        return (
                            <Checkbox
                                aria-label={"label"}
                                radius="full"
                                key={item.id}
                                classNames={{
                                    base: cn(
                                        "inline-flex max-w-full w-full bg-content1 m-0",
                                        "hover:bg-content2 items-center justify-start",
                                        "cursor-pointer rounded-lg gap-2 p-3.5 border-2 border-transparent mb-2.5"
                                    ),
                                    label: "w-full"
                                }}
                                value={item.id}
                            >
                                <div className="flex flex-row justify-between items-center">
                                    <div className="felx-1">
                                        <span>{item.fileName}</span>
                                        <span className="text-[#939393] ml-11">
                                            时长: {convertSecondsToHMS(item.fileTime)}
                                        </span>
                                    </div>
                                    <div>
                                        {/* {item.state == "error" && (
                                            <CustorChip color="error">上传失败</CustorChip>
                                        )} */}
                                        <Button
                                            isIconOnly
                                            radius="full"
                                            variant="light"
                                            className="w-[18px] h-[18px] min-w-[18px]"
                                            onClick={() => {
                                                props.deleteFile(item.id);
                                            }}
                                        >
                                            <DeleteIcon size={18}></DeleteIcon>
                                        </Button>
                                    </div>
                                </div>
                            </Checkbox>
                        );
                    })}
                </CheckboxGroup>
            </div>
        </>
    );
}

export default forwardRef(KeyWordAndList);
