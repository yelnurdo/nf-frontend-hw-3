"use client";

import { useTheme } from '@/app/context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="p-2 m-2 border rounded">
      Switch to {theme === 'light' ? 'dark' : 'light'} theme
    </button>
  );
}
