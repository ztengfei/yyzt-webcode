import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";

import ActiveIcon from "@/components/icon/active";
import DeleteIcon from "@/components/icon/delete";
import DisplaceIcon from "@/components/icon/displace";
import LanguageSelect from "./../langSelect";

import UploadSuccess from "./uploadSuccess";
import TranslateSuccess from "./translateSuccess";
import Upload from "./upload";
import Loding from "./loding";
import AnalysisLoding from "./translateLoding";

import styles from "./index.module.css";
interface uploadProps {
    languages: { value: string; label: string }[];
    tsSuccess: () => void;
}

// Our app
const FyUpload = (props: uploadProps) => {
    // 当前菜单的状态
    const [uploadState, setUploadState] = useState<string>("");
    // 上传文件的id
    const [uploadId, setUploadId] = useState<string>("");
    // 文件的上传进度
    const [rogress, setProgress] = useState<number>(0);
    // 订单id
    const [orderId, setOrderId] = useState<string>("");
    // 上传成功后的回调
    const uploadSuccessCB = (orderId: string) => {
        console.log(orderId);
    };

    // 文档支付并翻译成功
    const translateSuccess = (type: string) => {
        setUploadState(type);
        type && props.tsSuccess();
    };

    const { languages } = props;
    return (
        <div className={styles["translate"]}>
            {!uploadState && (
                <Upload
                    setUploadState={(state: string, id: string) => {
                        setUploadId(id);
                        setUploadState(state);
                    }}
                ></Upload>
            )}

            {/* <UploadSuccess
                setUploadState={setUploadState}
                languages={languages}
                uploadSuccessCB={uploadSuccessCB}
                setOrderId={setOrderId}
            ></UploadSuccess> */}

            {uploadState == "uploadSuccess" && (
                <Loding uploadId={uploadId} setUploadState={setUploadState}></Loding>
            )}
            {/* 文件上传解析成功后执行该方法 */}
            {uploadState == "analysisSuccess" && (
                <UploadSuccess
                    setUploadState={setUploadState}
                    languages={languages}
                    uploadSuccessCB={uploadSuccessCB}
                    setOrderId={setOrderId}
                ></UploadSuccess>
            )}
            {uploadState == "translateLoding" && (
                <AnalysisLoding
                    orderId={orderId}
                    setUploadState={translateSuccess}
                ></AnalysisLoding>
            )}
            {/* {uploadState == "translateSuccess" && <Loding ></Loding>} setUploadState*/}
            {uploadState == "translateSuccess" && (
                <TranslateSuccess
                    orderId={orderId}
                    setUploadState={setUploadState}
                ></TranslateSuccess>
            )}
        </div>
    );
};

export default FyUpload;
