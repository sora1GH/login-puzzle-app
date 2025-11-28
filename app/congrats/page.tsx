import Link from 'next/link';

export default function CongratsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-white p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl text-center">
        <h1 className="text-4xl font-bold text-green-700 mb-4">Congratulations!</h1>
        <p className="text-gray-700 mb-6">You completed the challenge. Well done — you proved you're not a robot!</p>

        <div className="flex justify-center gap-3">
          <Link href="/level1" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Return to Level 1</Link>
        </div>
      </div>
    </div>
  );
}
