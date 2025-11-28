"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CongratsPage() {
  const characters = ["🪰", "🕷️", "🦂"];
  const [positions, setPositions] = useState(
    characters.map(() => ({ top: "50%", left: "50%" }))
  );
  const [visible, setVisible] = useState(false);

  // Helper: generate random positions but avoid the center area
  function randomPosition() {
    const top = Math.floor(Math.random() * 80) + 10;
    const left = Math.floor(Math.random() * 80) + 10;

    if (top > 30 && top < 70 && left > 30 && left < 70) {
      return {
        top: `${top < 50 ? 20 : 80}%`,
        left: `${left < 50 ? 20 : 80}%`,
      };
    }
    return { top: `${top}%`, left: `${left}%` };
  }

  useEffect(() => {
    // First randomization after mount
    setTimeout(() => {
      setPositions(characters.map(() => randomPosition()));
      setVisible(true); // fade them in after first randomization
    }, 500);

    // Keep updating positions every 3s
    const interval = setInterval(() => {
      setPositions(characters.map(() => randomPosition()));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-300 p-6 font-sans relative overflow-hidden">
      {/* Random background characters */}
      {characters.map((char, i) => (
        <div
          key={i}
          className={`absolute text-4xl transition-all duration-700 ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ top: positions[i].top, left: positions[i].left }}
        >
          {char}
        </div>
      ))}

      <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl text-center relative z-10">
        <h1 className="text-4xl font-bold text-green-700 mb-4 flex items-center justify-center gap-2">
          🎉 Congratulations! 🎉
        </h1>
        <p className="text-gray-700 mb-6">
          You completed the challenge. Well done — you proved you're not a robot!
        </p>

        <p className="text-2xl mb-6">🪰 🕷️ 🦂</p>

        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-3 rounded-full bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
          >
            Play Again
          </Link>
        </div>
      </div>
    </div>
  );
}