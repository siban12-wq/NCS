import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

interface LoaderProps {
  onFinish?: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const { progress } = useProgress();
  const [loaded, setLoaded] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    // Smooth progress interpolation
    const timer = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < progress) return Math.min(100, prev + 5);
        return prev;
      });
    }, 40);

    // Timeout safety: dismiss loader after at most 3.2s
    const timeout = setTimeout(() => {
      setLoaded(true);
      onFinish?.();
    }, 3200);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [progress, onFinish]);

  useEffect(() => {
    if (progress >= 100) {
      const finishTimer = setTimeout(() => {
        setLoaded(true);
        onFinish?.();
      }, 400);
      return () => clearTimeout(finishTimer);
    }
  }, [progress, onFinish]);

  if (loaded) return null;

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(displayProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#EBF4FC] dark:bg-indigo-900 transition-opacity duration-700 pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-6 max-w-sm px-6 text-center">
        {/* Animated symbol with official NCS logo */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-royal/30 dark:border-teal/40 animate-ping opacity-60" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-royal via-teal to-blue-300 opacity-20 animate-pulse blur-md" />
          <img
            src="/brand/logo.png"
            alt="TEAM NCS Logo"
            className="relative w-14 h-14 object-contain drop-shadow animate-pulse"
          />
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-paper tracking-wide">
            TEAM NCS
          </h2>
          <p className="text-xs text-lavender mt-1">
            United we stand, divided we fall · The Confluence
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-teal via-lavender to-peach h-full transition-all duration-200 rounded-full"
            style={{ width: `${Math.max(10, displayProgress)}%` }}
          />
        </div>

        <button
          onClick={() => {
            setLoaded(true);
            onFinish?.();
          }}
          className="text-xs text-lavender/60 hover:text-paper underline tracking-wider pt-2 focus:outline-none"
        >
          Skip into campus →
        </button>
      </div>
    </div>
  );
};
