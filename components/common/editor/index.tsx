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
    playAudio: (start: number, end: number) => void;
    // speakerClickCallback: (el: MentionElement) => void;
}

// 定义 Editor 对象
const Editor = (props: editorType, ref) => {
    const { audioId, editorData, playAudio } = props;
    const timer = useRef<number>(0);

    const editorChange = (value, ops) => {
        if (ops.type == "set_selection") {
            return;
        }

        // console.log("serverData+++", data1);
        // console.log("editorChange+++", value);
    };

    // 保存编辑器数据
    const saveEditorData = () => {
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
        }, 60 * 1000);
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

    const renderElement = useCallback(
        (elementProps: any) => <EditorElement editor={editor} {...elementProps} />,
        []
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
