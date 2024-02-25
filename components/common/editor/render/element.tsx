import Speaker from "./renderSpeaker";

// 段落节点渲染
const Paragraph = ({ attributes, children, element }: any) => {
    const style: React.CSSProperties = {
        padding: "0 10px 20px 50px",
        position: "relative"
    };

    return (
        <div {...attributes} style={style}>
            {children}
        </div>
    );
};

const Element = (props: any) => {
    const { attributes, children, element, editor } = props;
    switch (element.type) {
        case "mention":
            return <Speaker {...props} editor={editor} />;
        default:
            return <Paragraph {...props}></Paragraph>;
    }
};

export default Element;
