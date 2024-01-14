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
    Image,
    Textarea,
    CheckboxGroup,
    Checkbox,
    cn
} from "@nextui-org/react";
import Upload from "@/components/translate/upload";
import MachineFrom from "@/components/transfer/from/machineFrom";
import PeopleFrom from "@/components/transfer/from/peopleFrom";
import Keyword from "@/components/transfer/from/keyWord";
import FileList from "@/components/transfer/from/fileList";
import Footer from "@/components/transfer/footer";

import styles from "./index.module.css";

export default function Index() {
    const modalRef = useRef();
    const [selected, setSelected] = useState("people");

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-row justify-around w-full flex-1">
                <div className="w-[348px] relative rounded-2xl h-[595px] flex flex-col overflow-hidden rounded-[20px]">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={(key) => {
                            setSelected(key as string);
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
                        <Tab key="machine" title="文档翻译">
                            <form className="flex flex-col">
                                {/* 文件上传组件 */}
                                <Upload modelType="translate"></Upload>
                            </form>
                        </Tab>
                        <Tab key="people" title="文本翻译">
                            <form className="flex flex-col gap-4">
                                {/* 文件上传组件 */}
                                {/* <Upload modelType="people"></Upload> */}
                                {/* 转写相关的参数 */}
                                <PeopleFrom></PeopleFrom>
                            </form>
                        </Tab>
                    </Tabs>
                </div>
                <div className="flex flex-1 flex-col pl-3.5">
                    {/* 关键词 */}
                    {/* <Keyword></Keyword> */}
                    {/* 上传的文件列表 */}
                    <FileList fileLists={[]}></FileList>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}
