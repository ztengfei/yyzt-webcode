import { Editor } from "slate";

const withPlugin = (editor: Editor) => {
    const { isInline, isVoid, markableVoid } = editor;

    editor.isInline = (element) => {
        return element.type === "mention" ? true : isInline(element);
    };

    editor.isVoid = (element) => {
        return element.type === "mention" ? true : isVoid(element);
    };

    editor.markableVoid = (element) => {
        return element.type === "mention" || markableVoid(element);
    };

    return editor;
};

export default withPlugin;
