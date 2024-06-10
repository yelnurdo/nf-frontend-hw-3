import Link from 'next/link';

export default function Header() {
  return (
    <nav className="p-4 bg-white shadow-md flex justify-between items-center">
      <Link href="/" className="text-2xl font-serif font-bold text-black">Medium Alike</Link>
      <div className="flex space-x-4">
        <Link href="/posts/create" className="text-blue-500 hover:underline">Create Post</Link>
        <Link href="/login" className="text-blue-500 hover:underline">Login</Link>
      </div>
    </nav>
  );
}
