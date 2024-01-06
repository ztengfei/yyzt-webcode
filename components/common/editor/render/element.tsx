import Speaker from "./renderSpeaker";

// 段落节点渲染
const Paragraph = ({ attributes, children, element }) => {
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
    const { attributes, children, element, speakerClickCallback } = props;
    switch (element.type) {
        case "mention":
            return <Speaker {...props} speakerClickCallback={speakerClickCallback} />;
        default:
            return <Paragraph {...props}></Paragraph>;
    }
};

export default Element;
