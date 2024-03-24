import React, { useRef, useState } from "react";
import { Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { ReactEditor, useFocused, useSelected } from "slate-react";

import RoleIcon from "@/components/icon/role";

import RoleSelect from "./roleSelect";
import { Transforms } from "slate";
import { getRoleBg } from "../tool";

// 发言人节点渲染
const Speaker = ({ attributes, children, element, editor, isShowTime, isShowRole }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const roleSelectRef = useRef<any>();

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

    const replaceRole = (role, inputVal) => {
        const point = ReactEditor.findPath(editor, role);
        const newProps: any = {
            roleName: inputVal,
            character: inputVal,
            iconText: inputVal[0],
            iconBg: inputVal ? getRoleBg(inputVal) : ""
        };
        const newVal = { ...role, ...newProps };
        Transforms.setNodes(editor, newVal, { at: point });
    };
    const getAllRole = (name) => {
        let roles = [];
        for (let i = 0; i < editor.children.length; i++) {
            const block = editor.children[i];
            const leafs = block.children || [];
            if (!leafs.length) {
                continue;
            }
            for (let j = 0; j < Math.min(3, leafs.length); j++) {
                if (leafs[j].roleName == name) {
                    roles.push(leafs[j]);
                }
            }
        }
        return roles;
    };

    const roleSelectChange = (newRoleName, isChecked, oldRoleName) => {
        setIsOpen(false);
        // if (!newRoleName) {
        //     return;
        // }
        if (isChecked) {
            // 如果全部替换
            // 找到所有含有相同节点的发言人节点
            const roles = getAllRole(oldRoleName);
            roles.forEach((item) => {
                replaceRole(item, newRoleName);
            });
        } else {
            replaceRole(element, newRoleName);
        }
    };

    const onOpenChange = (state) => {
        if (state || !roleSelectRef.current) {
            return;
        }
        setIsOpen(false);
        // 获取子级
        const data = roleSelectRef.current.getSelectedData();
        roleSelectChange(data.name, data.isSelected, element.roleName);
    };

    return (
        <div {...attributes} contentEditable={false} style={style}>
            {isShowRole && (
                <Popover
                    showArrow
                    placement="bottom"
                    isOpen={isOpen}
                    onOpenChange={(state) => {
                        onOpenChange(state);
                    }}
                    classNames={{
                        trigger: "z-0"
                    }}
                >
                    <PopoverTrigger>
                        <div
                            className="h-[32px] flex items-center pointer-events-auto rounded-[4px] cursor-pointer select-none ml-[-52px]"
                            onClick={(element) => {
                                setIsOpen(true);
                            }}
                        >
                            {element.roleName ? (
                                <div
                                    style={{
                                        backgroundColor: element.iconBg || "rgb(191, 142, 238)"
                                    }}
                                    className=" relative top-[6px] float-left h-[40px] w-[40px] rounded-[20px] ml-0 mr-3 text-center leading-[40px] text-[20px] text-white "
                                >
                                    {element.iconText}
                                </div>
                            ) : (
                                <RoleIcon></RoleIcon>
                            )}
                            <div className="mr-[10px] h-[18px] leading-[18px] text-[14px] font-medium text-black6  max-w-[15em] whitespace-nowrap overflow-ellipsis select-none overflow-hidden">
                                {element.roleName}
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[240px]">
                        <RoleSelect
                            roleInfo={element}
                            editor={editor}
                            roleSelectChange={roleSelectChange}
                            ref={roleSelectRef}
                        ></RoleSelect>
                    </PopoverContent>
                </Popover>
            )}

            {isShowTime && (
                <div className="h-[18px] leading-[18px] text-[14px] font-normal text-black4">
                    {element.startTime}
                </div>
            )}
            {children}
        </div>
    );
};

export default Speaker;
