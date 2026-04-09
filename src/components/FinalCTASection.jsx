import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

/* ───────────────────────────────────────────────────────
   NOISE TEXTURE — lightweight SVG noise for surface depth
   ─────────────────────────────────────────────────────── */
const NoiseTexture = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-overlay" aria-hidden="true">
    <filter id="cta-noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
    <rect width="100%" height="100%" filter="url(#cta-noise)" />
  </svg>
);

/* ───────────────────────────────────────────────────────
   FLOATING ORB — organic ambient light sphere
   ─────────────────────────────────────────────────────── */
const FloatingOrb = ({ size, color, blur, x, y, delay = 0, duration = 12 }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: color,
      filter: `blur(${blur})`,
    }}
    animate={{
      y: [0, -20, 10, -15, 0],
      x: [0, 12, -8, 5, 0],
      scale: [1, 1.08, 0.95, 1.04, 1],
      opacity: [0.6, 0.8, 0.55, 0.75, 0.6],
    }}
    transition={{
      duration,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    }}
  />
);

/* ───────────────────────────────────────────────────────
   GLASS CARD — The central frosted-glass surface
   ─────────────────────────────────────────────────────── */
const GlassCard = ({ children, mouseX, mouseY }) => {
  const rotateX = useTransform(mouseY, [-300, 300], [2, -2]);
  const rotateY = useTransform(mouseX, [-400, 400], [-2, 2]);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 25 });

  return (
    <motion.div
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1200,
      }}
      className="relative w-full max-w-2xl mx-auto"
    >
      {/* Outer glow — very soft halo behind the glass */}
      <div
        className="absolute -inset-8 rounded-[3rem] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.12) 0%, rgba(236,72,153,0.06) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* Glass surface */}
      <div className="relative rounded-[2rem] border border-white/[0.08] overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(40px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(40px) saturate(1.2)',
          boxShadow: `
            0 0 0 1px rgba(255,255,255,0.04),
            0 24px 80px -12px rgba(0,0,0,0.6),
            0 8px 32px -8px rgba(0,0,0,0.4),
            inset 0 1px 0 rgba(255,255,255,0.06)
          `,
        }}
      >
        {/* Top highlight line */}
        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Inner content */}
        <div className="relative z-10 px-10 py-14 sm:px-14 sm:py-16 md:px-16 md:py-20">
          {children}
        </div>

        {/* Inner noise for glass texture */}
        <NoiseTexture />
      </div>
    </motion.div>
  );
};

/* ───────────────────────────────────────────────────────
   CTA BUTTON — Refined, breathing, premium
   ─────────────────────────────────────────────────────── */
const CTAButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group inline-flex flex-col items-center gap-4">
      {/* Button glow — breathing idle, stronger on hover */}
      <motion.div
        animate={isHovered ? { opacity: 0.65, scale: 1.15 } : { opacity: [0.2, 0.35, 0.2], scale: [0.98, 1.04, 0.98] }}
        transition={isHovered ? { duration: 0.4 } : { duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-4 rounded-2xl pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(168,85,247,0.35) 0%, rgba(236,72,153,0.2) 40%, transparent 70%)',
          filter: 'blur(24px)',
        }}
      />

      <button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-[0.95rem] overflow-hidden transition-all duration-500 ease-out z-10 cursor-pointer"
        style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.85) 0%, rgba(236,72,153,0.75) 50%, rgba(251,146,60,0.65) 100%)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: isHovered
            ? '0 8px 40px rgba(168,85,247,0.3), 0 2px 12px rgba(236,72,153,0.2), inset 0 1px 0 rgba(255,255,255,0.15)'
            : '0 4px 24px rgba(168,85,247,0.12), 0 1px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
          transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Shimmer pass */}
        <motion.div
          animate={{ x: ['-300%', '500%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 5 }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          <div className="w-[20%] h-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </motion.div>

        <span className="relative z-30 tracking-[0.02em]">Создать карусель</span>
        <ArrowRight className="relative z-30 w-[18px] h-[18px] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-400" />
      </button>

      {/* Trust line */}
      <p className="text-[12px] text-zinc-500 font-medium tracking-[0.06em] uppercase">
        Бесплатно • Без привязки карты
      </p>
    </div>
  );
};

/* ───────────────────────────────────────────────────────
   GRID BACKDROP — subtle architectural depth layer
   ─────────────────────────────────────────────────────── */
const GridBackdrop = () => (
  <div
    className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
      `,
      backgroundSize: '64px 64px',
      WebkitMaskImage: 'radial-gradient(ellipse 55% 45% at 50% 50%, black 0%, transparent 75%)',
      maskImage: 'radial-gradient(ellipse 55% 45% at 50% 50%, black 0%, transparent 75%)',
    }}
  />
);

/* ───────────────────────────────────────────────────────
   MAIN SECTION — FinalCTASection
   ─────────────────────────────────────────────────────── */
export const FinalCTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set(e.clientX - cx);
    mouseY.set(e.clientY - cy);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-[#030303] isolate"
    >
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] py-32 md:py-44 px-6">

        {/* ─── LAYER 0: Deep background gradient ─── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(10,8,20,1) 0%, rgba(3,3,3,1) 100%)',
          }}
        />

        {/* ─── LAYER 1: Grid pattern ─── */}
        <GridBackdrop />

        {/* ─── LAYER 2: Floating orbs — organic depth ─── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Primary — upper-left: cool purple */}
          <FloatingOrb
            size="340px" color="radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.03) 60%, transparent 80%)"
            blur="80px" x="-5%" y="15%" delay={0} duration={14}
          />
          {/* Secondary — lower-right: warm rose */}
          <FloatingOrb
            size="280px" color="radial-gradient(circle, rgba(236,72,153,0.12) 0%, rgba(236,72,153,0.02) 60%, transparent 80%)"
            blur="70px" x="70%" y="55%" delay={2} duration={16}
          />
          {/* Tertiary — upper-right: soft indigo */}
          <FloatingOrb
            size="200px" color="radial-gradient(circle, rgba(99,102,241,0.1) 0%, rgba(99,102,241,0.02) 60%, transparent 80%)"
            blur="60px" x="75%" y="5%" delay={4} duration={18}
          />
          {/* Accent — center-bottom: amber warmth */}
          <FloatingOrb
            size="160px" color="radial-gradient(circle, rgba(251,146,60,0.08) 0%, rgba(251,146,60,0.01) 60%, transparent 80%)"
            blur="50px" x="40%" y="70%" delay={1} duration={20}
          />
        </div>

        {/* ─── LAYER 3: Central light pool — emanates from the card ─── */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none">
          <motion.div
            animate={{ opacity: [0.4, 0.6, 0.4], scale: [0.97, 1.03, 0.97] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.06) 0%, rgba(168,85,247,0.03) 40%, transparent 70%)',
            }}
          />
        </div>

        {/* ─── LAYER 4: Noise texture over everything ─── */}
        <NoiseTexture />

        {/* ─── CONTENT ─── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-20 w-full"
        >
          <GlassCard mouseX={mouseX} mouseY={mouseY}>
            <div className="flex flex-col items-center text-center">

              {/* ── Headline ── */}
              <h2 className="text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-white tracking-[-0.03em] leading-[1.2] mb-5">
                <span className="block">Хватит работать нянькой</span>
                <span className="block">у своего{' '}
                  <span className="text-gradient-brand">AI.</span>
                </span>
                <span className="block mt-1 text-zinc-400 font-semibold text-[0.85em]">
                  Начните создавать.
                </span>
              </h2>

              {/* ── Thin separator ── */}
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mb-6" />

              {/* ── Subheadline ── */}
              <p className="text-[0.85rem] md:text-[0.95rem] text-zinc-500 max-w-md leading-[1.7] font-medium mb-10 text-balance">
                Присоединяйтесь к тысячам креаторов и предпринимателей,
                которые уже делают контент быстрее и без лишней рутины.
              </p>

              {/* ── CTA Button ── */}
              <CTAButton />
            </div>
          </GlassCard>
        </motion.div>


      </div>
    </section>
  );
};
