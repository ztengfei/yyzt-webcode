// import Layout from "@/components/layout";
import { useEffect, useRef, useState, useMemo } from "react";
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
    Image,
    Textarea,
    CheckboxGroup,
    Checkbox,
    cn
} from "@nextui-org/react";
import Router, { useRouter } from "next/router";
import Upload from "@/components/transfer/upload";
import MachineFrom from "@/components/transfer/from/machineFrom";
import PeopleFrom from "@/components/transfer/from/peopleFrom";
import Keyword from "@/components/transfer/from/keyWord";
import FileList from "@/components/transfer/from/fileList";
import Footer from "@/components/transfer/footer";
import { zxFileList, zxFiledel, orderCommit } from "@/api/api";

import styles from "./index.module.css";

export default function Index() {
    const modalRef = useRef();
    // const [selected, setSelected] = useState("people");

    const router = useRouter();

    // 当前选中的界面，如果没有默认个人信息
    const selected = router.query.zxType || "machine";
    console.log("pathname+++", selected);

    const tabClick = (key: string) => {
        const href = `/transfer?zxType=${key}`;
        const as = href;
        Router.push(href, as, { shallow: true });
    };

    // 上传文件
    const [fileList, setFileList] = useState<FileList[]>([]);

    // 右侧选中的文件
    const [selectedFile, setSelectedFile] = useState<string[]>([]);
    // 选中内容的总时长
    // const [allTime ,setAllTime] = useState<number>(0);

    const allTime = useMemo(() => {
        let time = 0;
        fileList.forEach((item) => {
            if (selectedFile.includes(item.id)) {
                time += item.fileTime;
            }
        });
        return time;
    }, [selectedFile, fileList]);

    console.log("allTime++++", allTime);

    // 机器快转
    const machineFromRef = useRef();
    // 人工精转
    const peopleFromRef = useRef();

    const fileListRef = useRef();

    useEffect(() => {
        zxFileList().then((res) => {
            // console.log(res);
            setFileList(res.data);
        });
    }, []);

    //
    const pushFile = async (file) => {
        try {
            const res = await zxFileList();
            if (res.errorCode == 0) {
                setFileList(res.data);
            }
            console.log(res);
        } catch (error) {}
    };

    // 提交转写
    const submit = () => {
        // 获取选中的文件

        // zxType: 1机器转写 2人工精转
        // lanFrom: 音频语言
        // zxMajor: 专业
        // zxFlow:  流畅度
        // zxSpeed: 时效
        // zxRemarks: 标记
        // upFileIds:  上传的音频记录id 数组
        let param: any = {};
        if (selected == "people") {
            param.zxType = 2;
            // { lanFrom: lanuage, zxRemarks, zxFlow, zxSpeed }
            let fromData = peopleFromRef.current.getSelectedData();
            param.zxRemarks = 2;
            param = { ...param, ...fromData };
        } else {
            let fromData = machineFromRef.current.getSelectedData();
            param.zxRemarks = 1;
            param = { ...param, ...fromData };
        }
        // 上传文件id
        param.upFileIds = selectedFile;
        if (fileList[0].userId) {
            param.userId = fileList[0].userId;
        }

        // 获取选中的转写文件
        const selectedFiles = fileList.filter((item) => {
            return selectedFile.includes(item.id);
        });

        param.zxFiles = selectedFiles;

        console.log("param+++++", param);

        // 提交转写接口
        orderCommit(param).then((res) => {
            if (res.errorCode == 0) {
                console.log("订单提交成功+++", res);
                Router.push({
                    pathname: "/transfer/settlement",
                    query: { order: res.data }
                });
            }
        });
    };

    // 删除上传文件
    const deleteFile = async (fileId: string) => {
        try {
            const res = await zxFiledel({ id: fileId });
            if (res.errorCode == 0) {
                // 文件删除成功
                let files = fileList;
                files = files.filter((item) => {
                    if (item && item.id != fileId) {
                        return true;
                    }
                    return false;
                });
                setFileList([...files]);
            }
        } catch (error) {}
    };

    // const tabChange = (key: string) => {
    //     setSelected(key as string);
    // };

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-row justify-around w-full flex-1">
                <div className="w-[348px] relative rounded-2xl h-[595px] flex flex-col overflow-hidden rounded-[20px]">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected as string}
                        onSelectionChange={(key) => {
                            tabClick(key as string);
                        }}
                        classNames={{
                            base: "min-h-[62px] mt-[4px] bg-[#F5F5F5]",
                            tabList: [
                                "gap-6 w-full relative rounded-none p-0 border-b border-divider justify-around  h-[66px] absolute left-0 top-0 bg-no-repeat bg-cover bg-tab-left border-0",
                                selected == "machine" ? styles.activeLeft : styles.activeRight
                            ],
                            cursor: "hidden",
                            tab: "px-0 h-12 text-4",
                            tabContent: "group-data-[selected=true]:text-f602",
                            panel: "bg-white px-[19px] flex-1"
                        }}
                    >
                        <Tab key="machine" title="机器快转">
                            <form className="flex flex-col">
                                {/* 文件上传组件 */}
                                <Upload modelType={"machine"} setFileList={pushFile}></Upload>
                                {/* 选择的类型 */}
                                <MachineFrom ref={machineFromRef}></MachineFrom>
                            </form>
                        </Tab>
                        <Tab key="people" title="人工精转">
                            <form className="flex flex-col gap-4">
                                {/* 文件上传组件 */}
                                <Upload modelType="people" setFileList={pushFile}></Upload>
                                {/* 转写相关的参数 */}
                                <PeopleFrom ref={peopleFromRef}></PeopleFrom>
                            </form>
                        </Tab>
                    </Tabs>
                </div>
                <div className="flex flex-1 flex-col pl-3.5">
                    {/* 关键词 */}
                    <Keyword></Keyword>
                    {/* 上传的文件列表 */}
                    <FileList
                        fileLists={fileList}
                        deleteFile={deleteFile}
                        ref={fileListRef}
                        selectedFile={selectedFile}
                        setSelectedFile={setSelectedFile}
                    ></FileList>
                </div>
            </div>
            <Footer submit={submit} selectedFile={selectedFile} allTime={allTime}></Footer>
        </div>
    );
}
