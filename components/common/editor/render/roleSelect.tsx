import React, { useMemo, useState } from "react";
import { Checkbox, Input, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useFocused, useSelected,  } from "slate-react";
import { Transforms } from 'slate';

import {getRoleBg} from './../tool';

// 发言人节点渲染
const Speaker = ({ roleInfo, editor, setIsOpen }: any) => {
    const [inputVal, setInputVal] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    const roleList = useMemo(() => {
        console.log("editor++++", editor);
        if (!editor.children) {
            return [];
        }
        let roles = [];
        let roleNames: string[] = [];
        const blicks = editor.children;
        for (let i = 0; i < blicks.length; i++) {
            let leafs = blicks[i].children;
            for (let j = 0; j < leafs.length; j++) {
                if (leafs[j].type == "mention" && !roleNames.includes(leafs[j].roleName)) {
                    roles.push(leafs[j]);
                    roleNames.push(leafs[j].roleName);
                }
            }
        }
        return roles;
    }, [editor]);

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
    if (roleInfo.children[0].bold) {
        style.fontWeight = "bold";
    }
    if (roleInfo.children[0].italic) {
        style.fontStyle = "italic";
    }
    // 选择发言人input弹框输入
    const onChange = (value: string) => {
        setInputVal(value);
    };
    // 发言人点击选择
    const selectedRole = (item: any) => {
        console.log("item", item);
        setIsOpen(false);
    };

    // 监听键盘的回车事件
    const handleKeydown = (e) => {
        if (e.keyCode != 13) {
            return;
        }
        const point = editor.getPoint({ anchorKey: roleInfo.key });
        const newProps:any = {roleName:inputVal, character:inputVal, iconText:inputVal[0], iconBg:getRoleBg(inputVal)};
        const newVal = {...roleInfo, newProps}
        Transforms.setNodes(editor, newVal, { at:  point});

    }

    return (
        <div className="px-1 py-2 w-full">
            <p className="text-sm text-[#838383] mb-1 whitespace-nowrap overflow-ellipsis overflow-hidden w-full">
                
                <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>{`修改全部"${roleInfo.roleName}"为：`}</Checkbox>
            </p>
            <Input
                type="text"
                // label={`修改"${roleInfo.roleName}"为`}
                // labelPlacement="outside"
                placeholder={roleInfo.roleName}
                size="sm"
                classNames={{
                    inputWrapper: "h-[34px]",
                    input: "h-[34px]"
                }}
                onValueChange={onChange}
                value={inputVal}
                onKeyDown={handleKeydown}
            />
            <div className="mt-2 flex flex-col gap-2 w-full">
                {roleList.map((item, index) => {
                    if (item.roleName.indexOf(inputVal) > -1) {
                        return (
                            <div
                                className="flex flex-row py-1 cursor-pointer hover:bg-[#f7f7f7]"
                                key={index}
                                onClick={() => {
                                    selectedRole(item);
                                }}
                            >
                                <span
                                    style={{
                                        backgroundColor: item.iconBg
                                    }}
                                    className="  inline-block w-5 h-5 text-center text-white text-xs leading-5 rounded"
                                >
                                    {item.iconText}
                                </span>
                                <span className="text-[#838383] text-sm ml-2 flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden">
                                    {item.roleName}
                                </span>
                            </div>
                        );
                    }
                    // return <></>;
                })}
                {/* <div className="flex flex-row mt-2">
                    <span className=" bg-f602 inline-block w-5 h-5 text-center text-white text-xs leading-5">
                        曾
                    </span>
                    <span className="text-[#838383] text-sm ml-2 flex-1 whitespace-nowrap overflow-ellipsis overflow-hidden">
                        曾黎
                    </span>
                </div> */}
            </div>
        </div>
    );
};

export default Speaker;
