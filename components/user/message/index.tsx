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
    ListboxItem,
    Select,
    ModalContent,
    Modal,
    ModalBody,
    ModalFooter,
    Skeleton
} from "@nextui-org/react";
import { usePathname, useParams } from "next/navigation";
import Router, { useRouter } from "next/router";
import BellIcon from "@/components/icon/bell";

export default function Message() {
    const modalRef = useRef();
    const [time, setTime] = useState("all");

    const checkMessage = (type: string) => {
        setTime(type);
    };

    return (
        <div className="w-full flex flex-col  ">
            <div className="bg-white rounded-xl p-4 flex-1 mb-3">
                <div className=" text-lg font-semibold mb-4">通知</div>
                <div className="w-full flex items-start gap-1 bg-[#F7F8FA] p-3 rounded-lg">
                    <BellIcon className="mt-2"></BellIcon>
                    <div className="w-full flex flex-col">
                        <div className="">
                            当前系统公告内容跑马灯当前系当前系统公告,当前系统公告内容跑马灯当前系当前系统公告,当前系统公告内容跑马灯当前系当前系统公告
                        </div>
                        <div className="text-xs text-[#b6b6b6]">2023-01-21 00:03:12备份</div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-xl p-4 flex-1">
                <div className="flex flex-row justify-between">
                    <span className="text-lg font-semibold mb-4">系统消息</span>
                    <div>
                        <Button
                            className="mr-2 h-[30px] w-[63px] min-w-[63px]"
                            color={time == "all" ? "primary" : "default"}
                            variant={time == "all" ? "solid" : "bordered"}
                            onClick={() => {
                                checkMessage("all");
                            }}
                        >
                            全部
                        </Button>
                        <Button
                            className="mr-2 h-[30px] w-[63px] min-w-[63px]"
                            color={time == "three" ? "primary" : "default"}
                            variant={time == "three" ? "solid" : "bordered"}
                            onClick={() => {
                                checkMessage("three");
                            }}
                        >
                            近3天
                        </Button>
                        <Button
                            className="mr-2 h-[30px] w-[63px] min-w-[63px]"
                            color={time == "seven" ? "primary" : "default"}
                            variant={time == "seven" ? "solid" : "bordered"}
                            onClick={() => {
                                checkMessage("seven");
                            }}
                        >
                            近7天
                        </Button>
                        <Button
                            className="mr-2 h-[30px] w-[63px] min-w-[63px]"
                            color={time == "earlier" ? "primary" : "default"}
                            variant={time == "earlier" ? "solid" : "bordered"}
                            onClick={() => {
                                checkMessage("earlier");
                            }}
                        >
                            更早
                        </Button>
                    </div>
                </div>
                <div className="">
                    <div className="w-full flex items-start gap-1 bg-[#F7F8FA] p-3 rounded-lg mb-2.5">
                        <BellIcon className="mt-2"></BellIcon>
                        <div className="w-full flex flex-col">
                            <div className="">
                                当前系统公告内容跑马灯当前系当前系统公告,当前系统公告内容跑马灯当前系当前系统公告,当前系统公告内容跑马灯当前系当前系统公告
                            </div>
                            <div className="text-xs text-[#b6b6b6]">2023-01-21 00:03:12备份</div>
                        </div>
                    </div>

                    <div className="w-full flex items-start gap-1 bg-[#F7F8FA] p-3 rounded-lg mb-2.5">
                        <BellIcon className="mt-2"></BellIcon>
                        <div className="w-full flex flex-col">
                            <div className="">
                                当前系统公告内容跑马灯当前系当前系统公告,当前系统公告内容跑马灯当前系当前系统公告,当前系统公告内容跑马灯当前系当前系统公告
                            </div>
                            <div className="text-xs text-[#b6b6b6]">2023-01-21 00:03:12备份</div>
                        </div>
                    </div>

                    <div className="w-full flex items-start gap-1 bg-[#F7F8FA] p-3 rounded-lg mb-2.5">
                        <BellIcon className="mt-2"></BellIcon>
                        <div className="w-full flex flex-col">
                            <div className="">
                                当前系统公告内容跑马灯当前系当前系统公告,当前系统公告内容跑马灯当前系当前系统公告,当前系统公告内容跑马灯当前系当前系统公告
                            </div>
                            <div className="text-xs text-[#b6b6b6]">2023-01-21 00:03:12备份</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
