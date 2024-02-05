// 后台服务地址
export const serverIp = "http://182.106.136.46:9000";

// 请求地址公钥
export const PublicKey =
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqJoopid0HwA8kIUFgxBb+gEpakFTRkSqAWMXuQGxPZSkIAhjqerUE33S7MHIzFqwXiYGixUAhXW9QRXnl9u9qLIaat3tdMkLuRod1vopyN9vMqu4w1B9xLpsLNlFHfS4gxWbD2c0ervkTNGdiXkuUSuQVJ1vLJwUqyrrgr2SM7ohnpc08xoZKj2UquYpsuvY17YHlNA16v2SqP/QxEYleDrvMYGsHzfaYFjfu0hlQUrftLD1Q8QldUoB5avksZOjlwJ8KkMGivGZPlHPzmbgZjg/V0JopMUJIGx8tosnGh8e25fZHvECMDhtjwGEQLhhsOPDdnWtpkm3EjwNkkJCWwIDAQAB";

// 5分钟取一次本地token，每五分钟判断是否需要更新token
export const updataTokenTime = 5 * 60 * 1000;

// 文件分片大小  5M 为一个大小斤进行上传
export const fileSlicSize = 5 * 1024 * 1024;
