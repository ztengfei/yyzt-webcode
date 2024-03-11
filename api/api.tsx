import { get, post, uploadFile } from "./axios";
import { serverIp } from "@/components/config";
import { forgotPwdType } from "./api.type";

// 接口返回的公共参数
interface publicValue {
    code: number;
    errorCode: number;
    data: null | string;
    msg?: string;
}

// 登录接口对应参数
export interface loginProp {
    userName?: string; // 手机号/邮箱
    smsCode?: string; // 验证码
    pwd?: string; // 密码，密码非对称加密后传输
    code?: string; // 三方授权登录返回的code
    state?: string; // 三方授权登录返回的state
    openid?: string;
    loginType: 0 | 1 | 2 | 3 | 11; // 0账号密码 1验证码 2微信 3支付宝
}
// 注册接口对应参数
interface registerProp {
    userName: string; // 手机号/邮箱
    smsCode: string; // 验证码
    pwd: string; // 密码，密码非对称加密后传输
}

// 文件上传
interface fileUploadProp {
    file: any;
    fileMd5: string;
    fileName: string;
    total: number;
    index: number;
    id: string;
}

// 获取验证码
export const sendCode = (data: { userName: string }) => {
    return post(`${serverIp}/client/login/send/code`, data);
};

// 登录跳转至第三方登录界面
export const autnLoginPage = (data: { loginType: number }) => {
    return post(`${serverIp}/client/login/auth/login/to`, data);
};

// 登录跳转至第三方登录界面
export const login = (data: loginProp) => {
    return post(`${serverIp}/client/login/login`, data);
};

// 刷新界面token;
export const refreshToken = (data: any) => {
    return post(`${serverIp}/client/login/refresh/token`, data);
};

// 注册
export const registerAccount = (data: registerProp) => {
    return post(`${serverIp}/client/login/register/account`, data);
};

// 忘记密码
export const forgotPwd = (data: forgotPwdType) => {
    return post(`${serverIp}/client/login/forgot/pwd`, data);
};

// 退出登录
export const logout = () => {
    return post(`${serverIp}/client/login/logout`, {});
};

// 小文件上传
export const upLoadOne = (file: any, progressCallback: any) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadFile(`${serverIp}/upload/zx/up/one?id=${file.id}`, formData, progressCallback);
};

// 大文件分片上传
export const upLoadPart = (
    { file, fileMd5, fileName, total, index, id }: fileUploadProp,
    progressCallback: (pr: number) => void
) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileMd5", fileMd5);
    formData.append("fileName", fileName);
    formData.append("total", total.toString());
    formData.append("index", index.toString());
    return uploadFile(
        `${serverIp}/upload/zx/up/part?id=${id}&index=${index}`,
        formData,
        progressCallback
    );
};

// 分片上传合并文件
export const fileMerge = (data: { fileMd5: string }) => {
    return post(`${serverIp}/upload/zx/file/merge`, data);
};

// 转写文件上传记录列表
export const zxFileList = () => {
    return post(`${serverIp}/upload/zx/file/list`, {});
};

// 删除上传的转写文件
export const zxFiledel = (data: { id: string }) => {
    return post(`${serverIp}/upload/zx/file/del`, data);
};

// 翻译小文件上传
export const fyUpLoadOne = (file: any, progressCallback: (pr: number) => void) => {
    const formData = new FormData();
    formData.append("file", file);
    return uploadFile(`${serverIp}/upload/fy/up/one?id=${file.id}`, formData, progressCallback);
};

// 翻译大文件分片上传
export const fyUpLoadPart = (
    { file, fileMd5, fileName, total, index, id }: fileUploadProp,
    progressCallback: (pr: number) => void
) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileMd5", fileMd5);
    formData.append("fileName", fileName);
    formData.append("total", total.toString());
    formData.append("index", index.toString());
    return uploadFile(
        `${serverIp}/upload/fy/up/part?id=${id}&index=${index}`,
        formData,
        progressCallback
    );
};

// 翻译分片上传合并文件
export const fyFileMerge = (data: { fileMd5: string }) => {
    return post(`${serverIp}/upload/fy/file/merge`, data);
};

// 翻译转写文件上传记录列表
export const fyFileList = () => {
    return post(`${serverIp}/upload/fy/file/list`, {});
};

// 翻译删除上传的转写文件
export const fyFiledel = (data: { id: string }) => {
    return post(`${serverIp}/upload/fy/file/del`, data);
};

// 提交转写

export const orderCommit = (data: any) => {
    return post(`${serverIp}/client/zx/order/commit`, data);
};

// 订单信息 -- 订单
export const orderDetail = (data: any) => {
    return post(`${serverIp}/client/zx/order/detail`, data);
};

// 用户可用时长卡列表
export const userDurationList = () => {
    return post(`${serverIp}/client/us/card/can/use/list`, {});
};

// 商城时长卡列表
export const cardList = () => {
    return post(`${serverIp}/client/zx/card/list`, {});
};

// 转写语言列表
export const langZx = () => {
    return get(`${serverIp}/client/lan/conf/zx`);
};

// 翻译语言列表
export const langFy = () => {
    return get(`${serverIp}/client/lan/conf/fy`);
};

// 用户可用时长卡的数量和时长
export const cardCount = () => {
    return post(`${serverIp}/client/us/card/count`, {});
};

//  时长卡支付机器转写订单 /client/zx/order/jq/pay
export const orderJpPay = (data: { id: string; cardIds: string[] }) => {
    return post(`${serverIp}/client/zx/order/jq/pay`, data);
};


export const buyCardToPay = (data: { cardId: string, payType: number, zxOrderId:string, chooseCards:string[] }) => {
    return post(`${serverIp}/client/us/card/buy/to/pay`, data);
};

//  支付人工转写订单 /client/zx/order/jq/pay
export const orderRgPay = (data: { id: string; payType: number }) => {
    return post(`${serverIp}/client/zx/order/rg/pay`, data);
};

// 购买时长卡
export const buyCard = (data: { cardId: string; payType: number }) => {
    return post(`${serverIp}/client/us/card/buy/time`, data);
};

// 转写结果下载
export const zxFIleDown = (data: { id: string }) => {
    return post(`${serverIp}/client/zx/result/file/down`, data);
};

// 提交翻译
export const fyCommit = (data: { upFileId: string; lanFrom: string; lanTo: string }) => {
    return post(`${serverIp}/client/fy/order/commit`, data);
};

// 翻译订单查询
export const fyOrderInfo = (data: { orderNum: string }) => {
    return post(`${serverIp}/client/fy/order/list`, data);
};

// 转写列表查询 {pageNum:1, pageSize:10, }
export const zxOrderInfo = (data: { pageNum: number, pageSize:number }) => {
    return post(`${serverIp}/client/zx/order/list`, data);
};

// 文本翻译查询
export const txtTranslate = (data: { from: string; to: string; src_text: string }) => {
    return post(`${serverIp}/zx/xn/txt/trans`, data);
};

// 支付订单查询  0未支付 1支付中 2成功 3失败
export const payStateQuery = (data: { payOrderNum: string }) => {
    return get(`${serverIp}/pay/info/res/query`, data);
};

// 订单结果查看 /client/zx/result/play/data
export const getZXResultDetail = (data: { id: string }) => {
    return post(`${serverIp}/client/zx/result/play/data`, data);
};

// 转写结果下载
export const resultDown = (data: {
    zxFileIds: string[];
    hideRole: number; // 0默认不隐藏 1隐
    hideTime: number;
    extName: string; // 文件类型 docx doc txt
}) => {
    return post(`${serverIp}/upload/zx/result/down`, data);
};

// 转写结果保存
export const resultUpd = (data: any) => {
    return post(`${serverIp}/client/zx/result/play/upd`, data);
};

// 转写订单列表 /client/zx/order/file/list
export const zxOrderList = (data: any) => {
    return post(`${serverIp}/client/zx/order/file/list`, data);
};

// 获取时长卡有效期  /client/fy/order/commit
export const getCardEndDate = (data: any) => {
    return get(`${serverIp}/client/us/card/end/date`, data);
};

// 获取时长卡有效期  /client/fy/order/commit
export const zxOrderDelete = (data: {id:string}) => {
    return post(`${serverIp}/client/zx/order/del`, data);
};

// 退卡
export const cardRefund = (data: {id:string}) => {
    return post(`${serverIp}/client/us/card/apply/refund`, data);
};

// /client/zx/sour/file/url
export const getFileUrl = (data: {id:string}) => {
    return post(`${serverIp}/client/zx/sour/file/url`, data);
};

// 获取转写金额计算订单 /client/zx/order/jq/get/money
export const getMoney = (data: {id:string}) => {
    return post(`${serverIp}/client/zx/order/jq/get/money`, data);
};





