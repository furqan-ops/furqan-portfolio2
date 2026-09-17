import Section from "./Section";
import { faq } from "../data/portfolio";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <Section id="faq" cmd="man faq" path="~/help">
      <h2 className="text-2xl md:text-3xl text-white font-bold mb-8">
        Frequently asked questions
      </h2>
      <div className="space-y-2">
        {faq.map((f, i) => (
          <div key={i} className="border border-border rounded bg-panel/30">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left px-4 py-3 flex justify-between items-center hover:text-accent transition"
            >
              <span className="text-sm text-text">{f.q}</span>
              <span className="text-accent text-lg">{open === i ? "-" : "+"}</span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-sm text-muted leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </Section>
  );
}
