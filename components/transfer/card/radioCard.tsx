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
    const { bgType, origPrice, cardPrice } = props;
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

    // 组件背景颜色
    const bgClass = "bg-" + bgType;
    const textColor = bgType == "purple" ? "text-[#173A83]" : "text-[#994712]";

    return (
        <Component
            {...getBaseProps()}
            classNames={{
                base: cn(
                    " group inline-flex items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                    "max-w-[272px] w-[272px] h-[127px] cursor-pointer border-2 border-default rounded-lg gap-4 p-0 ",
                    "data-[selected=true]:border-primary relative mb-5"
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
                    className={styles[bgClass] + " h-[127px] w-[272px] rounded-2xl  relative mb-4"}
                >
                    <CardHeader className="flex p-2 pl-4 pb-0">
                        {/* cardPrice={item.cardPrice}
                                        hours={item.hours}
                                        usableTime={item.usableTime}
                                        cardName={item.cardName} */}
                        <Image
                            alt="时长卡"
                            height={17}
                            radius="sm"
                            src="/images/transfer/diamond.png"
                            width={22}
                        />
                        <div className={`flex flex-col  text-base font-semibold`}>
                            <p className="text-md">
                                {bgType == "moon" && props.cardName}
                                {bgType == "year" && `${props.hours}小时·全年`}
                            </p>
                        </div>
                    </CardHeader>
                    <div className="w-[121px] h-[80px] absolute right-0 bottom-10 bg-card-img bg-cover bg-no-repeat z-0"></div>
                    <CardBody
                        className={`${textColor} flex-row items-end p-0 pl-4 overflow-hidden`}
                    >
                        <span className="text-2xl font-semibold text-[42px]">￥{cardPrice}</span>
                        <span className="text-xs pl-1">/月</span>
                        <span className="text-xs pl-1 opacity-80 line-through">￥{origPrice}</span>
                    </CardBody>
                    <CardFooter className="flex justify-between pl-4 pb-2 pt-2">
                        <span className={`${textColor} text-xs opacity-55`}>
                            {bgType == "moon" && "60小时/月 机器快转时长卡"}
                            {bgType == "year" && "年度机器快转时长，一年有效"}
                        </span>
                        <div
                            className={
                                (isSelected ? "bg-radio-active" : "bg-radio") +
                                " w-[22px] h-[22px] rounded-full  "
                            }
                        ></div>
                    </CardFooter>
                </Card>
            </div>
        </Component>
    );
};

export default CustomRadio;
