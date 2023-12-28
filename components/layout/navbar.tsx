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
    Badge
} from "@nextui-org/react";

interface NavbarType {
    isLogin: boolean;
    navStyle: string;
}
// 头部导航，和头部相关功能
function NavbarBox(props: NavbarType) {
    const textColor =
        props.navStyle == "white" ? "text-black transition-all" : "text-f9 transition-all";
    if (!props.isLogin) {
        // 如果当前没有登录则只有返回首页按钮
        return (
            <NavbarContent justify="end">
                <NavbarItem>
                    <Link className={textColor + " text-xs"} href="./">
                        返回首页
                    </Link>
                </NavbarItem>
            </NavbarContent>
        );
    }
    return (
        <>
            <NavbarContent className="hidden sm:flex gap-4 text-xs">
                <NavbarItem>
                    <Link className={textColor + " text-f602 text-xs"} href="#">
                        转文字
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" className={textColor + " text-xs"}>
                        翻译
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={textColor + " text-xs"} href="#">
                        充值商城
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                <NavbarItem>
                    <Link className={textColor + " text-xs"} href="#">
                        最近文件
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="#" className={textColor + " text-xs"}>
                        我的时长卡
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Badge content="5" color="primary">
                        <Link href="#" className={textColor + " text-xs"}>
                            消息
                        </Link>
                    </Badge>
                </NavbarItem>
            </NavbarContent>
        </>
    );
}

export default NavbarBox;
