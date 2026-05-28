import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/70 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Memers Guru
        </h1>

        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/templates">Templates</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/trending">Trending</Link>
          <Link to="/community">Community</Link>
          <Link to="/guide">Guide</Link>
        </div>
      </div>
    </nav>
  );
}
