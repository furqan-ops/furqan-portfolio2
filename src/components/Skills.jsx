import Section from "./Section";
import { skills } from "../data/portfolio";
import { motion } from "framer-motion";

export default function Skills() {
  return (
    <Section id="skills" cmd="cat stack.yml" path="~/stack">
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-8">
        What is in my toolkit
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {Object.entries(skills).map(([group, items], i) => (
          <motion.div
            key={group}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="text-accent text-sm mb-3">{group}:</div>
            <ul className="space-y-1.5">
              {items.map((s) => (
                <li key={s} className="text-sm text-muted before:content-['>'] before:text-accent before:mr-2">
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
