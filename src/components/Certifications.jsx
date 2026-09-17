import Section from "./Section";
import { certifications } from "../data/portfolio";
import { motion } from "framer-motion";

export default function Certifications() {
  return (
    <Section id="certifications" cmd="cat certs.txt" path="~/learning">
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-8">
        Continued learning
      </h2>
      <div className="flex flex-wrap gap-2">
        {certifications.map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            className="text-xs px-3 py-1.5 border border-border rounded-full text-muted hover:border-accent hover:text-accent transition"
          >
            {c}
          </motion.span>
        ))}
      </div>
    </Section>
  );
}
