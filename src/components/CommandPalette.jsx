import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile, projects } from "../data/portfolio";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "services", label: "What I build" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "process", label: "Process" },
  { id: "certifications", label: "Certifications" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    const base = [
      ...SECTIONS.map((s) => ({
        type: "section",
        label: s.label,
        action: () => {
          document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
        },
      })),
      ...projects.map((p) => ({
        type: "project",
        label: p.name,
        action: () => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        },
      })),
      {
        type: "action",
        label: "Copy email",
        action: () => {
          navigator.clipboard.writeText(profile.email);
          window.dispatchEvent(new CustomEvent("email-copied"));
        },
      },
      {
        type: "action",
        label: "Open GitHub",
        action: () => window.open(profile.github, "_blank"),
      },
    ];
    if (!query) return base;
    return base.filter((i) =>
      i.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const run = (item) => {
    item.action();
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-32 px-4"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg border border-border bg-panel rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="border-b border-border px-4 py-3 flex items-center gap-2">
              <span className="text-accent text-sm">&gt;</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="jump to section, project, or action..."
                className="flex-1 bg-transparent outline-none text-sm text-text placeholder:text-muted"
              />
              <span className="text-xs text-muted">esc</span>
            </div>
            <div className="max-h-80 overflow-y-auto py-2">
              {items.length === 0 && (
                <div className="px-4 py-3 text-sm text-muted">no results</div>
              )}
              {items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => run(item)}
                  className="w-full text-left px-4 py-2 text-sm text-text hover:bg-border/60 transition flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-muted">{item.type}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
