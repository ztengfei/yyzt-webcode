import React, { useState, useEffect, useMemo, useRef } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress, Image, Select, SelectItem } from "@nextui-org/react";

import ActiveIcon from "@/components/icon/active";
import DeleteIcon from "@/components/icon/delete";
import LanguageSelect from "./../langSelect";
import { fyCommit, fyFileList, fyFiledel, fyOrderInfo } from "@/api/api";

interface uploadSuccessType {
    setUploadState: React.Dispatch<React.SetStateAction<string>>;
    languages: { value: string; label: string }[];
    uploadSuccessCB: (id: string) => void;
}

// 文件上传成功
export default function UploadSuccess(props: uploadSuccessType) {
    const [file, setFile] = useState<any>({});
    const languageRef = useRef<any>();
    // 获取上传文件列表
    useEffect(() => {
        fyFileList().then((res: any) => {
            if (res.errorCode == 0) {
                setFile(res.data[0]);
            }
        });
    }, []);

    // 删除上传文件 fyFiledel = (data: { id: string })
    const deleteFile = () => {
        //
        fyFiledel({ id: file.id }).then(() => {
            props.setUploadState("");
        });
        //
    };

    // 去翻译
    const goTranslate = () => {
        if (!languageRef.current) {
            return;
        }
        const langs = languageRef.current.getSelectedLan();
        if (!langs.lanFrom || !langs.zxRemarks) {
            // 提示请选择语言
            return;
        }
        console.log("langs+++", langs);

        fyCommit({ upFileId: file.id, lanFrom: langs.lanFrom, lanTo: langs.zxRemarks }).then(
            (res: any) => {
                console.log("res+++", res.data);
                fyOrderInfo({ orderNum: res.data }).then((res: any) => {
                    console.log("12323");
                });
            }
        );

        // 去翻译
        // props.setUploadState("");
    };

    const fileType = useMemo(() => {
        console.log(file);
        if (!file || !file.fileName) {
            return "";
        }
        const arr = file.fileName.split(".");
        const type = arr[arr.length - 1];
        if (type == "docx" || type == "doc") {
            return "doc";
        } else if (type == "pdf") {
            return "pdf";
        } else if (type == "ppt" || type == "pptx") {
            return "ppt";
        } else if (type == "xls" || type == "xlsx") {
            return "xsl";
        }
    }, [file]);

    return (
        <>
            <div className=" absolute left-0 top-0 w-full h-full flex items-center flex-col p-3">
                <div className="text-sm text-active text-right flex flex-row items-center justify-end w-full">
                    <ActiveIcon size={14} className="mr-1"></ActiveIcon>解析完成
                </div>
                <div className="w-[58px] h-[58px] relative mx-auto mt-[100px]">
                    {fileType && (
                        <Image width={58} alt="xsl" src={`/images/translate/${fileType}.png`} />
                    )}
                    <ActiveIcon
                        size={20}
                        className="absolute bottom-[-5px] right-[-7px]"
                    ></ActiveIcon>
                </div>
                <div className="flex flex-row w-full mt-4 justify-center items-center">
                    <div className=" max-w-[80%] whitespace-nowrap overflow-ellipsis overflow-hidden text-[#333333]">
                        {file && file.fileName}
                    </div>
                    <Button
                        isIconOnly
                        color="primary"
                        className="bg-transparent"
                        onPress={deleteFile}
                    >
                        <DeleteIcon size={19}></DeleteIcon>
                    </Button>
                </div>
                <LanguageSelect
                    modalType="doc"
                    languages={props.languages}
                    ref={languageRef}
                    languageChange={() => {}}
                ></LanguageSelect>

                <Button className="w-[274px] h-[44px] mt-10" color="primary" onClick={goTranslate}>
                    立即翻译
                </Button>
            </div>
        </>
    );
}
