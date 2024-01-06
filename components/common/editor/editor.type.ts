import { Text, Element } from "slate";

type CustomText = { text: string };
export type MentionElement = {
    type: "mention";
    character: string;
    roleName: string; // 发言人名称
    startTime: string; // 发言开始时间
    children: CustomText[];
};

export type EditorText = {
    startTime?: string;
    endTime?: string;
} & Text;

export type EditorElement = Element & MentionElement;

export type EditorDescendant = EditorElement;
