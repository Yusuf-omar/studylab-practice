"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomeActive = pathname === "/";
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const handleKeyDown
   = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
      menuButtonRef.current?.focus();
    }
  };
  return (
    <nav
      className="navbar"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown

      }
    >
      <button
        type="button"
        className="menu-button"
        ref={menuButtonRef}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
      <ul className={`nav-links ${menuOpen ? "open" : "closed"}`}>
        <li>
          <Link href="/" 
          className={isHomeActive ? "active": ""}>
            Home
          </Link>
        </li>
        <li>
          <a href="https://github.com/TechArc-io/studylab-practice/tree/main/assignments">
            {" "}
            Assignment
          </a>
        </li>
      </ul>
    </nav>
  );
}
