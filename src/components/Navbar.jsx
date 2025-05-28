import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed w-full z-40 flex justify-center items-center px-4 py-3">
      <nav
        className={cn(
          "relative w-[80%] rounded-full transition-all duration-300 backdrop-blur-md",
          "border border-primary/10",
          "before:absolute before:inset-0 before:rounded-full before:pointer-events-none before:transition-all before:duration-300",
          "after:absolute after:inset-0 after:rounded-full after:pointer-events-none after:transition-all after:duration-300",
          // Light theme styles
          "dark:bg-gray-950/75 bg-white/70",
          "dark:shadow-lg dark:shadow-primary/10 shadow-lg shadow-black/[0.03]",
          // Border and glow effects
          "dark:before:shadow-[0_0_0.5px_1px_rgba(255,255,255,0.1)] before:shadow-[0_0_0.5px_1px_rgba(0,0,0,0.05)]",
          "dark:after:shadow-[0_0_1px_1px_rgba(255,255,255,0.1)] after:shadow-[0_0_1px_1px_rgba(0,0,0,0.05)]",
          // Glow effects on scroll
          isScrolled && "dark:before:shadow-[0_0_1px_1px_rgba(var(--primary-rgb),0.3)] before:shadow-[0_0_1px_1px_rgba(var(--primary-rgb),0.15)]",
          isScrolled && "dark:after:shadow-[0_0_2px_1px_rgba(var(--primary-rgb),0.2)] after:shadow-[0_0_2px_1px_rgba(var(--primary-rgb),0.1)]"
        )}
      >
        <div className="relative z-20 container flex items-center justify-between py-2 px-4">
          <a
            className={cn(
              "text-xl font-bold transition-colors duration-300",
              "flex items-center"
            )}
            href="#hero"
          >
            <span className="relative">
              <span className={cn(
                "transition-colors duration-300",
                "dark:text-white text-gray-900",
                isScrolled && "text-primary"
              )}>
                Ayush
              </span>{" "}
              <span className="text-primary">Thite</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className={cn(
                  "relative z-20 px-4 py-2 rounded-full transition-all duration-300",
                  "text-sm font-medium",
                  "hover:text-primary hover:bg-primary/10",
                  activeSection === item.href.substring(1)
                    ? "text-primary bg-primary/10"
                    : "dark:text-gray-300 text-gray-600"
                )}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={cn(
              "relative z-20 md:hidden p-2 rounded-full transition-colors duration-300",
              "hover:bg-primary/10",
              "dark:text-white text-gray-900"
            )}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 dark:bg-background/95 bg-white/95 backdrop-blur-md",
          "flex flex-col items-center justify-center",
          "transition-all duration-300 md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto z-30"
            : "opacity-0 pointer-events-none -z-10"
        )}
      >
        <div className="flex flex-col space-y-2 w-64">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "px-6 py-3 rounded-full transition-all duration-300 text-center",
                "hover:bg-primary/10 hover:text-primary",
                activeSection === item.href.substring(1)
                  ? "bg-primary/10 text-primary"
                  : "dark:text-gray-300 text-gray-600"
              )}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};