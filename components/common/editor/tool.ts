import { secondsToHMS } from "@/components/tool";
import { roleIconbg } from "@/components/config";

// 从接口请求的数据

// name :  null
// paNo :  "0"
// role :  "1"
// startTime : 40
// value :  [{text: "宝宝", startTime: 4, endTime: 169}, {text: "。", startTime: 169, endTime: 169}]

// 编辑器对应的数据

// {
//     type: "paragraph",
//     children: [
//         { text: "" },
//         {
//             type: "mention",
//             roleName: "发言人1",
//             startTime: "00:00:13",
//             character: "发言人",
//             iconText: "1",
//             iconBg: "rgb(255, 88, 90)",
//             children: [{ text: "" }]
//         },

//         { text: "这类型结果。你不说他给我反正谁是按我要求返，不是什么，你看这3%怎么讲?" },
//     ]
// },

const demoValue: any = [
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

            { text: "这类型结果。你不说他给我反正谁是按我要求返，不是什么，你看这3%怎么讲?" },
            { text: "这类型结果。你不说他给我反正谁是按我要求返，不是什么，你看这3%怎么讲?" },
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

export const initData = [
    {
        type: "paragraph",
        children: [{ text: "" }]
    }
];

// 发言人颜色
const roleBgMap = {};

export const getRoleBg = (roleName) => {
    if (roleBgMap[roleName]) {
        return roleBgMap[roleName];
    }
    const keys = Object.keys(roleBgMap);
    const count = keys.length >= roleIconbg.length ? roleIconbg.length - keys.length : keys.length;
    roleBgMap[roleName] = roleIconbg[count];
    return roleIconbg[count];
};

// 将接口数据转化为 编辑器数据
export const toEditorData = (data) => {
    if (!data || !data.length) {
        return [
            {
                type: "paragraph",
                children: [{ text: "" }]
            }
        ];
    }
    // 编辑器数据
    let editorData = [];
    // 上一个发言人
    let prevRole = "";

    for (let i = 0; i < data.length; i++) {
        let parData = {
            type: "paragraph",
            children: []
        };
        const { value, startTime, role } = data[i];
        if (role != prevRole) {
            parData.children.push(
                { text: "" },
                {
                    type: "mention",
                    roleName: role,
                    startTime: secondsToHMS(Math.floor(startTime / 1000)),
                    timeNumber: startTime,
                    character: role,
                    iconText: role ? role[0] : "",
                    iconBg: getRoleBg(role),
                    children: [{ text: "" }]
                }
            );
            prevRole = role;
        }
        if (value.length == 0) {
            parData.children.push({ text: "" });
        }
        value.forEach((element) => {
            if (element.text) {
                parData.children.push({
                    text: element.text,
                    endTime: element.endTime,
                    startTime: element.startTime
                });
            }
        });
        editorData.push(parData);
    }
    return editorData;
};

const getBlockRole = (blockData, prevRole) => {
    const count = Math.min(blockData.length, 2);
    for (let i = 0; i < count; i++) {
        let { type, roleName, timeNumber } = blockData[i];
        if (type == "mention") {
            return { roleName, roleTime: timeNumber };
        }
    } // {roleName, roleTime:''}
    return prevRole;
};

const getfirstTime = (blockData) => {
    const count = blockData.length;
    for (let i = 0; i < count; i++) {
        let { timeNumber, type } = blockData[i];
        if (timeNumber && type != "mention") {
            return timeNumber;
        }
    }
    return 0;
};

// 将页面的数据转化为服务保存的数据
export const editorToServerData = (children) => {
    const serverData = [];
    let prevRole = {};
    for (let i = 0; i < children.length; i++) {
        let block = children[i];
        let roleInfo = getBlockRole(block.children, prevRole);
        prevRole = roleInfo;
        // let firstTime = getfirstTime(block.children);
        const itemData = {
            role: roleInfo.roleName,
            startTime: roleInfo.roleTime,
            value: []
        };
        block.children.forEach((item) => {
            if (item.type != "mention" && item.text) {
                itemData.value.push({
                    ...item
                });
            }
        });
        serverData.push(itemData);
    }
    // console.log("serverData+++++", serverData);
    return serverData;
};
