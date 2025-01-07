// import Layout from "@/components/layout";
import { useEffect, useRef, useState } from "react";
import { Input, Button, SelectItem, Image, Textarea, Select } from "@nextui-org/react";

import SparkMD5 from "spark-md5";

import UserInfoIcon from "@/components/icon/userInfo";
import TranslateFileIcon from "@/components/icon/translateFile";
import TransrferFileIcon from "@/components/icon/file";
import MessageIcon from "@/components/icon/message";
import RechargeIcon from "@/components/icon/recharge";
import ChangeModal from "./changeModal";
import HeaderChange from "./headerChangeModal";
import { getUserInfo, headerUpLoadImg, userInfoUpData } from "@/api/api";
import { formatDate2 } from "@/components/tool";
import toast from "react-hot-toast";
import { fileSlicSize } from "@/components/config";
import RoleIcon from "@/components/icon/indexUser";

const rabList = [
    { key: "useInfo", title: "个人信息", icon: <UserInfoIcon size={22} /> },
    { key: "transferFile", title: "转文字文件", icon: <TransrferFileIcon size={22} /> },
    { key: "translateFile", title: "翻译文件", icon: <TranslateFileIcon size={22} /> },
    { key: "rechargeHistory", title: "充值记录", icon: <RechargeIcon size={22} /> },
    { key: "message", title: "消息", icon: <MessageIcon size={22} /> }
];
interface UserInfoType {
    userName: string;
    phone: string;
    email: string;
    headImg: string;
    sex: number; // 		性别 1男 2女 0未知
    birthday: string;
    relName: string;
}

let initData = {
    userName: "",
    phone: "",
    email: "",
    headImg: "",
    sex: 0,
    birthday: "",
    relName: ""
};

export default function Index() {
    const modalRef = useRef();
    const [isOpen, setIsopen] = useState(false);
    const [openHeader, setOpenHeader] = useState(false);
    const [imageId, setimageId] = useState("1");
    // 上传 input ref
    const inputRef = useRef<HTMLInputElement>(null);
    const uploadServerRef = useRef<any>();
    // userName		用户名
    // phone		手机号
    // email		邮箱
    // headImg		头像
    // sex		性别 1男 2女 0未知
    // birthday		生日
    // relName		个性签名
    const [userInfo, setUsetInfo] = useState<UserInfoType>(initData);
    // 当前是否正在上传文件
    const [isUpload, setIsupload] = useState(false);
    // const [values, setValues] = useState(new Set([]));

    const onClose = () => {
        setIsopen(false);
    };

    const saveHeaderImage = (images) => {
        setOpenHeader(false);
        setimageId(images);
    };

    const infoChange = (key, value) => {
        if (key == "sex") {
            setUsetInfo({ ...userInfo, [key]: value[0] });
            return;
        }
        setUsetInfo({ ...userInfo, [key]: value });
    };
    console.log("userInfo+++", userInfo);

    const initUserInfo = () => {
        getUserInfo().then((res: any) => {
            if (res.code != 200) {
                return;
            }
            res.data.sex = res.data.sex.toString();
            res.data.birthday = formatDate2(res.data.birthday);
            setUsetInfo(res.data);
        });
    };

    useEffect(() => {
        initUserInfo();
    }, []);

    const uploadInfo = () => {
        console.log("userInfo+++", userInfo);
        userInfoUpData(userInfo).then((res: any) => {
            console.log(res);
            if (res.code == 200) {
                toast.success("信息更新成功");
                // initUserInfo();
            }
        });
    };

    // 点击触发文件上传
    const onclick = () => {
        inputRef.current && inputRef.current.click();
    };

    const inputChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
        e.target.files && (await fileUpload(e.target.files));
        e.target.value = "";
        console.log(e);
    };

    const calculateFileMd5 = (file: any, chunkSize?: number) => {
        return new Promise((resolve: (value: string) => void, reject) => {
            const chunkSize = 1024 * 1024; // 1MB chunk size
            const spark = new SparkMD5.ArrayBuffer();
            const fileReader = new FileReader();
            let chunksLoaded = 0;
            const chunksTotal = Math.ceil(file.size / chunkSize);

            function loadNext() {
                const start = chunksLoaded * chunkSize;
                const end = start + chunkSize >= file.size ? file.size : start + chunkSize;

                fileReader.readAsArrayBuffer(file.slice(start, end));
            }

            fileReader.onload = function (e) {
                if (e.target.error) {
                    reject(e.target.error);
                } else {
                    // Append array buffer
                    spark.append(e.target.result);
                    chunksLoaded++;

                    if (chunksLoaded < chunksTotal) {
                        loadNext();
                    } else {
                        // Done loading all chunks
                        resolve(spark.end());
                    }
                }
            };

            // Start loading the first chunk
            loadNext();
        });
    };

    // 小文件整体上传
    const smallFileUpload = async (file: any) => {
        // 如果大小不需要分片上传则直接调用上传接口
        uploadServerRef.current = await headerUpLoadImg(file, (progress: number) => {
            // setCircular(progress);
        });
        console.log("开始文件上传");
        // setCircular(0);
        // setFileName(file.name);
        setIsupload(true);

        // 开始上传
        const res: any = await uploadServerRef.current.response();
        console.log("结束文件上传");
        if (res.code == 200) {
            // 上传
            file.state = "success"; // 上传成功
            // file.fileId = res.data;
            toast.success("头像修改成功");
            infoChange("headImg", res.data);
            // initUserInfo();
            // props.setFileList();
        } else {
            file.state = "error"; // 文件上传失败
            toast.error(res.msg);
        }

        setIsupload(false);
    };

    const fileUpload = async (files: FileList) => {
        if (!files.length) {
            return;
        }

        // TODO 只上传第一个文件
        const file: any = files[0];
        if (file.size > fileSlicSize) {
            toast.error("文件最大不能超过5M");
            return;
        }

        const fileMd5 = await calculateFileMd5(file);
        // file.md5 = fileMd5;
        file.id = fileMd5;

        await smallFileUpload(file);
        console.log("file.state++++", file.state, file.fileId);
        if (file.state == "success") {
            // file.state = "success"; // 文件上传成功，切片合并成功
            // file.fileId = res.data;
            // setUploadState("uploadSuccess", file.fileId);
        }
    };

    return (
        <div className="w-full flex flex-row  ">
            <div className="bg-white rounded-xl p-4 flex-1">
                <div className=" text-lg font-semibold mb-4">用户信息</div>
                <div className="grid gap-4 grid-cols-2">
                    <div>
                        <div className="text-[#666666] text-sm mb-2">用户名</div>
                        <Input
                            type="text"
                            placeholder="用户名"
                            size="sm"
                            value={userInfo.userName}
                            onValueChange={(val) => {
                                infoChange("userName", val);
                            }}
                        />
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
                        <Input
                            type="text"
                            placeholder="邮箱/手机号"
                            size="sm"
                            isReadOnly
                            value={userInfo.phone || userInfo.email}
                            onValueChange={(val) => {
                                const keyName = userInfo.phone ? "phone" : "email";
                                infoChange(keyName, val);
                            }}
                        />
                    </div>
                    <div>
                        <div className="text-[#666666] text-sm mb-2">
                            <span>性别</span>
                        </div>
                        <Select
                            className="max-w-xs"
                            size="sm"
                            selectedKeys={new Set([userInfo.sex])}
                            // defaultSelectedKeys={values}
                            onSelectionChange={(val: any) => {
                                console.log(val);
                                infoChange("sex", [...val]);
                            }}
                        >
                            <SelectItem key={"1"} value={"1"}>
                                男
                            </SelectItem>
                            <SelectItem key={"2"} value={"2"}>
                                女
                            </SelectItem>
                        </Select>
                    </div>
                    <div>
                        <div className="text-[#666666] text-sm mb-2">
                            <span>生日</span>
                        </div>
                        <Input
                            type="date"
                            placeholder="请选择生日"
                            size="sm"
                            value={userInfo.birthday}
                            onValueChange={(val) => {
                                infoChange("birthday", val);
                            }}
                        />
                    </div>
                    <div className="col-span-2">
                        <div className="text-[#666666] text-sm mb-2">
                            <span>个性签名</span>
                        </div>
                        <Textarea
                            placeholder="请输入您的个性签名"
                            labelPlacement="outside"
                            value={userInfo.relName}
                            onValueChange={(val) => {
                                infoChange("relName", val);
                            }}
                        />
                    </div>
                    <div className="col-span-2 mt-5">
                        <Button
                            color="primary"
                            className="w-[185px] h-[50px] min-h-[50px] mr-5"
                            onClick={uploadInfo}
                        >
                            更新信息
                        </Button>
                        <Button className="w-[185px] h-[50px] min-h-[50px]" variant="bordered">
                            退出登录
                        </Button>
                    </div>
                </div>
            </div>
            <div className="w-[292px] bg-white rounded-xl ml-4 flex justify-center items-center flex-col">
                {userInfo.headImg ? (
                    <Image src={`${userInfo.headImg}`} width={100} height={100}></Image>
                ) : (
                    <div className="w-[100px] h-[100px] text-93">
                        <RoleIcon size={100}></RoleIcon>
                    </div>
                )}

                <Button className="mt-5" variant="bordered" onClick={onclick} isDisabled={isUpload}>
                    更换头像
                </Button>
            </div>

            <input
                type="file"
                ref={inputRef}
                className="hidden"
                onChange={inputChange}
                multiple
                accept=".jpg,.png,.svg,.jpeg,.gif"
            />

            <ChangeModal isOpen={isOpen} changeState={onClose} type={"email"}></ChangeModal>
            <HeaderChange
                isOpen={openHeader}
                changeState={setOpenHeader}
                headerImage={""}
                saveHeaderImage={saveHeaderImage}
            ></HeaderChange>
        </div>
    );
}
