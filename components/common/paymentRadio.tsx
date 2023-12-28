import React from "react";
import { RadioGroup, Image, useRadio, VisuallyHidden, cn } from "@nextui-org/react";

const PaymentRadio = (props: any) => {
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
    const url = `/images/transfer/${props.type}.png`;
    return (
        <Component
            {...getBaseProps()}
            className={cn(
                "group items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                "max-w-[156px] w-[156px] h-[59px] cursor-pointer border-1 border-[#efefef] rounded-lg gap-4 p-0",
                "data-[selected=true]:border-f602"
            )}
        >
            <VisuallyHidden>
                <input {...getInputProps()} />
            </VisuallyHidden>
            {/* <span {...getWrapperProps()}>
                <span {...getControlProps()} />
            </span> */}
            <div
                {...getLabelWrapperProps()}
                className={"flex justify-center items-center w-full h-full"}
            >
                <Image src={url}></Image>
                <span className="ml-2">{props.text}</span>
            </div>
        </Component>
    );
};

export default PaymentRadio;
