import Level1Form from '../components/Level1Form';

export default function Level1Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-indigo-300 p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-indigo-800 text-center">
        Level 1: Can You Log In?
      </h1>
      <Level1Form />
    </div>
  );
}