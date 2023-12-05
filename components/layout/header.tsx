import React, { useState } from "react";
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
import NavbarBox from "./navbar";
import NavbarUser from "./navbarUser";

// 头部导航，和头部相关功能
function Header() {
    const [isLogin, setIsLogin] = useState(false);
    return (
        <Navbar>
            <NavbarBrand>
                <span>icon</span>
                <span className="font-bold text-inherit">云倚智听</span>
            </NavbarBrand>
            <NavbarBox isLogin={isLogin}></NavbarBox>

            <NavbarUser isLogin={isLogin}></NavbarUser>
        </Navbar>
    );
}

export default Header;
