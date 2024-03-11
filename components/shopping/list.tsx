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
        type: "3小时·机器快转时长卡",
        fileName: "1年·2024年11月15日到期",
        duration: "38.8",
    },
    {
        key: "2",
        type: "包月会员",
        fileName: "连续包月",
        duration: "88.00",
    }
];

const columns: any = [
    {
        key: "type",
        label: "产品名称"
    },
    {
        key: "fileName",
        label: "有效期"
    },
    {
        key: "duration",
        label: "金额"
    },
    
];

export default function TeansferTable(props: any) {
    const renderCell = useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            // case "state":
            //     return (
            //         <Chip
            //             className="capitalize rounded"
            //             color={statusColorMap[user.state]}
            //             size="sm"
            //             variant="flat"
            //         >
            //             {statusTextMap[cellValue]}
            //         </Chip>
            //     );
            // case "control":
            //     return (
            //         <div className="relative flex items-center gap-3 min-w-[60px]">
            //             <div color="primary" className=" text-f602 cursor-pointer ">
            //                 下载结果
            //             </div>
            //         </div>
            //     );
            // case "type":
            //     return <div className="w-[58px]">{cellValue}</div>;
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
