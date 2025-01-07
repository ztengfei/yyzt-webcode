// import Layout from "@/components/layout";
import { useMemo, useRef, useState } from "react";
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

export default function Index(props: any) {
    const { phone, email } = props.userInfo || {};
    const [isOpen, setIsopen] = useState(false);

    const onClose = () => {
        setIsopen(false);
    };
    const tgname = useMemo(() => {
        if (phone) {
            return "手机号";
        }
        if (email) {
            return "邮箱";
        }
        return "";
    }, [phone, email]);

    const tgType = useMemo(() => {
        if (phone) {
            return "phone";
        }
        if (email) {
            return "email";
        }
        return "";
    }, [phone, email]);

    return (
        <div className="w-full flex flex-row  ">
            <div className="bg-white rounded-xl p-4 flex-1">
                {/* <div className=" text-lg font-semibold mb-4">用户信息</div> */}
                {/* <div className="grid gap-4 grid-cols-2"> */}
                <div>
                    <div className="text-[#666666] text-sm mb-2 flex justify-between">
                        <span>登录{tgname}</span>
                        <span
                            className="text-f602 cursor-pointer"
                            onClick={() => {
                                setIsopen(true);
                            }}
                        >
                            变更
                        </span>
                    </div>
                    <Input type="text" placeholder={phone || email} size="sm" isReadOnly />
                </div>

                {/* <div className="mt-8">
                    <div className="text-[#666666] text-sm mb-2 flex justify-between">
                        <span>登录密码</span>
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
                </div> */}
                {/* </div> */}
            </div>

            <ChangeModal
                isOpen={isOpen}
                changeState={onClose}
                target={phone || email}
                type={tgType}
            ></ChangeModal>
        </div>
    );
}
