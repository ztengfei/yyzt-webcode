import React, { useState } from "react";
import { Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useFocused, useSelected } from "slate-react";

import RoleSelect from "./roleSelect";


// 发言人节点渲染
const Speaker = ({ attributes, children, element, editor }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    const selected = useSelected();
    const focused = useFocused();
    const style: React.CSSProperties = {
        display: "inline-flex",
        width: "100%",
        borderRadius: "4px",
        fontSize: "0.9em",
        alignItems: "center"
    };
    // See if our empty text child has any styling marks applied and apply those
    if (element.children[0].bold) {
        style.fontWeight = "bold";
    }
    if (element.children[0].italic) {
        style.fontStyle = "italic";
    }
    return (
        <div {...attributes} contentEditable={false} style={style}>
            <Popover
                showArrow
                placement="bottom"
                isOpen={isOpen}
                onOpenChange={(state) => {
                    !state && setIsOpen(state);
                }}
                classNames={{
                    trigger:'z-0'
                }}
            >
                <PopoverTrigger>
                    <div
                        className="h-[32px] flex items-center pointer-events-auto rounded-[4px] cursor-pointer select-none ml-[-52px]"
                        onClick={(element) => {
                            setIsOpen(true);
                        }}
                    >
                        <div
                            style={{
                                backgroundColor: element.iconBg || "rgb(191, 142, 238)"
                            }}
                            className=" relative top-[6px] float-left h-[40px] w-[40px] rounded-[20px] ml-0 mr-3 text-center leading-[40px] text-[20px] text-white "
                        >
                            {element.iconText}
                        </div>
                        <div className="mr-[10px] h-[18px] leading-[18px] text-[14px] font-medium text-black6  max-w-[15em] whitespace-nowrap overflow-ellipsis select-none overflow-hidden">
                            {element.roleName}
                        </div>
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-[240px]">
                    <RoleSelect
                        roleInfo={element}
                        editor={editor}
                        setIsOpen={setIsOpen}
                    ></RoleSelect>
                </PopoverContent>
            </Popover>

            <div className="h-[18px] leading-[18px] text-[14px] font-normal text-black4">
                {element.startTime}
            </div>
            {children}
        </div>
    );
};

export default Speaker;
