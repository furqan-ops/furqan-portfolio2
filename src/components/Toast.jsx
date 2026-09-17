import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Toast() {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const handler = () => {
      setMsg("email copied");
      setTimeout(() => setMsg(null), 1800);
    };
    window.addEventListener("email-copied", handler);
    return () => window.removeEventListener("email-copied", handler);
  }, []);

  return (
    <AnimatePresence>
      {msg && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-4 py-2 border border-accent bg-panel rounded text-sm text-accent shadow-lg"
        >
          {msg}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
