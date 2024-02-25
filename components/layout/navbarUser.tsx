import React from "react";
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
    Avatar
} from "@nextui-org/react";
import Router, { useRouter } from "next/router";

import { logout } from "@/api/api";
import { removeLocal } from "@/components/tool";

interface NavbarUserType {
    isLogin: boolean;
    navStyle: string;
}
// 头部导航，和头部相关功能
function NavbarUser(props: NavbarUserType) {
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
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <span
                            className={
                                " flex flex-row text-xs items-center min-w-[160px] justify-end"
                            }
                        >
                            <span className={textColor + " mr-2 text-xs"}>你好，周腾飞</span>
                            {/* <Avatar
                                isBordered
                                as="button"
                                className="transition-transform w-6 h-6 text-tiny"
                                color="secondary"
                                name="周腾飞"
                                size="sm"
                                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                            /> */}
                        </span>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        {/* <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">用户昵称</p>
                            <p className="font-semibold">ID:J4834P</p>
                        </DropdownItem> */}
                        <DropdownItem key="settings">个人主页</DropdownItem>
                        <DropdownItem key="team_settings">转文字文件</DropdownItem>
                        <DropdownItem key="analytics">翻译文件</DropdownItem>
                        <DropdownItem key="system">充值记录</DropdownItem>
                        <DropdownItem key="configurations">关于我们</DropdownItem>
                        <DropdownItem key="logout" color="danger" onPress={loginOut}>
                            退出账号
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </>
    );
}

export default NavbarUser;
