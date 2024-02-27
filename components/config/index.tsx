// 后台服务地址
export const serverIp = "http://182.106.136.46:9000";

// 请求地址公钥
export const PublicKey =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqJoopid0HwA8kIUFgxBb+gEpakFTRkSqAWMXuQGxPZSkIAhjqerUE33S7MHIzFqwXiYGixUAhXW9QRXnl9u9qLIaat3tdMkLuRod1vopyN9vMqu4w1B9xLpsLNlFHfS4gxWbD2c0ervkTNGdiXkuUSuQVJ1vLJwUqyrrgr2SM7ohnpc08xoZKj2UquYpsuvY17YHlNA16v2SqP/QxEYleDrvMYGsHzfaYFjfu0hlQUrftLD1Q8QldUoB5avksZOjlwJ8KkMGivGZPlHPzmbgZjg/V0JopMUJIGx8tosnGh8e25fZHvECMDhtjwGEQLhhsOPDdnWtpkm3EjwNkkJCWwIDAQAB";

// 5分钟取一次本地token，每五分钟判断是否需要更新token
export const updataTokenTime = 5 * 60 * 1000;

// 文件分片大小  5M 为一个大小斤进行上传
export const fileSlicSize = 5 * 1024 * 1024;

export const roleIconbg = [
    "rgb(255, 137, 82)",
    "rgb(0, 169, 152)",
    "rgb(255, 177, 31)",
    "rgb(191, 142, 238)",
    "rgb(255, 88, 90)",
    "rgb(148, 63, 230)",
    "rgb(129, 210, 162)",
    "rgb(237, 95, 190)",
    "rgb(103, 121, 200)",
    "rgb(188, 72, 72)",
    "rgb(62, 109, 104)",
    "rgb(18, 188, 250)",
    "rgb(69, 74, 153)",
    "rgb(128, 103, 107)",
    "rgb(41, 197, 202)",
    "rgb(193, 166, 116)",
    "rgb(129, 187, 209)",
    "rgb(0, 171, 2)",
    "rgb(46, 85, 251)"
];
