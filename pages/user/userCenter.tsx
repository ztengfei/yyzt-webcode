// import Layout from "@/components/layout";
import { useEffect, useRef, useState } from "react";
import {
    Tabs,
    Tab,
    Input,
    Link,
    Button,
    Card,
    CardBody,
    CardHeader,
    Avatar,
    CardFooter,
    SelectItem,
    Image,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";

import TransfleTable from "@/components/user/table/teansfer";
import TranslateTable from "@/components/user/table/translate";
import UserMange from "@/components/user/table/userMange";
import CardItem from "@/components/user/card/card";
import { userDurationList, cardRefund } from "@/api/api";
import toast from "react-hot-toast";

export default function Index() {
    const modalRef = useRef();
    const [isFollowed, setIsFollowed] = useState(false);
    const [userCard, setUserCard] = useState([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const refundCardIdRef = useRef("");

    const getUserCardList = () => {
        userDurationList().then((res: any) => {
            if (res.data) {
                setUserCard(res.data);
            }
        });
    };

    useEffect(() => {
        getUserCardList();
    }, []);

    // 退卡程序
    const refundCard = (id: string) => {
        console.log(id);
        refundCardIdRef.current = id;
        onOpen();
    };
    // 确认退卡
    const onConfirm = (close: () => void) => {
        if (!refundCardIdRef.current) {
            console.log("没有选择时长卡");
        }
        cardRefund({ id: refundCardIdRef.current }).then((res: any) => {
            if (res.code == 200) {
                toast.success("退卡成功");
                getUserCardList();
            } else {
                if (res.errorCode == 1007) {
                    toast.error("当前时长卡正在使用无法退卡");
                }
                toast.error("退卡失败");
            }
        });
        close && close();
    };

    return (
        <div className="w-full absolute left-0 top-0 flex flex-col min-h-full bg-[#F7F8FA]">
            <div className="mt-[80px]  mx-auto max-w-[1200px] flex flex-row justify-around w-full flex-1 mb-8">
                <div className="flex-1">
                    <Card className="w-full px-2 py-1 bg-white rounded-xl mb-3">
                        <CardHeader className="justify-between relative">
                            <div className="flex gap-5 items-center">
                                <Avatar
                                    isBordered
                                    radius="full"
                                    size="md"
                                    // src="/avatars/avatar-1.png"
                                    color="primary"
                                    name="周"
                                />
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <h4 className="font-medium ">周腾飞</h4>
                                    <h5 className=" text-xs text-[#bcbcbc]">ID:12312312</h5>
                                    <div className="h-[24px] border-f602 flex flex-row items-center text-sm border rounded-full pr-3">
                                        <div className="bg-f602 px-1 text-white flex flex-row rounded-l-full h-full">
                                            <Image
                                                src="/images/user/user-icon1.png"
                                                className="z-0"
                                            ></Image>
                                            包月畅享
                                        </div>
                                        <div className=" text-f602 pl-3">
                                            连续包月-到期至: 2024-10-21 本月剩余L20:14:13
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-sm text-[#5b5b5b] absolute right-[8px] top-[10px] cursor-pointer">
                                编辑
                            </div>
                        </CardHeader>
                        <CardBody className="text-sm text-default-400 text-[#5b5b5b] p-2">
                            <p>
                                个人签名:
                                大智若愚就是我,大智若愚就是我,大智若愚就是我,大智若愚就是我
                            </p>
                        </CardBody>
                    </Card>

                    <div className="bg-white rounded-xl mb-3 w-full p-3">
                        <Tabs
                            aria-label="Options"
                            color="primary"
                            variant="underlined"
                            defaultSelectedKey={"transfer"}
                            classNames={{
                                base: "w-full shadow-sm",
                                tabList:
                                    "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                                cursor: "w-full bg-[#FF6002]",
                                tab: "max-w-fit px-0 h-12 mr-6",
                                tabContent: "group-data-[selected=true]:text-[#FF6002]"
                            }}
                        >
                            <Tab
                                key="transfer"
                                title={
                                    <div className="flex items-center space-x-4 text-base">
                                        <span>转文字文件</span>
                                    </div>
                                }
                            >
                                <TransfleTable></TransfleTable>
                            </Tab>
                            <Tab
                                key="translate"
                                title={
                                    <div className="flex items-center space-x-4 text-base">
                                        <span>翻译文件</span>
                                    </div>
                                }
                            >
                                <TranslateTable></TranslateTable>
                            </Tab>
                            <Tab
                                key="manage"
                                title={
                                    <div className="flex items-center space-x-4 text-base">
                                        <span>账号管理</span>
                                    </div>
                                }
                            >
                                <UserMange></UserMange>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
                <div className="w-[360px] ml-5 bg-white rounded-xl">
                    <Link href="/shopping">
                        <Image src="/images/user/shoping-icon.png"></Image>
                    </Link>
                    <div className="p-5">
                        <div className="flex flex-row justify-between my-3">
                            <span className="font-medium text-lg">我的时长卡</span>
                            <span className="font-medium text-lg text-f602">
                                {userCard.length}张
                            </span>
                        </div>
                        {!userCard.length ? (
                            <div className=" text-center text-foreground-400 mt-8">暂无时长卡</div>
                        ) : (
                            userCard.map((item, index) => {
                                return (
                                    <CardItem
                                        isShowCheck={false}
                                        refundCard={() => {
                                            refundCard(item.id);
                                        }}
                                        key={item.id}
                                        bgType={item.cardName.indexOf("月") > -1 ? "moon" : "year"}
                                        {...item}
                                    ></CardItem>
                                );
                            })
                        )}
                        {/* <CardItem></CardItem>
                        <CardItem></CardItem> */}
                    </div>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="orange-drak">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">确认退卡</ModalHeader>
                            <ModalBody>
                                <p>当前卡片优惠多多，确认要退卡</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button>
                                <Button
                                    color="primary"
                                    onPress={() => {
                                        onConfirm(onClose);
                                    }}
                                >
                                    确认
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
