import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function SlideContent({ slide }) {
  if (slide.type === "image") {
    return <img src={slide.src} alt="screenshot" className="w-full h-full object-contain" draggable={false} loading="lazy" />;
  }
  if (slide.type === "terminal") {
    return (
      <div className="w-full h-full bg-bg flex flex-col font-mono text-[11px] md:text-sm leading-relaxed p-4 md:p-6 overflow-hidden">
        <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 text-muted text-xs">{slide.title || "terminal"}</span>
        </div>
        <div className="flex-1 overflow-hidden">
          {slide.lines.map((line, i) => {
            const color = line.startsWith("[OK]") ? "text-accent" : line.startsWith("[ERROR]") ? "text-red-400" : line.startsWith("[NEW]") ? "text-accent2" : line.startsWith("[*]") || line.startsWith("[INFO]") ? "text-muted" : "text-text";
            return <div key={i} className={color}>{line}</div>;
          })}
          <div className="text-accent cursor-blink mt-1">$</div>
        </div>
      </div>
    );
  }
  if (slide.type === "code") {
    return (
      <div className="w-full h-full bg-[#0d1117] flex flex-col font-mono text-[11px] md:text-sm overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-panel/40">
          <span className="text-accent2 text-xs">{slide.title}</span>
          <span className="text-muted text-[10px] uppercase">{slide.lang}</span>
        </div>
        <pre className="flex-1 overflow-auto p-4 md:p-6 text-text/90 leading-relaxed whitespace-pre"><code>{slide.code}</code></pre>
      </div>
    );
  }
  return null;
}

function Lightbox({ slides, index, setIndex, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + slides.length) % slides.length);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [slides.length, onClose, setIndex]);

  const go = (dir) => setIndex((i) => (i + dir + slides.length) % slides.length);
  const slide = slides[index];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/95 backdrop-blur-sm cursor-zoom-out" />
      <motion.div key={index} initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: "spring", stiffness: 220, damping: 24 }} onClick={(e) => e.stopPropagation()} className="relative z-10 w-full max-w-5xl h-[80vh] rounded-xl overflow-hidden border border-border shadow-2xl">
        <SlideContent slide={slide} />
      </motion.div>
      <button onClick={onClose} aria-label="Close" className="absolute top-5 right-6 z-20 w-11 h-11 rounded-full border border-accent/70 text-accent bg-bg/90 backdrop-blur flex items-center justify-center hover:bg-accent/20 transition text-2xl leading-none">x</button>
      {slides.length > 1 && (
        <>
          <button onClick={() => go(-1)} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-accent/70 text-accent bg-bg/90 backdrop-blur flex items-center justify-center hover:bg-accent/20 transition text-3xl leading-none">&lt;</button>
          <button onClick={() => go(1)} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-accent/70 text-accent bg-bg/90 backdrop-blur flex items-center justify-center hover:bg-accent/20 transition text-3xl leading-none">&gt;</button>
        </>
      )}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 text-xs text-muted flex flex-col items-center gap-1">
        <div>{index + 1} / {slides.length}</div>
        <div>ESC to close</div>
      </div>
    </motion.div>
  );
}

export default function ImageCarousel({ slides: rawSlides, link, linkLabel = "view live" }) {
  const slides = rawSlides;
  const [index, setIndex] = useState(slides.length);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const dragStartX = useRef(null);
  const dragMoved = useRef(false);

  const tripled = [...slides, ...slides, ...slides];
  const total = slides.length;
  const centerOffset = total;

  useEffect(() => {
    if (hovered || dragging || lightboxIndex !== null) return;
    const id = setInterval(() => setIndex((i) => i + 1), 3500);
    return () => clearInterval(id);
  }, [hovered, dragging, lightboxIndex]);

  useEffect(() => {
    if (index >= total * 2) { const id = setTimeout(() => setIndex(index - total), 700); return () => clearTimeout(id); }
    if (index < total - 1) { const id = setTimeout(() => setIndex(index + total), 700); return () => clearTimeout(id); }
  }, [index, total]);

  const go = (dir) => setIndex((i) => i + dir);

  const onPointerDown = (e) => { dragStartX.current = e.clientX; dragMoved.current = false; setDragging(true); };
  const onPointerMove = (e) => { if (!dragging || dragStartX.current == null) return; if (Math.abs(e.clientX - dragStartX.current) > 5) dragMoved.current = true; };
  const onPointerUp = (e) => {
    if (dragStartX.current != null) {
      const dx = e.clientX - dragStartX.current;
      if (dx > 40) go(-1); else if (dx < -40) go(1);
    }
    dragStartX.current = null; setDragging(false);
  };

  const VISIBLE_SIDE = 2;
  const getStyle = (offset) => {
    const abs = Math.abs(offset);
    if (abs > VISIBLE_SIDE) return { x: offset > 0 ? 900 : -900, scale: 0.5, opacity: 0, rotateY: offset > 0 ? -45 : 45, z: -400, zIndex: 0, brightness: 1 };
    if (offset === 0) return { x: 0, scale: 1, opacity: 1, rotateY: 0, z: 120, zIndex: 30, brightness: 1.05 };
    const sign = offset > 0 ? 1 : -1;
    const distance = abs;
    return { x: sign * (320 + (distance - 1) * 150), scale: 0.78 - (distance - 1) * 0.15, opacity: 0.9 - (distance - 1) * 0.4, rotateY: sign * -35, z: -200 * distance, zIndex: 20 - distance, brightness: 0.55 };
  };

  const openLightbox = (i) => { if (dragMoved.current) return; setLightboxIndex(i % total); };

  return (
    <>
      <div className="relative group/img select-none mx-3 md:mx-4 my-3 md:my-4" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerUp} style={{ cursor: dragging ? "grabbing" : "grab", perspective: "1600px", perspectiveOrigin: "50% 50%" }}>
        <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(20,25,35,0.95), rgba(0,0,0,0.98))", boxShadow: "0 25px 70px -20px rgba(0,0,0,0.95), 0 0 0 1px rgba(126,231,135,0.08)" }} />

        <div className="relative h-[400px] md:h-[560px]" style={{ transformStyle: "preserve-3d", overflow: "visible" }}>
          {tripled.map((slide, i) => {
            const offset = i - index;
            const s = getStyle(offset);
            const isCenter = offset === 0;
            return (
              <motion.div key={i} className="absolute top-1/2 left-1/2" style={{ zIndex: s.zIndex, transformStyle: "preserve-3d" }} animate={{ x: `calc(-50% + ${s.x}px)`, y: "-50%", z: s.z, scale: s.scale, opacity: s.opacity, rotateY: s.rotateY, filter: `brightness(${s.brightness})` }} transition={{ type: "spring", stiffness: 80, damping: 18, mass: 1 }}>
                <button type="button" onClick={() => openLightbox(i)} className={`block ${isCenter ? "cursor-zoom-in" : ""}`} style={{ pointerEvents: isCenter ? "auto" : "none" }} aria-label={`Open slide ${i + 1}`}>
                  <div className="relative w-[480px] md:w-[780px] h-[280px] md:h-[440px] rounded-xl overflow-hidden bg-black border border-border" style={{ boxShadow: isCenter ? "0 60px 120px -30px rgba(0,0,0,1), 0 0 100px -20px rgba(126,231,135,0.3), 0 0 0 1px rgba(126,231,135,0.2)" : "0 25px 50px -20px rgba(0,0,0,0.9)" }}>
                    <SlideContent slide={slide} />
                  </div>
                </button>
              </motion.div>
            );
          })}
          <div className="absolute inset-y-0 left-0 w-16 md:w-28 pointer-events-none z-40" style={{ background: "linear-gradient(to right, rgba(0,0,0,0.9), transparent)" }} />
          <div className="absolute inset-y-0 right-0 w-16 md:w-28 pointer-events-none z-40" style={{ background: "linear-gradient(to left, rgba(0,0,0,0.9), transparent)" }} />
        </div>

        <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-accent/60 text-accent bg-bg/80 backdrop-blur flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition hover:bg-accent/20 z-50 text-2xl" aria-label="Previous">&lt;</button>
        <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-accent/60 text-accent bg-bg/80 backdrop-blur flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition hover:bg-accent/20 z-50 text-2xl" aria-label="Next">&gt;</button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 items-center z-50">
          {slides.map((_, i) => {
            const isActive = index % total === i;
            return <button key={i} onClick={(e) => { e.stopPropagation(); setIndex(centerOffset + i); }} aria-label={`Go to slide ${i + 1}`} className="rounded-full transition-all duration-300" style={{ width: isActive ? "28px" : "8px", height: "8px", background: isActive ? "#7ee787" : "#6e7681", opacity: isActive ? 1 : 0.6, boxShadow: isActive ? "0 0 12px rgba(126,231,135,0.6)" : "none" }} />;
          })}
        </div>

        {link && (
          <div className="absolute top-4 right-4 z-50">
            <a href={link} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="px-3 py-1.5 border border-accent/70 bg-bg/85 backdrop-blur text-accent text-xs rounded hover:bg-accent/20 transition">{linkLabel} -&gt;</a>
          </div>
        )}

        <div className="absolute bottom-14 left-1/2 -translate-x-1/2 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
          <span className="px-3 py-1.5 border border-accent/60 bg-bg/85 backdrop-blur text-accent text-xs rounded">click to expand</span>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox slides={slides} index={lightboxIndex} setIndex={setLightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
