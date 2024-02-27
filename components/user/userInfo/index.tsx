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
    ModalHeader
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Router, { useRouter } from "next/router";

import UserInfoIcon from "@/components/icon/userInfo";
import TranslateFileIcon from "@/components/icon/translateFile";
import TransrferFileIcon from "@/components/icon/file";
import MessageIcon from "@/components/icon/message";
import RechargeIcon from "@/components/icon/recharge";
import ChangeModal from "./changeModal";
import HeaderChange from "./headChange";

const rabList = [
    { key: "useInfo", title: "个人信息", icon: <UserInfoIcon size={22} /> },
    { key: "transferFile", title: "转文字文件", icon: <TransrferFileIcon size={22} /> },
    { key: "translateFile", title: "翻译文件", icon: <TranslateFileIcon size={22} /> },
    { key: "rechargeHistory", title: "充值记录", icon: <RechargeIcon size={22} /> },
    { key: "message", title: "消息", icon: <MessageIcon size={22} /> }
];

export default function Index() {
    const modalRef = useRef();
    const [isOpen, setIsopen] = useState(false);

    const onClose = () => {
        setIsopen(false);
    };

    return (
        <div className="w-full flex flex-row  ">
            <div className="bg-white rounded-xl p-4 flex-1">
                <div className=" text-lg font-semibold mb-4">用户信息</div>
                <div className="grid gap-4 grid-cols-2">
                    <div>
                        <div className="text-[#666666] text-sm mb-2">用户名</div>
                        <Input type="text" placeholder="用户名" size="sm" />
                    </div>
                    <div>
                        <div className="text-[#666666] text-sm mb-2 flex justify-between">
                            <span>登录邮箱/登录手机号</span>
                            <span
                                className="text-f602 cursor-pointer"
                                onClick={() => {
                                    setIsopen(true);
                                }}
                            >
                                变更
                            </span>
                        </div>
                        <Input type="text" placeholder="邮箱/手机号" size="sm" isReadOnly />
                    </div>
                    <div>
                        <div className="text-[#666666] text-sm mb-2">
                            <span>性别</span>
                        </div>
                        <Select className="max-w-xs" size="sm">
                            <SelectItem key={"man"} value={"man"}>
                                男
                            </SelectItem>
                            <SelectItem key={"woman"} value={"woman"}>
                                女
                            </SelectItem>
                        </Select>
                    </div>
                    <div>
                        <div className="text-[#666666] text-sm mb-2">
                            <span>生日</span>
                        </div>
                        <Input type="date" placeholder="请选择生日" size="sm" />
                    </div>
                    <div className="col-span-2">
                        <div className="text-[#666666] text-sm mb-2">
                            <span>个性签名</span>
                        </div>
                        <Textarea placeholder="请输入您的个性签名" labelPlacement="outside" />
                    </div>
                    <div className="col-span-2 mt-5">
                        <Button color="primary" className="w-[185px] h-[50px] min-h-[50px] mr-5">
                            更新信息
                        </Button>
                        <Button className="w-[185px] h-[50px] min-h-[50px]" variant="bordered">
                            退出登录
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-[292px] bg-white rounded-xl ml-4 flex justify-center items-center flex-col">
                <Image src="/images/user/headerImage/1.jpg" width={100} height={100}></Image>

                <Button className="mt-5" variant="bordered">
                    更换头像
                </Button>
            </div>

            <ChangeModal isOpen={isOpen} changeState={onClose} type={"email"}></ChangeModal>
        </div>
    );
}
