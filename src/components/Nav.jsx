import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { id: "about", label: "about" },
  { id: "services", label: "services" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "work" },
  { id: "skills", label: "skills" },
  { id: "faq", label: "faq" },
  { id: "contact", label: "contact" },
];

export default function Nav({ onOpenPalette }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-bg/80 backdrop-blur border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 py-3 flex items-center gap-4 text-xs">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-accent font-semibold"
        >
          furqan@portfolio
        </button>

        <div className="hidden md:flex gap-4 ml-4 text-muted">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => jump(l.id)}
              className="hover:text-accent transition"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="hidden md:inline text-xs border border-border rounded px-2 py-1 text-muted hover:border-accent hover:text-accent transition"
          >
            Ctrl+K
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
