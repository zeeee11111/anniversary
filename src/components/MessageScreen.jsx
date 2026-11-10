import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function MessageScreen({ active, onBack }) {
  const containerRef = useRef(null);
  const heartContainerRef = useRef(null);
  const hasAnimated = useRef(false);

  // Slide in/out animations (unchanged)
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

  // Hearts creation (unchanged)
  const createHearts = () => {
    if (!heartContainerRef.current) return;
    const hearts = ["❤️", "💕", "💘", "🥰", "💗", "💓", "💞"];
    for (let i = 0; i < 12; i++) {
      const heart = document.createElement("span");
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.className = "heart-float text-3xl sm:text-4xl";
      heart.style.left = Math.random() * 80 + 10 + "%";
      heart.style.bottom = "60px";
      heart.style.animationDelay = Math.random() * 0.6 + "s";
      heartContainerRef.current.appendChild(heart);
      setTimeout(() => heart.remove(), 4200);
    }
  };

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-50 overflow-y-auto"
      style={{
        background: "linear-gradient(to bottom, #fafaf9, #fffbeb, #fafaf9)",
        fontFamily: "'Cormorant Garamond', serif",
      }}
    >
      <style>{`
        .font-display { font-family: 'Playfair Display', serif; letter-spacing: 0.02em; }
        .font-body { font-family: 'Cormorant Garamond', serif; }
        
        @keyframes fadeUpDelayed { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes glowPulse { 0%, 100% { opacity: 0.35; filter: blur(60px); } 50% { opacity: 0.65; filter: blur(70px); } }
        @keyframes floatHeart { 0% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; } 100% { transform: translateY(-140px) scale(0.3) rotate(360deg); opacity: 0; } }
        @keyframes shimmer { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .animate-fade-up { animation: fadeUpDelayed 1s ease-out forwards; opacity: 0; }
        .delay-1 { animation-delay: 0.3s; }
        .delay-2 { animation-delay: 0.6s; }
        .delay-3 { animation-delay: 0.9s; }
        .delay-4 { animation-delay: 1.2s; }
        .delay-5 { animation-delay: 1.5s; }
        .delay-6 { animation-delay: 1.8s; }
        .delay-7 { animation-delay: 2.1s; }
        
        .glow-orb { animation: glowPulse 6s ease-in-out infinite; }
        .heart-float { animation: floatHeart 4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; position: absolute; pointer-events: none; }
        
        .section-divider { 
          width: 80px; 
          height: 2px; 
          background: linear-gradient(90deg, transparent, #d4a574, #d4a574, transparent);
          box-shadow: 0 0 20px rgba(212, 165, 116, 0.3);
        }
        
        .letter-section { 
          border-left: 3px solid #d4a574;
          padding-left: 1.5rem;
          position: relative;
        }
        
        .letter-section::before {
          content: '';
          position: absolute;
          left: -7px;
          top: 0;
          width: 11px;
          height: 11px;
          background: #d4a574;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(212, 165, 116, 0.5);
        }
        
        .quote-box {
          border: 2px solid #d4a574;
          border-radius: 0;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(255,251,235,0.5) 0%, rgba(255,245,230,0.3) 100%);
          position: relative;
          box-shadow: inset 0 0 30px rgba(212, 165, 116, 0.1);
        }
        
        .quote-box::before {
          content: '"';
          position: absolute;
          top: -10px;
          left: 20px;
          font-size: 3rem;
          color: #d4a574;
          opacity: 0.3;
          font-family: 'Playfair Display', serif;
        }
        
        .section-title {
          position: relative;
          display: inline-block;
          padding-bottom: 0.5rem;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40%;
          height: 2px;
          background: linear-gradient(90deg, #d4a574, transparent);
        }
        
        .romantic-glow {
          text-shadow: 0 0 40px rgba(212, 165, 116, 0.3), 0 0 20px rgba(217, 119, 6, 0.1);
        }
        
        .love-button {
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .love-button:hover {
          transform: scale(1.05);
          letter-spacing: 0.15em;
        }
        
        .love-button::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(212, 165, 116, 0.1);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .love-button:active::after {
          width: 300px;
          height: 300px;
        }

        .hero-accent {
          animation: slideInLeft 1s ease-out 0.7s forwards;
          opacity: 0;
        }

        /* New consistent return button */
        .return-btn {
          border-color: #d4a574;
          color: #5b3a29;
          background-color: transparent;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(0.9rem, 2.5vw, 1.1rem);
          letter-spacing: 0.05em;
        }
      `}</style>

      {/* Ambient glow orbs (unchanged) */}
      <div className="fixed top-10 left-5 w-80 h-80 rounded-full bg-amber-200 blur-3xl glow-orb opacity-25 pointer-events-none"></div>
      <div
        className="fixed top-1/3 right-0 w-96 h-96 rounded-full bg-rose-100 blur-3xl glow-orb opacity-20 pointer-events-none"
        style={{ animationDelay: "2.5s" }}
      ></div>
      <div
        className="fixed bottom-10 left-1/4 w-72 h-72 rounded-full bg-amber-100 blur-3xl glow-orb opacity-15 pointer-events-none"
        style={{ animationDelay: "1s" }}
      ></div>

      <header className="w-full px-4 sm:px-6 pt-16 sm:pt-24 pb-10 flex flex-col items-center text-center relative z-10">
        <p className="font-body text-amber-700 text-base sm:text-lg tracking-widest uppercase">To My Dearest Potato ❤️</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-stone-800 leading-tight romantic-glow mt-8 max-w-4xl">Happy 10th month Anniversary jaanu my bubu my cute potatoooo 😭❤️🫂</h1>
        <div className="section-divider mt-10"></div>
      </header>
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-24 relative z-10">
        <section className="letter-section font-body text-stone-700 text-lg sm:text-xl md:text-2xl leading-relaxed lg:leading-loose whitespace-pre-line">
          {`Idk kaha se start karu it’s like I have sooo much to say but words hi nahi milre 😭 I loveeeee you sooo much potato ❤️ and I genuinely mean it when I say you’re one of the most beautiful things that ever happened to me

It’s like jab bhi I think about us na I just smile like an idiot 😭❤️ thank you sooo much baby for always being there for me for doing sooo many things for me jo shayad mai kabhi bhool bhi nahi sakta all the vc videos like being there for me when im not okay and making sure till i feel im okay I know ap mere liye kitne risks liye even after getting caught at home and going through so much you still u didn’t leave me 😭❤️ and baby I don’t think I can ever explain how much that means to me

And potatoooo do you remember our first kiss 😭😭❤️ theater ki stairs ke pas I swear that moment was sooo beautiful it’s like whenever I remember it na aankhon mein aansu aa jare ❤️ I wish I could go back to that exact moment just once and experience everything again the way you were there so close to me and everything around us just felt like it stopped for a second 😭❤️

~ Tum chaand si haseen, Sitaron si roshan lagti ho..

Masoomiyat mein bhi ek, Ada-e-khaas lagti ho..

Sheesha kya samjhe,

Tumhari khubsurti ka raaz..

Meri aankhon se pucho

Tum kitni lajawab lagti ho

Baby I also wanna say sorry I’m sorry for all the times I couldn’t fulfil your expectations for the times I didn’t give you enough time and for the times I made you feel like you weren’t my priority 😭 it’s like you do sooo much for me and sometimes I feel I haven’t done even half of what you deserve and I know just saying sorry isn’t enough baby I really wanna become better for you and show it through my actions not just words 🫂❤️ because you deserve sooo much love care attention and happiness

There’s this Asqhique 2 dialogue u remind me of

Yeh zindagi chal toh rahi thi ... par tere aane se maine jeena shuru kiya

And baby there’s a Japanese lines from so long I wanted to tell you

何度生まれ変わっても、君を選ぶ ❤️

Nando umarekawattemo kimi wo erabu

“Even if I were born a thousand times, I'd still choose you.”

君は僕の宝物だよ 💗

Kimi wa boku no takaramono da yo

“You are my treasure.”

君と出会えてよかった 🫂

Kimi to deaete yokatta

“I'm so glad I met you.”

And it’s like baby even if I don’t say I love you every single second I hope you always know how much I love you and how special you are to me

Ishq par zor nahin hai ye woh aatish Ghalib

Ke lagaaye na lage aur bujhaaye na bane ❤️

I don’t know what our future holds potato but I know one thing for sure I wanna experience soooo many more beautiful moments with you ❤️ more dates more random conversations more hugs more kisses and more memories that we’ll look back at and smile like idiots 😭❤️

I love you sooo sooo sooo much meri jaanu meri bubu meri cutest little potatooooo ❤️🫂

Thank you for choosing me even on the difficult days

Thank you for not giving up on us

And thank you for being there always baby ❤️

Happy 10Th Month Anniversary my potatoooo 😭❤️`}
        </section>
        {/* Footer with hearts (unchanged) */}
        <footer
          className="text-center py-16 sm:py-20 md:py-24 relative"
          ref={heartContainerRef}
        >
          <p className="font-display text-4xl sm:text-5xl md:text-6xl text-amber-800 romantic-glow">
            Forever your idiot 🫂❤️
          </p>
          <button
            onClick={createHearts}
            className="love-button mt-8 sm:mt-10 font-body text-stone-500 text-xs sm:text-sm tracking-widest uppercase hover:text-amber-700 transition-colors cursor-pointer px-6 py-2 rounded-full border border-stone-300 hover:border-amber-700"
          >
            ✨ tap for love ♡ ✨
          </button>
        </footer>

        {/* Elegant Return button (new) */}
        <div className="text-center pb-12">
          <button
            onClick={handleReturn}
            className="px-8 py-3 rounded-full font-semibold border-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-md return-btn"
          >
            Return
          </button>
        </div>
      </main>
    </div>
  );
}
