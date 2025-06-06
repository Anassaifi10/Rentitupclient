import { Home, Info, Link, Mail } from "lucide-react";


function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-sm">
            &copy; {new Date().getFullYear()} RentalApp. All rights reserved.
          </span>
          <nav className="flex flex-row gap-6 items-center">
            <Link to="/" className="hover:underline flex items-center gap-1">
              <Home className="w-4 h-4" /> Home
            </Link>   <a href="#" className="hover:underline flex items-center gap-1">
              <Info className="w-4 h-4" /> About
            </a>
            <a href="#" className="hover:underline flex items-center gap-1">
              <Mail className="w-4 h-4" /> Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer