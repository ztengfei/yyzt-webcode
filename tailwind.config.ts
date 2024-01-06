import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
    content: [
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./public/**/*.{png,svg,jpg}"
    ],
    theme: {
        extend: {
            backgroundImage: {
                "login-bg": "url('/images/login/login_bg.png')",
                "login-text": "url('/images/login/login-text.png')",
                "tab-left": "url('/images/login/tab-active-left.png')",
                "tab-right": "url('/images/login/tab-active-right.png')",
                wx: "url('/images/login/wx.png')",
                wb: "url('/images/login/wb.png')",
                qq: "url('/images/login/qq.png')",
                zfb: "url('/images/login/zfb.png')",
                "index-ban-bg": "url('/images/index/baner-bg.png')",
                "index-ban-top1": "url('/images/index/banner1-top1.png')",
                "index-ban-top2": "url('/images/index/banner1-top2.png')",
                "logo-blck": "url('/images/index/logo-bg-block.png')",
                "card-img": "url('/images/transfer/card.png')",
                radio: "url('/images/transfer/radio.png')",
                "radio-active": "url('/images/transfer/radio-active.png')",
                linearOrange: "linear-gradient(180deg, #FFF2EA 0%, #FFFFFF 100%)",
                linearBlue: "linear-gradient(180deg, #EAF2FF 0%, #FFFFFF 100%)"
            },
            colors: {
                f9: "#f9f9f9",
                93: "#939393",
                66: "#666666",
                f602: "#FF6002",
                d1d1: "#D1D1D1",
                97: "#979797",
                FFEBD5: "#FFEBD5",
                bc: "#bcbcbc",
                black6: "rgba(0,0,0,.66)",
                black4: "rgba(0,0,0,.46)"
            },
            boxShadow: {
                topxl: "0px -1px 0px 0px rgba(225,225,225,0.5)",
                topx2: "0px 10px 20px 0px rgba(204,204,204,0.5)"
            }
        }
    },
    darkMode: "class",
    plugins: [
        nextui({
            themes: {
                "orange-drak": {
                    colors: {
                        primary: {
                            DEFAULT: "#FF6002",
                            foreground: "#ffffff"
                        },
                        focus: "#FF6002"
                    }
                }
            }
        })
    ]
};
export default config;
