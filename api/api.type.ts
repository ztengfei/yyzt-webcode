export type forgotPwdType = {
    userName: string;
    pwd: string;
    code?: string;
    smsCode: string;
    ip?: string;
    openid?: string;
    loginType: 0 | 1 | 2 | 11;
    state?: 0 | 1 | 2 | 11; // 三方授权登录返回的state
};
