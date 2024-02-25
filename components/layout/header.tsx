import React, { useCallback, useRef, useState, useEffect } from "react";
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

// import { useMemoizedFn } from "ahooks";
import { useRouter } from "next/router";

import NavbarBox from "./navbar";
import NavbarUser from "./navbarUser";
import { updataTokenTime } from "@/components/config";
import { getTolocal, setToLocal } from "@/components/tool";
import { refreshToken } from "@/api/api";

// 头部导航，和头部相关功能
function Header() {
    const router = useRouter();
    const path = router.pathname;
    console.log("path+++++++", path);

    const getLoginState = () => {
        // 获取当前页面是否登录
        if (path.indexOf("login") > -1) {
            return false;
        }
        // 获取缓存中的过期时间
        const oldTime = Number(getTolocal("expiresTime"));
        let nowTime = new Date().getTime();
        if (nowTime > oldTime) {
            return false;
        }
        return true;
    };
    // console.log("loginState+++++++", loginState);
    const [isLogin, setIsLogin] = useState(false);

    let initNavStyle = path == "/" || path.indexOf("login") > -1 ? "black" : "white";
    const [navStyle, setNavStyle] = useState(initNavStyle);
    const navStyleRef = useRef(initNavStyle);
    console.log("navStyle++++", navStyle, isLogin);
    // 本地缓存发生改变
    const localChange = (e: StorageEvent) => {
        if (e.key == "expiresTime") {
            setIsLogin(!!e.newValue);
        }
    };
    // 界面路由地址发生改变
    // const handleRouteChange = (url: string) => {
    //     setIsLogin(getLoginState());
    // };

    useEffect(() => {
        window.addEventListener("storage", localChange);
        // router.events.on("routeChangeComplete", handleRouteChange);
        setIsLogin(getLoginState());

        let navStyle = path == "/" || path.indexOf("login") > -1 ? "black" : "white";
        setNavStyle(navStyle);
        navStyleRef.current = navStyle;
        return () => {
            window.removeEventListener("storage", localChange);
            // router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router]);

    useEffect(() => {
        // 五分中执行一次
        setInterval(() => {
            const oldTime = Number(getTolocal("expiresTime"));
            let nowTime = new Date().getTime();
            // 如果现在时间小于过期时间的3倍则取更新本地token
            if (oldTime && oldTime > nowTime && oldTime - nowTime < updataTokenTime * 3) {
                refreshToken({}).then((res: any) => {
                    if (res.code == 200) {
                        const { accessToken, refreshToken, expiresTime } = res.data;
                        setToLocal("accessToken", accessToken);
                        setToLocal("refreshToken", refreshToken);
                        setToLocal("expiresTime", expiresTime);
                        return;
                    }
                });
            }
        }, updataTokenTime);
    }, []);

    const onScrollPositionChange = useCallback(
        (position: number) => {
            console.log("position++++", position, navStyle);
            if (path !== "/" && path.indexOf("login") == -1) {
                // 部分页面导航底色为白色不需要重新替换导航颜色
                return;
            }
            if (position > 50 && navStyleRef.current == "black") {
                setNavStyle("white");
                navStyleRef.current = "white";
            } else if (position <= 50 && navStyleRef.current == "white") {
                setNavStyle("black");
                navStyleRef.current = "black";
            }
        },
        [navStyle]
    );

    if (path == "/transfer/editor") {
        return <></>;
    }
    return (
        <Navbar
            className={
                (navStyle == "white" ? "bg-white" : "bg-inherit") +
                "  h-[60px] mx-auto header-nav backdrop-blur-none data-[menu-open=true]:backdrop-blur-none backdrop-saturate-0 transition-all fixed"
            }
            onScrollPositionChange={onScrollPositionChange}
            disableScrollHandler={false}
            position={"sticky"}
        >
            <NavbarBrand className="flex-none mr-16 grow-0">
                <div
                    className={
                        (navStyle == "white" ? "bg-logo-blck" : "bg-login-text") +
                        " bg-no-repeat bg-cover w-[122px] h-[37px] transition-all"
                    }
                ></div>
                {/* <span>icon</span>
                <span className="font-bold text-inherit">云倚智听</span> */}
            </NavbarBrand>
            <NavbarBox isLogin={isLogin} navStyle={navStyle}></NavbarBox>

            <NavbarUser isLogin={isLogin} navStyle={navStyle}></NavbarUser>
        </Navbar>
    );
}

export default Header;
