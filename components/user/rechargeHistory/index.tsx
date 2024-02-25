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
const statusColorMap: any = {
    success: "success",
    error: "danger",
    vacation: "warning"
};
const statusTextMap: any = {
    success: "支付成功",
    error: "已关闭",
    vacation: "warning"
};

const rows: any = [
    {
        key: "1",
        type: "2小时·机器快转时长卡",
        fileName: "W27289KL82723",
        duration: "2023-01-21 00:03:12",
        state: "success",
        money: "￥20.00"
    },
    {
        key: "2",
        type: "人工精转订单",
        fileName: "W27289KL82723",
        duration: "2023-01-21 00:03:12",
        state: "error",
        money: "￥20.00"
    }
];

const columns: any = [
    {
        key: "type",
        label: "产品"
    },
    {
        key: "fileName",
        label: "支付流水号"
    },
    {
        key: "duration",
        label: "支付时间"
    },
    {
        key: "money",
        label: "金额"
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
                    <div className="relative flex items-center gap-3 w-[60px]">
                        <Link href="#" underline="none" className="text-sm">
                            开发票
                        </Link>
                    </div>
                );
            // case "type":
            //     return <div className="w-[58px]">{cellValue}</div>;
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className="bg-white rounded-xl p-4 flex-1">
            <div className=" text-lg font-semibold mb-4">充值记录</div>
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
        </div>
    );
}
