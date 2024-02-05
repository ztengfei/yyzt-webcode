// import Layout from "@/components/layout";
import { useRef } from "react";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import Banner from "@/components/banner";
import Footer from "@/components/footer";
import VideoTransfromModal from "@/components/modal/videoTransfrom";

import Router from "next/router";

// import styles from "./index.module.css";

export default function Index() {
    const modalRef = useRef();

    const openModal = (type: "video" | "translate") => {
        console.log("123132132");
        // 打开人工转写和机器转写弹框，或者直接跳转到翻译界面
        modalRef.current && modalRef.current.openModal();
    };
    return (
        <div className="w-full absolute left-0 top-0">
            <Banner openModal={openModal}></Banner>

            <div className="my-[158px]  h-[400px] mx-auto max-w-[1200px] flex flex-row justify-around">
                <div className="">
                    <h3 className="text-600 text-[55px]">高效精准音频转文字</h3>
                    <div className="text-lg">
                        <p>· 音频、视频快速转写为文字</p>
                        <p>· 转文字准确率最高可达98%</p>
                        <p>· 一小时音频最快5分钟出稿</p>
                        <p>· 对转写结果可直接编辑，并支持一键导出word、txt、链接等多种格式</p>
                        <p>· 多场景多角色发音人标注</p>
                    </div>
                    <Button
                        color="primary"
                        className="h-[54px] w-[162px] mt-[46px]"
                        onClick={() => {
                            Router.push({ pathname: "/transfer" });
                        }}
                    >
                        立即体验
                    </Button>
                </div>
                <div className="h-[400px] w-[529px]">
                    <Image width={592} height={400} alt="语音转写" src="/images/index/test1.png" />
                </div>
            </div>
            <div className="my-[158px]  h-[400px] mx-auto max-w-[1200px] flex flex-row justify-around">
                <div className="h-[400px] w-[529px]">
                    <Image width={592} height={400} alt="语音转写" src="/images/index/test1.png" />
                </div>
                <div className="">
                    <h3 className="text-600 text-[55px]">全场景 多语种翻译</h3>
                    <div className="text-lg">
                        <p>文本翻译：更懂中文的翻译工具</p>
                        <p>文档翻译：多格式文档翻译，原格式智能保留</p>
                        <p>会议翻译：中英实时翻译，会中无障碍交流</p>
                        <p>视频翻译：视频添加字幕，Al一键生成</p>
                        <p>人工翻译：智能协作平台，一站式对接制作交付</p>
                    </div>
                    <Button
                        color="primary"
                        className="h-[54px] w-[162px] mt-[46px]"
                        onClick={() => {
                            Router.push({ pathname: "/translate" });
                        }}
                    >
                        立即体验
                    </Button>
                </div>
            </div>
            <Footer></Footer>
            <VideoTransfromModal ref={modalRef}></VideoTransfromModal>
        </div>
    );
}
