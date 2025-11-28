"use client";

import Link from 'next/link';
import AntiBotGame from '../components/AntiBotGame';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Level2Page() {
  const [showContinue, setShowContinue] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 gap-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Level 2: Prove You're Not A Robot</h1>

      <div className="w-full max-w-2xl">
        <AntiBotGame requiredClicks={3} timeLimit={15} onPassed={() => setShowContinue(true)} />
      </div>

      {showContinue && (
        <div className="mt-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => router.push('/congrats')}
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
