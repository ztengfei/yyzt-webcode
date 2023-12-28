import React, { useState } from "react";
import ReactDOM from "react-dom";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

import styles from "./index.module.css";
interface uploadProps {
    modelType: "people" | "machine" | "translate";
}

// Our app
function Upload(props: uploadProps) {
    const [files, setFiles] = useState([]);
    // 文件加载的进展
    const onaddfileprogress = (file, progress) => {
        console.log("文件加载速度+++++", progress);
    };

    // 文件处理的进展
    const onprocessfileprogress = (file, progress) => {
        console.log("文件处理速度+++++", progress);
    };

    let lableHtml =
        '<div class="lable-box"><div class="table-image"></div><div class="table-title">请选择要上传的音频视频拖拽次区域</div><div class="table-info">格式支持: mp3、wav、pcm、n4a、m4v、amr、wma、aac、mp4、mpg、3gp单个文件最长5小时、最大2GB，单次支持上传100个</div></div>';
    return (
        <div className={styles["upload"] + " " + styles[props.modelType]}>
            <FilePond
                files={files}
                onupdatefiles={setFiles}
                onaddfileprogress={onaddfileprogress}
                onprocessfileprogress={onprocessfileprogress}
                allowMultiple={true}
                maxFiles={3}
                // server="/api"
                name="files" /* sets the file input name, it's filepond by default */
                labelIdle={lableHtml}
            />
        </div>
    );
}

export default Upload;
