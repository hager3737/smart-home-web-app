"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before reading theme value
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  console.log(theme);

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}>
      {/* Top Navigation Bar */}
      <nav className="grid grid-cols-3 justify-items-center items-center p-4 shadow-md bg-gray-800 text-white">
        <div></div>
        <h1 className="text-xl font-bold">Hager Smart Home</h1>
        <div className="flex ml-80 gap-4">
          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-white"
          >
            {theme === "dark" ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </Button>
          
          {/* Settings Button */}
          <Button variant="ghost" className="text-white">
            <Settings className="w-6 h-6" />
          </Button>
        </div>
      </nav>
    </div>
  );
}