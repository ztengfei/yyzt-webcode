import React, { useMemo, useRef, useEffect } from "react";
import { Slate, Editable, withReact, useSlate, useFocused } from "slate-react";
import { Editor, Transforms, Text, createEditor, Descendant, Range } from "slate";

import CopyIcon from "@/components/icon/copy";
import PlayIcon from "@/components/icon/play";

// import { css } from "@emotion/css";
// import { withHistory } from "slate-history";

const HoveringToolbar = () => {
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
                <div className="flex flex-row justify-center items-center border border-[#f3f3f3] rounded-[22px] w-[80px] h-[37px] cursor-pointer bg-white  active:opacity-80 mr-3">
                    <CopyIcon size={18}></CopyIcon> <span className="pl-[3px]">复制</span>
                </div>
                <div className="flex flex-row justify-center items-center border border-[#f3f3f3] rounded-[22px] w-[80px] h-[37px] cursor-pointer  bg-white active:opacity-80">
                    <PlayIcon size={18}></PlayIcon> <span className="pl-[3px]">播放</span>
                </div>
            </div>
        </div>
    );
};

export default HoveringToolbar;
