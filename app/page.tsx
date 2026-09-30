'use client';

import { useEffect, useState } from 'react';
import { SignupForm } from './signup-form';

// ─── Parallax Hook ───
function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * speed);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // set initial position
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offset;
}

// ─── Particle Component ───
type ParticleProps = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
};

const Particle = ({ x, y, size, delay, duration }: ParticleProps) => (
  <div
    className="absolute rounded-full bg-white/20 animate-twinkle"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
);

export default function Battlefield6Landing() {
  const offset = useParallax(0.25);
  const offsetSlow = useParallax(0.12);
  const [copied, setCopied] = useState(false);
  const [particles, setParticles] = useState<ParticleProps[]>([]);

  // Generate particles on client only (avoids SSR hydration mismatch)
  useEffect(() => {
    setParticles(
      Array.from({ length: 60 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 2,
      }))
    );
  }, []);

  const handleCopyCoupon = async () => {
    try {
      await navigator.clipboard.writeText('BF6NEW25');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = 'BF6NEW25';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0a0e17] overflow-x-hidden text-white font-rajdhani">
      {/* ─── Background Layer (slow parallax) ─── */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ transform: `translateY(${offsetSlow}px)` }}
      >
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0d1526] to-[#0a0e17]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 200, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 200, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />

        {/* Particles */}
        {particles.map((p, i) => (
          <Particle key={i} {...p} />
        ))}
      </div>

      {/* ─── Mid Parallax Layer (floating shapes) ─── */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{ transform: `translateY(${offset}px)` }}
      >
        {/* Hexagon outlines */}
        <svg
          className="absolute top-[15%] right-[8%] w-32 h-32 opacity-[0.06] text-cyan-400"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
        </svg>
        <svg
          className="absolute bottom-[25%] left-[5%] w-24 h-24 opacity-[0.06] text-orange-400"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
        </svg>
        <svg
          className="absolute top-[60%] right-[15%] w-16 h-16 opacity-[0.04] text-cyan-400"
          viewBox="0 0 100 100"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5" />
        </svg>

        {/* Floating lines */}
        <div className="absolute top-[30%] left-[10%] w-40 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent rotate-45" />
        <div className="absolute bottom-[40%] right-[10%] w-32 h-[1px] bg-gradient-to-r from-transparent via-orange-400/20 to-transparent -rotate-45" />
      </div>

      {/* ─── Main Content (fast parallax) ─── */}
      <div
        className="relative z-10"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        {/* ═══════════ HERO SECTION ═══════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          {/* Top decorative line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent" />

          {/* BF6 Logo / Title */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6 px-4 py-1.5 border border-cyan-500/40 bg-cyan-500/5 text-cyan-400 text-xs tracking-[0.3em] uppercase font-orbitron">
              Official Reveal
            </div>

            <h1 className="font-orbitron text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">
                BATTLE
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-cyan-300 via-cyan-400 to-blue-600 -mt-2">
                FIELD
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-orange-300 via-orange-400 to-red-500 -mt-2">
                6
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-400 tracking-[0.2em] uppercase font-light">
              The Next Chapter of War
            </p>
          </div>

          {/* ─── Coupon Card ─── */}
          <div className="relative mt-4 mb-10 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-orange-500/20 rounded-lg blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative bg-[#0d1526]/90 backdrop-blur-xl border border-cyan-500/30 rounded-lg px-8 py-6 sm:px-12 sm:py-8 text-center">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />

              <p className="text-xs tracking-[0.4em] uppercase text-cyan-400 mb-2 font-orbitron">
                Limited Time Offer
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-white mb-2">
                25% OFF
              </p>
              <p className="text-sm sm:text-base text-gray-400 mb-5 tracking-wider">
                On All New Releases
              </p>

              <button
                onClick={handleCopyCoupon}
                className="relative inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border border-dashed border-cyan-400/60 rounded text-cyan-300 font-orbitron text-lg sm:text-xl tracking-[0.15em] hover:bg-cyan-500/20 transition-all duration-300 cursor-pointer select-all"
                aria-label="Copy coupon code BF6NEW25"
              >
                <span className="text-gray-500 text-sm">CODE:</span>
                <span className="font-bold">BF6NEW25</span>
                <svg
                  className="w-5 h-5 opacity-60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {copied ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3"
                    />
                  )}
                </svg>
              </button>

              {copied && (
                <p className="mt-3 text-sm text-green-400 animate-pulse font-orbitron tracking-wider">
                  ✓ COPIED TO CLIPBOARD
                </p>
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <button className="group relative px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-orbitron font-bold text-sm tracking-[0.2em] uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,200,255,0.4)]">
              <span className="relative z-10">Pre-Order Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="group px-10 py-4 border border-gray-600 text-gray-300 font-orbitron font-bold text-sm tracking-[0.2em] uppercase hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
              Watch Trailer
            </button>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gray-500 font-orbitron">
              Scroll
            </span>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </section>

        {/* ═══════════ FEATURES SECTION ═══════════ */}
        <section className="relative px-6 py-32 max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-cyan-400 mb-3 font-orbitron">
              Game Features
            </p>
            <h2 className="font-orbitron text-4xl sm:text-5xl font-bold text-white">
              ALL-OUT{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                WARFARE
              </span>
            </h2>
            <div className="mt-6 w-24 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                    />
                  </svg>
                ),
                title: 'Next-Gen Destruction',
                desc: 'Levolution 3.0 — fully dynamic maps that evolve with every explosion, every collapse, every moment.',
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                  </svg>
                ),
                title: '128-Player Battles',
                desc: 'Massive scale combat across land, air, and sea. Coordinate with your squad like never before.',
              },
              {
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                    />
                  </svg>
                ),
                title: 'Advanced Warfare',
                desc: 'Cutting-edge weapons, vehicles, and gadgets. Customize your loadout with the new Battleforge system.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group relative bg-[#0d1526]/60 backdrop-blur-sm border border-white/5 rounded-lg p-8 hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,200,255,0.1)]"
              >
                <div className="text-cyan-400 mb-5 group-hover:text-cyan-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="font-orbitron text-lg font-bold text-white mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ DEAL SECTION ═══════════ */}
        <section className="relative px-6 py-32">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#0d1526] to-[#0a0e17] border border-cyan-500/20 rounded-2xl p-10 sm:p-16 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl" />

              <div className="relative z-10 text-center">
                <p className="text-xs tracking-[0.4em] uppercase text-orange-400 mb-4 font-orbitron">
                  Exclusive Deal
                </p>
                <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                  GET{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                    25% OFF
                  </span>
                </h2>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto text-sm sm:text-base">
                  Pre-order Battlefield 6 today and use your exclusive coupon at
                  checkout. Valid on all new releases. Don&apos;t miss out.
                </p>

                <div className="inline-flex items-center gap-4 px-8 py-4 bg-black/40 border border-dashed border-orange-400/40 rounded-lg mb-8">
                  <span className="text-gray-500 text-sm font-orbitron">
                    USE CODE:
                  </span>
                  <span className="font-orbitron text-xl sm:text-2xl font-bold text-orange-400 tracking-[0.15em]">
                    BF6NEW25
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-orbitron font-bold text-sm tracking-[0.2em] uppercase hover:shadow-[0_0_40px_rgba(255,100,0,0.4)] transition-all duration-300">
                    Claim Deal
                  </button>
                  <button className="px-10 py-4 border border-gray-600 text-gray-300 font-orbitron font-bold text-sm tracking-[0.2em] uppercase hover:border-orange-400 hover:text-orange-400 transition-all duration-300">
                    View Editions
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="relative px-6 py-32">
  <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
    {/* Left side — pitch */}
    <div>
      <p className="text-xs tracking-[0.4em] uppercase text-cyan-400 mb-4 font-orbitron">
        Join the Fight
      </p>
      <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
        GET EARLY{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
          ACCESS
        </span>
      </h2>
      <p className="text-gray-400 mb-8 max-w-lg leading-relaxed">
        Sign up for the Battlefield 6 newsletter and be the first to know when
        the closed beta drops. Plus, get exclusive intel on new maps, weapons,
        and game modes straight to your inbox.
      </p>

      {/* Bullet list */}
      <ul className="space-y-3 mb-2">
        {[
          'Priority access to closed beta',
          'Exclusive in-game rewards',
          'Breaking news before anyone else',
        ].map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 text-sm text-gray-300 font-rajdhani tracking-wide"
          >
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center">
              <svg
                className="w-3 h-3 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>

    {/* Right side — form */}
    <div className="flex justify-center lg:justify-end">
      <SignupForm />
    </div>
  </div>
</section>
        {/* ═══════════ FOOTER ═══════════ */}
        <footer className="relative px-6 py-12 border-t border-white/5">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-orbitron text-sm text-gray-600 tracking-wider">
              BATTLEFIELD 6 — PRE-ORDER NOW
            </p>
            <p className="text-xs text-gray-700">
              © {new Date().getFullYear()} Battlefield. All rights reserved. Not
              an actual product.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}