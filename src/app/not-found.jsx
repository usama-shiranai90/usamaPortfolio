"use client";

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { motion, useReducedMotion } from 'framer-motion';
import { AlertTriangle, RefreshCcw, Power } from 'lucide-react';

export default function NotFound() {
  const [glitch, setGlitch] = useState(false);
  const [rebooting, setRebooting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Random glitch effect trigger
  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  const handleReboot = () => {
    setRebooting(true);
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] w-full h-full flex items-center justify-center overflow-hidden bg-black text-green-500 font-mono">
      {/* Background Noise Video/Gif replacement or CSS noise */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-repeat animate-pulse z-0"
        style={{ backgroundImage: 'linear-gradient(transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '100% 4px' }}
      />

      {/* CRT Scanline */}
      <div className="absolute inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] opacity-20" style={{ backgroundSize: '100% 2px, 3px 100%' }} />

      <Container className="relative z-10 flex flex-col items-center justify-center w-full max-w-4xl px-4 mx-auto text-center">

        {/* Error Box */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`border-2 border-red-500 p-8 md:p-12 rounded-lg bg-black/80 backdrop-blur-sm relative overflow-hidden transition-all duration-100 ${glitch ? 'translate-x-[2px] skew-x-2' : ''}`}
        >
          {/* Decorative Corner Lines */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500" />

          <div className="flex flex-col items-center text-center space-y-6">
            <motion.div
              animate={{ rotate: glitch ? [0, -10, 10, 0] : 0 }}
              className="text-red-500 mb-2"
            >
              <AlertTriangle size={64} strokeWidth={1.5} />
            </motion.div>

            <div className="space-y-2">
              <h1 className={`text-4xl md:text-6xl font-bold tracking-tighter text-red-500 ${glitch ? 'blur-[1px]' : ''}`}>
                SYSTEM_FAILURE
              </h1>
              <p className="text-xl md:text-2xl text-red-400 font-bold tracking-widest">
                ERROR_CODE: 404
              </p>
            </div>

            <div className="space-y-1 text-sm md:text-base text-red-300/80 font-mono mt-4">
              <p>{`> FATAL EXCEPTION AT 0x0000404`}</p>
              <p>{`> THE REQUESTED URL SEGMENT WAS NOT FOUND IN MEMORY.`}</p>
              <p>{`> PLEASE MANUALLY RESET THE NAVIGATION SUBSYSTEM.`}</p>
            </div>

            <div className="pt-8">
              <button
                onClick={handleReboot}
                className="group relative px-8 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500 rounded text-sm font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
              >
                {rebooting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin"><RefreshCcw size={16} /></span> REBOOTING_SYSTEM...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Power size={16} /> INITIATE_SYSTEM_RESET
                  </span>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Floating Particles/Code (Decor) */}
        {!rebooting && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none -z-10">
            <div className="absolute top-10 left-10 text-red-900/20 font-mono text-xs overflow-hidden">
              01010101010101001010101...
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
