"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-sm py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className='container flex items-center justify-between ml-5'>
        <div className='flex items-center gap-2 pl-4'>
          <div className='w-8 h-8 rounded-lg  flex items-center justify-center'>
            <Image
              className='rounded-lg'
              src={"/logo.png"}
              width={300}
              height={300}
              alt='Logo'
            ></Image>
          </div>
          <span className='font-bold text-xl font-sans'>Agilix</span>
        </div>

        <nav className='absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-12'>
          {[
            { name: "Home", href: "#home" },
            { name: "Feature", href: "#feature" },
            { name: "Process", href: "#Howitworks" },
            { name: "Pricing", href: "#pricing" },
            { name: "Download", href: "#download" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActiveItem(item.href.substring(1))}
              className={cn(
                "text-sm font-medium relative py-2 transition-all duration-300 ease-in-out",
                activeItem === item.href.substring(1)
                  ? "text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#ea8455] after:transform after:perspective-[100px] after:rotateX-[45deg] after:transition-all after:duration-300 after:ease-in-out after:opacity-100"
                  : "text-muted-foreground hover:text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#ea8455] after:transform after:perspective-[100px] after:rotateX-[45deg] after:transition-all after:duration-300 after:ease-in-out after:opacity-0"
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>

        <Button
          variant='outline'
          size='sm'
          className='border-[#ea8455] border-1 text-[#ea8455] hover:bg-[#ea8455] hover:text-white rounded-full px-6 mr-10 p-4'
        >
          Start Free Trial
        </Button>
      </div>
    </header>
  );
}
