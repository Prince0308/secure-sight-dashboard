// app/components/Navbar.tsx
'use client';
import { ReactNode } from 'react';


import Image from 'next/image';
import { FaVideo, FaUsers, FaMapMarkerAlt, FaBell, FaThLarge } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="w-full h-16 bg-[#1E1E1E] text-white flex items-center justify-between px-6 shadow-md">
      {/* Left: Logo & App Name */}
      <div className="flex items-center gap-3">
        <Image src="/MANDLACX.png" alt="Logo" width={32} height={32} />
        <span className="text-lg font-semibold">MANDLACX</span>
      </div>

      {/* Center: Navigation Menu */}
      <div className="flex gap-6">
        <NavItem icon={<FaThLarge />} label="Dashboard" />
        <NavItem icon={<FaVideo />} label="Cameras" />
        <NavItem icon={<FaMapMarkerAlt />} label="Scenes" />
        <NavItem icon={<FaBell />} label="Incidents" />
        <NavItem icon={<FaUsers />} label="Users" />
      </div>

      {/* Right: Profile */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">Mohammed Ajhas</p>
          <p className="text-xs text-gray-400">ajhas@mandlacx.com</p>
        </div>
        <Image
          src="/profile.jpg"
          alt="Profile"
          width={36}
          height={36}
          className="rounded-full border border-gray-600"
        />
      </div>
    </nav>
  );
}

// Reusable nav item component
function NavItem({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 text-sm hover:text-yellow-400 transition">
      {icon}
      {label}
    </button>
  );
}
