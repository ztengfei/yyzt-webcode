// import Layout from "@/components/layout";
import { useRef, useState, useCallback, useEffect } from "react";
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
import { Button, Chip, Pagination } from "@nextui-org/react";

import BillModal from "./billModal";
import { addInvoice, getPayList } from "@/api/api";
import toast from "react-hot-toast";

// 状态对应的颜色map 0未支付 1支付中 2成功 3失败
const statusColorMap: any = {
    2: "success",
    1: "warning",
    0: "warning",
    3: "danger",
    vacation: "warning"
};
const statusTextMap: any = {
    2: "支付成功",
    1: "支付中",
    0: "未支付",
    3: "支付失败",
    vacation: "warning"
};

// const rows: any = [
//     {
//         key: "1",
//         type: "2小时·机器快转时长卡",
//         fileName: "W27289KL82723",
//         duration: "2023-01-21 00:03:12",
//         state: "success",
//         money: "￥20.00"
//     },
//     {
//         key: "2",
//         type: "人工精转订单",
//         fileName: "W27289KL82723",
//         createTime: "2023-01-21 00:03:12",
//         state: "error",
//         money: "￥20.00"
//     }
// ];

const columns: any = [
    {
        key: "goodsName",
        label: "产品"
    },
    {
        key: "payOrderNum",
        label: "支付流水号"
    },
    {
        key: "createTime",
        label: "支付时间"
    },
    {
        key: "payAmount",
        label: "金额"
    },
    {
        key: "payStatus",
        label: "状态"
    },
    {
        key: "control",
        label: "操作"
    }
];

export default function TeansferTable(props: any) {
    const [isOpen, setIsopen] = useState(false);

    const [tableData, setTableData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalRef = useRef<number>(0);

    const openInfo = useRef<any>();

    const onClose = () => {
        setIsopen(false);
    };

    const invoicing = (param) => {
        // payOrderNum		支付单号
        // goodsName		产品
        // invoiceAmount		开票金额
        // createTime		创建时间
        // invoiceTitle		抬头
        // taxNumber		税号
        // email		邮箱
        // bankName		开户行
        // bankNum		开户号账号
        // billAddress		地址
        // openInfo.current
        if (!openInfo.current) {
            return;
        }
        const data = {
            payOrderNum: openInfo.current.payOrderNum, // 支付单号
            goodsName: openInfo.current.goodsName, // 产品
            invoiceAmount: openInfo.current.payAmount, // 开票金额
            createTime: openInfo.current.createTime, // 创建时间
            invoiceTitle: param.title, // 抬头
            taxNumber: param.number, // 税号
            email: param.email, // 邮箱
            bankName: param.bankName, // 开户行
            bankNum: param.bankNumber, // 开户号账号
            billAddress: param.address // 		地址
        };

        console.log(param);
        addInvoice(data).then((res: any) => {
            if (res.code == 200) {
                toast.success("开票成功");
                onClose();
                getFyFilesList(currentPage);
            }
        });
    };

    const renderCell = useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "payStatus":
                // 0未支付 1支付中 2成功 3失败
                if (user.payStatus > -1) {
                    return (
                        <Chip
                            className="capitalize rounded"
                            color={statusColorMap[user.payStatus]}
                            size="sm"
                            variant="flat"
                        >
                            {statusTextMap[cellValue]}
                        </Chip>
                    );
                }
                return <></>;
            case "control":
                if (user.payStatus == 2 && user.invoiceStatus) {
                    return (
                        <div className="relative flex items-center gap-3 w-[60px]">
                            <Button
                                variant="light"
                                className="text-sm"
                                onClick={() => {
                                    openInfo.current = user;
                                    setIsopen(true);
                                }}
                            >
                                开发票
                            </Button>
                        </div>
                    );
                }
                return <></>;

            // case "type":
            //     return <div className="w-[58px]">{cellValue}</div>;
            default:
                return cellValue;
        }
    }, []);

    const getFyFilesList = (pageNum) => {
        getPayList({ pageNum, pageSize: 10 }).then((res: any) => {
            console.log("fy+++", res);
            if (res.data && res.total) {
                totalRef.current = res.total;
                setTableData(res.data);
                setCurrentPage(pageNum);
            }
        });
    };

    const setNewPageNum = (pageNum: number) => {
        getFyFilesList(pageNum);
    };

    useEffect(() => {
        getFyFilesList(1);
    }, []);
    const totla = Math.ceil(totalRef.current / 10);

    return (
        <div className="bg-white rounded-xl p-4 flex-1">
            <div className=" text-lg font-semibold mb-4">充值记录</div>
            <Table
                aria-label="Example table with dynamic content"
                classNames={{
                    wrapper: "bg-[#fff] shadow-none",
                    // table: "border-spacing-y-2.5",
                    // thead: "bg-[#EFEFEF]",
                    // wrapper: ["max-h-[382px]", "max-w-3xl"],
                    td: ["bg-[#fff] border-y-1 border-[#efefef]"]
                }}
            >
                <TableHeader columns={columns}>
                    {(column: any) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={tableData} emptyContent={"暂无历史数据"}>
                    {(item: any) => (
                        <TableRow key={item.orderNum}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {totalRef.current && totla > 1 && (
                <Pagination
                    total={totla}
                    page={currentPage}
                    onChange={setNewPageNum}
                    classNames={{
                        base: " flex justify-end"
                    }}
                />
            )}

            <BillModal isOpen={isOpen} changeState={onClose} invoicing={invoicing}></BillModal>
        </div>
    );
}
