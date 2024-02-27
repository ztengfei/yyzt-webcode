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
    cn,
    Listbox,
    ListboxItem
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Router, { useRouter } from "next/router";

import UserInfoIcon from "@/components/icon/userInfo";
import TranslateFileIcon from "@/components/icon/translateFile";
import TransrferFileIcon from "@/components/icon/file";
import MessageIcon from "@/components/icon/message";
import RechargeIcon from "@/components/icon/recharge";
import UserInfo from "@/components/user/userInfo";
import TransfleTable from "@/components/user/table/teansfer";
import TranslateTable from "@/components/user/table/translate";
import Message from "@/components/user/message";
import RechargeHistory from "@/components/user/rechargeHistory";

import styles from "./index.module.css";

const rabList = [
    { key: "useInfo", title: "个人信息", icon: <UserInfoIcon size={22} /> },
    { key: "transferFile", title: "转文字文件", icon: <TransrferFileIcon size={22} /> },
    { key: "translateFile", title: "翻译文件", icon: <TranslateFileIcon size={22} /> },
    { key: "rechargeHistory", title: "充值记录", icon: <RechargeIcon size={22} /> },
    { key: "message", title: "消息", icon: <MessageIcon size={22} /> }
];

export default function Index() {
    const modalRef = useRef();
    const router = useRouter();

    // 当前选中的界面，如果没有默认个人信息
    const queryPage = router.query.page || "useInfo";

    const tabClick = (key: string) => {
        const href = `/user?page=${key}`;
        const as = href;
        Router.push(href, as, { shallow: true });
    };

    const getCnt = () => {
        if (queryPage == "transferFile") {
            return (
                <div className="bg-white rounded-xl p-4 flex-1">
                    <div className=" text-lg font-semibold mb-4">转文字文件</div>
                    <TransfleTable></TransfleTable>
                </div>
            );
        } else if (queryPage == "translateFile") {
            return (
                <div className="bg-white rounded-xl p-4 flex-1">
                    <div className=" text-lg font-semibold mb-4">翻译文件</div>
                    <TranslateTable></TranslateTable>
                </div>
            );
        } else if (queryPage == "message") {
            return <Message></Message>;
        } else if (queryPage == "rechargeHistory") {
            return <RechargeHistory></RechargeHistory>;
        }

        return <UserInfo></UserInfo>;
    };

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-row justify-around w-full flex-1 mb-8">
                <div className="w-[229px] bg-white rounded-xl">
                    <div>
                        {rabList.map((item) => {
                            return (
                                <div
                                    className={`h-[46px] flex justify-start items-center px-4 text-[#272727] cursor-pointer hover:bg-f9 ${
                                        queryPage == item.key ? styles["active"] : ""
                                    }`}
                                    key={item.key}
                                    onClick={() => {
                                        tabClick(item.key);
                                    }}
                                >
                                    {item.icon} <span className="ml-2">{item.title}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex-1 ml-5">{getCnt()}</div>
            </div>
        </div>
    );
}
