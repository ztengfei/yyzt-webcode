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

import styles from "./index.module.css";
interface uploadProps {}

// Our app
const FyUpload = (props: uploadProps) => {
    // 当前菜单的状态
    const [uploadState, setUploadState] = useState<string>("");
    // 文件的上传进度
    const [rogress, setProgress] = useState<number>(0);
    return (
        <div className={styles["translate"]}>
            {!uploadState && <Upload setUploadState={setUploadState}></Upload>}
            {uploadState == "uploadSuccess" && (
                <UploadSuccess setUploadState={setUploadState}></UploadSuccess>
            )}
            {uploadState == "translateSuccess" && <TranslateSuccess></TranslateSuccess>}
            {uploadState == "translateSuccess" && <Loding rogress={rogress}></Loding>}
        </div>
    );
};

export default FyUpload;
