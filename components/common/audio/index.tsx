import { useEffect, useMemo, useRef, useState } from "react";

export default function Audio(props: any) {
    const { audioUrl, audioName } = props;
    const audioRef = useRef<any>();
    useEffect(() => {
        // audioRef.current && audioRef.current.play()
    }, [audioUrl]);

    const audioType = useMemo(() => {
        if (!audioName) {
            return "audio/wav";
        }
        let arr = audioName.split(".");
        const type = "audio/" + arr[arr.length - 1];
        return type;
    }, [audioName]);

    return (
        <audio controls ref={audioRef}>
            <source src={audioUrl} type={audioType} />
            您的浏览器不支持audio元素。
        </audio>
    );
}
