// import Layout from "@/components/layout";
import { useRef, useState, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
} from "@nextui-org/table";
import DeleteIcon from "@/components/icon/delete";
import { Button, Chip } from "@nextui-org/react";

// 状态对应的颜色map
const statusColorMap: any = {
    success: "success",
    paused: "danger",
    vacation: "warning"
};
const statusTextMap: any = {
    success: "翻译成功",
    paused: "翻译失败",
    vacation: "warning"
};

const rows: any = [
    {
        key: "1",
        type: "中文转英文",
        fileName: "文件名称文件名曾按时间大神解答绿卡撒大苏打卢卡斯的了.doc",
        pageNum: "3",
        languge: "中转英",
        uploadTime: "2023-01-04-12 12:00:12",
        state: "success",
        control: ""
    },
    {
        key: "2",
        type: "中文转英文",
        fileName: "文件名称文件名曾按时间大神解答绿卡撒大苏打卢卡斯的了.doc",
        pageNum: "3",
        languge: "中转英",
        uploadTime: "2023-01-04-12 12:00:12",
        state: "success",
        control: ""
    }
];

const columns: any = [
    {
        key: "type",
        label: "类型"
    },
    {
        key: "fileName",
        label: "文件名称"
    },
    {
        key: "pageNum",
        label: "页数"
    },
    {
        key: "languge",
        label: "语种方向"
    },
    {
        key: "uploadTime",
        label: "上传时间"
    },
    {
        key: "state",
        label: "状态"
    },
    {
        key: "control",
        label: "操作"
    }
];

export default function KeyWordAndList(props: any) {
    const renderCell = useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "state":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[user.state]}
                        size="sm"
                        variant="flat"
                    >
                        {statusTextMap[cellValue]}
                    </Chip>
                );
            case "control":
                return (
                    <div className="relative flex items-center gap-2">
                        <Button color="primary" className=" h-[34px] max-h-[34px] w-[80px] rounded">
                            下载
                        </Button>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <div className="w-[462px] p-2 bg-white rounded-lg flex flex-row items-center text-f602 text-sm mt-1">
                <span className="inline-block w-[14px] h-[14px] text-center rounded-lg bg-f602 text-white text-xs mr-1">
                    !
                </span>
                <span>中英日韩等多种语言翻译·更地道·更快速·排版准确</span>
                <span className=" inline-block px-2 py-1 bg-[#FFF6F1] border border-f602 rounded ml-4">
                    🔥限时免费
                </span>
            </div>
            <div className="text-lg font-semibold mt-5 mb-4">上传文件（3）</div>
            <Table
                aria-label="Example table with dynamic content"
                classNames={{
                    wrapper: "bg-[#F7F8FA] shadow-none border-spacing-y-2.5",
                    table: "border-spacing-y-2.5",
                    thead: "bg-[#EFEFEF]",
                    // wrapper: ["max-h-[382px]", "max-w-3xl"],
                    td: ["bg-[#fff] border-y-8 border-[#F7F8FA]"]
                }}
            >
                <TableHeader columns={columns}>
                    {(column: any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows} emptyContent={"暂无历史数据"}>
                    {(item: any) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
