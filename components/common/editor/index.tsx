// 导入 React 依赖。
import React, {
    useCallback,
    useState,
    useMemo,
    useEffect,
    forwardRef,
    useImperativeHandle,
    useRef
} from "react";
// 导入 Slate 编辑器工厂。
import { createEditor, BaseEditor, Descendant } from "slate";

// 导入 Slate 组件和 React 插件。
import { Slate, Editable, withReact, ReactEditor } from "slate-react";

import HoverIngToobar from "./compopnents/hoveringToolbar";

import { EditorDescendant } from "./editor.type";
import EditorElement from "./render/element";
import withPlugin from "./plugin";
import { initData, editorToServerData } from "./tool";
import { resultUpd } from "@/api/api";

type CustomText = { text: string };
type CustomElement = { type: "paragraph"; children: CustomText[] };

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

export type MentionElement = {
    type: "mention";
    character: string;
    roleName: string; // 发言人名称
    startTime: string; // 发言开始时间
    children: CustomText[];
};

export interface editorType {
    editorData: any;
    audioId: string;
    key: string;
    isShowTime: boolean;
    isShowRole: boolean;
    playAudio: (start: number, end: number) => void;

    // speakerClickCallback: (el: MentionElement) => void;
}

// 定义 Editor 对象
const Editor = (props: editorType, ref) => {
    const { audioId, editorData, playAudio, isShowTime, isShowRole } = props;
    const timer = useRef<number>(0);

    // 一分钟自动保存编辑器数据
    const saveEditorData = (time = 60 * 1000) => {
        clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            let data1 = editorToServerData(editor.children);
            resultUpd({ zxFileId: audioId, zxResult: data1 })
                .then((res) => {
                    saveEditorData();
                    // 文件自动保存
                })
                .catch(() => {
                    saveEditorData();
                });
        }, time);
    };

    const editorChange = (value, ops) => {
        if (ops.type == "set_selection") {
            return;
        }
        if (ops.type != "remove_node") {
            // 排除刷新后的自动保存
            saveEditorData(3 * 1000);
        }
        // console.log("serverData+++", data1);
        console.log("editorChange+++", value);
    };

    useEffect(() => {
        saveEditorData();
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    // 创建一个不会在渲染中变化的 Slate 编辑器对象。
    const [editor] = useState(() => withPlugin(withReact(createEditor()), { editorChange }));

    useImperativeHandle(ref, () => ({
        getEdiotrData: () => {
            return editor.children;
        }
    }));

    const renderElement = (elementProps: any) => (
        <EditorElement
            editor={editor}
            isShowTime={isShowTime}
            isShowRole={isShowRole}
            {...elementProps}
        />
    );

    useEffect(() => {
        editorData && editor.updata(editorData);
    }, [editorData]);

    // onChange={editorChange}
    // const editorData = useMemo(() => {
    //     return initData;
    // }, [audioId, initData]);

    // 渲染 Slate 上下文。
    return (
        <Slate editor={editor} initialValue={initData as any}>
            <HoverIngToobar playAudio={playAudio}></HoverIngToobar>
            <Editable
                className="border-0 w-full h-full focus:outline-none focus-visible:border-0 p-[20px] overflow-auto"
                renderElement={renderElement}
            />
        </Slate>
    );
};

export default forwardRef(Editor);
