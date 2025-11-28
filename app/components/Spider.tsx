"use client";

import React, { useEffect, useState } from 'react';

type Props = {
  hint: string;
  size?: number;
};

export default function Spider({ hint, size = 28 }: Props) {
  // random x position (vw) and random target top (vh)
  const [x] = useState(() => Math.floor(Math.random() * 80) + 10);
  const [targetTop] = useState(() => Math.floor(Math.random() * 16) + 28); // 28 - 43vh
  const [top, setTop] = useState(-12); // start above viewport
  const [hover, setHover] = useState(false);

  useEffect(() => {
    // random delay before the spider appears/desends
    const delay = Math.floor(Math.random() * 1800) + 500; // 500 - 2300ms
    const t = window.setTimeout(() => setTop(targetTop), delay);
    return () => window.clearTimeout(t);
  }, [targetTop]);

  const wrapperStyle: React.CSSProperties = {
    position: 'fixed',
    left: `${x}vw`,
    top: `${top}vh`,
    transform: 'translate(-50%, 0)',
    transition: 'top 2400ms ease',
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
  };

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

  return (
    <>
      {/* web line from top to spider */}
      <div style={webStyle} aria-hidden />

      <div style={wrapperStyle}>
        <div
          role="button"
          tabIndex={0}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onFocus={() => setHover(true)}
          onBlur={() => setHover(false)}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {hover && <div style={tooltipStyle}>{hint}</div>}
          <span style={spiderStyle} aria-label="spider hint">🕷️</span>
        </div>
      </div>
    </>
  );
}
