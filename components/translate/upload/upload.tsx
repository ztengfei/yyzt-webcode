import React, { useState, useRef } from "react";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";
import SparkMD5 from "spark-md5";

import { fileSlicSize, translateFileMaxSize } from "@/components/config";
import { fyUpLoadOne, fyUpLoadPart, fyFileMerge } from "@/api/api";

import styles from "./index.module.css";
import toast from "react-hot-toast";
interface uploadProps {
    setUploadState: (state: string, id: string) => void;
    // setProgress: React.Dispatch<React.SetStateAction<string>>;
}

// Our app
function Upload(props: uploadProps) {
    const { setUploadState } = props;

    // const [files, setFiles] = useState([]);

    const uploadServerRef = useRef<any>();
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
    const smallFileUpload = async (file: any) => {
        // 如果大小不需要分片上传则直接调用上传接口
        uploadServerRef.current = await fyUpLoadOne(file, (progress: number) => {
            setCircular(progress);
        });
        console.log("开始文件上传");
        setCircular(0);
        setFileName(file.name);
        setIsupload(true);

        // 开始上传
        const res: any = await uploadServerRef.current.response();
        console.log("结束文件上传");
        if (res.code == 200) {
            // 上传
            file.state = "success"; // 上传成功
            file.fileId = res.data;
            // props.setFileList();
        } else {
            file.state = "error"; // 文件上传失败
            toast.error(res.msg);
        }

        setIsupload(false);
    };

    // 上传函数
    const upLoadPartFn = (chunk: any, file: any, chunks: any, currentChunk: any) => {
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
    const uploadNextChunk = async (chunks: number, file: any) => {
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
        const res: any = await Promise.all(servers);
        const mage: any = await fyFileMerge({ fileMd5: file.md5 }); // 继续上传下一个分片
        if (mage.code == 200) {
            file.state = "success"; // 文件上传成功，切片合并成功
            file.fileId = mage.data;
        } else {
            // 切片合并失败
            file.state = "error"; // 文件上传失败
            toast.error(mage.msg);
        }
    };

    const calculateFileMd5 = (file: any, chunkSize?: number) => {
        return new Promise((resolve: (value: string) => void, reject) => {
            const chunkSize = 1024 * 1024; // 1MB chunk size
            const spark = new SparkMD5.ArrayBuffer();
            const fileReader = new FileReader();
            let chunksLoaded = 0;
            const chunksTotal = Math.ceil(file.size / chunkSize);

            function loadNext() {
                const start = chunksLoaded * chunkSize;
                const end = start + chunkSize >= file.size ? file.size : start + chunkSize;

                fileReader.readAsArrayBuffer(file.slice(start, end));
            }

            fileReader.onload = function (e) {
                if (e.target.error) {
                    reject(e.target.error);
                } else {
                    // Append array buffer
                    spark.append(e.target.result);
                    chunksLoaded++;

                    if (chunksLoaded < chunksTotal) {
                        loadNext();
                    } else {
                        // Done loading all chunks
                        resolve(spark.end());
                    }
                }
            };

            // Start loading the first chunk
            loadNext();
        });
    };

    const fileUpload = async (files: any) => {
        if (!files.length) {
            return;
        }

        isCancelRef.current = false;
        chunkServerRef.current = [];
        // TODO 只上传第一个文件
        const file = files[0];
        if (file.size > translateFileMaxSize) {
            toast.error("文件最大不能超过10M");
            return;
        }

        const fileMd5 = await calculateFileMd5(file);
        file.md5 = fileMd5;
        file.id = fileMd5;

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
        console.log("file.state++++", file.state, file.fileId);
        if (file.state == "success") {
            // file.state = "success"; // 文件上传成功，切片合并成功
            // file.fileId = res.data;
            setUploadState("uploadSuccess", file.fileId);
        }
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
                        <div className="px-5 text-center text-[#333] mt-1 text-wrap">
                            {fileName}
                        </div>
                        <Button className=" bg-white text-[#333] mt-3 w-[97px]" onClick={onCancel}>
                            取消
                        </Button>
                    </div>
                )}
            </div>
            {/*  multiple  */}
            <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={inputChange}
                accept=".xsl,.xlsx,.ppt,.pptx,.pdf,.doc,.docx"
            />
        </div>
    );
}

export default Upload;
