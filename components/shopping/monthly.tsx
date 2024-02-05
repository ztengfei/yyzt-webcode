// import Layout from "@/components/layout";
import { useRef } from "react";
import { Button } from "@nextui-org/button";
import { Image, RadioGroup, Radio, cn } from "@nextui-org/react";

import RadioCard from "@/components/transfer/card/radioCard";

export default function Index() {
    return (
        <div className="w-[1200px] bg-white rounded-xl h-[295px] px-[22px] py-[26px] mx-auto my-5">
            <div className=" text-xl font-semibold mb-5">转文字-机器快转包月-60小时</div>
            <RadioGroup
                orientation="horizontal"
                classNames={{
                    base: cn("flex-row flex-nowrap"),
                    wrapper: cn("flex-row flex-nowrap")
                }}
            >
                <div>
                    <RadioCard value="1" bgType="moon"></RadioCard>
                    <RadioCard value="2" bgType="moon"></RadioCard>
                    <RadioCard value="3" bgType="moon"></RadioCard>
                    <RadioCard value="4" bgType="moon"></RadioCard>
                </div>
            </RadioGroup>
            <div className="flex flex-row justify-end items-center mt-5">
                <div>
                    <RadioGroup>
                        <Radio
                            value="buenos-aires"
                            classNames={{
                                label: "text-93 mr-8 text-sm"
                            }}
                        >
                            同意 自动续费服务协议 可随时关闭
                        </Radio>
                    </RadioGroup>
                </div>
                <div>
                    <span className="mr-1 font-normal">应付金额：</span>
                    <span className=" text-f602 mr-8">￥88.0</span>
                </div>
                <Button color="primary" className="w-[150px] h-[46px]">
                    立即购买
                </Button>
            </div>
        </div>
    );
}
