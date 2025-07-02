import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-blue-600">HelpDesk</h1>
      <div className="flex gap-4">
        <Link to="/" className="hover:text-blue-600">Home</Link>

<Link to="/login" className="hover:text-blue-600">Login</Link>
        <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
      </div>
    </nav>
  );
};

export default Navbar;
