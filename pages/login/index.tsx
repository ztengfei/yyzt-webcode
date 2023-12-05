import React, { useState } from "react";
import {
    Tabs,
    Tab,
    Input,
    Link,
    Button,
    Card,
    CardBody,
    CardHeader,
    Avatar
} from "@nextui-org/react";

//  登陆界面
function Login() {
    const [selected, setSelected] = useState("login-message");

    return (
        <div className="w-screen h-screen bg-current absolute top-0 left-0">
            <Card className="max-w-full w-[340px] h-[400px]">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={(key) => {
                            setSelected(key as string);
                        }}
                    >
                        <Tab key="login-message" title="验证码登录">
                            <form className="flex flex-col gap-4 h-[300px]">
                                <Input isRequired placeholder="请输入手机号" type="password" />
                                <Input isRequired placeholder="请输入验证码" type="email" />
                                <div className="flex gap-2 justify-end">
                                    <Button fullWidth color="primary">
                                        登录
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="login-passWord" title="密码登录">
                            <form className="flex flex-col gap-4">
                                <Input isRequired placeholder="请输入手机号" type="email" />
                                <Input isRequired placeholder="请输入密码" type="password" />

                                <div className="flex gap-2 justify-end">
                                    <Button fullWidth color="primary">
                                        登录
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
                <div className="max-w-full">
                    <div className="flex gap-2">
                        <Link href="#">找回密码</Link>
                        <Link href="#">注册</Link>
                    </div>
                    <div>快捷登录</div>
                    <div className="flex gap-4 items-center">
                        <Avatar showFallback src="https://images.unsplash.com/broken" />
                        <Avatar showFallback name="Jane" src="https://images.unsplash.com/broken" />
                        <Avatar name="Joe" src="https://images.unsplash.com/broken" />
                        <Avatar showFallback src="https://images.unsplash.com/broken" />
                    </div>
                </div>
            </Card>
        </div>
    );
}
export default Login;
