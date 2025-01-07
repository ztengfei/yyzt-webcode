// import Layout from "@/components/layout";
import { useState } from "react";
import {
    Input,
    Button,
    ModalContent,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    RadioGroup,
    Select,
    SelectItem
} from "@nextui-org/react";

import { headerImages } from "@/components/config";
import toast from "react-hot-toast";

interface modalType {
    isOpen: boolean;
    changeState: (state: boolean) => void;
    invoicing: (invalidInfo: any) => void;
}
const initVal = {
    type: ["personal"],
    titleType: "",
    number: "",
    title: "",
    email: "",
    bankName: "",
    bankNumber: "",
    address: "",
    telephone: "",
    remarks: ""
};
export default function ChangeModal(props: modalType) {
    //表单数据的状态
    const [invalidInfo, setInvalidInfo] = useState(initVal);
    // 关闭弹框
    const onClose = () => {
        props.changeState(false);
    };

    // 保存更改
    const saveChange = () => {
        if (!invalidInfo.title) {
            toast.error("请输入公司抬头");
            return;
        }
        if (!invalidInfo.number) {
            toast.error("请输入企业税号");
            return;
        }
        if (!invalidInfo.email) {
            toast.error("请输入邮箱");
            return;
        }
        // 请求接口查看是否更改成功
        props.invoicing(invalidInfo);
        // props.changeState(false);
    };
    const fromChange = (type, value) => {
        setInvalidInfo({ ...invalidInfo, [type]: value });
    };

    return (
        <Modal size={"2xl"} isOpen={props.isOpen} onClose={onClose} className="orange-drak">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 border-b border-[#eaeaea]">
                            开发票
                        </ModalHeader>
                        <ModalBody className=" max-h-[400px] overflow-auto">
                            <form className="flex flex-col">
                                <div className="text-sm  mt-4 mb-[4px]">
                                    <span className="text-f602">* </span>
                                    <span>发票类型</span>
                                </div>
                                <Select
                                    label=""
                                    selectedKeys={invalidInfo.type}
                                    labelPlacement="outside"
                                    isRequired
                                    classNames={{
                                        trigger:
                                            "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]"
                                    }}
                                >
                                    <SelectItem value="personal" key={"personal"}>
                                        电子普通发票
                                    </SelectItem>
                                </Select>
                                <div className="text-sm  mt-4 mb-[4px]">
                                    <span className="text-f602">* </span>
                                    <span>发票抬头</span>
                                </div>
                                <Input
                                    isRequired
                                    label=""
                                    placeholder="请输入公司抬头"
                                    size="sm"
                                    // isInvalid={!!invalidInfo.title}
                                    // color={invalidInfo.title ? "danger" : "default"}
                                    // errorMessage={invalidInfo.title}
                                    onValueChange={(value) => {
                                        fromChange("title", value);
                                    }}
                                    value={invalidInfo.title}
                                    classNames={{
                                        description: "text-f602",
                                        base: "rounded-e-none",
                                        inputWrapper:
                                            "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                                        errorMessage: "h-0"
                                    }}
                                />
                                <div className="text-sm  mt-4 mb-[4px]">
                                    <span className="text-f602">* </span>
                                    <span>企业税号</span>
                                </div>
                                <Input
                                    isRequired
                                    label=""
                                    placeholder="请输入企业税号"
                                    size="sm"
                                    // isInvalid={!!invalidInfo.number}
                                    // color={invalidInfo.title ? "danger" : "default"}
                                    // errorMessage={invalidInfo.title}
                                    onValueChange={(value) => {
                                        fromChange("number", value);
                                    }}
                                    value={invalidInfo.number}
                                    classNames={{
                                        description: "text-f602",
                                        base: "rounded-e-none",
                                        inputWrapper:
                                            "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                                        errorMessage: "h-0"
                                    }}
                                />

                                <div className="text-sm  mt-4 mb-[4px]">
                                    <span className="text-f602">* </span>
                                    <span>直接发送至邮箱</span>
                                </div>
                                <Input
                                    isRequired
                                    label=""
                                    placeholder="邮箱"
                                    size="sm"
                                    type="email"
                                    // isInvalid={!!invalidInfo.recipients}
                                    // color={invalidInfo.title ? "danger" : "default"}
                                    // errorMessage={invalidInfo.title}
                                    onValueChange={(value) => {
                                        fromChange("email", value);
                                    }}
                                    value={invalidInfo.email}
                                    classNames={{
                                        description: "text-f602",
                                        base: "rounded-e-none",
                                        inputWrapper:
                                            "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                                        errorMessage: "h-0"
                                    }}
                                />

                                <div className="text-sm  mt-4 mb-[4px]">
                                    <span>开户行名称</span>
                                </div>
                                <Input
                                    isRequired
                                    label=""
                                    placeholder="开户行名称"
                                    size="sm"
                                    // isInvalid={!!invalidInfo.recipients}
                                    // color={invalidInfo.title ? "danger" : "default"}
                                    // errorMessage={invalidInfo.title}
                                    onValueChange={(value) => {
                                        fromChange("bankName", value);
                                    }}
                                    value={invalidInfo.bankName}
                                    classNames={{
                                        description: "text-f602",
                                        base: "rounded-e-none",
                                        inputWrapper:
                                            "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                                        errorMessage: "h-0"
                                    }}
                                />
                                <div className="text-sm  mt-4 mb-[4px]">
                                    <span>开户行账号</span>
                                </div>
                                <Input
                                    isRequired
                                    label=""
                                    placeholder="开户行账号"
                                    size="sm"
                                    // isInvalid={!!invalidInfo.recipients}
                                    // color={invalidInfo.title ? "danger" : "default"}
                                    // errorMessage={invalidInfo.title}
                                    onValueChange={(value) => {
                                        fromChange("bankNumber", value);
                                    }}
                                    value={invalidInfo.bankNumber}
                                    classNames={{
                                        description: "text-f602",
                                        base: "rounded-e-none",
                                        inputWrapper:
                                            "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                                        errorMessage: "h-0"
                                    }}
                                />
                                <div className="text-sm  mt-4 mb-[4px]">
                                    <span>公司地址</span>
                                </div>
                                <Input
                                    isRequired
                                    label=""
                                    placeholder="公司地址"
                                    size="sm"
                                    // isInvalid={!!invalidInfo.recipients}
                                    // color={invalidInfo.title ? "danger" : "default"}
                                    // errorMessage={invalidInfo.title}
                                    onValueChange={(value) => {
                                        fromChange("address", value);
                                    }}
                                    value={invalidInfo.address}
                                    classNames={{
                                        description: "text-f602",
                                        base: "rounded-e-none",
                                        inputWrapper:
                                            "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                                        errorMessage: "h-0"
                                    }}
                                />
                                <div className="text-sm  mt-4 mb-[4px]">
                                    <span>电话</span>
                                </div>
                                <Input
                                    isRequired
                                    label=""
                                    placeholder="电话"
                                    size="sm"
                                    type="number"
                                    // isInvalid={!!invalidInfo.recipients}
                                    // color={invalidInfo.title ? "danger" : "default"}
                                    // errorMessage={invalidInfo.title}
                                    onValueChange={(value) => {
                                        fromChange("telephone", value);
                                    }}
                                    value={invalidInfo.telephone}
                                    classNames={{
                                        description: "text-f602",
                                        base: "rounded-e-none",
                                        inputWrapper:
                                            "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                                        errorMessage: "h-0"
                                    }}
                                />
                                <div className="text-sm  mt-4 mb-[4px]">
                                    <span>备注</span>
                                </div>
                                <Input
                                    isRequired
                                    label=""
                                    placeholder="备注"
                                    size="sm"
                                    type="number"
                                    // isInvalid={!!invalidInfo.recipients}
                                    // color={invalidInfo.title ? "danger" : "default"}
                                    // errorMessage={invalidInfo.title}
                                    onValueChange={(value) => {
                                        fromChange("remarks", value);
                                    }}
                                    value={invalidInfo.remarks}
                                    classNames={{
                                        description: "text-f602",
                                        base: "rounded-e-none",
                                        inputWrapper:
                                            "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                                        errorMessage: "h-0"
                                    }}
                                />
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            <div className="flex gap-2 justify-end mt-[16px]">
                                <Button
                                    fullWidth
                                    color={"default"}
                                    variant={"bordered"}
                                    className="h-[46px]  w-[146px] mr-8"
                                    // disabled={disabled}
                                    onPress={() => {
                                        onClose();
                                    }}
                                >
                                    返回充值记录
                                </Button>
                                <Button
                                    fullWidth
                                    color="primary"
                                    className="h-[46px] w-[146px]"
                                    // disabled={disabled}
                                    onPress={() => {
                                        saveChange();
                                    }}
                                >
                                    提交
                                </Button>
                            </div>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
