import React from "react";
import { RadioGroup, Radio, useRadio, VisuallyHidden, cn } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

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
            className={cn(
                "group items-center hover:opacity-70 active:opacity-50 justify-between flex-row-reverse tap-highlight-transparent",
                "max-w-[60px] w-[60px] cursor-pointer border-4 border-default rounded-lg gap-8 border-transparent",
                "data-[selected=true]:border-primary"
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
                className={" text-center " + (isSelected ? "text-f602" : "")}
            >
                <Image
                    width={60}
                    alt="NextUI hero Image"
                    src={`/images/user/headerImage/${props.value}.jpg`}
                    className="rounded-lg"
                />
            </div>
        </Component>
    );
};

export default CustomRadio;
