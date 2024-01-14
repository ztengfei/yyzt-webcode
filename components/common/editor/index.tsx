// 导入 React 依赖。
import React, { useCallback, useState } from "react";
// 导入 Slate 编辑器工厂。
import { createEditor, BaseEditor, Descendant } from "slate";

// 导入 Slate 组件和 React 插件。
import { Slate, Editable, withReact, ReactEditor } from "slate-react";

import HoverIngToobar from "./compopnents/hoveringToolbar";

import { EditorDescendant } from "./editor.type";
import EditorElement from "./render/element";
import withPlugin from "./plugin";

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
    // speakerClickCallback: (el: MentionElement) => void;
}

const initialValue: any = [
    {
        type: "paragraph",
        children: [
            { text: "" },
            {
                type: "mention",
                roleName: "发言人1",
                startTime: "00:00:13",
                character: "发言人",
                iconText: "1",
                iconBg: "rgb(255, 88, 90)",
                children: [{ text: "" }]
            },
            { text: "这类型结果。你不说他给我反正谁是按我要求返，不是什么，你看这3%怎么讲?" }
        ]
    },
    {
        type: "paragraph",
        children: [
            { text: "" },
            {
                type: "mention",
                roleName: "发言人2",
                startTime: "00:00:13",
                character: "发言人",
                iconText: "2",
                iconBg: "rgb(191, 142, 238)",
                children: [{ text: "" }]
            },
            { text: "坐。孩子们，这节课让我们一起走进神话故事，一社九日齐读课题" }
        ]
    },
    {
        type: "paragraph",
        children: [
            { text: "" },
            {
                type: "mention",
                roleName: "发言人1",
                startTime: "00:00:13",
                character: "发言人",
                iconText: "1",
                iconBg: "rgb(0, 169, 152)",
                children: [{ text: "" }]
            },
            { text: "坐。孩子们，这节课让我们一起走进神话故事，一社九日齐读课题" }
        ]
    }
];

// 定义 Editor 对象
const Editor = (props: editorType) => {
    // 创建一个不会在渲染中变化的 Slate 编辑器对象。
    const [editor] = useState(() => withPlugin(withReact(createEditor())));

    const renderElement = useCallback(
        (elementProps: any) => <EditorElement editor={editor} {...elementProps} />,
        []
    );
    // 渲染 Slate 上下文。
    return (
        <Slate editor={editor} initialValue={initialValue}>
            <HoverIngToobar></HoverIngToobar>
            <Editable
                className="border-0 w-full h-full focus:outline-none focus-visible:border-0 p-[20px] overflow-auto"
                renderElement={renderElement}
            />
        </Slate>
    );
};

export default Editor;
