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
import { Button, Chip, Link } from "@nextui-org/react";

// 状态对应的颜色map
const statusColorMap = {
    success: "success",
    error: "danger",
    vacation: "warning"
};
const statusTextMap = {
    success: "转写完成",
    error: "转写失败",
    vacation: "warning"
};

const rows = [
    {
        key: "1",
        type: "机器快转",
        fileName: "文件名称文件名曾按时间大神解答绿卡撒大苏打卢卡斯的了.doc",
        duration: "5:30",
        state: "success"
    },
    {
        key: "2",
        type: "人工精转",
        fileName: "文件名称文件名.doc",
        duration: "5:30",
        state: "error"
    }
];

const columns = [
    {
        key: "type",
        label: "类型"
    },
    {
        key: "fileName",
        label: "音视频文件名称"
    },
    {
        key: "duration",
        label: "时长"
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
                    <div className="relative flex items-center gap-3 w-[140px]">
                        <Link href="#" underline="none" className="text-sm">
                            查看结果
                        </Link>
                        <Link href="#" underline="none" className="text-sm">
                            详情
                        </Link>
                        <div className="text-sm cursor-pointer">删除</div>
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
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={rows} emptyContent={"暂无历史数据"}>
                    {(item) => (
                        <TableRow key={item.key}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
