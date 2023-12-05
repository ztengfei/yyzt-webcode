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

interface NavbarUserType {
    isLogin: boolean;
}
// 头部导航，和头部相关功能
function NavbarUser(props: NavbarUserType) {
    if (!props.isLogin) {
        // 如果当前没有登录则只有返回首页按钮
        return <></>;
    }
    return (
        <>
            <NavbarContent className="flex-initial" as="div" justify="end">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            as="button"
                            className="transition-transform"
                            color="secondary"
                            name="Jason Hughes"
                            size="sm"
                            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2">
                            <p className="font-semibold">用户昵称</p>
                            <p className="font-semibold">ID:J4834P</p>
                        </DropdownItem>
                        <DropdownItem key="settings">个人主页</DropdownItem>
                        <DropdownItem key="team_settings">转文字文件</DropdownItem>
                        <DropdownItem key="analytics">翻译文件</DropdownItem>
                        <DropdownItem key="system">充值记录</DropdownItem>
                        <DropdownItem key="configurations">关于我们</DropdownItem>
                        <DropdownItem key="logout" color="danger">
                            退出账号
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </>
    );
}

export default NavbarUser;
