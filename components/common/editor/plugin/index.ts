import { Editor, Transforms } from "slate";

const withPlugin = (editor: Editor & any, param: any) => {
    const { isInline, isVoid, markableVoid, onChange } = editor;

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
        console.log("value+++++", value);
        // Insert array of children nodes
        Transforms.insertNodes(editor, value);
        // 如果存在撤销栈还需要删除撤销栈
    };
    editor.onChange = (ops) => {
        console.log("asdasdasdasd");
        param.editorChange && param.editorChange(editor.children, ops.operation);
        onChange();
    };

    return editor;
};

export default withPlugin;
