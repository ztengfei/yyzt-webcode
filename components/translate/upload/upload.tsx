import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";
import md5 from "md5";

import { fileSlicSize } from "@/components/config";
import { fyUpLoadOne, fyUpLoadPart, fyFileMerge } from "@/api/api";

import styles from "./index.module.css";
interface uploadProps {
    setUploadState: React.Dispatch<React.SetStateAction<string>>;
    // setProgress: React.Dispatch<React.SetStateAction<string>>;
}

// Our app
function Upload(props: uploadProps) {
    const { setUploadState } = props;

    // const [files, setFiles] = useState([]);

    const uploadServerRef = useRef();
    // 文件上传的百分比
    const [circular, setCircular] = useState(0);
    // 当前是否正在上传文件
    const [isUpload, setIsupload] = useState(false);
    // 上传 input ref
    const inputRef = useRef<HTMLInputElement>(null);
    // 拖拽上传盒子样式
    const dragBoxRef = useRef<HTMLDivElement>(null);
    // 是否取消上传
    const isCancelRef = useRef<boolean>(false);
    // 分片上传的所有请求集合
    const chunkServerRef = useRef<any[]>([]);
    // 分片上传的进度
    const progressRef = useRef<number[]>([]);
    // 上传文件的名称
    const [fileName, setFileName] = useState("");

    // 拖拽内容至当前盒子
    const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        e.preventDefault();
        dragBoxRef.current && (dragBoxRef.current.style["borderColor"] = "#FF6002");
    };
    // 拖拽内容离开
    const onDragLeave: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        e.preventDefault();
        dragBoxRef.current && (dragBoxRef.current.style["borderColor"] = "#e2c6b6");
    };
    // 点击触发文件上传
    const onclick = () => {
        inputRef.current && inputRef.current.click();
    };
    // 取消上传
    const onCancel = () => {
        // 小文件取消上传
        uploadServerRef.current && uploadServerRef.current.cancel();
        // 多路取消上传
        if (chunkServerRef.current && chunkServerRef.current.length) {
            chunkServerRef.current.forEach((item) => {
                item.cancel();
            });
        }
        setIsupload(false);
    };

    // 小文件整体上传
    const smallFileUpload = async (file) => {
        // 如果大小不需要分片上传则直接调用上传接口
        uploadServerRef.current = await fyUpLoadOne(file, (progress: number) => {
            setCircular(progress);
        });
        console.log("开始文件上传");
        setCircular(0);
        setFileName(file.name);
        setIsupload(true);

        // 开始上传
        const res = await uploadServerRef.current.response();
        console.log("结束文件上传");
        if (res.errorCode == 0) {
            // 上传
            file.states = "success"; // 上传成功
            // props.setFileList();
        } else {
            file.state = "error"; // 文件上传失败
        }

        setIsupload(false);
    };

    // 上传函数
    const upLoadPartFn = (chunk, file, chunks, currentChunk) => {
        return fyUpLoadPart(
            {
                file: chunk,
                fileMd5: file.md5,
                fileName: file.name,
                total: chunks,
                index: currentChunk,
                id: file.id
            },
            (progress: number) => {
                console.log("文件上传进度", progress);
                progressRef.current[currentChunk] = progress;
                const count = progressRef.current.reduce((prev, curr) => prev + curr);
                let pro = count / chunks;
                setCircular(pro);
            }
        );
    };

    // 多路同时上传
    const uploadNextChunk = async (chunks: number, file: FileList) => {
        if (isCancelRef.current) {
            // 如果当前已经被取消上传则直接返回
            file.state = "cancel";
            return;
        }
        let servers = [];
        for (let i = 0; i < chunks; i++) {
            var start = i * fileSlicSize;
            var end = Math.min(file.size, start + fileSlicSize);
            var chunk = file.slice(start, end); // 将文件切割成分片
            let uploadItem = upLoadPartFn(chunk, file, chunks, i + 1);
            // 开始上传
            const uploadItemRes = uploadItem.response();
            chunkServerRef.current.push(uploadItem);
            servers.push(uploadItemRes);
        }
        const res = await Promise.all(servers);
        console.log("promiseAll+++++", res);
        const mage = await fyFileMerge({ fileMd5: file.md5 }); // 继续上传下一个分片
        console.log(mage);
        if (mage.errorCode == 0) {
            file.state = "success"; // 文件上传成功，切片合并成功
        } else {
            // 切片合并失败
            file.state = "error"; // 文件上传失败
        }
    };

    const fileUpload = async (files: FileList) => {
        for (let i = 0; i < files.length; i++) {
            isCancelRef.current = false;
            chunkServerRef.current = [];
            const file = files[i];
            const fileMd5 = md5(file);
            file.md5 = fileMd5 + new Date().getTime();
            file.id = fileMd5 + new Date().getTime();

            if (file.size <= fileSlicSize) {
                await smallFileUpload(file);
            } else {
                const chunks = Math.ceil(file.size / fileSlicSize); // 计算分片的数量
                setCircular(0);
                setFileName(file.name);
                setIsupload(true);

                await uploadNextChunk(chunks, file);
                setIsupload(false);
                // 将上传文件同步至服务器
            }
        }
        setUploadState("uploadSuccess");
    };

    const drop: React.DragEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        e.preventDefault();
        dragBoxRef.current && (dragBoxRef.current.style["borderColor"] = "#e2c6b6");
        var files = e.dataTransfer.files; // 获取文件列表
        console.log(files);
        fileUpload(files);
    };

    const inputChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        await fileUpload(e.target.files);
        e.target.value = "";
        console.log(e);
    };

    return (
        <div className={styles["translate"]}>
            <div
                className="lable-box cursor-pointer"
                onDragOver={onDragOver}
                onDrop={drop}
                onClick={onclick}
                onDragLeave={onDragLeave}
                ref={dragBoxRef}
            >
                {!isUpload && (
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
                )}
                {isUpload && (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <CircularProgress
                            aria-label="Loading..."
                            size="lg"
                            value={circular}
                            color="primary"
                            showValueLabel={true}
                            classNames={{
                                svg: "w-[60px] h-[60px] drop-shadow-md"
                            }}
                        />
                        <div className="px-2 text-center text-[#333] mt-1 ellipsis">{fileName}</div>
                        <Button className=" bg-white text-[#333] mt-3 w-[97px]" onClick={onCancel}>
                            取消
                        </Button>
                    </div>
                )}
            </div>
            {/*  multiple  */}
            <input type="file" ref={inputRef} className="hidden" onChange={inputChange} />
        </div>
    );
}

export default Upload;
