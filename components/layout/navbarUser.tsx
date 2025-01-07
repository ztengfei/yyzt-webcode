import React, { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Image,
    Button,
    Tooltip
} from "@nextui-org/react";
import Router, { useRouter } from "next/router";

import { getUserInfo, logout } from "@/api/api";
import { removeLocal } from "@/components/tool";
import RoleIcon from "@/components/icon/indexUser";
import DownIcon from "@/components/icon/down";

interface NavbarUserType {
    isLogin: boolean;
    navStyle: string;
}
// 头部导航，和头部相关功能
function NavbarUser(props: NavbarUserType) {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [userInfo, serUserInfo] = useState<any>({});
    const router = useRouter();
    const getUserName = (data) => {
        const { email, phone, userName } = data;
        if (userName) {
            return userName;
        }
        if (phone) {
            return phone.substring(0, 3) + " ··· " + phone.slice(-4);
        }
        if (email) {
            let num = email.split("@")[0];
            return num.substring(0, 3) + " ··· " + num.slice(-4);
        }
        return "";
    };

    useEffect(() => {
        getUserInfo().then((res: any) => {
            if (res.code != 200) {
                return;
            }
            let name = getUserName(res.data);
            serUserInfo(res.data);
            setUserName(name);
        });
    }, [router]);

    if (!props.isLogin) {
        // 如果当前没有登录则只有返回首页按钮
        return <></>;
    }

    // 退出登录
    const loginOut = async () => {
        try {
            const res: any = await logout();
            // 退出成功直接跳转到登录界面
            if (res.errorCode == 0) {
                // 清空缓存
                removeLocal("accessToken");
                removeLocal("refreshToken");
                removeLocal("expiresTime");
                removeLocal("userKey");
                // 跳转至登录界面
                Router.push("/login");
            }
        } catch (error) {}
    };
    const textColor =
        props.navStyle == "white" ? "text-black transition-all" : "text-f9 transition-all";
    return (
        <>
            <NavbarContent
                className={
                    " flex-none grow-0 data-[justify=end]:grow-0 data-[justify=start]:grow-0"
                }
                as="div"
            >
                {/* <span> */}
                <Tooltip
                    isOpen={isOpen}
                    onOpenChange={(open) => setIsOpen(open)}
                    content={
                        <div className="py-2 px-6">
                            <div
                                key="settings"
                                onClick={() => {
                                    Router.push("/user?page=useInfo");
                                }}
                                className="py-2 hover:text-f602 cursor-pointer"
                            >
                                个人主页
                            </div>
                            <div
                                key="team_settings"
                                onClick={() => {
                                    Router.push("/user?page=transferFile");
                                }}
                                className="py-2 hover:text-f602  cursor-pointer"
                            >
                                转文字文件
                            </div>
                            <div
                                key="analytics"
                                onClick={() => {
                                    Router.push("/user?page=translateFile");
                                }}
                                className="py-2 hover:text-f602  cursor-pointer"
                            >
                                翻译文件
                            </div>
                            <div
                                key="system"
                                onClick={() => {
                                    Router.push("/user?page=rechargeHistory");
                                }}
                                className="py-2 hover:text-f602  cursor-pointer"
                            >
                                充值记录
                            </div>
                            <div key="configurations" className="py-2 hover:text-f602">
                                关于我们
                            </div>
                            <div
                                key="logout"
                                color="danger"
                                onClick={loginOut}
                                className="py-2 hover:text-f602  cursor-pointer"
                            >
                                退出账号
                            </div>
                        </div>
                    }
                >
                    <Button
                        variant="bordered"
                        className={textColor + " border-0 ml-4 hover:text-f602"}
                    >
                        {/* <Image src="/images/user/headerImage/1.jpg" width={24} height={24}></Image> */}
                        {userInfo.headImg ? (
                            // <div
                            //     className={"w-[24px] h-[24px] bg-[url('" + userInfo.headImg + "')]"}
                            // ></div>
                            <Image
                                src={`${userInfo.headImg}`}
                                width={24}
                                height={24}
                                className="block"
                                classNames={{
                                    img: "w-[24px] h-[24px]",
                                    wrapper: "w-[24px] h-[24px]"
                                }}
                            ></Image>
                        ) : (
                            <RoleIcon></RoleIcon>
                        )}

                        <span className={"text-xs "}>你好，{userName}</span>
                        <span className={isOpen ? "rotate-180 transition-all" : "transition-all"}>
                            <DownIcon size={22}></DownIcon>
                        </span>
                    </Button>
                </Tooltip>
                {/* </span> */}
            </NavbarContent>
        </>
    );
}

export default NavbarUser;
