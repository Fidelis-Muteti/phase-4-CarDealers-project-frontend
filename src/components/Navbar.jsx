import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <Link to="/" className="text-2xl font-bold hover:text-gray-200">
         Dealers Hub
        </Link>

        
      </div>
    </nav>
  );
}

export default Navbar;
