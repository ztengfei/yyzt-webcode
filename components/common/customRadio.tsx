import React from "react";
import { RadioGroup, Radio, useRadio, VisuallyHidden, cn } from "@nextui-org/react";

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
                "max-w-[149px] w-[149px] cursor-pointer border-2 border-default rounded-lg gap-4 p-2",
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
                {children && (
                    <div
                        {...getLabelProps()}
                        className={(isSelected ? "text-f602" : "") + " text-xs"}
                    >
                        {children}
                    </div>
                )}
                {description && (
                    <div className={(isSelected ? "text-f602" : "") + " text-xs opacity-70 "}>
                        {description}
                    </div>
                )}
            </div>
        </Component>
    );
};

export default CustomRadio;
