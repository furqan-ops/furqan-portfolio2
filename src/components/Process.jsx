import Section from "./Section";
import { process } from "../data/portfolio";
import { motion } from "framer-motion";

export default function Process() {
  return (
    <Section id="process" cmd="cat process.sh" path="~/process">
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-8">
        How a project usually goes
      </h2>
      <div className="space-y-5">
        {process.map((p, i) => (
          <motion.div
            key={p.step}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="flex gap-4 items-start"
          >
            <div className="text-accent text-sm font-bold w-8 shrink-0">{p.step}</div>
            <div>
              <div className="text-white font-semibold">{p.title}</div>
              <div className="text-sm text-muted">{p.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
