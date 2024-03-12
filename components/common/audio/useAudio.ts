import { Howl, Howler } from "howler";
import { useEffect, useMemo, useRef, useState } from "react";

const useAudio = (props: any) => {
    const [audioSrc, setAudioSrc] = useState<string>();
    const soundRef = useRef<any>();
    useEffect(() => {
        soundRef.current = new Howl({
            src: [audioSrc],
            html5: true,
            onplay: (a, b, c) => {
                console.log("onplay+++", a, b, c);
            },
            onend: () => {
                props.audioPlayEnd && props.audioPlayEnd();
            }
        });
        // console.log(soundRef.current);
        // if (soundRef.current) {
        //     soundRef.current.once("paly", (data) => {
        //         console.log(data);
        //     });
        // }
    }, [audioSrc]);

    // 重置音频
    const resetAudioSrc = (src: string) => {
        setAudioSrc(src);
    };

    // // 获取播放的时间
    // useEffect(() => {

    //     return () => {};
    // }, [sound]);

    // 暂停音频
    const pauseAudio = () => {
        soundRef.current.pause();
    };

    const audioPlay = () => {
        soundRef.current.play();
    };

    const getSeek = () => {
        return soundRef.current.seek();
    };

    const setSeek = (time) => {
        soundRef.current.seek(time);
    };

    const getDuration = () => {
        return soundRef.current._duration;
    };

    // 设施播放速度
    const setRate = (time) => {
        soundRef.current.rate(time);
    };

    return [{ resetAudioSrc, pauseAudio, audioPlay, getSeek, getDuration, setSeek, setRate }];
};

export default useAudio;
