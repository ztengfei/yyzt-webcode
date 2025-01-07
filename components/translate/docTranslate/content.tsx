// import Layout from "@/components/layout";
import { useRef, useState, useCallback, useEffect, forwardRef, useImperativeHandle } from "react";
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
import { fyOrderList, fyOrderDownload } from "@/api/api";
import toast from "react-hot-toast";

// 状态对应的颜色map
const statusColorMap: any = {
    4: "success",
    3: "danger",
    vacation: "warning"
};
const statusTextMap: any = {
    4: "翻译成功",
    3: "翻译中"
};

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

function KeyWordAndList(props: any, ref: any) {
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
                if (user.fyStatus == 3) {
                    return <></>;
                }
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
                let data = [];
                res.data.forEach((item) => {
                    if (item.fyStatus == 4 || item.fyStatus == 3) {
                        data.push(item);
                    }
                });
                setTableData(data);
                setCurrentPage(pageNum);
            }
        });
    };

    const setNewPageNum = (pageNum: number) => {
        getFyFilesList(pageNum);
    };
    useImperativeHandle(ref, () => ({
        resetData: () => {
            getFyFilesList(1);
        }
    }));
    useEffect(() => {
        getFyFilesList(1);
    }, []);
    const totla = Math.ceil(totalRef.current / 10);
    return (
        <>
            <div className="w-[462px] p-2 bg-white rounded-lg flex flex-row items-cente text-sm mt-1">
                <span>
                    🔥用户每自然月可免费体验 100 页，超过 100 页部分按{" "}
                    <span className="text-f602">0.2元/页</span> 计费
                </span>
            </div>
            <div className="text-lg font-semibold mt-5 mb-4">翻译历史（{tableData.length}）</div>
            <Table
                aria-label="Example table with dynamic content"
                classNames={{
                    wrapper: "bg-[#F7F8FA] shadow-none border-spacing-y-2.5",
                    table: "border-spacing-y-2.5",
                    // thead: "bg-[#EFEFEF]",
                    // wrapper: ["max-h-[382px]", "max-w-3xl"],
                    td: ["bg-[#fff] border-y-8 border-[#F7F8FA]"]
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

export default forwardRef(KeyWordAndList);
