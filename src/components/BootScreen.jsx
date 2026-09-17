import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "furqan@portfolio booting...",
  "",
  "[OK] loading kernel",
  "[OK] mounting /dev/portfolio",
  "[OK] starting renderer",
  "[OK] fetching projects",
  "[OK] initializing automation stack",
  "[OK] ready",
];

export default function BootScreen() {
  const [visible, setVisible] = useState(true);
  const [lineIndex, setLineIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Skip if already shown this session
    if (sessionStorage.getItem("bootShown") === "1") {
      setVisible(false);
      return;
    }

    // Prevent scrolling while boot screen is up
    document.body.style.overflow = "hidden";

    // Print lines one by one
    const lineTimer = setInterval(() => {
      setLineIndex((i) => {
        if (i >= BOOT_LINES.length) {
          clearInterval(lineTimer);
          return i;
        }
        return i + 1;
      });
    }, 180);

    // Progress bar 0 -> 100 in ~1.8s
    const start = Date.now();
    const duration = 1800;
    const progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(progressTimer);
    }, 30);

    // Hide after everything's done
    const finishTimer = setTimeout(() => {
      sessionStorage.setItem("bootShown", "1");
      setVisible(false);
    }, 2000);

    // Skip on keypress or click
    const skip = () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
      clearTimeout(finishTimer);
      sessionStorage.setItem("bootShown", "1");
      setVisible(false);
    };
    window.addEventListener("keydown", skip);
    window.addEventListener("mousedown", skip);

    return () => {
      clearInterval(lineTimer);
      clearInterval(progressTimer);
      clearTimeout(finishTimer);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("mousedown", skip);
      document.body.style.overflow = "";
    };
  }, []);

  // Restore scroll when it becomes invisible
  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 bg-bg flex items-center justify-center px-6"
        >
          <div className="w-full max-w-2xl font-mono">
            <div className="text-sm md:text-base space-y-1 mb-6">
              {BOOT_LINES.slice(0, lineIndex).map((line, i) => (
                <div
                  key={i}
                  className={
                    line.startsWith("[OK]")
                      ? "text-accent"
                      : line === ""
                      ? "h-2"
                      : "text-accent2"
                  }
                >
                  {line}
                </div>
              ))}
              {lineIndex < BOOT_LINES.length && (
                <div className="text-accent cursor-blink"></div>
              )}
            </div>

            <div className="w-full h-1 bg-border rounded overflow-hidden">
              <div
                className="h-full bg-accent transition-[width] duration-75 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-4 text-xs text-muted flex justify-between">
              <span>{Math.floor(progress)}%</span>
              <span>press any key to skip</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
