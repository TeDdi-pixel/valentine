"use client";
import { useState, useEffect, useRef } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";
import { images } from "./config";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [showText, setShowText] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (started) {
      setTimeout(() => {
        images.forEach((_, index) => {
          setTimeout(() => {
            setVisibleImages((prev) => [...prev, index]);
            if (index === images.length - 1) {
              setTimeout(() => setShowText(true), 2000); // Показываем текст после всех сердец
            }
          }, index * 2700);
        });
      }, 2000); // Задержка перед первым появлением

      // Запуск музыки с громкостью 0.05
      if (audioRef.current) {
        audioRef.current.volume = 0.05;
        audioRef.current.play().catch((error) => {
          console.error("Ошибка при воспроизведении:", error);
        });
      }
    }
  }, [started]);

  return (
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col items-center z-20">
        {!started && (
          <button
            onClick={() => setStarted(true)}
            className="mb-6 w-[80px] h-[80px] bg-red-500 rounded-full text-white font-semibold shadow-lg hover:bg-red-600 transition flex items-center justify-center relative"
            style={{
              clipPath:
                "polygon(50% 0%, 0% 38%, 0% 100%, 50% 81%, 100% 100%, 100% 38%, 50% 0%)", // Формируем сердце
              zIndex: 30,
              transform: "rotate(180deg)", // Переворачиваем кнопку
            }}
          ></button>
        )}

        {/* Аудио-плеер */}
        <audio ref={audioRef} src="/angry_silly.mp3" preload="auto" />

        <div className="flex flex-wrap justify-center gap-4 max-w-[516px] relative">
          {images.map((image, index) => (
            <m.div
              className="heart-container w-[250px] h-[250px] relative overflow-hidden drop-shadow-lg"
              key={image.id}
              {...image.animation}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: visibleImages.includes(index) && !showText ? 1 : 0, // Затемняем при показе текста
                scale: visibleImages.includes(index) ? 1 : 0.5,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={500}
                className={`object-cover w-full h-full ${
                  image.id === 3 ? "scale-150" : ""
                }`}
              />
            </m.div>
          ))}

          {/* Текст внутри того же контейнера */}
          {showText && (
            <m.div
              className="absolute text-3xl font-bold text-red-600 drop-shadow-lg top-1/2 transform -translate-x-1/2 -translate-y-1/2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ zIndex: 10 }} // Чтобы текст был поверх сердец
            >
              С Валентином тебя! ❤️
            </m.div>
          )}
        </div>
      </div>
    </LazyMotion>
  );
}
