import Section from "./Section";
import { skills } from "../data/portfolio";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <Section id="skills" cmd="cat stack.yml" path="~/stack">
      <h2 className="text-xl md:text-2xl text-white font-bold mb-2">
        What I work with
      </h2>
      <p className="text-sm md:text-base text-muted mb-8">
        Full production stack across AI agents, automation pipelines, and modern web apps.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Object.entries(skills).map(([group, items], i) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="border border-border/80 bg-panel/40 rounded-xl p-5 hover:border-accent/40 hover:shadow-lg hover:shadow-black/30 transition-all duration-200 flex flex-col"
          >
            <div className="text-[11px] font-mono text-muted/70 mb-1">
              ~/stack/{group.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
            </div>
            <div className="text-accent text-sm md:text-base font-semibold mb-3.5 flex items-center justify-between">
              <span>{group}</span>
              <span className="text-[11px] font-mono text-muted/80 px-2 py-0.5 rounded bg-bg/50 border border-border/50">
                {items.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {items.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 text-xs border border-border/80 rounded-md text-text/85 bg-bg/30 hover:border-accent hover:text-accent hover:bg-accent/5 transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
