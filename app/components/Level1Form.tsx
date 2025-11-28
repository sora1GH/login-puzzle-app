'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Fly from './Fly';
import Spider from './Spider';

export default function Level1Form() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const correctUsername = 'guest';
  const usernameIsCorrect = username === correctUsername;
  const [accessGranted, setAccessGranted] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/level1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    setResult(data.success ? '✅ Access granted!' : '❌ Try again.');
    if (data.success) {
      // trigger spider exit animation and when it finishes show continue
      setAccessGranted(true);
    }
  }

  return (
    <>
      {!usernameIsCorrect && <Fly hint={"What do you call a visitor? A ____. Enter the username, and then visit the spider."} />}

      {usernameIsCorrect && (
        <Spider
          hint={"To figure out the password, say this magical word: 'Open _____!'"}
          exit={accessGranted}
          onExited={() => setShowContinue(true)}
        />
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-sm">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        Username
      </label>
      <input
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        className="mb-4 w-full px-3 py-2 border rounded bg-gray-50 text-gray-800 placeholder-gray-500"
      />

      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="mb-4 w-full px-3 py-2 border rounded bg-gray-50 text-gray-800 placeholder-gray-500"
      />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit
      </button>

      {result && (
        <p
          className={`mt-4 text-lg font-semibold ${
            result.includes('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {result}
        </p>
      )}

      {showContinue && (
        <div className="mt-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => router.push('/level2')}
          >
            Continue
          </button>
        </div>
      )}
      </form>
    </>
  );
}