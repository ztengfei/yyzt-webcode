// 翻译结果查看表格
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
import { Button, Chip, Link } from "@nextui-org/react";

// 状态对应的颜色map
const statusColorMap: any = {
    success: "success",
    error: "danger",
    vacation: "warning"
};
const statusTextMap: any = {
    success: "翻译成功",
    error: "翻译失败",
    vacation: "warning"
};

const rows: any = [
    {
        key: "1",
        type: "中文转英文",
        fileName: "文件名称文件名曾按时间大神解答绿卡撒大苏打卢卡斯的了.doc",
        duration: "2024-01-01 12:05:30",
        state: "success"
    },
    {
        key: "2",
        type: "英文转中文",
        fileName: "文件名称文件名.doc",
        duration: "2024-01-01 12:05:30",
        state: "error"
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
        key: "duration",
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

export default function TeansferTable(props: any) {
    const renderCell = useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "state":
                return (
                    <Chip
                        className="capitalize rounded"
                        color={statusColorMap[user.state]}
                        size="sm"
                        variant="flat"
                    >
                        {statusTextMap[cellValue]}
                    </Chip>
                );
            case "control":
                return (
                    <div className="relative flex items-center gap-3 min-w-[60px]">
                        <div color="primary" className=" text-f602 cursor-pointer ">
                            下载结果
                        </div>
                    </div>
                );
            case "type":
                return <div className="w-[58px]">{cellValue}</div>;
            default:
                return cellValue;
        }
    }, []);

    return (
        <>
            <Table
                aria-label="Example table with dynamic content"
                classNames={{
                    wrapper: "bg-[#fff] shadow-none",
                    // table: "border-spacing-y-2.5",
                    thead: "bg-[#EFEFEF]",
                    // wrapper: ["max-h-[382px]", "max-w-3xl"],
                    td: ["bg-[#fff] border-y-1 border-[#efefef]"]
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
