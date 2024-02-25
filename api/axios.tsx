/**
 * axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from "axios";
import md5 from "md5";
import CryptoJS from "crypto-js";
import Router from "next/router";

import { getTolocal } from "@/components/tool";
import { PublicKey } from "@/components/config";

let canBackLogin = true;

function Encrypt(str: string) {
    // let key = CryptoJS.enc.Utf8.parse(PublicKey); // 密钥：一个常量，前后端协定后一个字符串即可

    // let srcs = CryptoJS.enc.Utf8.parse(str); /
    // {
    //     mode: CryptoJS.mode.CBC, // mode 与后台一致。有多个模式可选
    //     padding: CryptoJS.pad.Pkcs7 //
    // }
    // let crypo = CryptoJS;

    // userKey 登陆时前端生成后 像后端发送的密钥
    let aeskey = getTolocal("userKey");
    if (!aeskey) {
        return "";
    }
    // let encrypted = crypo.AES.encrypt(str, key);
    const time = new Date().getTime() + "";

    let key = CryptoJS.enc.Utf8.parse(aeskey);
    let srcs = CryptoJS.enc.Utf8.parse(time);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    if (!encrypted.ciphertext) {
        console.log(encrypted.ciphertext);
    }
    return encrypted.ciphertext.toString();
}

// 添加请求头
axios.defaults.headers["x-requested-with"] = "XMLHttpRequest";
// axios.defaults.timeout = 30000;
const pending: { [propsName: string]: string } = {};
// 声明一个字典用于存储每个ajax请求的取消函数和ajax标识
const CancelToken = axios.CancelToken;
const cancelMessage = (messageCnt = "主动取消") => {
    return { type: "cancel", messageCnt };
};
const getRequestKey = (config: any) => {
    if (!config) {
        return md5(new Date().getTime().toString());
    }
    const data = typeof config.data === "string" ? config.data : JSON.stringify(config.data);
    return md5(config.url + "&" + config.method + "&" + data);
};
// session是否失效，默认没有失效
let sessionInvalid = false;

// 检查是否有相同请求正在请求
const checkPending = (key: string) => !!pending[key];
// 从字典删除对应请求状态
const removePending = (key: string) => {
    delete pending[key];
};

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // // 在一个ajax发送前检查当前是否重复请求
        // const key = getRequestKey(config);
        // if (checkPending(key) || sessionInvalid) {
        //     // 重复请求则取消当前请求
        //     const source = CancelToken.source();
        //     config.cancelToken = source.token;
        //     // source.cancel(cancelMessage('重复请求'));
        // } else {
        //     // 加入请求字典
        //     pending[key] = true;
        // }

        // 登录后返回的token
        config.headers["Authorization"] = getTolocal("accessToken");
        const encodeKey = Encrypt(new Date().getTime().toString());
        // console.log("encodeKey++++", encodeKey);
        // 对称加密时间戳 encodeURIComponent(encodeKey)
        config.headers["Pl-ReqTimestamp"] = encodeKey;
        // client/login/refresh/token
        if (config.url && /\/client\/login\/refresh\/token\//.test(config.url)) {
            // 登陆时返回的 refreshToken
            config.headers["Pl-RefreshToken"] = getTolocal("refreshToken");
        }

        // 音频获取需要添加单独的请求头
        // if ( /\/api\/cm\/audio\/gram\//.test(config.url) ){
        //     config.headers['VoiceGram-Action'] = 'wave-format';
        // }
        return config;
    },
    function (error) {
        console.log("请求拦截出现错误", error);
        // 对请求错误做些什么
        // 请求错误，删除请求中状态
        const key = getRequestKey(error.config);
        removePending(key);
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response: any) {
        // 请求完成，删除请求中状态
        const key = getRequestKey(response.config);
        removePending(key);
        // if (response.code != "200") {
        //     // 请求错误
        //     return new Promise(() => null);
        // }

        if (
            response &&
            response.data &&
            response.data.code == 401 &&
            response.data.errorCode == 0
        ) {
            // 请重新登录
            Router.push("/login");
        }

        console.log("response", response);
        return response;
    },
    function (error) {
        console.log("error", error);
        if (error && error.message && error.message.type === "cancel") {
            // 请求被取消，终止Promise
            console.error(error);
            return new Promise(() => null);
        }
        // 请求错误，删除请求中状态
        const key = getRequestKey(error.config);
        removePending(key);

        // const { response } = error;
        // if (response && response.status === 401){
        //     // 登录失效
        //     sessionInvalid = true;
        //     if ( canBackLogin ){
        //         canBackLogin = false;
        //         // 重新登录
        //     }
        // }

        return Promise.reject(error);
    }
);

export default axios;

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params = {}, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                ...config,
                params: params
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: any, config = {}) {
    return new Promise((resolve, reject) => {
        axios({
            ...config,
            url,
            method: "post",
            data: params
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * put方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url: string, params: any, config = {}) {
    return new Promise((resolve, reject) => {
        axios({
            ...config,
            url,
            method: "put",
            data: params
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * patch方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function patch(url: string, params: any, config = {}) {
    return new Promise((resolve, reject) => {
        axios({
            ...config,
            url,
            method: "patch",
            data: params
        })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

/**
 * delete方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @description  取名ajaxDelete 是因为单独的delete会报错
 */
export function ajaxDelete(url: string, params: any, config = {}) {
    return new Promise((resolve, reject) => {
        axios
            .delete(url, {
                ...config,
                data: params
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
/**
 * 上传文件获取进度
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function uploadFile(
    url: string,
    params: any,
    progressCallback: (t: number) => void,
    config = {}
) {
    let ret: { response: any; cancel: any } = { response: null, cancel: null };
    const source = CancelToken.source();
    ret.response = () => {
        return new Promise((resolve, reject) => {
            axios({
                ...config,
                url,
                method: "post",
                cancelToken: source.token,
                // timeout: 0,
                onUploadProgress: function (progressEvent) {
                    // 原生获取上传进度的事件
                    if (progressEvent.loaded && progressEvent.total) {
                        typeof progressCallback === "function" &&
                            progressCallback((progressEvent.loaded / progressEvent.total) * 100);
                    } else if (progressEvent.progress) {
                        // 直接返回的是上传进度
                        typeof progressCallback === "function" &&
                            progressCallback(progressEvent.progress * 100);
                    }
                },
                data: params
            })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };
    ret.cancel = () => {
        source.cancel(cancelMessage() as any);
    };
    return ret;
}

/**
 * post方法，对应post请求，支持取消
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function postCanCancel(url: string, params: any, config = {}) {
    let ret: { response: any; cancel: any } = { response: null, cancel: null };
    const source = CancelToken.source();
    const randomTime = (url.includes("?") ? "&" : "?") + "_time=" + +new Date();
    ret.response = () => {
        return new Promise((resolve, reject) => {
            axios({
                ...config,
                url: url + randomTime,
                method: "post",
                cancelToken: source.token,
                data: params
                // timeout: 0
            })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };
    ret.cancel = () => {
        source.cancel(cancelMessage() as any);
    };
    return ret;
}
