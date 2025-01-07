import { secondsToHMS } from "@/components/tool";
import { Editor, Transforms } from "slate";

const withPlugin = (editor: Editor & any, param: any) => {
    const { isInline, isVoid, markableVoid, onChange, insertBreak } = editor;

    editor.isInline = (element) => {
        return (element as any).type === "mention" ? true : isInline(element);
    };

    editor.isVoid = (element) => {
        return (element as any).type === "mention" ? true : isVoid(element);
    };

    editor.markableVoid = (element) => {
        return (element as any).type === "mention" || markableVoid(element);
    };

    editor.updata = (value) => {
        Transforms.delete(editor, {
            at: {
                anchor: Editor.start(editor, []),
                focus: Editor.end(editor, [])
            }
        });

        // Removes empty node
        Transforms.removeNodes(editor, {
            at: [0]
        });
        // Insert array of children nodes
        Transforms.insertNodes(editor, value);
        // 如果存在撤销栈还需要删除撤销栈
    };
    editor.onChange = (ops) => {
        param.editorChange && param.editorChange(editor.children, ops.operation);
        onChange();
    };

    const getStartTime = (data) => {
        let start = 0;
        for (let i = 0; i < data.length; i++) {
            let leafs = (data[i] as any).children;
            // endTime: 23120, startTime: 22210
            for (let j = 0; j < leafs.length; j++) {
                let { startTime, endTime } = leafs[j];
                if (startTime) {
                    start = startTime;
                    return start;
                }
            }
        }
        return start;
    };

    editor.insertBreak = () => {
        // 当前进行了换行
        insertBreak();
        const data = editor.fragment(editor.selection);
        const roleTime = getStartTime(data);
        const role = {
            type: "mention",
            roleName: "",
            startTime: secondsToHMS(Math.floor(roleTime / 1000)),
            timeNumber: roleTime,
            character: "",
            iconText: "",
            iconBg: "",
            children: [{ text: "" }]
        };
        editor.insertNode(role);
    };

    return editor;
};

export default withPlugin;
