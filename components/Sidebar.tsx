// components/Sidebar.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Compass, Book, Settings } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Dashboard' },
  { id: 'explore', icon: Compass, label: 'Explore' },
  { id: 'courses', icon: Book, label: 'My Courses' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const [active, setActive] = useState('home');

  return (
    <nav className="w-20 md:w-64 bg-[#0a0a0c] border-r border-white/5 flex flex-col items-center md:items-start p-4 transition-all duration-300 z-50">
      <div className="w-10 h-10 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-xl mb-12 flex-shrink-0" />
      
      <ul className="flex flex-col gap-2 w-full">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;

          return (
            <li key={item.id} className="relative w-full">
              <button
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-4 w-full p-3 rounded-xl relative z-10 transition-colors ${
                  isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="hidden md:block font-medium">{item.label}</span>
              </button>

              {/* Layout Animation using layoutId */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white/5 rounded-xl border border-white/10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}