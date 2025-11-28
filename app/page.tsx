"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-300 font-sans">
      <main className="flex flex-col items-center gap-8 p-12 bg-white rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold text-indigo-800 text-center">
          Welcome to the Login Puzzle
        </h1>
        <p className="text-lg text-gray-700 max-w-md text-center">
          Meet your puzzle companions: <span className="text-2xl">🪰 🕷️ 🦂</span>
        </p>
        <p className="text-md text-gray-600 max-w-md text-center">
          Test your skills in this interactive challenge. Click below to begin Level 1!
        </p>
        <button
          onClick={() => router.push("/level1")}
          className="px-8 py-3 rounded-full bg-indigo-600 text-white text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md"
        >
          Begin
        </button>
      </main>
    </div>
  );
}