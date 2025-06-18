import { Home, User, Grid2x2, Dumbbell } from "lucide-react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";

const navItems = [
  { path: "/dashboard", icon: Home, name: "Home" },
  { path: "/dashboard/calender", icon: Grid2x2, name: "Calendar" },
  { path: "/dashboard/exercise", icon: Dumbbell, name: "Exercise" },
  { path: "/dashboard/profile", icon: User, name: "Profile" },
];

import React, { useEffect, useRef, useState } from "react";

const BottomNavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  // Hide navbar for all /dashboard/exercise/* subroutes (not the base page)

  useEffect(() => {
    if (pathname.includes("/dashboard/exercise")) {
      setShowNavbar(false);
      return;
    }
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const buffer = 10; // px buffer to avoid flicker
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - buffer;

      if (isAtBottom) {
        setShowNavbar(false);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // scrolling down
        setShowNavbar(false);
      } else {
        // scrolling up
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const activeIndex = navItems.findIndex((item) => item.path === pathname);

  return (
    <div
      className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 transition-transform duration-300 ${
        showNavbar
          ? "translate-y-0 opacity-100"
          : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <div className='bg-gray-800 rounded-full p-3 flex items-center justify-around shadow-lg w-80'>
        {navItems.map((item, index) => {
          const isActive = activeIndex === index;
          const IconComponent = item.icon;
          return (
            <div
              key={item.name}
              onClick={() => router.push(item.path)}
              className={cn(
                "relative w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-colors",
                !isActive && "hover:bg-gray-700"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId='active-indicator'
                  className='absolute inset-0 bg-orange-500 rounded-full shadow-sm'
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <IconComponent className='relative z-10 w-6 h-6 text-white' />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
