import React, { useMemo, useRef, useEffect } from "react";
import { Slate, Editable, withReact, useSlate, useFocused } from "slate-react";
import { Editor, Transforms, Text, createEditor, Descendant, Range, Node } from "slate";

import CopyIcon from "@/components/icon/copy";
import PlayIcon from "@/components/icon/play";

// import { css } from "@emotion/css";
// import { withHistory } from "slate-history";

const HoveringToolbar = (props: any) => {
    const ref = useRef<HTMLDivElement>();
    const editor = useSlate();
    const inFocus = useFocused();

    useEffect(() => {
        const el = ref.current;
        const { selection } = editor;

        if (!el) {
            return;
        }

        if (
            !selection ||
            !inFocus ||
            Range.isCollapsed(selection) ||
            Editor.string(editor, selection) === ""
        ) {
            el.removeAttribute("style");
            return;
        }

        const domSelection = window.getSelection();
        if (!domSelection || !domSelection.getRangeAt || !domSelection.getRangeAt(0)) {
            return;
        }
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        el.style.opacity = "1";
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
        el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
    });

    const goCopy = () => {
        const text = editor.selection ? Editor.string(editor, editor.selection) : ""; // 返回选中的文本或空字符串（当未选中任何内容时）
        // 获取选中的文本内容
        // const text = this.state.list.map((item)=>{return item.content;}).join('\n');
        let textarea = document.createElement("textarea"); // 创建临时的textarea元素
        textarea.value = text; // 将要复制的内容赋值给textarea
        document.body.appendChild(textarea); // 将textarea添加到页面上
        textarea.select(); // 选中textarea中的内容
        try {
            let successful = document.execCommand("copy"); // 执行复制命令
            if (successful) {
                console.log("复制成功");
            } else {
                console.log("无法复制");
            }
        } catch (err) {
            console.log("无法复制");
        } finally {
            document.body.removeChild(textarea); // 移除临时的textarea元素
        }
    };

    const playAudio = () => {
        if (!editor.selection) {
            return;
        }
        const data = editor.fragment(editor.selection);
        let start = 0;
        let end = 0;
        for (let i = 0; i < data.length; i++) {
            let leafs = (data[i] as any).children;
            // endTime: 23120, startTime: 22210
            for (let j = 0; j < leafs.length; j++) {
                let { startTime, endTime } = leafs[j];
                if (start == 0 || startTime < start) {
                    start = startTime;
                }
                if (endTime > end) {
                    end = endTime;
                }
            }
        }
        console.log(data);
        props.playAudio && props.playAudio(Number(start), Number(end));
        // const data1 = Node.fragment(editor.children, editor.selection);
        // console.log(data1);
    };

    return (
        <div>
            <div
                ref={ref as any}
                //
                className="absolute bg-transparent flex flex-row z-10 top-[-100000px] left-[-10000px]"
                onMouseDown={(e) => {
                    // prevent toolbar from taking focus away from editor
                    e.preventDefault();
                }}
            >
                <div
                    className="flex flex-row justify-center items-center border border-[#f3f3f3] rounded-[22px] w-[80px] h-[37px] cursor-pointer bg-white  active:opacity-80 mr-3"
                    onClick={goCopy}
                >
                    <CopyIcon size={18}></CopyIcon> <span className="pl-[3px]">复制</span>
                </div>
                <div
                    className="flex flex-row justify-center items-center border border-[#f3f3f3] rounded-[22px] w-[80px] h-[37px] cursor-pointer  bg-white active:opacity-80"
                    onClick={playAudio}
                >
                    <PlayIcon size={18}></PlayIcon> <span className="pl-[3px]">播放</span>
                </div>
            </div>
        </div>
    );
};

export default HoveringToolbar;
