import React, { useMemo, useState, useImperativeHandle, forwardRef } from "react";
import { Checkbox, Input } from "@nextui-org/react";

// 发言人节点渲染
const Speaker = ({ roleInfo, editor, roleSelectChange }: any, ref) => {
    const [inputVal, setInputVal] = useState("");
    const [isSelected, setIsSelected] = useState(false);

    const roleList = useMemo(() => {
        if (!editor.children) {
            return [];
        }
        let roles = [];
        let roleNames: string[] = [];
        const blicks = editor.children;
        for (let i = 0; i < blicks.length; i++) {
            let leafs = blicks[i].children;
            for (let j = 0; j < leafs.length; j++) {
                if (
                    leafs[j].type == "mention" &&
                    !roleNames.includes(leafs[j].roleName) &&
                    leafs[j].roleName
                ) {
                    roles.push(leafs[j]);
                    roleNames.push(leafs[j].roleName);
                }
            }
        }
        return roles;
    }, [editor]);

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
        // setIsOpen(false);
        roleSelectChange(item.roleName, isSelected, roleInfo.roleName);
    };

    useImperativeHandle(ref, () => ({
        getSelectedData: () => {
            return { name: inputVal, isSelected };
        }
    }));
    const onKeyDown = (e) => {
        if (e.keyCode == 13) {
            roleSelectChange(inputVal, isSelected, roleInfo.roleName);
        }
    };

    return (
        <div className="px-1 py-2 w-full max-h-[340px] overflow-auto">
            <div className="text-sm text-[#838383] mb-1 whitespace-nowrap overflow-ellipsis overflow-hidden w-full">
                <Checkbox
                    isSelected={isSelected}
                    isDisabled={!roleInfo.roleName}
                    onValueChange={setIsSelected}
                >{`修改全部"${roleInfo.roleName}"为：`}</Checkbox>
            </div>
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
                onKeyDown={onKeyDown}
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
                })}
            </div>
        </div>
    );
};

export default forwardRef(Speaker);
