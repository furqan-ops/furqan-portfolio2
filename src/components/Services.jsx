import Section from "./Section";
import { services } from "../data/portfolio";
import { motion } from "framer-motion";

export default function Services() {
  return (
    <Section id="services" cmd="ls services/" path="~/services">
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-8">
        What I build
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="border border-border bg-panel/40 rounded p-5 hover:border-accent/50 hover:bg-panel transition group"
          >
            <div className="text-xs text-accent mb-2">$ {s.cmd}</div>
            <h3 className="text-white font-semibold mb-2 group-hover:text-accent transition">
              {s.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
