import Section from "./Section";
import { projects } from "../data/portfolio";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

function GlowCard({ children, delay = 0, featured = false }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`glow-card border border-border bg-panel/40 rounded overflow-hidden hover:border-accent/50 transition group ${
        featured ? "shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-black/70" : ""
      }`}
    >
      {children}
    </motion.div>
  );
}

function CodeBlock({ code }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="text-xs text-accent2 hover:underline"
      >
        {open ? "hide code" : "show code"}
      </button>
      {open && (
        <motion.pre
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-2 text-xs bg-bg/70 border border-border rounded p-3 overflow-x-auto text-text/90 leading-relaxed"
        >
          <code>{code}</code>
        </motion.pre>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" cmd="ls projects/ --details" path="~/work">
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-8">
        Things I have built and shipped
      </h2>
      <div className="space-y-4">
        {projects.map((p, i) => (
          <GlowCard key={p.name} delay={i * 0.08} featured={!!p.screenshot}>
            {p.screenshot && (
              <a
                href={p.link || "#"}
                target="_blank"
                rel="noreferrer"
                className="block border-b border-border bg-black/20 relative group/img overflow-hidden"
              >
                <img
                  src={p.screenshot}
                  alt={`${p.name} screenshot`}
                  className="w-full max-h-[500px] object-contain opacity-95 transition duration-300 group-hover/img:opacity-60 group-hover/img:scale-[1.02]"
                  loading="lazy"
                />
                {p.link && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <span className="px-4 py-2 border border-accent bg-bg/80 backdrop-blur text-accent text-sm rounded">
                      {p.linkLabel || "view live"} →
                    </span>
                  </div>
                )}
              </a>
            )}
            <div className="p-5">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="text-accent">{p.name}</span>
                <span className="text-muted text-xs">·</span>
                <span className="text-muted text-xs">{p.tags.join(" · ")}</span>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-xs text-accent2 hover:underline"
                  >
                    {p.linkLabel || "view"}
                  </a>
                )}
              </div>
              <p className="text-sm text-text/80 leading-relaxed">{p.desc}</p>
              {p.code && <CodeBlock code={p.code} />}
            </div>
          </GlowCard>
        ))}
      </div>
    </Section>
  );
}
