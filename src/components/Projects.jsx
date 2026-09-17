import Section from "./Section";
import { projects } from "../data/portfolio";
import { motion } from "framer-motion";
import { useRef } from "react";
import ImageCarousel from "./ImageCarousel";

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
    <motion.div ref={ref} onMouseMove={onMove} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay }} className={`glow-card border border-border bg-panel/40 rounded overflow-hidden hover:border-accent/50 transition group ${featured ? "shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-black/70" : ""}`}>
      {children}
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" cmd="ls projects/ --details" path="~/work">
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-8">Things I have built and shipped</h2>
      <div className="space-y-4">
        {projects.map((p, i) => {
          let slides = null;
          if (p.slides && p.slides.length > 0) slides = p.slides;
          else if (p.screenshots && p.screenshots.length > 0) slides = p.screenshots.map((src) => ({ type: "image", src }));
          else if (p.screenshot) slides = [{ type: "image", src: p.screenshot }];

          return (
            <GlowCard key={p.name} delay={i * 0.08} featured={!!slides}>
              <div className="p-5 border-b border-border">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-accent">{p.name}</span>
                  <span className="text-muted text-xs">·</span>
                  <span className="text-muted text-xs">{p.tags.join(" · ")}</span>
                  {p.link && (<a href={p.link} target="_blank" rel="noreferrer" className="ml-auto text-xs text-accent2 hover:underline">{p.linkLabel || "view"}</a>)}
                </div>
                <p className="text-sm text-text/80 leading-relaxed">{p.desc}</p>
              </div>
              {slides && <ImageCarousel slides={slides} link={p.link} linkLabel={p.linkLabel} />}
            </GlowCard>
          );
        })}
      </div>
    </Section>
  );
}
