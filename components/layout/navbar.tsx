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

interface NavbarType {
    isLogin: boolean;
}
// 头部导航，和头部相关功能
function NavbarBox(props: NavbarType) {
    if (!props.isLogin) {
        // 如果当前没有登录则只有返回首页按钮
        return (
            <NavbarContent justify="end">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        返回首页
                    </Link>
                </NavbarItem>
            </NavbarContent>
        );
    }
    return (
        <>
            <NavbarContent className="hidden sm:flex gap-4" justify="start">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        转文字
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page" color="secondary">
                        翻译
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        充值商城
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        最近文件
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page" color="secondary">
                        我的时长卡
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#">消息</Link>
                </NavbarItem>
            </NavbarContent>
        </>
    );
}

export default NavbarBox;
