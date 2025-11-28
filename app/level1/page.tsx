import Level1Form from '../components/Level1Form';

export default function Level1Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Level 1: Can You Login?</h1>
      <Level1Form />
    </div>
  );
}