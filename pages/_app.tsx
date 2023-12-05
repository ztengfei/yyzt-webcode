import "../styles/globals.css";
// nextUI 样式组件
import { Providers } from "@/components/providers";
// 页头页脚信息
import Layout from "@/components/layout";

export default function MyApp({ Component, pageProps }) {
    return (
        <Providers>
            <div className="w-screen h-screen bg-current relative">
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </Providers>
    );
}
