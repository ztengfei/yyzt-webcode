// import Layout from "@/components/layout";
import React, {
    useRef,
    useState,
    useMemo,
    useEffect,
    forwardRef,
    useImperativeHandle
} from "react";
import {
    Button,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectItem,
    Slider,
    Switch
} from "@nextui-org/react";

import PlayIcon from "@/components/icon/audioPlay";
import PauseIcon from "@/components/icon/audioPause";
import GoIcon from "@/components/icon/audioGo";
import BackIcon from "@/components/icon/audioBack";
import SetingIcon from "@/components/icon/seting";
import useAudio from "@/components/common/audio/useAudio";

const getTimeString = (num: number) => {
    if (num < 10) {
        return "0" + num;
    }
    return num.toString();
};
function convertSecondsToHMS(seconds: number) {
    // 去除毫秒数得到秒
    seconds = Math.floor(seconds / 1000);
    let hours = Math.floor(seconds / 3600); // 计算小时部分
    seconds %= 3600; // 取余得到不足1小时的秒数

    let minutes = Math.floor(seconds / 60); // 计算分钟部分
    seconds %= 60; // 取余得到不足1分钟的秒数
    // 返回 00:10:10
    return `${getTimeString(hours)}:${getTimeString(minutes)}:${getTimeString(seconds)}`;
}

// 音频播放速度
const speeds = ["0.5X", "0.75X", "1X", "1.25X", "1.5X", "2X"];

interface AudioControlTypes {
    audioTime: number; // 音频的总时长，单位毫秒
    audioUrl: string;
    editorContorl: { isShowRole: boolean; isShowTime: boolean; isJump: boolean };
    setEditorContorl: (data: { isShowRole: boolean; isShowTime: boolean; isJump: boolean }) => void;
    // pauseAudio: () => void;
    // audioPlay: () => void;
    // getSeek: () => number;
}

const time = 1800000;
const AudioControl = (props: AudioControlTypes, ref: any) => {
    const { audioTime, audioUrl, editorContorl, setEditorContorl } = props; // , audioPlay, pauseAudio, getSeek
    // 音频条的时间
    const [targetTime, setTargetTime] = useState("00:00:00");
    // 当前的装填
    const [audioState, steAudioState] = useState(true);
    // 时间轴上对应的时间,默认开始时间为0
    const [sideTime, setSideTime] = useState(0);

    const timerRef = useRef<number>();
    const [speed, setSpeed] = useState(["1X"]);
    const playTime = useRef<number>();

    const audioPlayEnd = () => {
        clearTimeout(timerRef.current);
        steAudioState(true);
    };

    const [{ resetAudioSrc, pauseAudio, audioPlay, getSeek, getDuration, setSeek, setRate }] =
        useAudio(audioPlayEnd);
    useEffect(() => {
        resetAudioSrc(audioUrl);
        return () => {
            clearTimeout(timerRef.current);
            clearTimeout(playTime.current);
        };
    }, [audioUrl]);

    useImperativeHandle(ref, () => ({
        playAudioInterval: (start, end) => {
            clearTimeout(playTime.current);
            setSeek(start / 1000);
            playTime.current = window.setTimeout(() => {
                pauseAudio();
                clearTimeout(timerRef.current);
                steAudioState(true);
            }, end - start);
            audioPlay();
            getAudioSeek();
            steAudioState(false);
        }
    }));

    // 声音进度条变化
    const onChange = (value: number | number[]) => {
        // clearTimeout(timerRef.current);
        value = Array.isArray(value) ? value[0] : value;
        setSeek(Number(value / 1000));
        let hms = convertSecondsToHMS(value);
        setSideTime(value);
        setTargetTime(hms);
        // getAudioSeek();
    };
    // 开始暂停播放按钮点击
    const setAudioState = () => {
        if (audioState) {
            audioPlay();
            getAudioSeek();
        } else {
            pauseAudio();
            clearTimeout(timerRef.current);
        }
        steAudioState(!audioState);
    };

    // 获取音频进度
    const getAudioSeek = () => {
        clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            const seek = getSeek();
            const duration = getDuration();
            const newTime = Number(seek * 1000);
            if (audioState) {
                let hms = convertSecondsToHMS(newTime);
                setTargetTime(hms);
                setSideTime(seek * 1000);
                getAudioSeek();
            } else {
                clearTimeout(timerRef.current);
            }
        }, 500);
    };

    // 音频时间控制
    const setAudioTime = (type: "forward" | "back") => {
        let newTIme = sideTime;
        const changeNum = 5 * 1000;
        if (type == "forward") {
            newTIme = sideTime + changeNum < audioTime ? sideTime + changeNum : audioTime;
            setSeek(Number(newTIme / 1000));
        }
        if (type == "back") {
            newTIme = sideTime < changeNum ? 0 : sideTime - changeNum;
            setSeek(Number(newTIme / 1000));
        }

        let hms = convertSecondsToHMS(newTIme);
        setSideTime(newTIme);
        setTargetTime(hms);
    };
    const setAudioSpeed = (val) => {
        const arr = [...val];
        setRate(Number(arr[0].replace("X", "")));
        setSpeed(val);
    };

    const showTime = useMemo(() => {
        return convertSecondsToHMS(audioTime);
    }, [audioTime]);
    return (
        <div className="h-[112px] mx-auto max-w-[1200px] flex flex-col">
            <div className="flex flex-row w-full my-3">
                <span className="mr-3 text-sm text-93">{targetTime}</span>
                <Slider
                    // label="Donuts to buy"
                    size="sm"
                    maxValue={audioTime}
                    value={sideTime}
                    // getValue={(donuts) => {setTargetTime()}}
                    onChange={onChange}
                    className="flex-1"
                />
                <span className="ml-3 text-sm text-93">{showTime}</span>
            </div>
            <div className="flex w-full justify-between items-center">
                <div>
                    <Select
                        // label="文件格式："
                        className="h-[40px] w-[96px]"
                        classNames={{
                            trigger: "h-[38px] min-h-[38px] bg-white border border-[#E3E9F0]",
                            label: "text-93 mb-2"
                        }}
                        selectedKeys={speed}
                        // defaultSelectedKeys={["1X"]}
                        onSelectionChange={(val) => {
                            setAudioSpeed(val);
                        }}
                    >
                        {speeds.map((item) => {
                            return (
                                <SelectItem key={item} value={item}>
                                    {item}
                                </SelectItem>
                            );
                        })}

                        {/* <SelectItem key={"223"} value={"223"}>
                            新录音文件名称2
                        </SelectItem> */}
                    </Select>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <Button
                        isIconOnly
                        onClick={() => {
                            setAudioTime("back");
                        }}
                        variant="light"
                        radius="full"
                        size="sm"
                        className="mr-[25px]  min-w-25px h-[25px] w-[25px]"
                    >
                        <BackIcon size={25}></BackIcon>
                    </Button>
                    <Button isIconOnly onClick={setAudioState} variant="light" radius="full">
                        {audioState ? <PlayIcon size={50} /> : <PauseIcon size={50}></PauseIcon>}
                    </Button>
                    <Button
                        isIconOnly
                        // onClick={setAudioState}
                        variant="light"
                        radius="full"
                        size="sm"
                        onClick={() => {
                            setAudioTime("forward");
                        }}
                        className="ml-[25px] min-w-25px h-[25px]  w-[25px]"
                    >
                        <GoIcon size={25} viewBox="0 0 25 25"></GoIcon>
                    </Button>
                </div>
                <div>
                    <Popover showArrow placement="bottom">
                        <PopoverTrigger>
                            <Button
                                className=" text-black border-[#efefef]"
                                variant="bordered"
                                startContent={<SetingIcon size={18} />}
                            >
                                篇幅设置
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-4 py-6 w-[310px] orange-drak">
                                <div className="text-small flex flex-row items-center justify-between  w-full mb-6">
                                    <div>
                                        <div className="font-bold text-lg mb-1">显示说话人</div>
                                        <div className="text-[#8f8f8f]">每段前显示说话人名称</div>
                                    </div>
                                    <div>
                                        <Switch
                                            isSelected={editorContorl.isShowRole}
                                            onValueChange={(val) => {
                                                setEditorContorl({
                                                    ...editorContorl,
                                                    isShowRole: val
                                                });
                                            }}
                                            defaultSelected
                                            aria-label="显示说话人"
                                            color="primary"
                                        />
                                    </div>
                                </div>
                                <div className="text-small flex flex-row items-center justify-between  w-full  mb-6">
                                    <div>
                                        <div className="font-bold text-lg mb-1">显示时间码</div>
                                        <div className="text-[#8f8f8f]">每段前显示显示时间码</div>
                                    </div>
                                    <div>
                                        <Switch
                                            isSelected={editorContorl.isShowTime}
                                            onValueChange={(val) => {
                                                setEditorContorl({
                                                    ...editorContorl,
                                                    isShowTime: val
                                                });
                                            }}
                                            defaultSelected
                                            aria-label="显示时间码"
                                            color="primary"
                                        />
                                    </div>
                                </div>
                                <div className="text-small flex flex-row items-center justify-between  w-full">
                                    <div>
                                        <div className="font-bold text-lg mb-1">跳过静音段</div>
                                        <div className="text-[#8f8f8f]">播放时跳过静音部分</div>
                                    </div>
                                    <div>
                                        <Switch
                                            isSelected={editorContorl.isJump}
                                            onValueChange={(val) => {
                                                setEditorContorl({
                                                    ...editorContorl,
                                                    isJump: val
                                                });
                                            }}
                                            defaultSelected
                                            aria-label="跳过静音段"
                                            color="primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default forwardRef(AudioControl);
