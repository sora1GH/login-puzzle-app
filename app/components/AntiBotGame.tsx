'use client';

import React, { useEffect, useState } from 'react';
import Spider from './Spider';

type Props = {
  requiredClicks?: number;
  timeLimit?: number; // seconds
  onPassed?: () => void;
};

export default function AntiBotGame({ requiredClicks = 3, timeLimit = 15, onPassed }: Props) {
  const [count, setCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [status, setStatus] = useState<'running' | 'passed' | 'failed'>('running');
  const [spiderKey, setSpiderKey] = useState(() => Date.now());
  const [spiderExit, setSpiderExit] = useState(false);
  const [decoyKey, setDecoyKey] = useState(() => Date.now() + 1);
  const [decoyExit, setDecoyExit] = useState(false);
  const [showSpiders, setShowSpiders] = useState(true);
  const [spawnDelay, setSpawnDelay] = useState<number | undefined>(() => Math.floor(Math.random() * 1800) + 500);

  useEffect(() => {
    if (status !== 'running') return;
    if (timeLeft <= 0) {
      setStatus('failed');
      return;
    }
    const t = window.setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, status]);

  useEffect(() => {
    if (count >= requiredClicks) {
      setStatus('passed');
      if (onPassed) onPassed();
    }
  }, [count, requiredClicks, onPassed]);

  // when the player passes, make spiders climb away then hide them
  useEffect(() => {
    if (status === 'passed') {
      // trigger exit animation
      setSpiderExit(true);
      setDecoyExit(true);
      // hide spiders after animation (match Spider transition 1200ms)
      const t = window.setTimeout(() => setShowSpiders(false), 1200);
      return () => clearTimeout(t);
    }
    // ensure spiders are visible when running or failed (until reset)
    if (status === 'running') setShowSpiders(true);
  }, [status]);

  // When target spider is clicked, trigger its exit animation; onExited will
  // increment the click count and respawn the spiders elsewhere.
  function handleClick() {
    if (status !== 'running') return;
    if (spiderExit) return;
    setSpiderExit(true);
  }

  function handleSpiderExited() {
    if (status !== 'running') return;
    setCount(c => c + 1);
    // respawn both spiders at new random positions after a short delay
    setTimeout(() => {
      setSpawnDelay(Math.floor(Math.random() * 1800) + 500);
      setSpiderKey(Date.now());
      setDecoyKey(Date.now() + 1);
      setSpiderExit(false);
      setDecoyExit(false);
    }, 300);
  }

  // When decoy is clicked, penalize the player and respawn only the decoy.
  function handleDecoyClick() {
    if (status !== 'running') return;
    if (decoyExit) return;
    setDecoyExit(true);
  }

  function handleDecoyExited() {
    if (status !== 'running') return;
    // apply penalty: remove a few seconds (but not below 0)
    setTimeLeft(t => Math.max(0, t - 4));
    // small visual feedback could be added; respawn decoy
    setTimeout(() => {
      setDecoyKey(Date.now() + 1);
      setDecoyExit(false);
    }, 300);
  }

  return (
    <div className="w-full max-w-2xl bg-white shadow rounded p-6 text-center">
      <p className="text-gray-600 mb-4">Click the spider {requiredClicks} times before the timer runs out. Good luck!</p>

      <div className="relative h-10 mb-4">
        {/* spawn target and decoy spiders; keys force remount to randomize pos */}
        {showSpiders && (
          <>
            <Spider key={spiderKey} hint={`Click me ${requiredClicks} times!`} size={64} onClick={handleClick} exit={spiderExit} onExited={handleSpiderExited} emoji={'🕷️'} variant={'normal'} initialDelay={spawnDelay} />
            <Spider key={decoyKey} hint={`Don't click me — I'm the decoy.`} size={64} onClick={handleDecoyClick} exit={decoyExit} onExited={handleDecoyExited} emoji={'🦂'} variant={'decoy'} initialDelay={spawnDelay} />
          </>
        )}
      </div>

      <div className="flex items-center justify-center gap-6">
        <div>
          <div className="text-sm text-gray-500">Clicks</div>
          <div className="text-xl text-gray-500 font-bold">{count} / {requiredClicks}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Time</div>
          <div className={`text-xl font-bold ${timeLeft <= 5 ? 'text-red-600' : 'text-gray-800'}`}>{timeLeft}s</div>
        </div>
      </div>

      <div className="mt-4">
        {status === 'running' && (
          <p className="text-sm text-gray-600">Click the spider quickly — avoid the scorpion (🦂)!</p>
        )}

        {status === 'passed' && (
          <p className="text-green-600 font-semibold">Success! You proved you're not a robot.</p>
        )}

        {status === 'failed' && (
          <div>
            <p className="text-red-600 font-semibold">Time's up — try again.</p>
            <div className="mt-3">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => {
                  // reset state
                  setCount(0);
                  setTimeLeft(timeLimit);
                  setStatus('running');
                  setSpawnDelay(Math.floor(Math.random() * 1800) + 500);
                  setSpiderKey(Date.now());
                  setSpiderExit(false);
                  setDecoyKey(Date.now() + 1);
                  setDecoyExit(false);
                }}
              >
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
