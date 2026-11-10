import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
const memories = [
  "IMG_6222.JPG", "IMG_6223.JPG", "IMG_6224.JPG", "IMG_6225.JPG",
  "IMG_6226.JPG", "IMG_6227.JPG", "IMG_6228.JPG", "IMG_6229.JPG",
  "IMG_6232.JPG", "IMG_6233.PNG", "IMG_6234.PNG",
  "83144F96-1AB3-480E-8A36-BC809BA79092.mp4",
  "B27172D7-E06A-477B-B700-8D5A29D3B59C.MP4",
];

export default function MemoriesScreen({ active, onBack }) {
  const containerRef = useRef(null);
  const hasAnimated = useRef(false);

  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 640);

  // Track screen width
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slide‑in from right
  useEffect(() => {
    if (!active || hasAnimated.current) return;
    hasAnimated.current = true;
    gsap.fromTo(
      containerRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.8, ease: "power3.out" },
    );
  }, [active]);

  // Floating hearts
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    const hearts = ["❤️", "💕", "💗", "💖", "💘", "💝"];
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("span");
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.className = "absolute text-2xl sm:text-3xl pointer-events-none";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.top = Math.random() * 100 + "%";
      heart.style.opacity = 0;
      container.appendChild(heart);

      gsap.fromTo(
        heart,
        { y: 0, opacity: 0, scale: 0.5 },
        {
          y: -(50 + Math.random() * 100),
          opacity: 1,
          scale: 1 + Math.random(),
          duration: 2 + Math.random() * 3,
          ease: "power1.out",
          delay: Math.random() * 1.5,
          onComplete: () => heart.remove(),
        },
      );
    }
  }, [active]);

  const handleReturn = () => {
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
      className="absolute inset-0 z-50 overflow-y-auto"
      style={{ backgroundColor: "#f8f2e9" }}
    >
      {/* 1. Header */}
      <div
        className="w-full flex flex-col items-center justify-center"
        style={{
          height: isDesktop ? "15vh" : "20vh",
          backgroundColor: "transparent",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: "#B22222",
            fontSize: "clamp(2rem, 7vw, 3.5rem)",
            textAlign: "center",
            margin: 0,
            textShadow: "0 2px 4px rgba(178,34,34,0.1)",
          }}
        >
          Our little universe <span aria-hidden="true">♡</span>
        </h1>
        <p className="memory-subtitle">10 months, a million little moments</p>
        <div
          style={{
            width: "80px",
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, #D4A574, #D4A574, transparent)",
            marginTop: "0.5rem",
            boxShadow: "0 0 10px rgba(212,165,116,0.3)",
          }}
        />
      </div>


      <div className="scrapbook-intro"><span>the potato archives</span><span>VOL. 01 &nbsp; ✦ &nbsp; OUR STORY</span></div>
      <div className="memory-gallery" aria-label="Our photo and video collage">
        {memories.map((file, index) => (
          <div className={`memory-card memory-card-${index + 1}`} key={file}>
            <span className="memory-number">{String(index + 1).padStart(2, "0")}</span>
            {/\.(mov|mp4)$/i.test(file) ? (
              <video src={`${import.meta.env.BASE_URL}memories/${file}#t=0.1`} onPlay={pauseOthers} controls playsInline preload="metadata" aria-label={`Memory ${index + 1}`} />
            ) : (
              <img src={`${import.meta.env.BASE_URL}memories/${file}`} alt={`Memory ${index + 1}`} loading="lazy" />
            )}

          </div>
        ))}
      </div>

      {/* 3. Return button */}
      <div
        className="w-full flex flex-col items-center justify-center py-6"
        style={{ backgroundColor: "transparent" }}
      >
        <button
          onClick={handleReturn}
          className="px-8 py-3 rounded-full font-semibold bg-red-500 text-white shadow-lg transform transition-all duration-300 hover:bg-red-600 hover:scale-105 active:scale-95"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(1rem, 4vw, 1.3rem)",
            boxShadow: "0 4px 15px rgba(255,0,0,0.3)",
          }}
        >
          Return
        </button>
      </div>

      <style>{`
        .memory-subtitle { margin: 5px 0 0; color: #997765; font-family: Georgia, serif; font-style: italic; font-size: 1rem; }
        .scrapbook-intro { display: flex; justify-content: space-between; max-width: 1100px; margin: 22px auto 0; padding: 0 8px 12px; color: #9d574a; font: 700 10px/1.2 Montserrat, sans-serif; letter-spacing: .17em; text-transform: uppercase; }
        .memory-gallery { display: grid; grid-template-columns: repeat(12, minmax(0,1fr)); grid-auto-flow: dense; gap: 30px 22px; max-width: 1100px; margin: 0 auto; padding: 55px 45px 65px; background: #f1e5d6; background-image: radial-gradient(#c9ad95 0.7px, transparent 0.7px); background-size: 19px 19px; border: 1px solid #dec7b2; box-shadow: 0 14px 40px rgba(91,58,41,.12); }
        .memory-card { position: relative; grid-column: span 4; align-self: start; padding: 9px 9px 12px; background: #fffdf8; box-shadow: 0 5px 17px rgba(79,49,35,.18); transform: rotate(-2deg); }
        .memory-card:nth-child(3n+2) { transform: rotate(2deg); margin-top: 24px; }
        .memory-card:nth-child(4n) { transform: rotate(-1deg); }
        .memory-card::before { content: ""; position: absolute; z-index: 2; left: 37%; top: -12px; width: 26%; height: 24px; background: rgba(232, 181, 160, .68); transform: rotate(-5deg); pointer-events: none; }
        .memory-card-1, .memory-card-6, .memory-card-10 { grid-column: span 6; }
        .memory-card-3, .memory-card-8 { margin-top: 42px; }
        .memory-card img, .memory-card video { display: block; width: 100%; height: 100%; max-height: 380px; min-height: 210px; aspect-ratio: 4 / 5; object-fit: contain; background: #eee5dc; }
        .memory-card video { background: #30231e; }
        .memory-caption { display: block; padding: 10px 4px 0; color: #9d574a; font: italic 16px Georgia, serif; text-align: center; }
        .memory-number { position: absolute; right: -10px; top: 20px; z-index: 2; padding: 5px 7px; background: #a95249; color: #fffaf3; font: 700 10px Montserrat, sans-serif; letter-spacing: .1em; }
        @media (max-width: 640px) {
          .scrapbook-intro { margin: 16px 16px 0; font-size: 8px; }
          .memory-gallery { grid-template-columns: repeat(2, minmax(0,1fr)); grid-auto-flow: row; gap: 24px 14px; margin: 0 12px; padding: 35px 19px 45px; }
          .memory-card, .memory-card-1, .memory-card-6, .memory-card-10 { grid-column: span 1; padding: 6px 6px 10px; }
          .memory-card-1, .memory-card-6, .memory-card-10 { grid-column: span 2; }
          .memory-card:nth-child(3n+2), .memory-card-3, .memory-card-8 { margin-top: 0; }
          .memory-card img, .memory-card video { min-height: 0; height: auto; max-height: 70vh; aspect-ratio: auto; object-fit: cover; }
          .memory-number { right: -6px; }
          .memory-caption { font-size: 13px; }
        }
      `}</style>
    </div>
  );
}
