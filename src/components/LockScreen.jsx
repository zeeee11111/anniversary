import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LockScreen({ active, onBack }) {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active || hasAnimated.current || !containerRef.current) return;
    hasAnimated.current = true;

    gsap.fromTo(
      containerRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.8, ease: "power3.out" },
    );
  }, [active]);

  const handleReturn = () => {
    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      x: "100%",
      opacity: 0,
      duration: 0.6,
      ease: "power3.in",
      onComplete: () => {
        if (onBack) onBack();
      },
    });
  };

  // Only one video plays at a time
  const pauseOthers = (e) => {
    containerRef.current
      ?.querySelectorAll("video")
      .forEach((v) => v !== e.target && v.pause());
  };

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-50 overflow-y-auto bg-white flex justify-center px-4 py-8"
    >
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* 1. Header */}
        <p
          className="text-center font-medium text-red-600 mb-4 sm:mb-6"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(0.9rem, 3vw, 1.4rem)",
          }}
        >
          These songs remind me of you (˶˃ ᵕ ˂˶)
        </p>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          {["song-1.mp4", "song-2.mp4", "song-3.mp4", "song-4.mp4"].map((file) => `${import.meta.env.BASE_URL}songs/${file}`).map((video, index) => (
            <video key={video} src={`${video}#t=0.1`} onPlay={pauseOthers} controls playsInline preload="metadata" aria-label={`Song video ${index + 1}`} className="w-full max-h-[65vh] rounded-xl shadow-lg bg-black" />
          ))}
        </div>

        {/* 6. Return button */}
        <button
          onClick={handleReturn}
          className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold border-2 border-red-600 text-red-600 bg-white
                   hover:bg-red-50 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(0.9rem, 3vw, 1.3rem)",
          }}
        >
          Return
        </button>
      </div>
    </div>
  );
}
