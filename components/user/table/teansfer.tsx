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
import { Button, Chip, Link, Pagination, Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,useDisclosure, Tooltip} from "@nextui-org/react";

import { zxOrderList, zxOrderInfo, zxOrderDelete } from '@/api/api';
import { secondsToHMS } from '@/components/tool';
import toast from "react-hot-toast";

// 状态对应的颜色map
const statusColorMap: any = {
    0: "warning",
    1: "warning",
    2: 'warning',
    3: 'warning',
    4: 'success',
    5: 'danger',
    // success: "success",
    // error: "danger",
    // vacation: "warning"
};
const statusTextMap: any = {
    // 0取消 1新建 2待支付 3待转写 4完成 5转写失败
    // 0: "取消",
    // 1: "新建",
    2: '待支付',
    3: '待转写',
    4: '转写已完成',
    5: '转写失败',
    // error: "转写失败",
    // vacation: "warning"
};

const rows: any = [
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

const columns: any = [
    {
        key: "zxType", // 1机器,2人工
        label: "类型"
    },
    {
        key: "fileName",
        label: "音视频文件名称"
    },
    {
        key: "fileTime",
        label: "时长"
    },
    {
        key: "zxStatus",// 0取消 1新建 2待支付 3待转写 4完成 5转写失败
        label: "状态"
    },
    {
        key: "control",
        label: "操作"
    }
];

export default function TeansferTable(props: any) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalRef = useRef<number>(0);
    const [tableData, setTableData] = useState<any>([])
    // modal 控制器
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    const getFileName = (zxFiles) => {
        const names = [];
        zxFiles.forEach((item, index)=>{
            if (index != 0) {
                names.push(item.fileName);
            }
             
        })
        return names;
    }

    const renderCell = useCallback((user: any, columnKey: any) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "zxStatus":
                return (
                    <Chip
                        className="capitalize rounded"
                        color={statusColorMap[user.zxStatus]}
                        size="sm"
                        variant="flat"
                    >
                        {statusTextMap[cellValue]}
                    </Chip>
                );
            case "control":
                if (user.zxStatus == 3) { // 转写完成 transfer/complete?
                    return (
                        <div className="relative flex items-center gap-3 w-[140px]">
                            {/* user.zxFiles[0].id */}
                            <Link href={`/transfer/complete?order=${user.id}`} underline="none" className="text-sm">
                                详情
                            </Link>
                            <div className="text-sm cursor-pointer text-97" onClick={()=>{deleteItem(user.id)}}>删除</div>
                        </div>
                    );
                }
                if (user.zxStatus == 4) { // 转写完成 transfer/complete?
                    return (
                        <div className="relative flex items-center gap-3 w-[140px]">
                            {/* user.zxFiles[0].id */}
                            <Link href={`/transfer/editor?id=${user.id}&order=${user.zxFiles[0].id}`} underline="none" className="text-sm" >
                                查看结果
                            </Link>
                            <Link href={`/transfer/complete?order=${user.id}`} underline="none" className="text-sm">
                                详情
                            </Link>
                            <div className="text-sm cursor-pointer text-97" onClick={()=>{deleteItem(user.id)}}>删除</div>
                        </div>
                    );
                }
                if (user.zxStatus == 2) { // 转写完成
                    return (
                        <div className="relative flex items-center gap-3 w-[140px]">
                            <Link href={`/transfer/settlement?order=${user.id}`} underline="none" className="text-sm">
                                去支付
                            </Link>
                            <div className="text-sm cursor-pointer text-97" onClick={()=>{deleteItem(user.id)}}>删除</div>
                        </div>
                    );
                }
                return (<div className="text-sm cursor-pointer text-97" onClick={()=>{deleteItem(user.id)}}>删除</div>)
                // return cellValue;
            case "zxType":
                return <div className="w-[58px]">{cellValue == 1 ? '机器快转' : '人工精转'}</div>;
            case "fileTime":
                return <div>{secondsToHMS(cellValue)}</div>;
            case "fileName":
                if (!user.zxFiles.length) {
                    return;
                }
                if (user.zxFiles.length == 1) {
                    return <div>{user.zxFiles[0].fileName}</div>;
                }
                const names = getFileName(user.zxFiles);
                return <div>
                    <span>{user.zxFiles[0].fileName}</span>
                    <Tooltip
                        content={
                            <div className="px-1 py-2">
                                {names.map((item, index)=>{
                                    return(<div className="text-xs" key={index}>{item}</div>);
                                })}
                            </div>
                        }
                        ><span className="text-f602">等{names.length}个文件</span></Tooltip>
                    
                    </div>;
                
                
                
            default:
                return cellValue;
        }
    }, []);
    const getTableData = (pageNum) => {
        // 初始化时加载页面数据  zxOrderList
        zxOrderInfo({pageNum, pageSize:10, }).then((res:any)=>{
            if (res.data && res.total) {
                totalRef.current = res.total;
                setTableData(res.data);
                setCurrentPage(pageNum);
            }
            console.log('res+++', res);
        })
    }

    const deleteItem = (id:string) => {
        zxOrderDelete({id}).then((res:any)=>{
            if (res.code == 200) {
                // 删除成功
                toast.success('订单删除成功');
                // 重新获取订单数据
                getTableData(currentPage);
            } else {
                toast.error('订单删除失败');
            }
        }).catch(()=>{
            toast.error('订单删除失败');
        })
    }

    // 获取会议数据
    useEffect(()=>{
        getTableData(1);
        // zxOrderInfo({pageNum:1, pageSize:10, });
    }, [])

    const setNewPageNum = (pageNum:number) => {
        getTableData(pageNum);
    }

    return (
        <div className="w-full h-full">
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
            {totalRef.current && <Pagination
                total={Math.ceil(totalRef.current/10)}
                page={currentPage}
                onChange={setNewPageNum}
                classNames={{
                    base:' flex justify-end'
                }}
            />}

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center text-[22px]">
                                平台用户协议
                            </ModalHeader>
                            <ModalBody className="text-[#939393] text-[14px]">
                                <p>感谢您信任并使用</p>
                                <p>我们根据最新的法律法规、监管政策要求</p>
                                <p>
                                    如果您是未满14周岁的未成年人，请您通知您的父母或其他监护人共同阅读上述协议，并在您使用我们的服务前，取得您的父母或其他监护人的同意。
                                </p>
                                <p>如您同意，请点击“同意并继续”，开始接受我们的产品与服务。</p>
                            </ModalBody>
                            <ModalFooter>
                                {/* <Button color="danger" variant="light" onPress={onClose}>
                                    取消
                                </Button> */}
                                <Button
                                    color="primary"
                                    className="m-auto w-[300px] h-[46px] bg-f602"
                                    onPress={onClose}
                                >
                                    我同意
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}
