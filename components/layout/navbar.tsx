import React, { useMemo } from "react";
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    // Link,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Badge,
    Button
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";
import { useRouter } from "next/router";

import styles from "./index.module.css";

interface NavbarType {
    isLogin: boolean;
    navStyle: string;
}
// 头部导航，和头部相关功能
function NavbarBox(props: NavbarType) {
    // console.log("props.isLogin+++", props.isLogin);
    const { navStyle } = props;
    const router = useRouter();
    const path = router.pathname;
    const queryPage = router.query.page;

    const textColor = useMemo(() => {
        return navStyle == "white" ? "text-black " : " text-white ";
    }, [navStyle]);
    console.log("textColor+++++", textColor, navStyle);
    if (!props.isLogin) {
        if (path.indexOf("login") > -1) {
            // 如果当前没有登录则只有返回首页按钮
            return (
                <NavbarContent justify="end">
                    <NavbarItem>
                        <Link className={textColor + " text-sm"} href="/">
                            返回首页
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            );
        } else {
            // 其他页面跳转至登录界面
            return (
                <NavbarContent justify="end" className=" text-white">
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

    const getActiveClass = (condition: boolean) => {
        if (condition) {
            return styles["active"];
        }
        return "";
    };

    return (
        <>
            <NavbarContent className="hidden sm:flex gap-8 text-xs">
                <NavbarItem>
                    <Link
                        className={
                            textColor +
                            "  text-sm " +
                            getActiveClass(path.indexOf("/transfer") > -1)
                        }
                        // color={ ? "primary" : "foreground"}
                        href="/transfer"
                    >
                        转文字
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className={
                            textColor +
                            " text-sm " +
                            getActiveClass(path.indexOf("/translate") > -1)
                        }
                        href="/translate?fyType=doc"
                        // color={path.indexOf("/translate") > -1 ? "primary" : "foreground"} /transfer?fyType=${key}
                    >
                        翻译
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className={
                            textColor + " text-sm " + getActiveClass(path.indexOf("/shopping") > -1)
                        }
                        href="/shopping"
                        // color={path.indexOf("/shopping") > -1 ? "primary" : "foreground"}
                    >
                        充值商城
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-8" justify="end">
                <NavbarItem>
                    <Link
                        className={
                            textColor +
                            " text-sm " +
                            getActiveClass(path == "/user" && queryPage == "transferFile")
                        }
                        href="/user?page=transferFile"
                        // color={
                        //     path == "/user" && queryPage == "transferFile"
                        //         ? "primary"
                        //         : "foreground"
                        // }
                    >
                        最近文件
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link
                        className={
                            textColor +
                            " text-sm " +
                            getActiveClass(path.indexOf("/user/userCenter") > -1)
                        }
                        href="user/userCenter"
                        // color={path.indexOf("/user/userCenter") > -1 ? "primary" : "foreground"}
                    >
                        我的时长卡
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Badge content="5" color="primary">
                        <Link
                            className={
                                textColor +
                                " text-sm " +
                                getActiveClass(path == "/user" && queryPage == "message")
                            }
                            href="/user?page=message"
                            // color={
                            //     path == "/user" && queryPage == "message" ? "primary" : "foreground"
                            // }
                        >
                            消息
                        </Link>
                    </Badge>
                </NavbarItem>
            </NavbarContent>
        </>
    );
}

export default NavbarBox;
