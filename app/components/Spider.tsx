"use client";

import React, { useEffect, useState, useRef } from 'react';

type Props = {
  hint: string;
  size?: number;
  exit?: boolean;
  onExited?: () => void;
  onClick?: () => void;
  emoji?: string;
  variant?: 'normal' | 'decoy';
  initialDelay?: number;
};

export default function Spider({ hint, size = 28, exit = false, onExited, onClick, emoji = '🕷️', variant = 'normal', initialDelay }: Props) {
  // position state will be initialized on the client only to avoid
  // hydration mismatches (Math.random / Date.now in render causes mismatch).
  const [mounted, setMounted] = useState(false);
  const [x, setX] = useState<number | null>(null);
  const [targetTop, setTargetTop] = useState<number | null>(null); // 28 - 43vh later
  const [top, setTop] = useState(-12); // start above viewport
  const [hover, setHover] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const exitedRef = useRef(false);

  // initialize random positions only on the client after mount
  useEffect(() => {
    setMounted(true);
    const randX = Math.floor(Math.random() * 80) + 10;
    const randTop = Math.floor(Math.random() * 16) + 28; // 28 - 43vh
    setX(randX);
    setTargetTop(randTop);
  }, []);

  useEffect(() => {
    if (targetTop === null) return;
    // random delay before the spider appears/descends. If `initialDelay` is
    // provided we use that so multiple spiders can synchronize their arrival.
    const delay = typeof initialDelay === 'number' ? initialDelay : Math.floor(Math.random() * 1800) + 500; // 500 - 2300ms
    const t = window.setTimeout(() => setTop(targetTop), delay);
    return () => window.clearTimeout(t);
  }, [targetTop, initialDelay]);

  // When parent requests exit, move spider up out of view
  useEffect(() => {
    if (exit) {
      // move above the viewport
      setTop(-20);
    }
  }, [exit]);

  // listen for transitionend to notify parent when the spider has exited
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    function onTransition(e: TransitionEvent) {
      if (e.propertyName !== 'top') return;
      if (top < 0 && !exitedRef.current) {
        exitedRef.current = true;
        if (onExited) onExited();
      }
    }

    el.addEventListener('transitionend', onTransition as any);
    return () => el.removeEventListener('transitionend', onTransition as any);
  }, [top, onExited]);

  const wrapperStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${x}vw`,
    top: `${top}vh`,
    transform: 'translate(-50%, 0)',
    transition: 'top 1200ms ease',
    zIndex: 70,
    pointerEvents: 'auto',
  };

  const spiderStyle: React.CSSProperties = {
    fontSize: size,
    display: 'inline-block',
    background: hover ? 'rgba(255,255,255,0.95)' : 'transparent',
    padding: hover ? '4px 6px' : undefined,
    borderRadius: 6,
    transition: 'background 0.15s ease, padding 0.15s ease',
    cursor: onClick ? 'pointer' : 'default',
  };

  // make decoy stand out visually
  if (variant === 'decoy') {
    spiderStyle.background = hover ? 'rgba(255,230,230,0.95)' : 'rgba(255,245,245,0.9)';
    spiderStyle.border = '1px solid rgba(255,200,200,0.9)';
    // rotate decoy slightly so it looks different
    spiderStyle.transform = 'rotate(10deg)';
  }

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.85)',
    color: 'white',
    padding: '6px 10px',
    borderRadius: 6,
    fontSize: 13,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  };

  const webStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${x}vw`,
    top: 0,
    width: 1,
    height: `${Math.max(0, top)}vh`,
    background: 'linear-gradient(180deg,#ddd,#bbb)',
    transform: 'translateX(-50%)',
    zIndex: 65,
    pointerEvents: 'none',
  } as React.CSSProperties;
  // avoid rendering anything until we've mounted and initialized positions
  if (!mounted || x === null || targetTop === null) return null;

  return (
    <>
      {/* web line from top to spider */}
      <div style={webStyle} aria-hidden />

      <div style={wrapperStyle} ref={wrapperRef}>
        <div
          role="button"
          tabIndex={0}
          onClick={() => onClick && onClick()}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {hover && <div style={tooltipStyle}>{hint}</div>}
          <span style={spiderStyle} aria-label="spider hint">{emoji}</span>
        </div>
      </div>
    </>
  );
}
