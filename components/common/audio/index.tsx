import { useEffect, useMemo, useRef, useState } from "react";

export default function Audio(props:any) {
    const {audioUrl, audioType} = props;
    const audioRef = useRef<any>();
    useEffect(()=>{
        console.log('audio play+++++', audioUrl);
        // audioRef.current && audioRef.current.play()
    }, [audioUrl]);
    
    return (
        <audio controls ref={audioRef}>  
            <source src={audioUrl} type="audio/wav"/>  
            您的浏览器不支持audio元素。  
        </audio>  
    );
}
