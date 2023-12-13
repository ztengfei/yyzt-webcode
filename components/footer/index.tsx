import { Image } from "@nextui-org/react";

export default function Footer() {
    return (
        <div className="w-full flex flex-col bg-[#1A1A1A]">
            <div className="grid grid-cols-9 gap-9 text-white py-[37px] w-[1200px] mx-auto">
                <div className="min-w-[125px] col-span-2">
                    <Image
                        className="pb-[14px]"
                        width={120}
                        src="/images/index/logo-text.png"
                        radius="none"
                    ></Image>
                    <p className="text-xs text-[rgba(255,255,255,0.65)]">
                        云倚智听是一款智能高效精准音频转文字,更快 更准确
                        更方便,以及地道本土化全场景翻译，多语种覆盖的科技智能产品。
                    </p>
                </div>
                <div className="text-sm text-[rgba(255,255,255,0.8)]">
                    <h3 className="text-xl pb-[14px]">产品</h3>
                    <p className="">转文字</p>
                    <p>翻译</p>
                    <p>充值商城</p>
                </div>
                <div className="text-sm text-[rgba(255,255,255,0.8)]">
                    <h3 className="text-xl pb-[14px]">下载中心</h3>
                    <p>PC端下载</p>
                    <p>移动端下载</p>
                </div>
                <div className="text-sm text-[rgba(255,255,255,0.8)]">
                    <h3 className="text-xl pb-[14px]">合作单位</h3>
                    <p>北京飞书科技有限公司</p>
                    <p>北京飞书科技有限公司</p>
                </div>
                <div className="text-sm col-span-2 text-[rgba(255,255,255,0.8)]">
                    <h3 className="text-xl pb-[14px]">联系我们</h3>
                    <p>地址:香港尖沙咀广东道港威大厦</p>
                    <p>邮箱:yunyizhiting@168.com</p>
                    <p>电话:071-27828712</p>
                </div>
                <div className="flex flex-row col-span-2 text-[rgba(255,255,255,0.8)]">
                    <div className="mr-3 text-center">
                        <Image
                            className="mb-[6px]"
                            width={91}
                            src="/images/index/test-wxxcx.png"
                            radius="none"
                        ></Image>
                        <span className="text-xs">官方微信小程序</span>
                    </div>
                    <div>
                        <Image
                            className="mb-[6px]"
                            width={91}
                            src="/images/index/test-wxgzh.png"
                            radius="none"
                        ></Image>
                        <span className="text-xs">官方微信公众号</span>
                    </div>
                </div>
            </div>
            <div className="bg-[#1f1f1f] text-[#AAAAAA] text-xs text-center leading-10">
                ©2010-2020 - 云倚智听 - ICP备14037330号-公网安备 44030502001309号
            </div>
        </div>
    );
}
