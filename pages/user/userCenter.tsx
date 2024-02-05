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
    CardFooter,
    SelectItem,
    Image,
    Textarea,
    CheckboxGroup,
    Checkbox,
    cn
} from "@nextui-org/react";

import TransfleTable from "@/components/user/table/teansfer";
import TranslateTable from "@/components/user/table/translate";
import CardItem from "@/components/user/card/carditem";

export default function Index() {
    const modalRef = useRef();
    const [isFollowed, setIsFollowed] = useState(false);

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-row justify-around w-full flex-1 mb-8">
                <div className="flex-1">
                    <Card className="w-full px-2 py-1 bg-white rounded-xl mb-3">
                        <CardHeader className="justify-between relative">
                            <div className="flex gap-5 items-center">
                                <Avatar
                                    isBordered
                                    radius="full"
                                    size="md"
                                    // src="/avatars/avatar-1.png"
                                    color="primary"
                                    name="周"
                                />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="font-medium ">周腾飞</h4>
                                    <h5 className=" text-xs text-[#bcbcbc]">ID:12312312</h5>
                                    <div className="h-[24px] border-f602 flex flex-row items-center text-sm border rounded-full pr-3">
                                        <div className="bg-f602 px-1 text-white flex flex-row rounded-l-full h-full">
                                            <Image src="/images/user/user-icon1.png"></Image>
                                            包月畅享
                                        </div>
                                        <div className=" text-f602 pl-3">
                                            连续包月-到期至: 2024-10-21 本月剩余L20:14:13
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm text-[#5b5b5b] absolute right-[8px] top-[10px] cursor-pointer">
                                编辑
                            </div>
                        </CardHeader>
                        <CardBody className="text-sm text-default-400 text-[#5b5b5b] p-2">
                            <p>
                                个人签名:
                                大智若愚就是我,大智若愚就是我,大智若愚就是我,大智若愚就是我
                            </p>
                        </CardBody>
                    </Card>

                    <div className="bg-white rounded-xl mb-3 w-full p-3">
                        <Tabs
                            aria-label="Options"
                            color="primary"
                            variant="underlined"
                            defaultSelectedKey={"transfer"}
                            classNames={{
                                base: "w-full shadow-sm",
                                tabList:
                                    "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                                cursor: "w-full bg-[#FF6002]",
                                tab: "max-w-fit px-0 h-12 mr-6",
                                tabContent: "group-data-[selected=true]:text-[#FF6002]"
                            }}
                        >
                            <Tab
                                key="transfer"
                                title={
                                    <div className="flex items-center space-x-4 text-base">
                                        <span>转文字文件</span>
                                    </div>
                                }
                            >
                                <TransfleTable></TransfleTable>
                            </Tab>
                            <Tab
                                key="translate"
                                title={
                                    <div className="flex items-center space-x-4 text-base">
                                        <span>翻译文件</span>
                                    </div>
                                }
                            >
                                <TranslateTable></TranslateTable>
                            </Tab>
                            <Tab
                                key="manage"
                                title={
                                    <div className="flex items-center space-x-4 text-base">
                                        <span>账号管理</span>
                                    </div>
                                }
                            ></Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="w-[360px] ml-5 bg-white rounded-xl">
                    <Image src="/images/user/shoping-icon.png"></Image>
                    <div className="p-5">
                        <div className="flex flex-row justify-between my-3">
                            <span className="font-medium text-lg">我的时长卡</span>
                            <span className="font-medium text-lg text-f602">3张</span>
                        </div>
                        <CardItem></CardItem>
                        <CardItem></CardItem>
                    </div>
                </div>
            </div>
        </div>
    );
}
