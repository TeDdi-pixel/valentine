"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic({ src, onClick }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.05);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;

      // Добавляем обработчик завершения трека
      const handleEnded = () => setIsPlaying(false);
      audio.addEventListener("ended", handleEnded);

      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
    setVolume(0.05);
  }, [volume]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch((error) => {
          console.error("Ошибка при воспроизведении:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="position absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <audio ref={audioRef}>
        <source src={src} type="audio/mp3" />
        Ваш браузер не поддерживает элемент <code>audio</code>.
      </audio>
      <button onClick={(togglePlay)}>
        {!isPlaying && (
          <Image width={70} height={70} alt="play-button" src="/play.svg" />
        )}
      </button>
    </div>
  );
}
