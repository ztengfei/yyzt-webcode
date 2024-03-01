import JSEncrypt from "jsencrypt";
import { PublicKey } from "@/components/config";

// export const jsRsaCode = (str: string) => {
//     const jsRsa = new JSEncrypt();
//     // 设置加密的公钥
//     jsRsa.setPublicKey(PublicKey);
//     // 对目标字符串进行非对称加密
//     const deCode = jsRsa.encrypt(str);

//     return deCode || "";
// };
const ISSERVER = typeof window === "undefined";

export const RASEncrypt = () => {
    if (ISSERVER) {
        return;
    }
    if ((window as any).jsencrypt) {
        return (window as any).jsencrypt;
    } else {
        const { JSEncrypt } = require("jsencrypt");
        const instance = new JSEncrypt();
        instance.setPublicKey(PublicKey);
        (window as any).jsencrypt = instance;
        return instance;
    }
};

// 生成16 或者32位随机数
export const randomString = (len = 32) => {
    let strVals = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; // 剔除了易混淆的字符oOLl,9gq,Vv,Uu,I1
    let maxLen = strVals.length;
    let randomStr = "";
    for (var i = 0; i < len; i++) {
        randomStr += strVals.charAt(Math.floor(Math.random() * maxLen));
    }
    return randomStr;
};

export const saveToWindow = (key: string, str: any) => {
    if (ISSERVER) {
        return "";
    }
    sessionStorage.setItem(key, str);
};

export const getToWindow = (key: string) => {
    if (ISSERVER) {
        return "";
    }
    return sessionStorage.getItem(key);
};

export const setToLocal = (key: string, str: any) => {
    if (ISSERVER) {
        return "";
    }
    localStorage.setItem(key, str);
};

export const getTolocal = (key: string) => {
    if (ISSERVER) {
        return "";
    }
    return localStorage.getItem(key);
};

export const removeLocal = (key: string) => {
    if (ISSERVER) {
        return "";
    }
    localStorage.removeItem(key);
};

export function convertSecondsToHMS(seconds: number) {
    if (!seconds) {
        return "0秒";
    }
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (!hours && !minutes) {
        return secs + "秒";
    }
    if (!hours) {
        return minutes + "分" + secs + "秒";
    }

    return hours + "时" + minutes + "分" + secs + "秒";
}

export function secondsToHMS(seconds: number) {
    if (!seconds) {
        return "00:00:00";
    }
    let hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    let hours1 = hours < 10 ? "0" + hours : hours;
    let minutes1 = minutes < 10 ? "0" + minutes : minutes;
    let secs1 = secs < 10 ? "0" + secs : secs;

    return hours1 + ":" + minutes1 + ":" + secs1;
}

export function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + "/" + (month < 10 ? "0" + month : month) + "/" + (day < 10 ? "0" + day : day);
}

export function formatDate1(timestamp: number) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + "年" + (month < 10 ? "0" + month : month) + "月" + (day < 10 ? "0" + day : day) + "日";
}

export function timestampToDateTime(timestamp: number) {
    var date = new Date(timestamp); // 创建一个新的Date对象并传入时间戳作为参数

    var year = date.getFullYear(); // 获取年份
    var month = (date.getMonth() + 1).toString().padStart(2, "0"); // 获取月份（注意要+1）
    var day = date.getDate().toString().padStart(2, "0"); // 获取天数
    var hours = date.getHours().toString().padStart(2, "0"); // 获取小时
    var minutes = date.getMinutes().toString().padStart(2, "0"); // 获取分钟
    var seconds = date.getSeconds().toString().padStart(2, "0"); // 获取秒数

    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`; // 返回格式化后的字符串
}

export function timestampToDateTime2(timestamp: number) {
    var date = new Date(timestamp); // 创建一个新的Date对象并传入时间戳作为参数

    var year = date.getFullYear(); // 获取年份
    var month = (date.getMonth() + 1).toString().padStart(2, "0"); // 获取月份（注意要+1）
    var day = date.getDate().toString().padStart(2, "0"); // 获取天数
    var hours = date.getHours().toString().padStart(2, "0"); // 获取小时
    var minutes = date.getMinutes().toString().padStart(2, "0"); // 获取分钟
    // var seconds = date.getSeconds().toString().padStart(2, "0"); // 获取秒数

    return `${year}-${month}-${day} ${hours}:${minutes}`; // 返回格式化后的字符串
}
