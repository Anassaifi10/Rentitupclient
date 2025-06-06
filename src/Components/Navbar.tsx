import logo from "../assets/RentItupLogo.png"
import { ShoppingCart, TableOfContents, Upload, UserRoundPen, LogOut } from 'lucide-react';
import Avtar from "./Common/Avtar";
import { useEffect, useRef, useState } from "react";

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<SVGSVGElement | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-screen h-20  flex items-center justify-between px-10 relative">
      <img src={logo} alt="RentItUp Logo" className="w-1/4 h-full object-contain " />
      <input
        type="text"
        className="hidden sm:inline-flex w-full max-w-xs px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500  placeholder-gray-400 text-sm shadow-[0_0_5px_2px_rgba(59,130,246,0.3)]"
        placeholder="Search..."
      />

      <div className="flex items-center gap-5 sm:relative h-full ">
        <ShoppingCart className="cursor-pointer hover:text-orange-500 transition-all ease-in duration-200" />
        <TableOfContents ref={iconRef} className="cursor-pointer hover:text-orange-500 transition-all ease-in duration-200  " onClick={() => setShowDropdown(prev => !prev)} />
        <div
          ref={dropdownRef}
          className={`absolute top-full right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden
    transition-opacity duration-300 ease-in-out
    ${showDropdown ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        >
          <ul className="text-sm text-gray-700">
            <li className="px-4 py-2 flex gap-3 items-center hover:bg-orange-400 hover:text-white cursor-pointer transition-colors duration-200 border-b border-gray-200">
              <Upload /> Upload Item
            </li>
            <li className="px-4 py-2 flex gap-3 items-center hover:bg-orange-400 hover:text-white cursor-pointer transition-colors duration-200 border-b border-gray-200">
              <UserRoundPen /> Update Profile
            </li>
            <li className="px-4 py-2 flex gap-3 items-center hover:bg-orange-400 hover:text-white cursor-pointer transition-colors duration-200">
              <LogOut /> Logout
            </li>
          </ul>
        </div>

        <Avtar name="Anas" src="" size="10" />
      </div>
    </div>
  )
}

export default Navbar