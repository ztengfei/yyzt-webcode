// 翻译结果查看表格
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
import { Button, Chip, Link, Pagination } from "@nextui-org/react";
import { fyOrderDownload, fyOrderList } from "@/api/api";
import toast from "react-hot-toast";

// 状态对应的颜色map
const statusColorMap: any = {
    2: "success",
    paused: "danger",
    vacation: "warning"
};
const statusTextMap: any = {
    2: "翻译成功",
    paused: "翻译失败",
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
        key: "fyLanguage",
        label: "类型"
    },
    {
        key: "fileName",
        label: "文件名称"
    },
    {
        key: "pageSize",
        label: "页数"
    },
    {
        key: "uploadTime",
        label: "上传时间"
    },
    {
        key: "fyStatus",
        label: "状态"
    },
    {
        key: "control",
        label: "操作"
    }
];

export default function TeansferTable(props: any) {
    const { isFree } = props;
    const [tableData, setTableData] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalRef = useRef<number>(0);

    const downloadFile = (id: string) => {
        fyOrderDownload({ id: id })
            .then((res: any) => {
                if (!res.data) {
                    toast.error("获取下载地址失败");
                }
                // 创建一个新的a元素
                var a = document.createElement("a");
                // 设置a元素的href属性为文件的URL
                a.href = res.data;
                // 将a元素添加到文档中，但不需要真的添加到DOM中
                document.body.appendChild(a);
                // 模拟点击a元素以触发下载
                a.click();
                // 下载完成后，从文档中移除a元素
                document.body.removeChild(a);
            })
            .catch(() => {
                toast.error("文件下载错误");
            });
    };

    const renderCell = useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "fyStatus":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[user.fyStatus]}
                        size="sm"
                        variant="flat"
                    >
                        {statusTextMap[cellValue]}
                    </Chip>
                );
            case "control":
                return (
                    <div className="relative flex items-center gap-2">
                        <Button
                            color="primary"
                            className=" h-[34px] max-h-[34px] w-[80px] rounded"
                            onClick={() => {
                                downloadFile(user["id"]);
                            }}
                        >
                            下载
                        </Button>
                    </div>
                );
            case "fyLanguage":
                return (
                    <div className="relative flex items-center gap-2">
                        {cellValue ? cellValue.replace("&", "转") : ""}
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const getFyFilesList = (pageNum) => {
        fyOrderList({ pageNum, pageSize: 10 }).then((res: any) => {
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
                <TableBody items={tableData} emptyContent={"暂无历史数据"}>
                    {(item: any) => (
                        <TableRow key={item.key}>
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
        </>
    );
}
