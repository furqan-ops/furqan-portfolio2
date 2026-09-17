import Section from "./Section";
import { projects } from "../data/portfolio";
import { motion } from "framer-motion";
import { useRef } from "react";

function GlowCard({ children, delay = 0 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glow-card border border-border bg-panel/40 rounded p-5 hover:border-accent/50 transition group"
    >
      {children}
    </motion.div>
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
          <GlowCard key={p.name} delay={i * 0.08}>
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
                  view
                </a>
              )}
            </div>
            <p className="text-sm text-text/80 leading-relaxed">{p.desc}</p>
          </GlowCard>
        ))}
      </div>
    </Section>
  );
}
