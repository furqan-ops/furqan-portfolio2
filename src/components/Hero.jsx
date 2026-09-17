import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "../data/portfolio";

function useTypewriter(text, speed = 55) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setOut(text.slice(0, ++i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return out;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 2.2 },
  },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Hero() {
  const typed = useTypewriter(profile.tagline);

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      id="top"
      className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-16"
    >
      <motion.div variants={item} className="text-xs md:text-sm text-muted mb-6">
        <span className="text-accent">{profile.prompt}</span> · zsh
      </motion.div>

      <motion.h1
        variants={item}
        className="text-3xl md:text-5xl font-bold text-white mb-3"
      >
        {profile.name}
      </motion.h1>

      <motion.p variants={item} className="text-sm md:text-base text-muted mb-6">
        {profile.location} · <span className="text-accent">online</span> · open to remote roles
      </motion.p>

      <motion.div
        variants={item}
        className="text-base md:text-lg text-accent2 mb-8 h-6 cursor-blink"
      >
        {typed}
      </motion.div>

      <motion.div variants={item} className="space-y-2 text-sm md:text-base mb-10">
        <div>
          <span className="text-accent">$ </span>whoami
        </div>
        <div className="text-muted pl-4">-&gt; {profile.role}</div>

        <div className="pt-3">
          <span className="text-accent">$ </span>cat role.txt
        </div>
        <div className="text-muted pl-4">-&gt; {profile.current}</div>
      </motion.div>

      <motion.p variants={item} className="max-w-2xl text-text/90 leading-relaxed mb-6">
        {profile.blurb}
      </motion.p>

      <motion.div variants={item} className="flex flex-wrap gap-3 text-sm">
        <button
          onClick={() => {
            navigator.clipboard.writeText(profile.email);
            window.dispatchEvent(new CustomEvent("email-copied"));
          }}
          className="px-4 py-2 border border-border rounded hover:border-accent hover:text-accent transition"
        >
          copy email
        </button>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="px-4 py-2 border border-border rounded hover:border-accent hover:text-accent transition"
        >
          github
        </a>
      </motion.div>

      <motion.div variants={item} className="mt-16 text-muted text-xs animate-bounce">
        scroll
      </motion.div>
    </motion.section>
  );
}
