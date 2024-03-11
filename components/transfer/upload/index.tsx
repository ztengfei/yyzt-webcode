import React, { useState, useRef, Dispatch, SetStateAction } from "react";
import md5 from "md5";

import { Button, CircularProgress } from "@nextui-org/react";

import { fileSlicSize } from "@/components/config";
import { upLoadOne, upLoadPart, fileMerge } from "@/api/api";

import styles from "./index.module.css";
import toast from "react-hot-toast";

interface uploadProps {
    modelType: "people" | "machine" | "translate";
    setFileList: (file: File) => void;
}

// Our app
function Upload(props: uploadProps) {
    const uploadServerRef = useRef<{ response: any; cancel: any }>({
        response: null,
        cancel: null
    });
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
    // 分片上传错误列表
    const uploadErrorList = useRef<any>({})

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
        if (!uploadServerRef.current) {
            return;
        }
        // 如果大小不需要分片上传则直接调用上传接口
        uploadServerRef.current = await upLoadOne(file, (progress: number) => {
            setCircular(progress);
        });
        console.log("开始文件上传");
        setCircular(0);
        setIsupload(true);
        // 开始上传
        const res: any = await uploadServerRef.current.response();
        console.log("结束文件上传");
        if (res.errorCode == 0) {
            // 上传
            file.states = "success"; // 上传成功
            props.setFileList(file);
        } else {
            file.state = "error"; // 文件上传失败
        }

        setIsupload(false);
    };

    // 分片上传_一步一步等待
    const uploadNextChunk_back = async (currentChunk: number, chunks: number, file: any) => {
        if (isCancelRef.current) {
            // 如果当前已经被取消上传则直接返回
            file.state = "cancel";
            return;
        }
        if (currentChunk <= chunks) {
            var start = currentChunk * fileSlicSize;
            var end = Math.min(file.size, start + fileSlicSize);
            var chunk = file.slice(start, end); // 将文件切割成分片

            uploadServerRef.current = await upLoadPart(
                {
                    file: chunk,
                    fileMd5: file.md5,
                    fileName: file.name,
                    total: chunks,
                    index: currentChunk
                } as any,
                (progress: number) => {
                    console.log("文件上传进度", progress);
                    // 当前切片（已经上传的百分比 + 已经上传的切片大小）/ 总文件大小
                    let pro =
                        (((progress * fileSlicSize) / 100 + (currentChunk - 1) * fileSlicSize) /
                            file.size) *
                        100;
                    setCircular(pro);
                }
            );
            // 开始上传
            const res: any = await uploadServerRef.current.response();
            console.log("结束文件上传");
            if (res.errorCode == 0) {
                currentChunk++; // 成功上传一个分片，增加当前分片的索引
                await uploadNextChunk(chunks, file); // 继续上传下一个分片
            } else {
                // 切片上传失败
                file.state = "error"; // 文件上传失败
            }
        } else {
            console.log("文件上传完成");
            // 全部上传完成合并文件
            const res: any = await fileMerge({ fileMd5: file.md5 });
            if (res.errorCode == 0) {
                file.state = "success"; // 文件上传成功，切片合并成功
            } else {
                // 切片合并失败
                file.state = "error"; // 文件上传失败
            }
        }
    };

    // 上传函数
    const upLoadPartFn = (chunk: any, file: any, chunks: any, currentChunk: any) => {
        return upLoadPart(
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
    const uploadNextChunk = async (chunks: number, file: any, upList?:number[]) => {
        if (isCancelRef.current) {
            // 如果当前已经被取消上传则直接返回
            file.state = "cancel";
            return;
        }
        let servers = [];
        for (let i = 0; i < chunks; i++) {
            // 如果不是上传错误的分片不需要继续上传
            if (upList && !upList.includes((i+1))){
                continue;
            }
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
        const mage: any = await fileMerge({ fileMd5: file.md5 }); // 继续上传下一个分片
        console.log(mage);
        if (mage.errorCode == 0) {
            file.state = "success"; // 文件上传成功，切片合并成功
            uploadErrorList.current[file.md5] = null;
        } else {
            // let errorData = [];
            // let errorChan = uploadErrorList.current[file.md5];
            // if (!errorChan) {
            //     errorData = mage.data;
            //     uploadErrorList.current[file.md5] = mage.data;
            // } else {
            //     toast.error('上传失败，正在重新上传');
            //     mage.data.forEach((item)=>{
            //         if (!errorChan.includes(item)) {
            //             errorData.push(item);
            //             errorChan.push(item);
            //         }
            //     });
            //     uploadErrorList.current[file.md5] = errorChan;
            // }
            toast.error('文件上传失败，正在重新上传');
            // 上传失败后重新上传失败的分片
            if (mage.data.length) {
                await uploadNextChunk(chunks, file, mage.data);
            }
            // 切片合并失败
            file.state = "error"; // 文件上传失败
        }
    };

    const calculateFileMd5 = (file:any, chunkSize:number, callback:any) => {  
        const chunks = Math.ceil(file.size / chunkSize);  
        let spark = new Array(chunks);  
        let currentChunk = 0;  
        let loaded = 0;  
        let hash = 0;  
      
        function loadNext() {  
            const start = currentChunk * chunkSize;  
            const end = Math.min(file.size, start + chunkSize);  
            const chunk = file.slice(start, end);  
      
            const reader = new FileReader();  
            reader.onload = function(e) {  
                loaded += e.total;  
                const chunkHash = md5.arrayBuffer(e.target.result);  
                hash = md5.hmacUpdate(hash, chunkHash);  
      
                currentChunk++;  
                if (currentChunk < chunks) {  
                    loadNext();  
                } else {  
                    const finalHash = md5.hmacFinal(hash);  
                    callback(null, finalHash);  
                }  
            };  
            reader.onerror = function() {  
                callback(new Error('Error reading file chunk'));  
            };  
            reader.readAsArrayBuffer(chunk);  
        }  
      
        loadNext();  
    } 

    const calculateMd5 = (file) => {
        return new Promise((resolve:(value: string) => void, reject) => {
            const reader = new FileReader();
            
            // 当文件加载完成时调用onload事件处理函数
            reader.onload = function (event) {
                const arrayBufferView = event.target.result;
                
                // 创建ArrayBuffer对象
                const buffer:any = ArrayBuffer.isView(arrayBufferView) ?
                    arrayBufferView.buffer :
                    arrayBufferView;
                        
                // 将ArrayBuffer转换为Uint8Array类型
                const uint8Array:any = new Uint8Array(buffer);
                console.log('uint8Array++++', uint8Array);
                // 初始化CryptoJS库
                // CryptoJS.util.bin.words[0] = 123456789;
                // CryptoJS.util.bin.words[1] = 987654321;
                // 计算MD5值
                const md5Hash:string = md5(uint8Array).toString();
                resolve(md5Hash);
            };
            
            // 开始读取文件内容
            reader.readAsArrayBuffer(file);
        });
    }

    const fileUpload = async (files: FileList) => {
        for (let i = 0; i < files.length; i++) {
            isCancelRef.current = false;
            chunkServerRef.current = [];
            const file: any = files[i];
            const fileMd5:string = await calculateMd5(file);
            file.md5 = fileMd5;
            file.id = fileMd5;
            if (file.size <= fileSlicSize) {
                await smallFileUpload(file);
            } else {
                const chunks = Math.ceil(file.size / fileSlicSize); // 计算分片的数量
                setCircular(0);
                setIsupload(true);
                
                await uploadNextChunk(chunks, file);
                setIsupload(false);
                // 将上传文件同步至服务器
            }
            props.setFileList(file);
            console.log(file);
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
        e.target.files && (await fileUpload(e.target.files));
        e.target.value = "";
        console.log(e);
    };

    const boxName = props.modelType;
    return (
        <div className={styles["upload"] + " " + styles[boxName]}>
            <div
                className="lable-box cursor-pointer"
                onDragOver={onDragOver}
                onDrop={drop}
                onClick={onclick}
                onDragLeave={onDragLeave}
                ref={dragBoxRef}
            >
                {!isUpload && (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <div className="table-image"></div>
                        <div className="table-title">请选择要上传的音频视频拖拽次区域</div>
                        <div className="table-info">
                            格式支持:
                            mp3、wav、pcm、n4a、m4v、amr、wma、aac、mp4、mpg、3gp单个文件最长5小时、最大2GB，单次支持上传100个
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
                        <div className="px-2 text-center text-[#333] mt-1 ellipsis">
                            音频 2021-08-12 12:18:13.mp3
                        </div>
                        <Button className=" bg-white text-[#333] mt-3 w-[97px]" onClick={onCancel}>
                            取消
                        </Button>
                    </div>
                )}
            </div>
            <input type="file" ref={inputRef} className="hidden" onChange={inputChange} multiple />
        </div>
    );
}

export default Upload;
