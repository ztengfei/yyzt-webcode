import React, { useEffect, useState } from "react";
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
import Router from "next/router";

// import Paper from "./paper";

import styles from "./index.module.css";
const initVal = {
    tel: "",
    code: "",
    telEmail: "",
    passWord: ""
};

//  登陆界面
function Login() {
    const [selected, setSelected] = useState("parger");

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto w-[348px] max-w-[348px] flex flex-row justify-around flex-1">
                <Card className="max-w-full w-[424px] min-h-full bg-transparent">
                    <CardBody className="overflow-hidden p-0 bg-transparent relative flex-none h-full">
                        <Tabs
                            fullWidth
                            size="md"
                            aria-label="Tabs form"
                            selectedKey={selected}
                            onSelectionChange={(key) => {
                                setSelected(key as string);
                            }}
                            classNames={{
                                base: "min-h-[62px] bg-[#F5F5F5]",
                                tabList: [
                                    "gap-6 w-full relative rounded-none p-0 border-b border-divider justify-around  h-[67px] absolute left-0 top-0 bg-no-repeat bg-cover bg-tab-left border-0",
                                    selected == "parger" ? styles.activeRight : styles.activeLeft
                                ],
                                cursor: "hidden",
                                tab: "text-66 px-0 h-12 text-[16px]",
                                tabContent: "text-66 group-data-[selected=true]:text-f602",
                                panel: "bg-white px-[33px] h-full"
                            }}
                        >
                            <Tab key="electron" title="申请电子发票">
                                {/* <Paper></Paper> */}
                            </Tab>
                            <Tab key="parger" title="申请纸质发票">
                                {/* <Paper></Paper> */}
                            </Tab>
                        </Tabs>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
export default Login;
