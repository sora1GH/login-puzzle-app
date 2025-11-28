"use client";

import React, { useEffect, useRef, useState } from 'react';

type Props = {
  hint: string;
  size?: number;
};

export default function Fly({ hint, size = 24 }: Props) {
  const [pos, setPos] = useState({ x: 50, y: 20 });
  const [hover, setHover] = useState(false);
  const mounted = useRef(true);
  const moveInterval = useRef<number | null>(null);

  useEffect(() => {
    mounted.current = true;

    function randomPos() {
      // keep inside viewport margins
      const x = Math.floor(Math.random() * 80) + 10; // 10 - 90
      const y = Math.floor(Math.random() * 70) + 5; // 5 - 75
      return { x, y };
    }

    moveInterval.current = window.setInterval(() => {
      if (!mounted.current) return;
      if (hover) return; // pause while hovered
      setPos(randomPos());
    }, 2200);

    return () => {
      mounted.current = false;
      if (moveInterval.current) window.clearInterval(moveInterval.current);
    };
  }, [hover]);

  const style: React.CSSProperties = {
    position: 'fixed',
    left: `${pos.x}vw`,
    top: `${pos.y}vh`,
    transform: 'translate(-50%, -50%)',
    transition: 'left 2.2s linear, top 2.2s linear',
    zIndex: 60,
    cursor: 'pointer',
    pointerEvents: 'auto',
  };

  const emojiStyle: React.CSSProperties = {
    fontSize: size,
    filter: hover ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' : undefined,
    transition: 'transform 0.2s ease, filter 0.2s ease',
  };

  const tooltipStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.8)',
    color: 'white',
    padding: '6px 10px',
    borderRadius: 6,
    fontSize: 13,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
  };

  return (
    <div style={style} aria-hidden={false}>
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
        <span style={emojiStyle} aria-label="flying hint">🪰</span>
      </div>
    </div>
  );
}
