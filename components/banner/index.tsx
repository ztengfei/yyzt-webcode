import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import LeftIcon from "@/components/icon/left";
import RightIcon from "@/components/icon/right";

import styles from "./index.module.css";
import { useState } from "react";

interface bannerProps {
    openModal: (type: "video" | "translate") => void;
}

export default function Banner(props: bannerProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const next = () => {
        setCurrentSlide(currentSlide + 1);
    };

    const prev = () => {
        setCurrentSlide(currentSlide - 1);
    };

    const updateCurrentSlide = (index: number) => {
        if (currentSlide !== index) {
            setCurrentSlide(index);
        }
    };
    return (
        <div className="w-full h-[600px] relative">
            {/* <div className="w-full flex justify-between items-center "> */}
            <div
                aria-label="上一个"
                onClick={prev}
                className="ml-[200px] border-0 cursor-pointer absolute h-full flex w-[44px] justify-center items-center z-10"
            >
                <LeftIcon size={44} />
            </div>
            <div
                aria-label="下一个"
                onClick={next}
                className="mr-[200px] border-0  cursor-pointer absolute h-full flex w-[44px] justify-center items-center right-0 z-10"
            >
                <RightIcon size={44} />
            </div>
            {/* </div> */}
            <Carousel
                autoPlay={true}
                selectedItem={currentSlide}
                onChange={updateCurrentSlide}
                interval={5000}
                transitionTime={1000}
                showArrows={false}
                infiniteLoop
                stopOnHover
                showStatus={false}
            >
                <div className="w-full h-full absolute left-0 top-0">
                    <div className="w-full bg-index-ban-bg  bg-no-repeat bg-cover ">
                        <div className="max-w-[1200px] mx-auto items-center h-[605px] pt-[50px] min-w-[1000px]">
                            <div className="max-w-[1200px] mx-auto items-center h-[605px] pt-[50px] min-w-[1000px]">
                                <div className="flex flex-row justify-center items-center pt-[52px]">
                                    <Image
                                        width={424}
                                        height={447}
                                        alt="语音转写"
                                        src="/images/index/banner-translate.png"
                                    />
                                    <div className="ml-16">
                                        <div className="text-left">
                                            <span className="text-FFEBD5 text-[20px]">
                                                更快 更准确 更方便
                                            </span>
                                        </div>
                                        <div className="text-[57px] relative">
                                            <span className="text-f602">音频</span>
                                            <span className="text-FFEBD5">快速转为文字</span>
                                            <div className="absolute right-[-68px] bottom-0 h-[44px]">
                                                <Image
                                                    width={169}
                                                    alt=""
                                                    src="/images/index/banner1-top2.png"
                                                />
                                            </div>
                                        </div>
                                        <div className={styles["banner-info"]}>
                                            <div className="grid grid-cols-3 gap-3 text-FFEBD5 text-[26px]">
                                                <span>5分钟出稿</span>
                                                <span>98%</span>
                                                <span>9国</span>
                                            </div>
                                            <div className="grid grid-cols-3 gap-3 text-FFEBD5 text-[14px]">
                                                <span>1小时音频最快</span>
                                                <span>准确率可达</span>
                                                <span>支持语言</span>
                                            </div>
                                        </div>
                                        <div className="text-[16px]">
                                            <p className="text-FFEBD5">
                                                按照专业领域细分转译，快速甄别专属名词
                                            </p>
                                            <p className="text-FFEBD5">
                                                标注文稿，按多角色逐条展示
                                            </p>
                                        </div>
                                        <div className="mt-[40px]">
                                            <Button
                                                color="primary"
                                                className="h-[60px] w-[200px] mr-[20px]"
                                                onClick={() => {
                                                    props.openModal("video");
                                                }}
                                            >
                                                音频转文字
                                            </Button>
                                            <Button
                                                color="primary"
                                                variant="faded"
                                                className="h-[60px] w-[200px] opacity-60 text-white border border-white bg-transparent"
                                            >
                                                翻译
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="w-full bg-index-ban-bg  bg-no-repeat bg-cover ">
                        <div className="max-w-[1200px] mx-auto items-center h-[605px] pt-[50px] min-w-[1000px]">
                            <div className="flex flex-row justify-center items-center pt-[52px]">
                                <Image
                                    width={424}
                                    height={447}
                                    alt="语音转写"
                                    src="/images/index/banner1-top1.png"
                                />
                                <div className="ml-16">
                                    <div className="text-left">
                                        <span className="text-FFEBD5 text-[20px]">
                                            地道本土化翻译
                                        </span>
                                    </div>

                                    <div className="text-[57px] relative">
                                        <span className="text-f602">语言</span>
                                        <span className="text-FFEBD5">精准快速翻译</span>
                                        <div className="absolute right-[-64px] bottom-0 h-[44px]">
                                            <Image
                                                width={169}
                                                alt=""
                                                src="/images/index/banner1-top2.png"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles["banner-info"]}>
                                        <div className="grid grid-cols-4 gap-4 text-FFEBD5 text-[26px]">
                                            <span className="col-span-2">多种格式</span>
                                            <span>98%</span>
                                            <span>9国</span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-4 text-FFEBD5 text-[14px]">
                                            <span className="col-span-2">
                                                支持Word、PPT、Excel、PDF
                                            </span>
                                            <span>准确率可达</span>
                                            <span>支持语言</span>
                                        </div>
                                    </div>
                                    <div className="text-[16px]">
                                        <p className="text-FFEBD5">
                                            英语、法语、德语、日语等多种语言，快速成稿，一件拖拽
                                        </p>
                                        <p className="text-FFEBD5">遵从语言习惯，长难句地道翻译</p>
                                    </div>
                                    <div className="mt-[40px]">
                                        <Button
                                            color="primary"
                                            className="h-[60px] w-[200px] mr-[20px] opacity-60 text-white border border-white bg-transparent"
                                        >
                                            音频转文字
                                        </Button>
                                        <Button color="primary" className="h-[60px] w-[200px]">
                                            翻译
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
}
