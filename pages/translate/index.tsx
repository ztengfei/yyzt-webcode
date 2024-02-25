// import Layout from "@/components/layout";
import { useRef, useState, useEffect } from "react";
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
    cn,
    RadioGroup
} from "@nextui-org/react";
import Upload from "@/components/translate/upload";
import MachineFrom from "@/components/transfer/from/machineFrom";
import PeopleFrom from "@/components/transfer/from/peopleFrom";
import Keyword from "@/components/transfer/from/keyWord";
import FileList from "@/components/transfer/from/fileList";
import Footer from "@/components/transfer/footer";
import TextTab from "@/components/translate/textTranslate/tabContent";
import DocContent from "@/components/translate/docTranslate/content";
import TextContent from "@/components/translate/textTranslate/content";

import { langFy } from "@/api/api";

import styles from "./index.module.css";
import PaymentRadio from "@/components/common/paymentRadio";

export default function Index() {
    const modalRef = useRef();
    const [selected, setSelected] = useState("text");
    const [language, setLanuage] = useState();
    const [payType, changePayType] = useState(0);
    // 文本翻译的翻译结果
    const [translateText, setTranslateText] = useState("");

    useEffect(() => {
        // 获取可以转写的语言
        langFy().then((res: any) => {
            if (!res.data) {
                setLanuage([] as any);
            }
            const lanusgeList = res.data.map((item: any) => {
                return {
                    label: item.dicName,
                    value: item.dicId
                };
            });
            setLanuage(lanusgeList);
        });
    }, []);

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col h-full min-h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-row justify-around w-full flex-1 mb-8">
                <div className="w-[348px] relative h-full flex flex-col overflow-hidden rounded-[20px]">
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
                                selected == "doc" ? styles.activeLeft : styles.activeRight
                            ],
                            cursor: "hidden",
                            tab: "px-0 h-12 text-4",
                            tabContent: "group-data-[selected=true]:text-f602",
                            panel: "bg-white px-[19px] flex-1"
                        }}
                    >
                        <Tab key="doc" title="文档翻译">
                            <form className="flex flex-col h-full">
                                {/* 文件上传组件 */}
                                <Upload languages={language as any}></Upload>
                            </form>
                        </Tab>
                        <Tab key="text" title="文本翻译">
                            <TextTab
                                language={language as any}
                                setTranslateText={setTranslateText}
                            ></TextTab>
                        </Tab>
                    </Tabs>
                </div>
                <div className="flex flex-1 flex-col pl-3.5">
                    {selected == "doc" && <DocContent></DocContent>}
                    {selected == "text" && (
                        <TextContent translateText={translateText}></TextContent>
                    )}
                </div>
            </div>
            <div className="h-[76px] bg-white w-full">
                <div className="h-[76px] mx-auto max-w-[1200px] flex flex-row justify-between  items-center">
                    <div>
                        <RadioGroup
                            orientation="horizontal"
                            value={payType as any}
                            onValueChange={changePayType as any}
                        >
                            <PaymentRadio value={1} type="weixin" text="微信支付">
                                微信支付
                            </PaymentRadio>
                            <PaymentRadio value={2} type="zhifubao" text="支付宝">
                                支付宝
                            </PaymentRadio>
                        </RadioGroup>
                    </div>
                    <div>
                        <span className=" text-base text-black">
                            应付金额：<span className="text-f602">￥{80}</span>
                        </span>
                        <Button
                            color="primary"
                            className="w-[150px] h-[46px] ml-9 min-h-[46px]"
                            onClick={() => {
                                console.log("确认支付");
                                // props.submit && props.submit();
                            }}
                        >
                            确认支付
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
