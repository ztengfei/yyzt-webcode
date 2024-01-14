import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import ActiveIcon from "@/components/icon/active";
import DeleteIcon from "@/components/icon/delete";
import DisplaceIcon from "@/components/icon/displace";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import styles from "./index.module.css";
interface uploadProps {
    modelType: "people" | "machine" | "translate";
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
function Upload(props: uploadProps) {
    const [uploadState, setUploadState] = useState("success");
    const [files, setFiles] = useState([]);
    // 文件加载的进展
    const onaddfileprogress = (file, progress) => {
        console.log("文件加载速度+++++", progress);
    };

    // 文件处理的进展
    const onprocessfileprogress = (file, progress) => {
        console.log("文件处理速度+++++", progress);
    };
    const getUploadHtml = () => {
        // 文档上传中
        if (uploadState == "loding") {
            return (
                <div className=" absolute left-0 top-0 w-full h-full flex items-center flex-col">
                    <CircularProgress
                        aria-label="Loading..."
                        size="lg"
                        value={80}
                        color="primary"
                        showValueLabel={true}
                        className="mt-[195px]"
                        classNames={{
                            svg: "w-[60px] h-[60px] drop-shadow-md"
                            // indicator: "stroke-white",
                            // track: "stroke-white/10",
                            // value: "text-3xl font-semibold text-white",
                        }}
                    />
                    <div className="text-center text-[#333] mt-1">文档解析中,请稍等</div>
                    <Button className=" bg-white text-[#333] mt-3">取消</Button>
                </div>
            );
        }
        // 文档上传和
        if (uploadState == "success") {
            return (
                <div className=" absolute left-0 top-0 w-full h-full flex items-center flex-col p-3">
                    <div className="text-sm text-active text-right flex flex-row items-center justify-end w-full">
                        <ActiveIcon size={14}></ActiveIcon>解析完成
                    </div>
                    <div className="w-[58px] h-[58px] relative mx-auto mt-[100px]">
                        <Image width={58} alt="xsl" src="/images//translate/xsl.png" />
                        <ActiveIcon
                            size={20}
                            className="absolute bottom-[-5px] right-[-7px]"
                        ></ActiveIcon>
                    </div>
                    <div className="flex flex-row w-full mt-4">
                        <div className="flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden text-[#333333]">
                            文件名称
                        </div>
                        <DeleteIcon size={24}></DeleteIcon>
                    </div>
                    <div className="flex flex-row w-full mt-4">
                        <Select
                            className="max-w-xs"
                            selectionMode={"single"}
                            classNames={{
                                listbox: "flex-row"
                            }}
                        >
                            {languages.map((item) => (
                                <SelectItem key={item.id} value={item.id}>
                                    {item.value}
                                </SelectItem>
                            ))}
                        </Select>
                        <></>
                    </div>
                    <Button className="w-[274px] h-[44px] mt-10" color="primary">
                        立即翻译
                    </Button>
                </div>
            );
        }
        return (
            <div className=" absolute left-0 top-0 w-full h-full pointer-events-none">
                <div className="flex">
                    <div className="flex flex-row flex-wrap mt-[60px]">
                        <div className="ml-[58px] mt-[27px] text-center">
                            <Image width={58} alt="xsl" src="/images//translate/xsl.png" />
                            <div className="mt-1 text-[#acacac] text-sm">xsl/xlsx</div>
                        </div>
                        <div className="ml-[58px] mt-[27px]  text-center">
                            <Image width={58} alt="ppt" src="/images//translate/ppt.png" />
                            <div className="mt-1 text-[#acacac] text-sm">ppt/pptx</div>
                        </div>
                        <div className="ml-[58px] mt-[27px]  text-center">
                            <Image width={58} alt="pdf" src="/images//translate/pdf.png" />
                            <div className="mt-1 text-[#acacac] text-sm">pdf</div>
                        </div>
                        <div className="ml-[58px] mt-[27px]  text-center">
                            <Image width={58} alt="doc" src="/images//translate/doc.png" />
                            <div className="mt-1 text-[#acacac] text-sm">doc/docx</div>
                        </div>
                    </div>
                </div>
                <div className="text-center text-[#333] mt-8">选择要上传的文件</div>
                <div className="text-center text-xs text-[#acacac] mt-2">
                    点击或将文件拖拽到此区域
                </div>
            </div>
        );
    };

    let lableHtml =
        '<div class="lable-box"><div class="table-image"></div><div class="table-title">选择要上传的文件</div><div class="table-title">点击或将文件拖拽到此区域</div></div>';
    return (
        <div className={styles["translate"]}>
            <FilePond
                files={files}
                onupdatefiles={setFiles}
                onaddfileprogress={onaddfileprogress}
                onprocessfileprogress={onprocessfileprogress}
                allowMultiple={true}
                maxFiles={3}
                // server="/api"
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle={""}
            />
            {getUploadHtml()}
        </div>
    );
}

export default Upload;
