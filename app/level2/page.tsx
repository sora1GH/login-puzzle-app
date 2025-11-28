"use client";

import AntiBotGame from '../components/AntiBotGame';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Level2Page() {
  const [showContinue, setShowContinue] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-300 p-6 gap-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800 text-center">
        Level 2: Prove You're Not A Robot
      </h1>

      <div className="w-full max-w-2xl">
        <AntiBotGame requiredClicks={3} timeLimit={15} onPassed={() => setShowContinue(true)} />
      </div>

      {showContinue && (
        <button
          className="w-full max-w-xs px-6 py-3 rounded-full bg-green-600 text-white text-lg font-semibold hover:bg-green-700 transition-colors shadow-md"
          onClick={() => router.push('/congrats')}
        >
          Continue
        </button>
      )}
    </div>
  );
}