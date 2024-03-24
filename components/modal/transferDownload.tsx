import React, { forwardRef, useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Select,
    SelectItem,
    Switch
} from "@nextui-org/react";

import { resultDown } from "@/api/api";
import toast from "react-hot-toast";

function VideoTransfrom(props: any) {
    const { downloadType, downliadId, fileName } = props;
    const [fileType, setFileType] = useState(["doc"]);
    const [showRole, setShowRole] = useState(true);
    const [showTime, setShowTime] = useState(true);
    // 下载转写结果
    const downloadCnt = (callback) => {
        console.log(
            "showTime, showRole, fileType, downliadId",
            showTime,
            showRole,
            [...fileType],
            downliadId
        );
        const type = [...fileType][0];
        callback && callback();
        toast.promise(
            resultDown({
                zxFileIds: downliadId,
                hideRole: showRole ? 0 : 1,
                hideTime: showRole ? 0 : 1,
                extName: type
            })
                .then((res: any) => {
                    var elink = document.createElement("a");
                    elink.download = `${fileName}.${type}`;
                    let blob = null;
                    if (downliadId.length > 1) {
                        elink.download = `${fileName}-${downliadId[0]}.zip`;
                        blob = new Blob([res], { type: "application/octet-stream" });
                    } else {
                        blob = new Blob([res], { type: "application/octet-stream" });
                    }
                    elink.style.display = "none";
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                })
                .catch((error) => console.error("Error downloading file:", error)),
            {
                loading: "正在生成文件...",
                success: <b>文件下载成功!</b>,
                error: <b>文件下载失败。</b>
            }
        );

        // let blob = new Blob([res], { type: `.zip` });
        //     //兼容ie
        //     if (window.navigator && window.navigator.msSaveBlob) {
        //         window.navigator.msSaveBlob(blob, filename);
        //     } else {
        //         var downloadElement = document.createElement("a"); //模拟一个a标签与asp.net试图操作类似
        //         var href = window.URL.createObjectURL(blob); //转成链接让其能供人下载
        //         downloadElement.href = href; //a标签的href
        //         downloadElement.download = "123123"; //a标签的下载名字
        //         document.body.appendChild(downloadElement); //注册这个控件将这个组件加到body尾部
        //         downloadElement.click(); //注销掉
        //         window.URL.revokeObjectURL(href); //清除生成的链接，会占用一些东西，不知道啥，反正运行慢点
        //     }
    };
    return (
        <>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 border-b border-[#EAEAEA]">
                            下载全部结果
                        </ModalHeader>
                        <ModalBody>
                            <div className="h-[378px] flex flex-row w-full">
                                <div className="flex flex-col border-r border-[#eaeaea] px-5 my-5">
                                    <span className="text-93 mb-2 text-sm">预览效果（部分）：</span>
                                    <div className="flex-1 overflow-auto bg-[#F7F8FA] p-3">
                                        <div className="">
                                            <div className="text-base font-semibold">
                                                新录音 6.m4a
                                            </div>
                                            <div className="text-93 text-sm my-2">
                                                {showRole && <span>发言人名称</span>}{" "}
                                                {showTime && <span>00:00:03</span>}
                                            </div>
                                            <div className="text-[#313131] text-sm mb-7">
                                                这类型结果。你不说他给我反正谁是按我要求返，不是什么，你看这3%怎么讲?
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="text-base font-semibold">
                                                新录音 7.m4a
                                            </div>
                                            <div className="text-93 text-sm my-2">
                                                {showRole && <span>发言人名称</span>}{" "}
                                                {showTime && <span>00:00:03</span>}
                                            </div>
                                            <div className="text-[#313131] text-sm mb-5">
                                                这类型结果。你不说他给我反正谁是按我要求返，不是什么，你看这3%怎么讲?
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between p-5 flex-col">
                                    <div>
                                        <Select
                                            label="文件格式："
                                            className="h-[42px] w-[317px]"
                                            classNames={{
                                                trigger:
                                                    "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                                                label: "text-93 mb-2"
                                            }}
                                            labelPlacement="outside"
                                            placeholder="Select a user"
                                            selectedKeys={fileType}
                                            onSelectionChange={(val) => {
                                                setFileType(val as unknown as string[]);
                                            }}
                                        >
                                            <SelectItem key={"docx"} value={"docx"}>
                                                docx
                                            </SelectItem>
                                            <SelectItem key={"doc"} value={"doc"}>
                                                doc
                                            </SelectItem>
                                            <SelectItem key={"txt"} value={"txt"}>
                                                txt
                                            </SelectItem>
                                        </Select>
                                        <div className="mt-5">
                                            <div className="mb-3 text-93">下载设置</div>
                                            <div className="flex justify-around flex-row">
                                                <span>显示说话人</span>
                                                <Switch
                                                    defaultSelected
                                                    color="primary"
                                                    isSelected={showRole}
                                                    onValueChange={setShowRole}
                                                ></Switch>
                                                <span>显示时间码</span>
                                                <Switch
                                                    defaultSelected
                                                    color="primary"
                                                    isSelected={showTime}
                                                    onValueChange={setShowTime}
                                                ></Switch>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <Button
                                            color="primary"
                                            className="w-[316px] h-[46px]"
                                            onClick={() => {
                                                downloadCnt(onClose);
                                            }}
                                        >
                                            {downloadType == "all" ? "下载全部结果" : "下载结果"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </ModalBody>
                        {/* <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter> */}
                    </>
                )}
            </ModalContent>
        </>
    );
}

export default forwardRef(VideoTransfrom);
