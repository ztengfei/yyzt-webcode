// import Layout from "@/components/layout";
import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import {
    CheckboxGroup,
    Checkbox,
    Input,
    Link,
    Button,
    Card,
    CardBody,
    CardHeader,
    cn,
    Select,
    SelectItem,
    RadioGroup,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@nextui-org/react";

import CustomRadio from "@/components/common/customRadio";

const modalInfos = {
    role: {
        title: "标记发音人角色样稿",
        content: [
            {
                name: "",
                text: `<div>
                <p>你好，小明。你的妈妈告诉我你最近有些牙痛。你能告诉我疼痛是在哪里吗?</p>
                <p>我的左边牙齿疼，有时候吃东西也会不舒服。</p>
                <p>好的，谢谢你告诉我。我会先检查一下你的牙齿，看看有没有问题。不用担心，我会尽量让你感到舒适。</p>
                <p>谢谢你，医生。小明，你要听医生的话，不要害怕。</p>
                <p>好的，妈妈。</p>
                <p>小明，我会用一个小镜子和一把小钩子来检查你的牙齿。这样我就能看到你的牙齿是否有蛀牙或其他问题好的，我会配合你的检查。</p>
                <p>非常好，小明。检查完毕后，我会告诉你和你的妈妈牙齿的情况，并给出相应的建议。我会向你们解释治疗过程和注意事项。</p>
                </div>`
            },
            {
                name: "",
                text: `<div>
                    <p>角色1:你好，小明。你的妈妈告诉我你最近有些牙痛。你能告诉我疼痛是在哪里吗?</p>
                    <p>角色2:我的左边牙齿疼，有时候吃东西也会不舒服。</p>
                    <p>角色1:好的，谢谢你告诉我。我会先检查一下你的牙齿，看看有没有问题。不用担心，我会尽量让你感到舒适。</p>
                    <p>角色2:谢谢你，医生。小明，你要听医生的话，不要害怕。</p>
                    <p>角色1:好的，妈妈。</p>
                    <p>角色2:小明，我会用一个小镜子和一把小钩子来检查你的牙齿。这样我就能看到你的牙齿是否有蛀牙或其他问题好的，我会配合你的检查。</p>
                    <p>角色1:非常好，小明。检查完毕后，我会告诉你和你的妈妈牙齿的情况，并给出相应的建议。我会向你们解释治疗过程和注意事项。</p>
                    </div>`
            }
        ]
    },
    time: {
        title: "标记时间码样稿",
        content: [
            {
                name: "",
                text: `<div>
                    <p>00:00:00</p>
                    <p>你好，小明。你的妈妈告诉我你最近有些牙痛。你能告诉我疼痛是在哪里吗?</p>
                    <p>我的左边牙齿疼，有时候吃东西也会不舒服。</p>
                    <p>好的，谢谢你告诉我。我会先检查一下你的牙齿，看看有没有问题。不用担心，我会尽量让你感到舒适。</p>
                    <p>谢谢你，医生。小明，你要听医生的话，不要害怕。</p>
                    </div>`
            },
            {
                name: "",
                text: `<div>
                    <p>00:05:00</p>
                    <p>好的，妈妈。</p>
                    <p>小明，我会用一个小镜子和一把小钩子来检查你的牙齿。这样我就能看到你的牙齿是否有蛀牙或其他问题好的，我会配合你的检查。</p>
                    <p>非常好，小明。检查完毕后，我会告诉你和你的妈妈牙齿的情况，并给出相应的建议。我会向你们解释治疗过程和注意事项。</p>
                    </div>`
            }
        ]
    },
    demo: {
        title: "转写样例",
        content: [
            {
                name: "流畅出稿",
                text: `<div>
                    <p>我真的非常满意这个新应用!它简直是我生活中的救星。以前，我总是为了完成一些琐碎的任务而感到烦恼，但现在有了这个应用，一切都变得轻松愉快。首先，这个应用的界面设计非常直观和用户友好。我不需要费心去学习如何使用它，因为它的操作方式非常简单明了。</p>
                    </div>`
            },
            {
                name: "逐字逐句",
                text: `<div>
                    <p><span style="color: #fa2b2b">哇</span>，我真的非常满意这个新应用呀!它简直是我生活中的救星 。以前呢，我总是为了完成一些琐碎的任务而感到烦恼<span style="color: #fa2b2b">啊的啦</span>，但现在有了这个应用的啦，一切都变得<span style="color: #fa2b2b">轻松愉快</span>。首先，那个这个应用的界面设计非常直观和用户友好的啊。<span style="color: #fa2b2b">我不</span>需要费心去学习如何使用它<span style="color: #fa2b2b">啊吧啊吧</span>，因为它的操作方式非常简单明了</p>
                    </div>`
            }
        ]
    }
};

function PeopleFrom(props, ref) {
    const modalRef = useRef();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const modalCnt = useRef(modalInfos.role);
    // 选择语言
    const [lanuage, setLanuage] = useState<React.Key[]>(["cn"]);
    // 选择时效
    const [zxSpeed, setAgeing] = useState("normal");
    // 流畅度
    const [zxFlow, setFlow] = useState("noSrgent");
    // 标记
    const [zxRemarks, setZxRemarks] = useState(["buenos-aires", "sydney"]);

    const { language = [] } = props;

    const openModal = (type: "demo" | "time" | "role") => {
        modalCnt.current = modalInfos[type];
        onOpen();
    };

    useImperativeHandle(ref, () => ({
        getSelectedData: () => {
            return {
                lanFrom: [...lanuage].join(","),
                zxRemarks: [...zxRemarks].join(","),
                zxFlow,
                zxSpeed
            };
        }
    }));

    return (
        <div className="">
            <div className="text-sm mb-[4px]">
                <span className="text-f602">*</span>
                <span>标记</span>
            </div>
            {/* zxRemarks */}
            <CheckboxGroup
                defaultValue={["buenos-aires", "sydney"]}
                value={zxRemarks}
                onValueChange={setZxRemarks}
            >
                <Checkbox
                    value="buenos-aires"
                    radius="full"
                    classNames={{
                        base: cn("py-0"),
                        label: "w-full"
                    }}
                >
                    <span className="text-xs">标记发音人角色</span>
                    <Button
                        variant="light"
                        size="sm"
                        color="primary"
                        className="ml-[5px]  h-[28px]"
                        onClick={() => {
                            openModal("role");
                        }}
                    >
                        样稿
                    </Button>
                </Checkbox>
                <Checkbox
                    value="sydney"
                    radius="full"
                    classNames={{
                        base: cn("py-0 mt-[0px]"),
                        label: "w-full"
                    }}
                >
                    <span className="text-xs">标记时间码</span>
                    <span className="text-xs text-[#acacac]">每5分钟标记一次时间码</span>
                    <Button
                        variant="light"
                        size="sm"
                        color="primary"
                        className="ml-[5px] h-[28px]"
                        onClick={() => {
                            openModal("time");
                        }}
                    >
                        样稿
                    </Button>
                </Checkbox>
            </CheckboxGroup>
            <div className="text-sm  mt-4 mb-[4px]">
                <span className="text-f602">*</span>
                <span>选择需要转化的音频语言</span>
            </div>
            <Select
                items={language}
                size="sm"
                // label="Favorite Animal"
                // placeholder="Select an animal"
                className="h-[38px]"
                classNames={{
                    trigger: "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]"
                }}
                selectedKeys={lanuage}
                disallowEmptySelection
                onSelectionChange={setLanuage}
            >
                {(animal) => <SelectItem key={animal.value}>{animal.label}</SelectItem>}
            </Select>
            <div className="text-sm mt-2 mb-[4px]">
                <span className="text-f602">*</span>
                <span>时效</span>
            </div>

            <RadioGroup orientation="horizontal" value={zxSpeed} onValueChange={setAgeing}>
                <CustomRadio description="1h音频2小时出稿" value="normal">
                    正常出稿
                </CustomRadio>
                <CustomRadio description="1h音频1小时出稿" value="urgent">
                    加急出稿
                </CustomRadio>
            </RadioGroup>

            <div className="text-sm mt-2 mb-[4px]">
                <span className="text-f602">*</span>
                <span>选择流畅度</span>
                <Button
                    variant="light"
                    size="sm"
                    color="primary"
                    className="ml-[5px] h-[28px]"
                    onClick={() => {
                        openModal("demo");
                    }}
                >
                    样稿
                </Button>
            </div>

            <RadioGroup orientation="horizontal" value={zxFlow} onValueChange={setFlow}>
                <CustomRadio value="noSrgent">过滤语气词,流程出稿</CustomRadio>
                <CustomRadio value="NoChange">内容不做修改,逐字逐句</CustomRadio>
            </RadioGroup>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size={"5xl"}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 border-b border-[#EAEAEA]">
                                {modalCnt.current.title}
                            </ModalHeader>
                            <ModalBody>
                                {modalCnt.current.content.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <div className="text-f602 text-base">{item.name}</div>
                                            <div
                                                className="text-sm bg-[#F7F8FA] p-5 mb-4"
                                                dangerouslySetInnerHTML={{ __html: item.text }}
                                            ></div>
                                        </div>
                                    );
                                })}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}

export default forwardRef(PeopleFrom);
