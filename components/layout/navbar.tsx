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
    Badge,
    Button
} from "@nextui-org/react";
import { useRouter } from "next/router";

interface NavbarType {
    isLogin: boolean;
    navStyle: string;
}
// 头部导航，和头部相关功能
function NavbarBox(props: NavbarType) {
    console.log("props.isLogin+++", props.isLogin);
    const router = useRouter();
    const path = router.pathname;

    const textColor =
        props.navStyle == "white" ? "text-black transition-all" : "text-f9 transition-all";
    if (!props.isLogin) {
        if (path.indexOf("login") > -1) {
            // 如果当前没有登录则只有返回首页按钮
            return (
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Link className={textColor + " text-xs"} href="/">
                            返回首页
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            );
        } else {
            // 其他页面跳转至登录界面
            return (
                <NavbarContent justify="end">
                    <NavbarItem>
                        {/* <Link className={textColor + " text-xs"} href="/login">
                            登录/注册
                        </Link> */}
                        <Button href="/login" as={Link} color="primary" variant="bordered">
                            登录/注册
                        </Button>
                    </NavbarItem>
                </NavbarContent>
            );
        }
    }
    return (
        <>
            <NavbarContent className="hidden sm:flex gap-4 text-xs">
                <NavbarItem>
                    <Link className={textColor + " text-f602 text-xs"} href="/transfer">
                        转文字
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={textColor + " text-xs"} href="/translate">
                        翻译
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={textColor + " text-xs"} href="/shopping">
                        充值商城
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="end">
                <NavbarItem>
                    <Link className={textColor + " text-xs"} href="/user">
                        最近文件
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link className={textColor + " text-xs"} href="/user/userCenter">
                        我的时长卡
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Badge content="5" color="primary">
                        <Link className={textColor + " text-xs"} href="/user/userCenter">
                            消息
                        </Link>
                    </Badge>
                </NavbarItem>
            </NavbarContent>
        </>
    );
}

export default NavbarBox;
