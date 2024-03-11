import { Howl, Howler } from 'howler';
import { useEffect, useState } from 'react';



const useAudio = () => {
    const [audioSrc, setAudioSrc] = useState<string>();
    useEffect(() => {
        const sound = new Howl({
            src: ['sound.webm', 'sound.mp3']
        });
    }, [audioSrc])

    // 重置音频
    const resetAudioSrc = (src: string) => {
        setAudioSrc(src);
    }

    // 暂停音频
    const pauseAudio = () => {

    }
    return [{ resetAudioSrc, pauseAudio }]
}

export default useAudio;