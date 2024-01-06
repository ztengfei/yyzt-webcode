import React, { useCallback, useRef, useState } from "react";
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

// 头部导航，和头部相关功能
function Header() {
    const router = useRouter();
    const path = router.pathname;
    console.log("path+++++++", path);

    const [isLogin, setIsLogin] = useState(true);
    let pathRouter = ["/transfer", "/transfer/settlement"];
    let initNavStyle = pathRouter.includes(path) ? "white" : "black";
    const [navStyle, setNavStyle] = useState(initNavStyle);
    const navStyleRef = useRef(initNavStyle);

    // const onScrollPositionChange = useMemoizedFn((position: number) => {
    //     console.log("position++++", position, navStyle);
    //     if (position > 50 && navStyle == "black") {
    //         setNavStyle("white");
    //     } else if (position <= 50 && navStyle == "white") {
    //         setNavStyle("black");
    //     }
    // });
    const onScrollPositionChange = useCallback(
        (position: number) => {
            console.log("position++++", position, navStyle);
            if (pathRouter.includes(path)) {
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
