"use client";
import "../styles/globals.css";
// nextUI 样式组件
import { Providers } from "@/components/providers";
// 页头页脚信息
import Layout from "@/components/layout";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }: any) {
    return (
        <Providers>
            <div className="orange-drak w-full h-full relative">
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                {/* 全局提示弹框 */}
                <Toaster />
            </div>
        </Providers>
    );
}
