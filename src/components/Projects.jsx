import Section from "./Section";
import { projects } from "../data/portfolio";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import ImageCarousel from "./ImageCarousel";

function GlowCard({ children, delay = 0, featured = false, flagship = false }) {
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
      className={`glow-card border bg-panel/40 rounded-2xl overflow-hidden transition group ${
        flagship
          ? "border-accent/50 shadow-2xl shadow-black/60 hover:border-accent"
          : featured
          ? "border-border shadow-lg shadow-black/50 hover:border-accent/50 hover:shadow-xl hover:shadow-black/70"
          : "border-border hover:border-accent/50"
      }`}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({ p, i, flagship = false }) {
  let slides = null;
  if (p.slides && p.slides.length > 0) slides = p.slides;
  else if (p.screenshots && p.screenshots.length > 0) slides = p.screenshots.map((src) => ({ type: "image", src }));
  else if (p.screenshot) slides = [{ type: "image", src: p.screenshot }];

  return (
    <GlowCard delay={i * 0.08} featured={!!slides} flagship={flagship}>
      <div className={`border-b border-border ${flagship ? "p-5 md:p-6" : "p-4 md:p-5"}`}>
        {flagship && (
          <div className="inline-block mb-2.5 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase border border-accent/60 text-accent rounded-full">
            ★ Flagship Project
          </div>
        )}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className={`text-accent font-semibold ${flagship ? "text-base md:text-lg" : "text-sm md:text-base"}`}>
            {p.name}
          </span>
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className={`ml-auto hover:underline ${flagship ? "text-xs md:text-sm text-accent font-semibold" : "text-xs text-accent2"}`}
            >
              {p.linkLabel || "view"} →
            </a>
          )}
        </div>
        <div className={`flex flex-wrap gap-x-3 gap-y-1 mb-2 text-muted ${flagship ? "text-xs md:text-sm" : "text-xs"}`}>
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <p className={`text-text/85 leading-relaxed ${flagship ? "text-sm md:text-base" : "text-xs md:text-sm"}`}>
          {p.desc}
        </p>
      </div>
      {slides && <ImageCarousel slides={slides} link={p.link} linkLabel={p.linkLabel} />}
    </GlowCard>
  );
}

export default function Projects() {
  const [showAll, setShowAll] = useState(false);

  const flagship = projects.find((p) => p.name === "attendance-app");
  const others = projects.filter((p) => p.name !== "attendance-app");
  const featuredOthers = others.filter((p) => p.featured);
  const restOthers = others.filter((p) => !p.featured);

  return (
    <Section id="projects" cmd="ls projects/ --details" path="~/work">
      <h2 className="text-xl md:text-2xl text-white font-bold mb-2">
        Things I have built and shipped
      </h2>
      <p className="text-sm md:text-base text-muted mb-8">
        Real projects with how they work under the hood. Start with the flagship.
      </p>

      <div className="space-y-6">
        {flagship && <ProjectCard p={flagship} i={0} flagship={true} />}
        {featuredOthers.map((p, i) => (
          <ProjectCard key={p.name} p={p} i={i + 1} />
        ))}
        {showAll &&
          restOthers.map((p, i) => (
            <ProjectCard key={p.name} p={p} i={i + featuredOthers.length + 1} />
          ))}
      </div>

      {restOthers.length > 0 && (
        <button
          onClick={() => setShowAll((s) => !s)}
          className="mt-6 text-sm text-accent2 hover:underline"
        >
          {showAll ? "← Show fewer" : `Show ${restOthers.length} more projects →`}
        </button>
      )}
    </Section>
  );
}
