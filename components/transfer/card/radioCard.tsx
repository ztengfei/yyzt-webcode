import React from "react";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Link,
    Image,
    useRadio,
    VisuallyHidden,
    cn
} from "@nextui-org/react";

import styles from "./index.module.css";

const CustomRadio = (props: any) => {
    const {
        Component,
        children,
        isSelected,
        description,
        getBaseProps,
        getWrapperProps,
        getInputProps,
        getLabelProps,
        getLabelWrapperProps,
        getControlProps
    } = useRadio(props);

    return (
        <Component
            {...getBaseProps()}
            classNames={{
                base: cn(
                    " group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                    "max-w-[272px] w-[272px] h-[127px] cursor-pointer border-2 border-default rounded-lg gap-4 p-0 ",
                    "data-[selected=true]:border-primary relative mb-4"
                )
                // description: cn(" absolute left-0 right-0")
            }}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            {/* <span {...getWrapperProps()}>
                <span {...getControlProps()} />
            </span> */}
            <div {...getLabelWrapperProps()}>
                <Card
                    className={
                        (props.bgType == "moon" ? styles["bg-moon"] : styles["bg-year"]) +
                        " h-[127px] w-[272px] rounded-2xl  relative mb-4"
                    }
                >
                    <CardHeader className="flex gap-3 p-2 pl-4">
                        <Image
                            alt="市场卡"
                            height={17}
                            radius="sm"
                            src="/images/transfer/diamond.png"
                            width={22}
                        />
                        <div className="flex flex-col text-[#994712] text-sm">
                            <p className="text-md">连续包月</p>
                        </div>
                    </CardHeader>
                    <CardBody className="text-[#994712] flex-row items-end p-0 pl-4">
                        <span className="text-2xl font-semibold">￥88</span>
                        <span className="text-xs pl-1">/月</span>
                        <span className="text-xs pl-1 opacity-60 line-through">100</span>
                    </CardBody>
                    <CardFooter className="flex justify-between pl-4 pb-2 pt-2">
                        <span className="text-[#994712] text-xs opacity-55">
                            60小时/月 机器快转时长卡
                        </span>
                        <div
                            className={
                                (isSelected ? "bg-radio-active" : "bg-radio") +
                                " w-[22px] h-[22px] rounded-full  "
                            }
                        ></div>
                    </CardFooter>
                    <div className="w-[121px] h-[80px] absolute right-0 bottom-10 bg-card-img bg-cover bg-no-repeat z-0"></div>
                </Card>
            </div>
        </Component>
    );
};

export default CustomRadio;
